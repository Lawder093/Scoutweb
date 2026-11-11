import "server-only";

import { resolveConectaAssetUrl, resolvePostcardAssetUrl } from "@/lib/content/conecta-storage";
import type { PostcardView } from "@/lib/content/postcards-types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const POSTCARD_COLUMNS = "id,author_id,author_name,country_code,country_name,group_name,group_logo_path,cover_image_path,message,status,submitted_at,approved_at,published_at,expires_at,rejection_reason";

type PostcardRow = {
  id: string;
  author_id: string;
  author_name: string;
  country_code: string;
  country_name: string;
  group_name: string;
  group_logo_path: string | null;
  cover_image_path: string;
  message: string;
  status: string;
  submitted_at: string;
  approved_at: string | null;
  published_at: string | null;
  expires_at: string | null;
  rejection_reason: string | null;
};

async function toView(row: PostcardRow, supabase: ReturnType<typeof createSupabaseAdminClient>, publicView = false): Promise<PostcardView> {
  return {
    ...row,
    group_logo_url: await resolveConectaAssetUrl(supabase, row.group_logo_path),
    cover_image_url: await resolvePostcardAssetUrl(supabase, row.cover_image_path, publicView && row.expires_at ? (new Date(row.expires_at).getTime() - Date.now()) / 1000 : 600),
  };
}

export async function listActivePostcards(): Promise<PostcardView[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("conecta_postcards")
      .select(POSTCARD_COLUMNS)
      .eq("status", "approved")
      .gt("expires_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    if (error) {
      console.warn("Las postales todavía no están disponibles; se mostrará el mensaje de bienvenida.");
      return [];
    }
    return await Promise.all(((data ?? []) as PostcardRow[]).map((row) => toView(row, supabase, true)));
  } catch {
    // Conecta is optional: a missing setting or storage failure must not take down the homepage.
    console.warn("No se pudieron cargar las postales; se mostrará el mensaje de bienvenida.");
    return [];
  }
}

export async function listPostcardsForReview(): Promise<PostcardView[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("conecta_postcards")
    .select(POSTCARD_COLUMNS)
    .order("submitted_at", { ascending: false });
  if (error) throw new Error("No se pudieron consultar las postales: " + error.message);
  return Promise.all(((data ?? []) as PostcardRow[]).map((row) => toView(row, supabase)));
}
