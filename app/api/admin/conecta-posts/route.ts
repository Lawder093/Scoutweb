import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getContentAdmin } from "@/lib/auth/admin";
import { CONECTA_ASSETS_BUCKET, removeConectaAsset } from "@/lib/content/conecta-storage";
import { listConectaPosts } from "@/lib/content/repositories/conecta";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type UploadFile = { type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> };

function textValue(value: FormDataEntryValue | unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 140);
}

function getUploadFile(value: unknown): UploadFile | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as { type?: unknown; size?: unknown; arrayBuffer?: unknown };
  return typeof candidate.type === "string" && typeof candidate.size === "number" && candidate.size > 0 && typeof candidate.arrayBuffer === "function"
    ? candidate as UploadFile
    : null;
}

function safeExternalUrl(value: string): string | null {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

async function removeAsset(supabase: ReturnType<typeof createSupabaseAdminClient>, assetPath: string | null): Promise<void> {
  await removeConectaAsset(supabase, assetPath);
}

async function uploadPostImage(supabase: ReturnType<typeof createSupabaseAdminClient>, title: string, file: UploadFile): Promise<string> {
  if (!IMAGE_TYPES.has(file.type)) throw new Error("La imagen debe ser JPG, PNG o WebP.");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("La imagen no puede superar 5 MB.");
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `conecta-posts/${randomUUID()}-${slugify(title) || "publicacion"}.${extension}`;
  const { error } = await supabase.storage.from(CONECTA_ASSETS_BUCKET).upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) throw new Error("No se pudo subir la imagen.");
  return path;
}

export async function GET() {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para consultar publicaciones." }, { status: 403 });

  try {
    return NextResponse.json(await listConectaPosts({ includeUnpublished: true }));
  } catch (error) {
    console.error("No se pudieron consultar las publicaciones de Conecta", error);
    return NextResponse.json({ message: "No se pudieron consultar las publicaciones." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para publicar en Conecta." }, { status: 403 });

  let uploadedPath: string | null = null;
  try {
    const form = await request.formData();
    const title = textValue(form.get("title"), 180);
    const caption = textValue(form.get("caption"), 2000);
    const location = textValue(form.get("location"), 160);
    const externalUrlValue = textValue(form.get("externalUrl"), 600);
    const image = getUploadFile(form.get("image"));

    if (!title || !caption) return NextResponse.json({ message: "El título y el texto de la publicación son obligatorios." }, { status: 400 });
    if (!image) return NextResponse.json({ message: "Debes seleccionar una imagen JPG, PNG o WebP." }, { status: 400 });
    if (externalUrlValue && !safeExternalUrl(externalUrlValue)) return NextResponse.json({ message: "El enlace debe comenzar con http:// o https://." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    uploadedPath = await uploadPostImage(supabase, title, image);
    const { data, error } = await supabase.from("conecta_posts").insert({
      title,
      caption,
      image_path: uploadedPath,
      location: location || null,
      external_url: safeExternalUrl(externalUrlValue),
      is_published: true,
      published_at: new Date().toISOString(),
    }).select("id").single();

    if (error) throw error;
    return NextResponse.json({ message: "Publicación creada correctamente.", id: data.id }, { status: 201 });
  } catch (error) {
    if (uploadedPath) {
      try { await removeAsset(createSupabaseAdminClient(), uploadedPath); } catch { /* limpieza de respaldo */ }
    }
    if (error instanceof Error && ["La imagen debe ser JPG, PNG o WebP.", "La imagen no puede superar 5 MB.", "No se pudo subir la imagen."].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("No se pudo crear la publicación de Conecta", error);
    return NextResponse.json({ message: "No se pudo crear la publicación. Revisa la configuración de Supabase." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para eliminar publicaciones." }, { status: 403 });

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador de la publicación." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: current, error: findError } = await supabase.from("conecta_posts").select("image_path").eq("id", id).maybeSingle();
    if (findError) throw findError;
    if (!current) return NextResponse.json({ message: "La publicación no existe." }, { status: 404 });
    const { error } = await supabase.from("conecta_posts").delete().eq("id", id);
    if (error) throw error;
    await removeAsset(supabase, current.image_path);
    return NextResponse.json({ message: "Publicación eliminada correctamente." });
  } catch (error) {
    console.error("No se pudo eliminar la publicación de Conecta", error);
    return NextResponse.json({ message: "No se pudo eliminar la publicación." }, { status: 500 });
  }
}
