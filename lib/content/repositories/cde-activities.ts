import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/supabase/database.types";

export type CDEActivityRow = Tables<"cde_activities">;

const PUBLIC_COLUMNS = "id,cde_slug,slug,title,event_date,image_path,summary,body,is_published,published_at,created_at,updated_at";

export async function listPublishedCDEActivities(
  client: SupabaseClient<Database>,
  cdeSlug: string,
  limit: number,
): Promise<CDEActivityRow[]> {
  const { data, error } = await client
    .from("cde_activities")
    .select(PUBLIC_COLUMNS)
    .eq("cde_slug", cdeSlug)
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("event_date", { ascending: false })
    .limit(limit);

  if (error) throw new Error("No se pudieron consultar las actividades: " + error.message);
  return data ?? [];
}
