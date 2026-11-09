import type { Metadata } from "next";
import { ConectaAuthorPortal } from "@/components/conecta/conecta-author-portal";
import { ConectaLogin } from "@/components/conecta/conecta-login";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConectaUser } from "@/lib/auth/conecta";

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
  return <ConectaAuthorPortal user={user} />;
}
