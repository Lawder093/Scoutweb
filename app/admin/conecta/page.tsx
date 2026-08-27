import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConectaUsersManager } from "@/components/admin/conecta-users-manager";
import { getContentAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Usuarios de Conecta", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminConectaPage() {
  const user = await getContentAdmin();
  if (!user) redirect("/login?next=/admin/conecta");
  return <AdminShell title="Conecta." description="Administra los accesos preparados para la comunidad de Conecta. Cada contraseña se almacena como un hash seguro."><ConectaUsersManager /></AdminShell>;
}
