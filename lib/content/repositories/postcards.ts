import "server-only";

import { resolveConectaAssetUrl, resolvePostcardPublicUrl } from "@/lib/content/conecta-storage";
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

async function toView(row: PostcardRow, supabase: ReturnType<typeof createSupabaseAdminClient>): Promise<PostcardView> {
  return {
    ...row,
    group_logo_url: await resolveConectaAssetUrl(supabase, row.group_logo_path),
    cover_image_url: resolvePostcardPublicUrl(supabase, row.cover_image_path),
  };
}

export async function listActivePostcards(): Promise<PostcardView[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("conecta_postcards")
    .select(POSTCARD_COLUMNS)
    .eq("status", "approved")
    .gt("expires_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) {
    console.warn("Las postales todavía no están disponibles; aplica la migración de Conecta antes de activarlas.", error.message);
    return [];
  }
  return Promise.all(((data ?? []) as PostcardRow[]).map((row) => toView(row, supabase)));
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
