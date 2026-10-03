import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/supabase/database.types";

export type CDEInstagramLinkRow = Tables<"cde_instagram_links">;

export async function listPublishedCDEInstagramLinks(client: SupabaseClient<Database>): Promise<CDEInstagramLinkRow[]> {
  const { data, error } = await client
    .from("cde_instagram_links")
    .select("*")
    .eq("is_published", true)
    .order("cde_slug", { ascending: true });

  if (error) throw new Error("No se pudieron consultar los enlaces de Instagram: " + error.message);
  return data ?? [];
}
