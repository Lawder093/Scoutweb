import { NextResponse } from "next/server";
import {
  CONECTA_CODE_COOLDOWN_MS,
  CONECTA_CODE_TTL_MS,
  generateConectaCode,
  getConectaOtpMode,
  hashConectaCode,
  isValidPhone,
  normalizePhone,
} from "@/lib/auth/conecta";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { phone?: unknown };
    const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");
    if (!isValidPhone(phone)) return NextResponse.json({ message: "Escribe un número de teléfono válido con lada." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data: user, error: findError } = await supabase
      .from("conecta_users")
      .select("id,is_active,otp_requested_at")
      .eq("phone", phone)
      .maybeSingle();
    if (findError) throw findError;

    // Do not reveal whether a phone is registered. This keeps the prototype closer to the production flow.
    if (!user || !user.is_active) {
      return NextResponse.json({ message: "Si el número está pre-registrado, recibirás un código de acceso." });
    }

    if (user.otp_requested_at && Date.now() - new Date(user.otp_requested_at).getTime() < CONECTA_CODE_COOLDOWN_MS) {
      return NextResponse.json({ message: "Espera un minuto antes de solicitar otro código." }, { status: 429 });
    }

    const mode = getConectaOtpMode();
    if (mode === "whatsapp") {
      return NextResponse.json({ message: "El envío por WhatsApp todavía no está conectado. Usa el modo prototipo mientras configuramos Meta WhatsApp Business." }, { status: 503 });
    }

    const code = generateConectaCode();
    const { error } = await supabase.from("conecta_users").update({
      otp_code_hash: hashConectaCode(code),
      otp_expires_at: new Date(Date.now() + CONECTA_CODE_TTL_MS).toISOString(),
      otp_requested_at: new Date().toISOString(),
      otp_attempts: 0,
    }).eq("id", user.id);
    if (error) throw error;

    return NextResponse.json({
      message: "Código generado para el prototipo. En producción llegará por WhatsApp.",
      prototypeCode: code,
      expiresInSeconds: CONECTA_CODE_TTL_MS / 1000,
    });
  } catch (error) {
    console.error("No se pudo solicitar el código de Conecta", error);
    return NextResponse.json({ message: "No se pudo generar el código. Revisa la configuración de Supabase." }, { status: 500 });
  }
}
