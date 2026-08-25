import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/supabase/database.types";

export type BlogPostRow = Tables<"blog_posts">;
export type BlogPostSummaryRow = Pick<BlogPostRow, "id" | "slug" | "title" | "excerpt" | "category" | "cover_image_path" | "source_url" | "author_name" | "categories" | "tags" | "published_at" | "created_at">;

const SUMMARY_COLUMNS = "id,slug,title,excerpt,category,cover_image_path,source_url,author_name,categories,tags,published_at,created_at";

export async function listPublishedBlogPostSummaries(client: SupabaseClient<Database>, limit: number): Promise<BlogPostSummaryRow[]> {
  const { data, error } = await client.from("blog_posts").select(SUMMARY_COLUMNS).eq("is_published", true).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }).limit(limit);
  if (error) throw new Error("No se pudieron consultar los resúmenes: " + error.message);
  return data ?? [];
}

export async function findPublishedBlogPost(client: SupabaseClient<Database>, slug: string): Promise<BlogPostRow | null> {
  const { data, error } = await client.from("blog_posts").select("*").eq("slug", slug).eq("is_published", true).lte("published_at", new Date().toISOString()).maybeSingle();
  if (error) throw new Error("No se pudo consultar el artículo: " + error.message);
  return data;
}
