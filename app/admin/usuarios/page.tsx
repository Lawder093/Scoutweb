import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminUserManager } from "@/components/admin/admin-user-manager";
import { getContentOwner } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Usuarios del panel", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const owner = await getContentOwner();
  if (!owner) redirect("/login?next=/admin/usuarios");
  return <AdminShell title="Usuarios del panel" description="Crea accesos con correo y contraseña, y decide qué secciones puede administrar cada persona."><AdminUserManager /></AdminShell>;
}
