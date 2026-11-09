import { NextResponse } from "next/server";
import { createConectaSession, isValidPhone, normalizePhone } from "@/lib/auth/conecta";
import { verifyPassword } from "@/lib/auth/password";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { phone?: unknown; password?: unknown };
    const phone = normalizePhone(typeof payload.phone === "string" ? payload.phone : "");
    const password = typeof payload.password === "string" ? payload.password : "";
    if (!isValidPhone(phone) || password.length < 8) return NextResponse.json({ message: "Escribe tu teléfono y una contraseña válida." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data: user, error } = await supabase.from("conecta_users").select("id,password_hash,is_active").eq("phone", phone).maybeSingle();
    if (error) throw error;
    const valid = Boolean(user?.is_active && await verifyPassword(password, user.password_hash));
    if (!valid || !user) return NextResponse.json({ message: "Teléfono o contraseña incorrectos." }, { status: 401 });

    await supabase.from("conecta_users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id);
    await createConectaSession(user.id);
    return NextResponse.json({ message: "Sesión iniciada." });
  } catch (error) {
    console.error("No se pudo iniciar sesión en Conecta", error);
    return NextResponse.json({ message: "No se pudo iniciar sesión. Inténtalo de nuevo." }, { status: 500 });
  }
}
