import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAdminConfig } from "./config";
import type { Database } from "./database.types";

export function createSupabaseAdminClient(): SupabaseClient<Database> {
  const { url, secretKey } = getSupabaseAdminConfig();

  return createClient<Database>(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
