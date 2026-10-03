import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { getContentOwner, isContentAdminEmail } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const permissionKeys = ["blog", "conecta", "activities", "instagram"] as const;
type PermissionKey = (typeof permissionKeys)[number];
type PermissionPayload = Partial<Record<PermissionKey, unknown>>;

function textValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function permissionsFromPayload(value: unknown): Record<PermissionKey, boolean> {
  const payload = typeof value === "object" && value !== null ? value as PermissionPayload : {};
  return {
    blog: payload.blog === true,
    conecta: payload.conecta === true,
    activities: payload.activities === true,
    instagram: payload.instagram === true,
  };
}

function hasPermission(permissions: Record<PermissionKey, boolean>): boolean {
  return permissionKeys.some((key) => permissions[key]);
}

function mapPermissions(row: { can_manage_blog: boolean; can_manage_conecta: boolean; can_manage_activities: boolean; can_manage_instagram: boolean }): Record<PermissionKey, boolean> {
  return { blog: row.can_manage_blog, conecta: row.can_manage_conecta, activities: row.can_manage_activities, instagram: row.can_manage_instagram };
}

function rowValues(id: string, email: string, displayName: string, permissions: Record<PermissionKey, boolean>, isActive: boolean) {
  return {
    id,
    email,
    display_name: displayName,
    can_manage_blog: permissions.blog,
    can_manage_conecta: permissions.conecta,
    can_manage_activities: permissions.activities,
    can_manage_instagram: permissions.instagram,
    is_active: isActive,
  };
}

export async function GET() {
  const owner = await getContentOwner();
  if (!owner) return NextResponse.json({ message: "Sólo el propietario puede administrar usuarios." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const [{ data: authUsers, error: authError }, { data: adminRows, error: adminError }] = await Promise.all([
      supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      supabase.from("admin_users").select("id,email,display_name,can_manage_blog,can_manage_conecta,can_manage_activities,can_manage_instagram,is_active,created_at,updated_at"),
    ]);
    if (authError) throw authError;
    if (adminError) throw adminError;
    const rowsById = new Map((adminRows ?? []).map((row) => [row.id, row]));
    const users = (authUsers?.users ?? []).filter((user) => user.email).map((user) => {
      const email = user.email!.toLowerCase();
      const row = rowsById.get(user.id);
      const isOwner = isContentAdminEmail(email);
      return {
        id: user.id,
        email,
        display_name: row?.display_name ?? (typeof user.user_metadata?.display_name === "string" ? user.user_metadata.display_name : ""),
        permissions: isOwner ? { blog: true, conecta: true, activities: true, instagram: true } : row ? mapPermissions(row) : { blog: false, conecta: false, activities: false, instagram: false },
        is_active: isOwner || row?.is_active === true,
        is_owner: isOwner,
        invited_at: user.invited_at,
        last_sign_in_at: user.last_sign_in_at,
      };
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("No se pudieron consultar los usuarios del panel", error);
    return NextResponse.json({ message: "No se pudieron consultar los usuarios. Revisa que la migración de permisos esté aplicada." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const owner = await getContentOwner();
  if (!owner) return NextResponse.json({ message: "Sólo el propietario puede crear usuarios." }, { status: 403 });

  try {
    const body = await request.json() as { email?: unknown; displayName?: unknown; permissions?: unknown };
    const email = textValue(body.email, 254).toLowerCase();
    const displayName = textValue(body.displayName, 120);
    const permissions = permissionsFromPayload(body.permissions);
    if (!email || !email.includes("@")) return NextResponse.json({ message: "Escribe un correo válido." }, { status: 400 });
    if (!hasPermission(permissions)) return NextResponse.json({ message: "Selecciona al menos un permiso." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data: listedUsers, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (listError) throw listError;
    let authUser: User | null = listedUsers.users.find((user) => user.email?.toLowerCase() === email) ?? null;
    let message = "Usuario agregado al panel.";
    if (!authUser) {
      const redirectTo = `${new URL(request.url).origin}/auth/callback?next=/auth/set-password`;
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, { redirectTo, data: { display_name: displayName } });
      if (error) throw error;
      authUser = data.user;
      message = "Invitación enviada y permisos guardados.";
    }
    if (!authUser?.id) return NextResponse.json({ message: "No se pudo identificar al usuario." }, { status: 500 });
    if (isContentAdminEmail(email)) return NextResponse.json({ message: "Ese correo ya es el propietario configurado." }, { status: 400 });

    const { error } = await supabase.from("admin_users").upsert(rowValues(authUser.id, email, displayName, permissions, true), { onConflict: "id" });
    if (error) throw error;
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("No se pudo crear el usuario del panel", error);
    return NextResponse.json({ message: "No se pudo crear el usuario. Verifica el correo y la configuración de Supabase." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const owner = await getContentOwner();
  if (!owner) return NextResponse.json({ message: "Sólo el propietario puede editar usuarios." }, { status: 403 });

  try {
    const body = await request.json() as { id?: unknown; email?: unknown; displayName?: unknown; permissions?: unknown; isActive?: unknown };
    const id = textValue(body.id, 80);
    const email = textValue(body.email, 254).toLowerCase();
    const displayName = textValue(body.displayName, 120);
    const permissions = permissionsFromPayload(body.permissions);
    if (!isUuid(id) || !email || !email.includes("@")) return NextResponse.json({ message: "Faltan datos válidos del usuario." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(id);
    if (authError) throw authError;
    const authEmail = authUser.user.email?.toLowerCase() ?? "";
    if (!authEmail || authEmail !== email) return NextResponse.json({ message: "El correo no coincide con la cuenta de autenticación." }, { status: 400 });
    if (isContentAdminEmail(authEmail)) return NextResponse.json({ message: "El propietario no puede modificarse desde este panel." }, { status: 400 });
    const { error } = await supabase.from("admin_users").upsert(rowValues(id, authEmail, displayName, permissions, body.isActive === true), { onConflict: "id" });
    if (error) throw error;
    return NextResponse.json({ message: body.isActive === true ? "Permisos actualizados y usuario activo." : "Permisos guardados; el usuario está desactivado." });
  } catch (error) {
    console.error("No se pudo actualizar el usuario del panel", error);
    return NextResponse.json({ message: "No se pudo actualizar el usuario." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const owner = await getContentOwner();
  if (!owner) return NextResponse.json({ message: "Sólo el propietario puede revocar usuarios." }, { status: 403 });

  try {
    const id = textValue(new URL(request.url).searchParams.get("id"), 80);
    if (!isUuid(id)) return NextResponse.json({ message: "Falta un usuario válido." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(id);
    if (authError) throw authError;
    if (isContentAdminEmail(authUser.user.email)) return NextResponse.json({ message: "El propietario no puede eliminarse." }, { status: 400 });
    const { error } = await supabase.from("admin_users").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "Acceso al panel revocado. La cuenta de Supabase se conservó." });
  } catch (error) {
    console.error("No se pudo revocar el usuario del panel", error);
    return NextResponse.json({ message: "No se pudo revocar el usuario." }, { status: 500 });
  }
}
