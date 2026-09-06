import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConectaPostManager } from "@/components/admin/conecta-post-manager";
import { ConectaUsersManager } from "@/components/admin/conecta-users-manager";
import { getContentAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Usuarios de Conecta", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminConectaPage() {
  const user = await getContentAdmin();
  if (!user) redirect("/login?next=/admin/conecta");
  return <AdminShell title="Conecta." description="Pre-registra scouts, administra sus accesos privados y publica las entradas generales que verá toda la comunidad Conecta."><ConectaUsersManager /><div className="mt-10"><ConectaPostManager /></div></AdminShell>;
}
