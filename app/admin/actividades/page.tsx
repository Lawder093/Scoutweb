import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ActivityManager, type AdminCDEOption } from "@/components/admin/activity-manager";
import { getContentAdmin } from "@/lib/auth/admin";
import { cdes } from "@/content/cdes";

export const metadata: Metadata = { title: "Publicar evento", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminActivitiesPage() {
  const user = await getContentAdmin();
  if (!user) redirect("/login?next=/admin/actividades");
  const cdeOptions: AdminCDEOption[] = Object.values(cdes).map((cde) => ({ slug: cde.slug, label: cde.communityName }));
  return <AdminShell title="Actividades." description="Publica una noticia o evento en un solo CDE. La información llegará directamente a la sección Actividades de su página."><ActivityManager cdeOptions={cdeOptions} /></AdminShell>;
}
