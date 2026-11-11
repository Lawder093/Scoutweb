import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export const CONECTA_ASSETS_BUCKET = "conecta-private";
export const POSTCARD_ASSETS_BUCKET = "conecta-postcards";
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

export async function resolvePostcardAssetUrl(client: SupabaseClient<Database>, assetPath: string | null, expiresIn = 600): Promise<string | null> {
  if (!assetPath) return null;
  // Cover uploads use relative object keys. Do not bypass moderation with
  // arbitrary external/public URLs. Short-lived links work with a private bucket.
  if (assetPath.startsWith("/") || /^https?:/i.test(assetPath)) return null;
  const ttl = Math.max(1, Math.min(600, Math.floor(expiresIn)));
  const { data, error } = await client.storage.from(POSTCARD_ASSETS_BUCKET).createSignedUrl(assetPath, ttl);
  return error ? null : data.signedUrl;
}

export async function removePostcardAsset(
  client: SupabaseClient<Database>,
  assetPath: string | null,
): Promise<void> {
  if (assetPath && !assetPath.startsWith("http") && !assetPath.startsWith("/")) {
    await client.storage.from(POSTCARD_ASSETS_BUCKET).remove([assetPath]);
  }
}
