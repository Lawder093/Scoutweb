import { redirect } from "next/navigation";
import { getAdminPermissions } from "@/lib/auth/admin";

export default async function AdminPage() {
  const permissions = await getAdminPermissions();
  if (permissions.blog) redirect("/admin/blog");
  if (permissions.conecta) redirect("/admin/conecta");
  if (permissions.activities) redirect("/admin/actividades");
  if (permissions.instagram) redirect("/admin/instagram");
  if (permissions.canManageUsers) redirect("/admin/usuarios");
  redirect("/login?next=/admin");
}
