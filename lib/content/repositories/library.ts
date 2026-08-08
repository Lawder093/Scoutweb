import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/supabase/database.types";

export type LibraryResourceRow = Tables<"library_resources">;

export async function listPublicLibraryResources(
  client: SupabaseClient<Database>,
  limit: number,
): Promise<LibraryResourceRow[]> {
  const { data, error } = await client
    .from("library_resources")
    .select("*")
    .eq("is_public", true)
    .lte("published_at", new Date().toISOString())
    .order("display_order", { ascending: true })
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`No se pudieron consultar los recursos: ${error.message}`);
  }

  return data ?? [];
}

export async function findPublicLibraryResource(
  client: SupabaseClient<Database>,
  slug: string,
): Promise<LibraryResourceRow | null> {
  const { data, error } = await client
    .from("library_resources")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo consultar el recurso: ${error.message}`);
  }

  return data;
}
