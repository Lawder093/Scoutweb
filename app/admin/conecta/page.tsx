import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConectaPostcardsManager } from "@/components/admin/conecta-postcards-manager";
import { ConectaUsersManager } from "@/components/admin/conecta-users-manager";
import { getContentPermission } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Usuarios de Conecta", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminConectaPage() {
  const user = await getContentPermission("conecta");
  if (!user) redirect("/login?next=/admin/conecta");
  return <AdminShell title="Conecta." description="Asigna quién puede enviar postales, revisa los envíos y administra el archivo público de la comunidad scout."><ConectaUsersManager /><div className="mt-10"><ConectaPostcardsManager /></div></AdminShell>;
}
