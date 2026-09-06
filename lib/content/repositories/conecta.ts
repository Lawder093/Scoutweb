import "server-only";

import { resolveConectaAssetUrl } from "@/lib/content/conecta-storage";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Tables } from "@/lib/supabase/database.types";

export type ConectaProfileView = Pick<Tables<"conecta_users">, "id" | "name" | "photo_path" | "cde_slug" | "community"> & { photo_url: string | null };

export type ConectaCommentView = Pick<Tables<"conecta_comments">, "id" | "post_id" | "user_id" | "body" | "created_at"> & {
  user: ConectaProfileView | null;
};

export type ConectaPostView = Pick<Tables<"conecta_posts">, "id" | "title" | "caption" | "image_path" | "location" | "external_url" | "is_published" | "published_at" | "created_at"> & {
  image_url: string | null;
  comments: ConectaCommentView[];
};

const POST_COLUMNS = "id,title,caption,image_path,location,external_url,is_published,published_at,created_at";
const COMMENT_COLUMNS = "id,post_id,user_id,body,created_at";
const PROFILE_COLUMNS = "id,name,photo_path,cde_slug,community";

export async function listConectaPosts({ includeUnpublished = false }: { includeUnpublished?: boolean } = {}): Promise<ConectaPostView[]> {
  const supabase = createSupabaseAdminClient();
  let query = supabase.from("conecta_posts").select(POST_COLUMNS).order("published_at", { ascending: false });
  if (!includeUnpublished) query = query.eq("is_published", true).lte("published_at", new Date().toISOString());
  const { data: posts, error: postsError } = await query;
  if (postsError) throw new Error("No se pudieron consultar las publicaciones de Conecta: " + postsError.message);
  if (!posts?.length) return [];

  const postIds = posts.map((post) => post.id);
  const { data: comments, error: commentsError } = await supabase.from("conecta_comments").select(COMMENT_COLUMNS).in("post_id", postIds).order("created_at", { ascending: true });
  if (commentsError) throw new Error("No se pudieron consultar los comentarios de Conecta: " + commentsError.message);

  const userIds = Array.from(new Set((comments ?? []).map((comment) => comment.user_id)));
  const profiles = userIds.length > 0 ? (await supabase.from("conecta_users").select(PROFILE_COLUMNS).in("id", userIds)).data ?? [] : [];
  const profileViews = await Promise.all(profiles.map(async (profile) => ({ ...profile, photo_url: await resolveConectaAssetUrl(supabase, profile.photo_path) })));
  const profileMap = new Map(profileViews.map((profile) => [profile.id, profile]));
  const commentMap = new Map<string, ConectaCommentView[]>();

  for (const comment of comments ?? []) {
    const view: ConectaCommentView = { ...comment, user: profileMap.get(comment.user_id) ?? null };
    const current = commentMap.get(comment.post_id) ?? [];
    current.push(view);
    commentMap.set(comment.post_id, current);
  }

  return Promise.all(posts.map(async (post) => ({
    ...post,
    image_url: await resolveConectaAssetUrl(supabase, post.image_path),
    comments: commentMap.get(post.id) ?? [],
  })));
}
