import { NextResponse } from "next/server";
import { getContentPermission } from "@/lib/auth/admin";
import { removePostcardAsset } from "@/lib/content/conecta-storage";
import { listPostcardsForReview } from "@/lib/content/repositories/postcards";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!await getContentPermission("conecta")) return NextResponse.json({ message: "No tienes permisos para moderar postales." }, { status: 403 });
  try { return NextResponse.json(await listPostcardsForReview()); }
  catch (error) { console.error("No se pudieron consultar las postales", error); return NextResponse.json({ message: "No se pudieron consultar las postales." }, { status: 500 }); }
}

export async function PATCH(request: Request) {
  const admin = await getContentPermission("conecta");
  if (!admin) return NextResponse.json({ message: "No tienes permisos para moderar postales." }, { status: 403 });
  try {
    const body = await request.json() as { id?: unknown; action?: unknown; rejectionReason?: unknown };
    const id = typeof body.id === "string" ? body.id.trim() : "";
    const action = body.action === "approve" || body.action === "reject" ? body.action : "";
    if (!id || !action) return NextResponse.json({ message: "Faltan datos para moderar la postal." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const update = action === "approve"
      ? { status: "approved", approved_at: new Date().toISOString(), published_at: new Date().toISOString(), expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), reviewed_by: admin.id, rejection_reason: null }
      : { status: "rejected", approved_at: null, published_at: null, expires_at: null, reviewed_by: admin.id, rejection_reason: typeof body.rejectionReason === "string" ? body.rejectionReason.trim().slice(0, 500) || "No aprobada por administración." : "No aprobada por administración." };
    const { error } = await supabase.from("conecta_postcards").update(update).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ message: action === "approve" ? "Postal aprobada y visible durante 72 horas." : "Postal rechazada." });
  } catch (error) { console.error("No se pudo moderar la postal", error); return NextResponse.json({ message: "No se pudo actualizar la postal." }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  if (!await getContentPermission("conecta")) return NextResponse.json({ message: "No tienes permisos para eliminar postales." }, { status: 403 });
  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return NextResponse.json({ message: "Falta el identificador de la postal." }, { status: 400 });
    const supabase = createSupabaseAdminClient();
    const { data: current, error: findError } = await supabase.from("conecta_postcards").select("cover_image_path").eq("id", id).maybeSingle();
    if (findError) throw findError;
    if (!current) return NextResponse.json({ message: "La postal no existe." }, { status: 404 });
    const { error } = await supabase.from("conecta_postcards").delete().eq("id", id);
    if (error) throw error;
    await removePostcardAsset(supabase, current.cover_image_path);
    return NextResponse.json({ message: "Postal eliminada." });
  } catch (error) { console.error("No se pudo eliminar la postal", error); return NextResponse.json({ message: "No se pudo eliminar la postal." }, { status: 500 }); }
}
