import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export const CONECTA_ASSETS_BUCKET = "conecta-private";
export const CONECTA_ASSET_URL_TTL = 60 * 60 * 24;

export async function resolveConectaAssetUrl(
  client: SupabaseClient<Database>,
  assetPath: string | null,
): Promise<string | null> {
  if (!assetPath) return null;
  if (assetPath.startsWith("/") || assetPath.startsWith("http://") || assetPath.startsWith("https://")) return assetPath;

  const { data, error } = await client.storage.from(CONECTA_ASSETS_BUCKET).createSignedUrl(assetPath, CONECTA_ASSET_URL_TTL);
  return error ? null : data.signedUrl;
}

export async function removeConectaAsset(
  client: SupabaseClient<Database>,
  assetPath: string | null,
): Promise<void> {
  if (assetPath && !assetPath.startsWith("http") && !assetPath.startsWith("/")) {
    await client.storage.from(CONECTA_ASSETS_BUCKET).remove([assetPath]);
  }
}
