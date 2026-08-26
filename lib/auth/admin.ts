import "server-only";

import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function configuredAdminEmails(): string[] {
  return (process.env.CONTENT_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isContentAdminEmail(email: string | null | undefined): boolean {
  return Boolean(email && configuredAdminEmails().includes(email.toLowerCase()));
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}

export async function getContentAdmin(): Promise<User | null> {
  const user = await getCurrentUser();
  return user && isContentAdminEmail(user.email) ? user : null;
}
