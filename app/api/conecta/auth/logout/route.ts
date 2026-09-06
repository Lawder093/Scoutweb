import { NextResponse } from "next/server";
import { clearConectaSession } from "@/lib/auth/conecta";

export async function POST() {
  await clearConectaSession();
  return NextResponse.json({ message: "Sesión cerrada." });
}
