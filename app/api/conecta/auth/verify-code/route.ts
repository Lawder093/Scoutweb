import { NextResponse } from "next/server";
import {
  CONECTA_MAX_CODE_ATTEMPTS,
  isValidPhone,
  normalizePhone,
  createConectaSession,
  verifyConectaCode,
} from "@/lib/auth/conecta";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { phone?: unknown; code?: unknown };
    const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");
    const code = typeof body.code === "string" ? body.code.trim() : "";
    if (!isValidPhone(phone) || !/^\d{6}$/.test(code)) return NextResponse.json({ message: "El teléfono o el código no son válidos." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data: user, error: findError } = await supabase
      .from("conecta_users")
      .select("id,is_active,otp_code_hash,otp_expires_at,otp_attempts")
      .eq("phone", phone)
      .maybeSingle();
    if (findError) throw findError;
    if (!user || !user.is_active || !user.otp_code_hash || !user.otp_expires_at) return NextResponse.json({ message: "El código no es válido o ya expiró." }, { status: 401 });
    if (user.otp_attempts >= CONECTA_MAX_CODE_ATTEMPTS) return NextResponse.json({ message: "Se alcanzó el máximo de intentos. Solicita un código nuevo." }, { status: 429 });
    if (new Date(user.otp_expires_at).getTime() <= Date.now()) return NextResponse.json({ message: "El código ya expiró. Solicita uno nuevo." }, { status: 401 });

    if (!verifyConectaCode(code, user.otp_code_hash)) {
      await supabase.from("conecta_users").update({ otp_attempts: user.otp_attempts + 1 }).eq("id", user.id);
      return NextResponse.json({ message: "El código no coincide." }, { status: 401 });
    }

    const { error: updateError } = await supabase.from("conecta_users").update({ otp_code_hash: null, otp_expires_at: null, otp_requested_at: null, otp_attempts: 0, last_login_at: new Date().toISOString() }).eq("id", user.id);
    if (updateError) throw updateError;
    await createConectaSession(user.id);
    return NextResponse.json({ message: "Sesión iniciada correctamente." });
  } catch (error) {
    console.error("No se pudo verificar el código de Conecta", error);
    return NextResponse.json({ message: "No se pudo iniciar sesión. Revisa la configuración de Supabase." }, { status: 500 });
  }
}
