import "server-only";

import { cookies } from "next/headers";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { resolveConectaAssetUrl } from "@/lib/content/conecta-storage";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Tables } from "@/lib/supabase/database.types";

export const CONECTA_SESSION_COOKIE = "conecta_session";
export const CONECTA_SESSION_MAX_AGE = 60 * 60 * 24;
export const CONECTA_CODE_TTL_MS = 10 * 60 * 1000;
export const CONECTA_CODE_COOLDOWN_MS = 60 * 1000;
export const CONECTA_MAX_CODE_ATTEMPTS = 5;

export type ConectaUser = Pick<
  Tables<"conecta_users">,
  "id" | "name" | "phone" | "photo_path" | "cde_slug" | "community" | "is_active" | "created_at"
> & { photo_url: string | null };

function getSessionSecret(): string {
  const secret = process.env.CONECTA_SESSION_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Falta configurar CONECTA_SESSION_SECRET en el servidor.");
  return secret;
}

export function normalizePhone(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  return digits.startsWith("00") ? digits.slice(2) : digits;
}

export function isValidPhone(value: string): boolean {
  return /^\d{8,15}$/.test(value);
}

export function generateConectaCode(): string {
  return String(randomInt(100000, 1000000));
}

export function hashConectaCode(code: string): string {
  return createHmac("sha256", `${getSessionSecret()}:otp`).update(code).digest("hex");
}

export function verifyConectaCode(code: string, expectedHash: string): boolean {
  const candidate = Buffer.from(hashConectaCode(code), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function encodePayload(payload: { userId: string; expiresAt: number }): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", `${getSessionSecret()}:session`).update(encodedPayload).digest("base64url");
}

function serializeSession(userId: string, expiresAt: number): string {
  const encodedPayload = encodePayload({ userId, expiresAt });
  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

function parseSession(value: string | undefined): { userId: string; expiresAt: number } | null {
  if (!value) return null;
  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signPayload(encodedPayload);
  const candidate = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (candidate.length !== expected.length || !timingSafeEqual(candidate, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as { userId?: unknown; expiresAt?: unknown };
    if (typeof payload.userId !== "string" || typeof payload.expiresAt !== "number" || payload.expiresAt <= Date.now()) return null;
    return { userId: payload.userId, expiresAt: payload.expiresAt };
  } catch {
    return null;
  }
}

export async function createConectaSession(userId: string): Promise<void> {
  const expiresAt = Date.now() + CONECTA_SESSION_MAX_AGE * 1000;
  const cookieStore = await cookies();
  cookieStore.set(CONECTA_SESSION_COOKIE, serializeSession(userId, expiresAt), {
    httpOnly: true,
    maxAge: CONECTA_SESSION_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearConectaSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CONECTA_SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
}

export async function getConectaUser(): Promise<ConectaUser | null> {
  try {
    const cookieStore = await cookies();
    const session = parseSession(cookieStore.get(CONECTA_SESSION_COOKIE)?.value);
    if (!session) return null;

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("conecta_users")
      .select("id,name,phone,photo_path,cde_slug,community,is_active,created_at")
      .eq("id", session.userId)
      .eq("is_active", true)
      .maybeSingle();
    if (error || !data) return null;
    return { ...data, photo_url: await resolveConectaAssetUrl(supabase, data.photo_path) };
  } catch {
    return null;
  }
}

export function getConectaOtpMode(): "prototype" | "whatsapp" {
  return process.env.CONECTA_OTP_MODE === "whatsapp" ? "whatsapp" : "prototype";
}
