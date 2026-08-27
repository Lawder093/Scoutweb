import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogManager } from "@/components/admin/blog-manager";
import { getContentAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Nueva entrada", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const user = await getContentAdmin();
  if (!user) redirect("/login?next=/admin/blog");

  return <AdminShell title="Blog editorial." description="Escribe, revisa y publica historias, herramientas y conversaciones para compartirlas con la comunidad."><BlogManager /></AdminShell>;
}
