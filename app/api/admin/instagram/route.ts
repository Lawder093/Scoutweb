import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContentPermission } from "@/lib/auth/admin";
import { cdes, getCDE } from "@/content/cdes";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type InstagramPayload = {
  cdeSlug?: unknown;
  instagramUrl?: unknown;
  isPublished?: unknown;
};

function textValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isInstagramPublication(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === "https:" && ["instagram.com", "www.instagram.com", "m.instagram.com"].includes(hostname) && /^\/(p|reel|tv|share)\//.test(url.pathname);
  } catch {
    return false;
  }
}

export async function GET() {
  const user = await getContentPermission("instagram");
  if (!user) return NextResponse.json({ message: "No tienes permisos para consultar estos enlaces." }, { status: 403 });

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("cde_instagram_links").select("*").order("cde_slug", { ascending: true });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("No se pudieron consultar los enlaces de Instagram", error);
    return NextResponse.json({ message: "No se pudieron consultar los enlaces. Revisa que la migración de Supabase esté aplicada." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getContentPermission("instagram");
  if (!user) return NextResponse.json({ message: "No tienes permisos para editar estos enlaces." }, { status: 403 });

  try {
    const payload = await request.json() as InstagramPayload;
    const cdeSlug = textValue(payload.cdeSlug, 30);
    const instagramUrl = textValue(payload.instagramUrl, 500);
    const isPublished = payload.isPublished === true;

    if (!getCDE(cdeSlug) || !Object.hasOwn(cdes, cdeSlug)) return NextResponse.json({ message: "Selecciona un CDE válido." }, { status: 400 });
    if (!instagramUrl) {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("cde_instagram_links").delete().eq("cde_slug", cdeSlug);
      if (error) throw error;
      revalidatePath("/", "page");
      return NextResponse.json({ message: "Enlace eliminado del sitio." });
    }
    if (!isInstagramPublication(instagramUrl)) return NextResponse.json({ message: "Usa un enlace HTTPS a una publicación, reel o video de Instagram." }, { status: 400 });

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("cde_instagram_links").upsert({ cde_slug: cdeSlug, instagram_url: instagramUrl, is_published: isPublished, updated_at: new Date().toISOString() }, { onConflict: "cde_slug" }).select("*").single();
    if (error) throw error;
    revalidatePath("/", "page");
    return NextResponse.json({ message: isPublished ? "Enlace guardado y publicado." : "Enlace guardado como oculto.", link: data });
  } catch (error) {
    console.error("No se pudo guardar el enlace de Instagram", error);
    return NextResponse.json({ message: "No se pudo guardar el enlace. Revisa la configuración de Supabase." }, { status: 500 });
  }
}
