import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCDE } from "@/content/cdes";
import { getConectaUser } from "@/lib/auth/conecta";
import { notifyPostcardSubmission } from "@/lib/email/postcard-notification";
import { POSTCARD_ASSETS_BUCKET, removePostcardAsset } from "@/lib/content/conecta-storage";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type UploadFile = { type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> };

function getUploadFile(value: unknown): UploadFile | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as { type?: unknown; size?: unknown; arrayBuffer?: unknown };
  return typeof candidate.type === "string" && typeof candidate.size === "number" && candidate.size > 0 && typeof candidate.arrayBuffer === "function" ? candidate as UploadFile : null;
}

export async function POST(request: Request) {
  const user = await getConectaUser();
  if (!user) return NextResponse.json({ message: "Tu sesión de Conecta no está activa." }, { status: 401 });

  let uploadedPath: string | null = null;
  try {
    const form = await request.formData();
    const messageValue = form.get("message");
    const message = typeof messageValue === "string" ? messageValue.trim().slice(0, 350) : "";
    const image = getUploadFile(form.get("coverImage"));
    if (!message) return NextResponse.json({ message: "Escribe un mensaje para la postal." }, { status: 400 });
    if (!image) return NextResponse.json({ message: "Debes seleccionar una imagen para la portada." }, { status: 400 });
    if (!IMAGE_TYPES.has(image.type)) return NextResponse.json({ message: "La imagen debe ser JPG, PNG o WebP." }, { status: 400 });
    if (image.size > MAX_IMAGE_SIZE) return NextResponse.json({ message: "La imagen comprimida no puede superar 2 MB." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const extension = image.type === "image/png" ? "png" : image.type === "image/webp" ? "webp" : "jpg";
    uploadedPath = `postcards/${randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(POSTCARD_ASSETS_BUCKET).upload(uploadedPath, await image.arrayBuffer(), { contentType: image.type, upsert: false });
    if (uploadError) throw new Error("No se pudo subir la portada.");

    const cde = getCDE(user.cde_slug ?? "");
    const countryName = cde?.country ?? user.cde_slug ?? "Sin país";
    const groupName = user.community ?? "Grupo scout";
    const { data: postcard, error } = await supabase.from("conecta_postcards").insert({
      author_id: user.id,
      author_name: user.name,
      country_code: user.cde_slug ?? "global",
      country_name: countryName,
      group_name: groupName,
      group_logo_path: user.photo_path,
      cover_image_path: uploadedPath,
      message,
      status: "pending",
    }).select("id,author_name,country_name,group_name,message").single();
    if (error) throw error;

    // The row now owns this file. A later email failure must never delete it.
    uploadedPath = null;

    const notification = await notifyPostcardSubmission({ id: postcard.id, authorName: postcard.author_name, countryName: postcard.country_name, groupName: postcard.group_name, message: postcard.message });
    return NextResponse.json({ message: notification.sent ? "Postal enviada. Se envió el aviso por correo para su revisión." : "Postal enviada para aprobación. El aviso por correo no pudo enviarse; la administración puede revisarla desde su panel." }, { status: 201 });
  } catch (error) {
    if (uploadedPath) { try { await removePostcardAsset(createSupabaseAdminClient(), uploadedPath); } catch { /* limpieza de respaldo */ } }
    console.error("No se pudo enviar la postal de Conecta", error);
    return NextResponse.json({ message: error instanceof Error && error.message === "No se pudo subir la portada." ? error.message : "No se pudo enviar la postal. Revisa la configuración de Conecta." }, { status: 500 });
  }
}
