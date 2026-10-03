import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { InstagramManager, type AdminInstagramCDEOption } from "@/components/admin/instagram-manager";
import { getContentPermission } from "@/lib/auth/admin";
import { cdes } from "@/content/cdes";

export const metadata: Metadata = { title: "Instagram de los CDE", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminInstagramPage() {
  const user = await getContentPermission("instagram");
  if (!user) redirect("/login?next=/admin/instagram");
  const cdeOptions: AdminInstagramCDEOption[] = Object.values(cdes).map((cde) => ({ slug: cde.slug, label: cde.communityName, country: cde.country }));
  return <AdminShell title="Instagram de los CDE." description="Actualiza la publicación que quieres destacar para cada Centro de Desarrollo Escultista."><InstagramManager cdeOptions={cdeOptions} /></AdminShell>;
}
