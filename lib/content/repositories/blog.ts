import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/supabase/database.types";

export type BlogPostRow = Tables<"blog_posts">;

export async function listPublishedBlogPosts(
  client: SupabaseClient<Database>,
  limit: number,
): Promise<BlogPostRow[]> {
  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`No se pudieron consultar los artículos: ${error.message}`);
  }

  return data ?? [];
}

export async function findPublishedBlogPost(
  client: SupabaseClient<Database>,
  slug: string,
): Promise<BlogPostRow | null> {
  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo consultar el artículo: ${error.message}`);
  }

  return data;
}
