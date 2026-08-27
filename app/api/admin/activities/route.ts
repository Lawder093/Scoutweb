import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getContentAdmin } from "@/lib/auth/admin";
import { cdes, getCDE } from "@/content/cdes";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CONTENT_ASSETS_BUCKET } from "@/lib/content/storage";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
type UploadFile = { type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> };

function textValue(value: FormDataEntryValue | unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 160);
}

function isDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T12:00:00Z`).getTime());
}

function isPublishValue(value: FormDataEntryValue | unknown): boolean {
  return value === "on" || value === "true";
}

function getUploadFile(value: unknown): UploadFile | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as { type?: unknown; size?: unknown; arrayBuffer?: unknown };
  return typeof candidate.type === "string" && typeof candidate.size === "number" && candidate.size > 0 && typeof candidate.arrayBuffer === "function" ? candidate as UploadFile : null;
}

async function uploadImage(supabase: ReturnType<typeof createSupabaseAdminClient>, cdeSlug: string, title: string, file: UploadFile): Promise<string> {
  if (!IMAGE_TYPES.has(file.type)) throw new Error("La imagen debe ser JPG, PNG o WebP.");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("La imagen no puede superar 5 MB.");

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `cde-activities/${cdeSlug}/${randomUUID()}-${slugify(title) || "actividad"}.${extension}`;
  const { error } = await supabase.storage.from(CONTENT_ASSETS_BUCKET).upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) throw new Error("No se pudo subir la imagen.");
  return path;
}

async function removeImage(supabase: ReturnType<typeof createSupabaseAdminClient>, imagePath: string | null): Promise<void> {
  if (imagePath && !imagePath.startsWith("http") && !imagePath.startsWith("/")) {
    await supabase.storage.from(CONTENT_ASSETS_BUCKET).remove([imagePath]);
  }
}

export async function GET() {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para consultar actividades." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("cde_activities").select("*").order("event_date", { ascending: false }).order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json((data ?? []).map((activity) => ({
      ...activity,
      image_url: activity.image_path ? supabase.storage.from(CONTENT_ASSETS_BUCKET).getPublicUrl(activity.image_path).data.publicUrl : null,
    })));
  } catch (error) {
    console.error("No se pudieron consultar las actividades editoriales", error);
    return NextResponse.json({ message: "No se pudieron consultar las actividades." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para publicar actividades." }, { status: 403 });

  let uploadedPath: string | null = null;
  try {
    const form = await request.formData();
    const cdeSlug = textValue(form.get("cdeSlug"), 80);
    const title = textValue(form.get("title"), 180);
    const eventDate = textValue(form.get("eventDate"), 10);
    const summary = textValue(form.get("summary"), 320);
    const body = textValue(form.get("body"), 50000);
    const file = getUploadFile(form.get("image"));
    const publish = isPublishValue(form.get("publish"));

    if (!getCDE(cdeSlug) || !Object.hasOwn(cdes, cdeSlug)) return NextResponse.json({ message: "Selecciona un CDE válido." }, { status: 400 });
    if (!title || !eventDate || !isDateOnly(eventDate) || !summary || !body) return NextResponse.json({ message: "CDE, título, fecha, resumen y contenido son obligatorios." }, { status: 400 });
    if (!file) return NextResponse.json({ message: "Debes seleccionar una imagen JPG, PNG o WebP." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    uploadedPath = await uploadImage(supabase, cdeSlug, title, file);
    const now = new Date().toISOString();
    const { data, error } = await supabase.from("cde_activities").insert({
      cde_slug: cdeSlug,
      slug: slugify(title),
      title,
      event_date: eventDate,
      image_path: uploadedPath,
      summary,
      body,
      is_published: publish,
      published_at: publish ? now : null,
    }).select("id").single();

    if (error) {
      await removeImage(supabase, uploadedPath);
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe una actividad con ese título en el CDE seleccionado." }, { status: 409 });
      throw error;
    }

    return NextResponse.json({ message: publish ? "Actividad publicada correctamente." : "Borrador guardado correctamente.", id: data.id }, { status: 201 });
  } catch (error) {
    if (uploadedPath) {
      try { await removeImage(createSupabaseAdminClient(), uploadedPath); } catch { /* best effort cleanup */ }
    }
    if (error instanceof Error && ["La imagen debe ser JPG, PNG o WebP.", "La imagen no puede superar 5 MB.", "No se pudo subir la imagen."].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("No se pudo guardar la actividad editorial", error);
    return NextResponse.json({ message: "No se pudo guardar la actividad. Revisa la configuración de Supabase." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para editar actividades." }, { status: 403 });

  let uploadedPath: string | null = null;
  try {
    const form = await request.formData();
    const id = textValue(form.get("id"), 80);
    const cdeSlug = textValue(form.get("cdeSlug"), 80);
    const title = textValue(form.get("title"), 180);
    const eventDate = textValue(form.get("eventDate"), 10);
    const summary = textValue(form.get("summary"), 320);
    const body = textValue(form.get("body"), 50000);
    const file = getUploadFile(form.get("image"));
    const publish = isPublishValue(form.get("publish"));
    if (!id || !getCDE(cdeSlug) || !Object.hasOwn(cdes, cdeSlug)) return NextResponse.json({ message: "Selecciona un CDE válido." }, { status: 400 });
    if (!title || !eventDate || !isDateOnly(eventDate) || !summary || !body) return NextResponse.json({ message: "CDE, título, fecha, resumen y contenido son obligatorios." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data: current, error: findError } = await supabase.from("cde_activities").select("image_path").eq("id", id).maybeSingle();
    if (findError) throw findError;
    if (!current) return NextResponse.json({ message: "La actividad no existe." }, { status: 404 });
    if (file) uploadedPath = await uploadImage(supabase, cdeSlug, title, file);

    const now = new Date().toISOString();
    const { error } = await supabase.from("cde_activities").update({
      cde_slug: cdeSlug,
      slug: slugify(title),
      title,
      event_date: eventDate,
      image_path: uploadedPath ?? current.image_path,
      summary,
      body,
      is_published: publish,
      published_at: publish ? now : null,
    }).eq("id", id);
    if (error) {
      if (uploadedPath) await removeImage(supabase, uploadedPath);
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe una actividad con ese título en el CDE seleccionado." }, { status: 409 });
      throw error;
    }
    if (uploadedPath && current.image_path) await removeImage(supabase, current.image_path);
    return NextResponse.json({ message: publish ? "Actividad actualizada y publicada." : "Actividad actualizada como borrador." });
  } catch (error) {
    if (uploadedPath) {
      try { await removeImage(createSupabaseAdminClient(), uploadedPath); } catch { /* best effort cleanup */ }
    }
    console.error("No se pudo actualizar la actividad editorial", error);
    return NextResponse.json({ message: "No se pudo actualizar la actividad." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para eliminar actividades." }, { status: 403 });

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador de la actividad." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: current, error: findError } = await supabase.from("cde_activities").select("image_path").eq("id", id).maybeSingle();
    if (findError) throw findError;
    if (!current) return NextResponse.json({ message: "La actividad no existe." }, { status: 404 });
    const { error } = await supabase.from("cde_activities").delete().eq("id", id);
    if (error) throw error;
    await removeImage(supabase, current.image_path);
    return NextResponse.json({ message: "Actividad eliminada correctamente." });
  } catch (error) {
    console.error("No se pudo eliminar la actividad editorial", error);
    return NextResponse.json({ message: "No se pudo eliminar la actividad." }, { status: 500 });
  }
}
