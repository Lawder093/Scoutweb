import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getContentAdmin } from "@/lib/auth/admin";
import { CONECTA_ASSETS_BUCKET, removeConectaAsset, resolveConectaAssetUrl } from "@/lib/content/conecta-storage";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { cdes, getCDE } from "@/content/cdes";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const COMMUNITY_KINDS = new Set(["Ronda", "Manada", "Tropa", "Iris", "Clan"]);

type UploadFile = { type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> };

function textValue(value: FormDataEntryValue | unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);
}

function getUploadFile(value: unknown): UploadFile | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as { type?: unknown; size?: unknown; arrayBuffer?: unknown };
  return typeof candidate.type === "string" && typeof candidate.size === "number" && candidate.size > 0 && typeof candidate.arrayBuffer === "function"
    ? candidate as UploadFile
    : null;
}

function normalizePhone(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  return digits.startsWith("00") ? digits.slice(2) : digits;
}

function isValidPhone(value: string): boolean {
  return /^\d{8,15}$/.test(value);
}

function isActiveValue(value: FormDataEntryValue | unknown): boolean {
  return value === "on" || value === "true";
}

async function uploadProfileImage(supabase: ReturnType<typeof createSupabaseAdminClient>, name: string, file: UploadFile): Promise<string> {
  if (!IMAGE_TYPES.has(file.type)) throw new Error("La fotografía debe ser JPG, PNG o WebP.");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("La fotografía no puede superar 5 MB.");

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `conecta-profiles/${randomUUID()}-${slugify(name) || "scout"}.${extension}`;
  const { error } = await supabase.storage.from(CONECTA_ASSETS_BUCKET).upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) throw new Error("No se pudo subir la fotografía.");
  return path;
}

async function removeAsset(supabase: ReturnType<typeof createSupabaseAdminClient>, assetPath: string | null): Promise<void> {
  await removeConectaAsset(supabase, assetPath);
}

async function publicUser(user: {
  id: string;
  name: string;
  phone: string | null;
  photo_path: string | null;
  cde_slug: string | null;
  community: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}, supabase: ReturnType<typeof createSupabaseAdminClient>) {
  return { ...user, photo_url: await resolveConectaAssetUrl(supabase, user.photo_path) };
}

export async function GET() {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para consultar usuarios." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("conecta_users")
      .select("id,name,phone,photo_path,cde_slug,community,is_active,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(await Promise.all((data ?? []).map((user) => publicUser(user, supabase))));
  } catch (error) {
    console.error("No se pudieron consultar los usuarios de Conecta", error);
    return NextResponse.json({ message: "No se pudieron consultar los usuarios." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para crear usuarios." }, { status: 403 });

  let uploadedPath: string | null = null;
  try {
    const form = await request.formData();
    const name = textValue(form.get("name"), 120);
    const phone = normalizePhone(textValue(form.get("phone"), 30));
    const cdeSlug = textValue(form.get("cdeSlug"), 80);
    const community = textValue(form.get("community"), 40);
    const isActive = isActiveValue(form.get("isActive"));
    const file = getUploadFile(form.get("image"));

    if (name.length < 2) return NextResponse.json({ message: "El nombre debe tener al menos 2 caracteres." }, { status: 400 });
    if (!isValidPhone(phone)) return NextResponse.json({ message: "Escribe un número válido con lada, de 8 a 15 dígitos." }, { status: 400 });
    if (!getCDE(cdeSlug) || !Object.hasOwn(cdes, cdeSlug)) return NextResponse.json({ message: "Selecciona un CDE válido." }, { status: 400 });
    if (!COMMUNITY_KINDS.has(community)) return NextResponse.json({ message: "Selecciona una comunidad válida." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    if (file) uploadedPath = await uploadProfileImage(supabase, name, file);

    const { data, error } = await supabase
      .from("conecta_users")
      .insert({ name, phone, photo_path: uploadedPath, cde_slug: cdeSlug, community, password_hash: null, is_active: isActive })
      .select("id,name,phone,photo_path,cde_slug,community,is_active,created_at,updated_at")
      .single();

    if (error) {
      if (uploadedPath) await removeAsset(supabase, uploadedPath);
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe un scout pre-registrado con ese teléfono." }, { status: 409 });
      throw error;
    }

    return NextResponse.json({ message: "Scout pre-registrado correctamente.", user: await publicUser(data, supabase) }, { status: 201 });
  } catch (error) {
    if (uploadedPath) {
      try { await removeAsset(createSupabaseAdminClient(), uploadedPath); } catch { /* limpieza de respaldo */ }
    }
    if (error instanceof Error && ["La fotografía debe ser JPG, PNG o WebP.", "La fotografía no puede superar 5 MB.", "No se pudo subir la fotografía."].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("No se pudo crear el usuario de Conecta", error);
    return NextResponse.json({ message: "No se pudo crear el scout. Revisa la configuración de Supabase." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para editar usuarios." }, { status: 403 });

  try {
    const body = await request.json() as Record<string, unknown>;
    const id = textValue(body.id, 80);
    if (!id || typeof body.isActive !== "boolean") return NextResponse.json({ message: "Faltan datos para actualizar el usuario." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("conecta_users").update({ is_active: body.isActive }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: body.isActive ? "Scout activado." : "Scout desactivado." });
  } catch (error) {
    console.error("No se pudo actualizar el usuario de Conecta", error);
    return NextResponse.json({ message: "No se pudo actualizar el usuario." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para eliminar usuarios." }, { status: 403 });

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador del usuario." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: current, error: findError } = await supabase.from("conecta_users").select("photo_path").eq("id", id).maybeSingle();
    if (findError) throw findError;
    if (!current) return NextResponse.json({ message: "El scout no existe." }, { status: 404 });
    const { error } = await supabase.from("conecta_users").delete().eq("id", id);
    if (error) throw error;
    await removeAsset(supabase, current.photo_path);
    return NextResponse.json({ message: "Scout eliminado correctamente." });
  } catch (error) {
    console.error("No se pudo eliminar el usuario de Conecta", error);
    return NextResponse.json({ message: "No se pudo eliminar el usuario." }, { status: 500 });
  }
}
