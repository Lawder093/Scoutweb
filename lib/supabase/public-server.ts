import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";
import type { Database } from "./database.types";

const CONTENT_REQUEST_TIMEOUT_MS = 3500;

const fetchWithTimeout: typeof fetch = (input, init) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONTENT_REQUEST_TIMEOUT_MS);
  return fetch(input, { ...(init ?? {}), signal: controller.signal }).finally(() => clearTimeout(timeout));
};

export function createSupabasePublicServerClient(): SupabaseClient<Database> {
  const { url, publishableKey } = getSupabaseConfig();

  return createClient<Database>(url, publishableKey, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
    global: { fetch: fetchWithTimeout },
  });
}
