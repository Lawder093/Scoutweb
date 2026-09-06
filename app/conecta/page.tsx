import type { Metadata } from "next";
import { ConectaFeed } from "@/components/conecta/conecta-feed";
import { ConectaLogin } from "@/components/conecta/conecta-login";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConectaUser } from "@/lib/auth/conecta";
import { listConectaPosts } from "@/lib/content/repositories/conecta";
import { getContentAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Conecta",
  description: "Espacio privado de conversación para la comunidad de Escultismo Crítico Popular.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ConectaPage() {
  const user = await getConectaUser();

  return <><SiteHeader />{user ? <ConectaPageContent user={user} /> : <ConectaLogin />}<SiteFooter /></>;
}

async function ConectaPageContent({ user }: { user: NonNullable<Awaited<ReturnType<typeof getConectaUser>>> }) {
  const [posts, admin] = await Promise.all([listConectaPosts(), getContentAdmin()]);
  return <ConectaFeed initialPosts={posts} user={user} canModerate={Boolean(admin)} />;
}
