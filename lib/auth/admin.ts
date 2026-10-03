import "server-only";

import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const ADMIN_PERMISSIONS = ["blog", "conecta", "activities", "instagram"] as const;
export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];
export type AdminPermissionState = {
  blog: boolean;
  conecta: boolean;
  activities: boolean;
  instagram: boolean;
  canManageUsers: boolean;
  isOwner: boolean;
};

type AdminRow = {
  id: string;
  email: string;
  can_manage_blog: boolean;
  can_manage_conecta: boolean;
  can_manage_activities: boolean;
  can_manage_instagram: boolean;
  is_active: boolean;
};

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

async function getAdminRow(user: User): Promise<AdminRow | null> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("admin_users").select("id,email,can_manage_blog,can_manage_conecta,can_manage_activities,can_manage_instagram,is_active").eq("id", user.id).maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

async function getAdminAccess(): Promise<AdminPermissionState & { user: User | null }> {
  const user = await getCurrentUser();
  if (!user) return { blog: false, conecta: false, activities: false, instagram: false, canManageUsers: false, isOwner: false, user: null };
  if (isContentAdminEmail(user.email)) return { blog: true, conecta: true, activities: true, instagram: true, canManageUsers: true, isOwner: true, user };

  const row = await getAdminRow(user);
  return {
    blog: Boolean(row?.is_active && row.can_manage_blog),
    conecta: Boolean(row?.is_active && row.can_manage_conecta),
    activities: Boolean(row?.is_active && row.can_manage_activities),
    instagram: Boolean(row?.is_active && row.can_manage_instagram),
    canManageUsers: false,
    isOwner: false,
    user,
  };
}

export async function getAdminPermissions(): Promise<AdminPermissionState> {
  const { user: _user, ...permissions } = await getAdminAccess();
  return permissions;
}

export async function getContentPermission(permission: AdminPermission): Promise<User | null> {
  const access = await getAdminAccess();
  return access[permission] ? access.user : null;
}

export async function getContentOwner(): Promise<User | null> {
  const access = await getAdminAccess();
  return access.isOwner ? access.user : null;
}

export async function getContentAdmin(): Promise<User | null> {
  const user = await getCurrentUser();
  return user && isContentAdminEmail(user.email) ? user : null;
}
