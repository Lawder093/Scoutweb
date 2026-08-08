import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export const CONTENT_ASSETS_BUCKET = "content-assets";

export function resolvePublicAssetUrl(
  client: SupabaseClient<Database>,
  assetPath: string | null,
): string | null {
  if (!assetPath) {
    return null;
  }

  if (assetPath.startsWith("/") || assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    return assetPath;
  }

  return client.storage.from(CONTENT_ASSETS_BUCKET).getPublicUrl(assetPath).data.publicUrl;
}
