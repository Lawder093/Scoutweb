import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getContentPermission } from "@/lib/auth/admin";
import { CONTENT_ASSETS_BUCKET, resolvePublicAssetUrl } from "@/lib/content/storage";
import type { TablesUpdate } from "@/lib/supabase/database.types";

export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
type UploadFile = { type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> };
type BlogPayload = FormData | Record<string, unknown>;

function textValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isFormPayload(value: BlogPayload): value is FormData {
  return value instanceof FormData;
}

function payloadHas(payload: BlogPayload, key: string): boolean {
  return isFormPayload(payload) ? payload.has(key) : Object.hasOwn(payload, key);
}

function payloadValue(payload: BlogPayload, key: string): unknown {
  return isFormPayload(payload) ? payload.get(key) : payload[key];
}

function publishValue(payload: BlogPayload): boolean | undefined {
  if (isFormPayload(payload)) {
    if (!payload.has("publish")) return undefined;
    return payload.getAll("publish").some((value) => value === "on" || value === "true");
  }
  return typeof payload.publish === "boolean" ? payload.publish : undefined;
}

function getUploadFile(value: unknown): UploadFile | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as { type?: unknown; size?: unknown; arrayBuffer?: unknown };
  return typeof candidate.type === "string" && typeof candidate.size === "number" && candidate.size > 0 && typeof candidate.arrayBuffer === "function"
    ? candidate as UploadFile
    : null;
}

function slugify(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 180);
}

function listValue(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return Array.from(new Set(value.split(",").map((item) => item.trim().slice(0, 60)).filter(Boolean))).slice(0, 12);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

function plainTextToHtml(value: string): string {
  return value.split(/\n\s*\n/).map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`).join("");
}

function htmlToPlainText(value: string): string {
  return value.replace(/<br\s*\/?>(\s*)/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n\n").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").trim();
}

function safeUrl(value: unknown): string | null {
  const url = textValue(value, 600);
  if (!url) return null;
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function imageSlug(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 140) || "entrada";
}

async function uploadCoverImage(supabase: ReturnType<typeof createSupabaseAdminClient>, title: string, file: UploadFile): Promise<string> {
  if (!IMAGE_TYPES.has(file.type)) throw new Error("La imagen debe ser JPG, PNG o WebP.");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("La imagen no puede superar 5 MB.");
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `blog-covers/${randomUUID()}-${imageSlug(title)}.${extension}`;
  const { error } = await supabase.storage.from(CONTENT_ASSETS_BUCKET).upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) throw new Error("No se pudo subir la imagen.");
  return path;
}

async function removeCoverImage(supabase: ReturnType<typeof createSupabaseAdminClient>, imagePath: string | null): Promise<void> {
  if (imagePath && !imagePath.startsWith("http") && !imagePath.startsWith("/")) {
    await supabase.storage.from(CONTENT_ASSETS_BUCKET).remove([imagePath]);
  }
}

export async function GET() {
  const user = await getContentPermission("blog");
  if (!user) return NextResponse.json({ message: "No tienes permisos para consultar entradas." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).limit(100);
    if (error) throw error;
    return NextResponse.json((data ?? []).map((post) => ({ ...post, body: htmlToPlainText(post.body), coverImageUrl: resolvePublicAssetUrl(supabase, post.cover_image_path) })));
  } catch (error) {
    console.error("No se pudieron consultar las entradas editoriales", error);
    return NextResponse.json({ message: "No se pudieron consultar las entradas." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getContentPermission("blog");
  if (!user) return NextResponse.json({ message: "No tienes permisos para publicar contenido." }, { status: 403 });

  let uploadedPath: string | null = null;
  try {
    const body = await request.formData();
    const title = textValue(body.get("title"), 180);
    const excerpt = textValue(body.get("excerpt"), 320);
    const content = textValue(body.get("body"), 50000);
    const category = textValue(body.get("category"), 80);
    const slug = slugify(textValue(body.get("slug"), 180) || title);
    const sourceUrl = safeUrl(body.get("sourceUrl"));
    const tags = listValue(body.get("tags"));
    const publish = body.getAll("publish").some((value) => value === "on" || value === "true");
    const coverImage = getUploadFile(body.get("coverImage"));

    if (!title || !excerpt || !content || !category || !slug) {
      return NextResponse.json({ message: "Título, resumen, contenido y categoría son obligatorios." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const supabase = createSupabaseAdminClient();
    if (coverImage) uploadedPath = await uploadCoverImage(supabase, title, coverImage);
    const { data, error } = await supabase.from("blog_posts").insert({
      slug,
      title,
      excerpt,
      body: plainTextToHtml(content),
      category,
      cover_image_path: uploadedPath,
      source_url: sourceUrl,
      author_name: textValue(body.get("authorName"), 120) || user.email || "Equipo editorial",
      categories: [category],
      tags,
      is_published: publish,
      published_at: publish ? now : null,
    }).select("slug").single();

    if (error) {
      if (uploadedPath) await removeCoverImage(supabase, uploadedPath);
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe una entrada con ese slug." }, { status: 409 });
      console.error("No se pudo guardar la entrada editorial", error);
      return NextResponse.json({ message: "No se pudo guardar la entrada. Revisa la configuración de Supabase." }, { status: 500 });
    }

    return NextResponse.json({ message: publish ? "Entrada publicada correctamente." : "Borrador guardado correctamente.", slug: data.slug }, { status: 201 });
  } catch (error) {
    if (uploadedPath) {
      try { await removeCoverImage(createSupabaseAdminClient(), uploadedPath); } catch { /* best effort cleanup */ }
    }
    if (error instanceof Error && ["La imagen debe ser JPG, PNG o WebP.", "La imagen no puede superar 5 MB.", "No se pudo subir la imagen."].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "No se pudo procesar la entrada.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getContentPermission("blog");
  if (!user) return NextResponse.json({ message: "No tienes permisos para editar entradas." }, { status: 403 });

  let uploadedPath: string | null = null;
  try {
    const body: BlogPayload = request.headers.get("content-type")?.includes("multipart/form-data") ? await request.formData() : await request.json() as Record<string, unknown>;
    const id = textValue(payloadValue(body, "id"), 80);
    if (!id) return NextResponse.json({ message: "Falta el identificador de la entrada." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const update: TablesUpdate<"blog_posts"> = {};
    const hasContentFields = ["title", "slug", "excerpt", "body", "category"].some((key) => payloadHas(body, key));
    if (hasContentFields) {
      const title = textValue(payloadValue(body, "title"), 180);
      const excerpt = textValue(payloadValue(body, "excerpt"), 320);
      const content = textValue(payloadValue(body, "body"), 50000);
      const category = textValue(payloadValue(body, "category"), 80);
      const slug = slugify(textValue(payloadValue(body, "slug"), 180) || title);
      if (!title || !excerpt || !content || !category || !slug) return NextResponse.json({ message: "Título, resumen, contenido y categoría son obligatorios." }, { status: 400 });
      update.title = title;
      update.slug = slug;
      update.excerpt = excerpt;
      update.body = plainTextToHtml(content);
      update.category = category;
      update.categories = [category];
    }
    if (payloadHas(body, "tags")) update.tags = listValue(payloadValue(body, "tags"));
    if (payloadHas(body, "authorName")) update.author_name = textValue(payloadValue(body, "authorName"), 120) || user.email || "Equipo editorial";
    if (payloadHas(body, "sourceUrl")) update.source_url = safeUrl(payloadValue(body, "sourceUrl"));
    const coverImage = getUploadFile(payloadValue(body, "coverImage"));
    const current = coverImage || payloadHas(body, "coverImage") ? await supabase.from("blog_posts").select("cover_image_path").eq("id", id).maybeSingle() : null;
    if (current && current.error) throw current.error;
    if (coverImage) {
      uploadedPath = await uploadCoverImage(supabase, textValue(payloadValue(body, "title"), 180) || "entrada", coverImage);
      update.cover_image_path = uploadedPath;
    }
    const publish = publishValue(body);
    if (typeof publish === "boolean") {
      update.is_published = publish;
      update.published_at = publish ? new Date().toISOString() : null;
    }
    if (Object.keys(update).length === 0) return NextResponse.json({ message: "No hay cambios para guardar." }, { status: 400 });

    const { error } = await supabase.from("blog_posts").update(update).eq("id", id);
    if (error) {
      if (uploadedPath) await removeCoverImage(supabase, uploadedPath);
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe una entrada con ese slug." }, { status: 409 });
      throw error;
    }
    if (uploadedPath && current?.data?.cover_image_path) await removeCoverImage(supabase, current.data.cover_image_path);
    return NextResponse.json({ message: "Entrada actualizada correctamente." });
  } catch (error) {
    if (uploadedPath) {
      try { await removeCoverImage(createSupabaseAdminClient(), uploadedPath); } catch { /* best effort cleanup */ }
    }
    if (error instanceof Error && ["La imagen debe ser JPG, PNG o WebP.", "La imagen no puede superar 5 MB.", "No se pudo subir la imagen."].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error("No se pudo actualizar la entrada editorial", error);
    return NextResponse.json({ message: "No se pudo actualizar la entrada." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getContentPermission("blog");
  if (!user) return NextResponse.json({ message: "No tienes permisos para eliminar entradas." }, { status: 403 });

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador de la entrada." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: current, error: findError } = await supabase.from("blog_posts").select("cover_image_path").eq("id", id).maybeSingle();
    if (findError) throw findError;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    await removeCoverImage(supabase, current?.cover_image_path ?? null);
    return NextResponse.json({ message: "Entrada eliminada correctamente." });
  } catch (error) {
    console.error("No se pudo eliminar la entrada editorial", error);
    return NextResponse.json({ message: "No se pudo eliminar la entrada." }, { status: 500 });
  }
}
