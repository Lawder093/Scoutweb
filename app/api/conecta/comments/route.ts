import { NextResponse } from "next/server";
import { getConectaUser } from "@/lib/auth/conecta";
import { getContentAdmin } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function textValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const user = await getConectaUser();
  if (!user) return NextResponse.json({ message: "Tu sesión de Conecta no está activa." }, { status: 401 });

  try {
    const body = await request.json() as { postId?: unknown; body?: unknown };
    const postId = textValue(body.postId, 80);
    const commentBody = textValue(body.body, 1200);
    if (!isUuid(postId) || !commentBody) return NextResponse.json({ message: "Escribe un comentario válido." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data: post, error: postError } = await supabase.from("conecta_posts").select("id,is_published,published_at").eq("id", postId).maybeSingle();
    if (postError) throw postError;
    if (!post || !post.is_published || new Date(post.published_at).getTime() > Date.now()) return NextResponse.json({ message: "La publicación ya no está disponible." }, { status: 404 });

    const { data: comment, error } = await supabase.from("conecta_comments").insert({ post_id: postId, user_id: user.id, body: commentBody }).select("id,post_id,user_id,body,created_at").single();
    if (error) throw error;

    return NextResponse.json({ comment: { ...comment, user: { id: user.id, name: user.name, photo_path: user.photo_path, cde_slug: user.cde_slug, community: user.community, photo_url: user.photo_url } } }, { status: 201 });
  } catch (error) {
    console.error("No se pudo crear el comentario de Conecta", error);
    return NextResponse.json({ message: "No se pudo publicar el comentario." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getContentAdmin();
  if (!admin) return NextResponse.json({ message: "No tienes permisos para moderar comentarios." }, { status: 403 });

  try {
    const id = textValue(new URL(request.url).searchParams.get("id"), 80);
    if (!isUuid(id)) return NextResponse.json({ message: "Falta un comentario válido." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("conecta_comments").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "Comentario eliminado." });
  } catch (error) {
    console.error("No se pudo eliminar el comentario de Conecta", error);
    return NextResponse.json({ message: "No se pudo eliminar el comentario." }, { status: 500 });
  }
}
