import { NextResponse } from "next/server";
import { getContentAdmin } from "@/lib/auth/admin";
import { hashPassword } from "@/lib/auth/password";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function textValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function GET() {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para consultar usuarios." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("conecta_users").select("id,name,is_active,created_at,updated_at").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("No se pudieron consultar los usuarios de Conecta", error);
    return NextResponse.json({ message: "No se pudieron consultar los usuarios." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para crear usuarios." }, { status: 403 });

  try {
    const body = await request.json() as Record<string, unknown>;
    const name = textValue(body.name, 120);
    const password = typeof body.password === "string" ? body.password : "";
    const isActive = body.isActive !== false;
    if (name.length < 2) return NextResponse.json({ message: "El nombre debe tener al menos 2 caracteres." }, { status: 400 });
    if (password.length < 4 || password.length > 120) return NextResponse.json({ message: "La contraseña debe tener entre 4 y 120 caracteres." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("conecta_users").insert({ name, password_hash: await hashPassword(password), is_active: isActive }).select("id,name,is_active,created_at,updated_at").single();
    if (error) {
      if (error.code === "23505") return NextResponse.json({ message: "Ya existe un usuario de Conecta con ese nombre." }, { status: 409 });
      throw error;
    }
    return NextResponse.json({ message: "Usuario de Conecta creado correctamente.", user: data }, { status: 201 });
  } catch (error) {
    console.error("No se pudo crear el usuario de Conecta", error);
    return NextResponse.json({ message: "No se pudo crear el usuario. Revisa la configuración de Supabase." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para editar usuarios." }, { status: 403 });

  try {
    const body = await request.json() as Record<string, unknown>;
    const id = textValue(body.id, 80);
    if (!id || typeof body.isActive !== "boolean") return NextResponse.json({ message: "Faltan datos para actualizar el usuario." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("conecta_users").update({ is_active: body.isActive }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: body.isActive ? "Usuario activado." : "Usuario desactivado." });
  } catch (error) {
    console.error("No se pudo actualizar el usuario de Conecta", error);
    return NextResponse.json({ message: "No se pudo actualizar el usuario." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getContentAdmin();
  if (!user) return NextResponse.json({ message: "No tienes permisos para eliminar usuarios." }, { status: 403 });

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador del usuario." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("conecta_users").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    console.error("No se pudo eliminar el usuario de Conecta", error);
    return NextResponse.json({ message: "No se pudo eliminar el usuario." }, { status: 500 });
  }
}
