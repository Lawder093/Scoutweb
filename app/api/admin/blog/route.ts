import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getContentAdmin } from "@/lib/auth/admin";
import type { TablesUpdate } from "@/lib/supabase/database.types";

export const dynamic = "force-dynamic";

function textValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

export async function GET() {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para consultar entradas." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).limit(100);
    if (error) throw error;
    return NextResponse.json((data ?? []).map((post) => ({ ...post, body: htmlToPlainText(post.body), coverImageUrl: post.cover_image_path })));
  } catch (error) {
    console.error("No se pudieron consultar las entradas editoriales", error);
    return NextResponse.json({ message: "No se pudieron consultar las entradas." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para publicar contenido." }, { status: 403 });

  try {
    const body = await request.json() as Record<string, unknown>;
    const title = textValue(body.title, 180);
    const excerpt = textValue(body.excerpt, 320);
    const content = textValue(body.body, 50000);
    const category = textValue(body.category, 80);
    const slug = slugify(textValue(body.slug, 180) || title);
    const coverImagePath = safeUrl(body.coverImageUrl);
    const sourceUrl = safeUrl(body.sourceUrl);
    const tags = listValue(body.tags);
    const publish = body.publish === true;

    if (!title || !excerpt || !content || !category || !slug) {
      return NextResponse.json({ message: "Título, resumen, contenido y categoría son obligatorios." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("blog_posts").insert({
      slug,
      title,
      excerpt,
      body: plainTextToHtml(content),
      category,
      cover_image_path: coverImagePath,
      source_url: sourceUrl,
      author_name: textValue(body.authorName, 120) || user.email || "Equipo editorial",
      categories: [category],
      tags,
      is_published: publish,
      published_at: publish ? now : null,
    }).select("slug").single();

    if (error) {
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe una entrada con ese slug." }, { status: 409 });
      console.error("No se pudo guardar la entrada editorial", error);
      return NextResponse.json({ message: "No se pudo guardar la entrada. Revisa la configuración de Supabase." }, { status: 500 });
    }

    return NextResponse.json({ message: publish ? "Entrada publicada correctamente." : "Borrador guardado correctamente.", slug: data.slug }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo procesar la entrada.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para editar entradas." }, { status: 403 });

  try {
    const body = await request.json() as Record<string, unknown>;
    const id = textValue(body.id, 80);
    if (!id) return NextResponse.json({ message: "Falta el identificador de la entrada." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const update: TablesUpdate<"blog_posts"> = {};
    const hasContentFields = ["title", "slug", "excerpt", "body", "category"].some((key) => Object.hasOwn(body, key));
    if (hasContentFields) {
      const title = textValue(body.title, 180);
      const excerpt = textValue(body.excerpt, 320);
      const content = textValue(body.body, 50000);
      const category = textValue(body.category, 80);
      const slug = slugify(textValue(body.slug, 180) || title);
      if (!title || !excerpt || !content || !category || !slug) return NextResponse.json({ message: "Título, resumen, contenido y categoría son obligatorios." }, { status: 400 });
      update.title = title;
      update.slug = slug;
      update.excerpt = excerpt;
      update.body = plainTextToHtml(content);
      update.category = category;
      update.categories = [category];
    }
    if (Object.hasOwn(body, "tags")) update.tags = listValue(body.tags);
    if (Object.hasOwn(body, "authorName")) update.author_name = textValue(body.authorName, 120) || user.email || "Equipo editorial";
    if (Object.hasOwn(body, "coverImageUrl")) update.cover_image_path = safeUrl(body.coverImageUrl);
    if (Object.hasOwn(body, "sourceUrl")) update.source_url = safeUrl(body.sourceUrl);
    if (typeof body.publish === "boolean") {
      update.is_published = body.publish;
      update.published_at = body.publish ? new Date().toISOString() : null;
    }
    if (Object.keys(update).length === 0) return NextResponse.json({ message: "No hay cambios para guardar." }, { status: 400 });

    const { error } = await supabase.from("blog_posts").update(update).eq("id", id);
    if (error) {
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe una entrada con ese slug." }, { status: 409 });
      throw error;
    }
    return NextResponse.json({ message: "Entrada actualizada correctamente." });
  } catch (error) {
    console.error("No se pudo actualizar la entrada editorial", error);
    return NextResponse.json({ message: "No se pudo actualizar la entrada." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para eliminar entradas." }, { status: 403 });

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador de la entrada." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "Entrada eliminada correctamente." });
  } catch (error) {
    console.error("No se pudo eliminar la entrada editorial", error);
    return NextResponse.json({ message: "No se pudo eliminar la entrada." }, { status: 500 });
  }
}
