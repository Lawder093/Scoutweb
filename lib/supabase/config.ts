export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

export type SupabaseAdminConfig = {
  url: string;
  secretKey: string;
};

export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Faltan SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en el entorno.");
  }

  return { url, publishableKey };
}

export function getSupabaseAdminConfig(): SupabaseAdminConfig {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error("Faltan SUPABASE_URL y SUPABASE_SECRET_KEY en el entorno del servidor.");
  }

  return { url, secretKey };
}
