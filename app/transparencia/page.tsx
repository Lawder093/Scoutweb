import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TransparencyPage } from "@/components/transparency-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Transparencia",
  description: "Informes institucionales, declaraciones, documentos fiscales y datos públicos de la Comunidad Crítica de Escultismo Popular, A. C.",
  path: "/transparencia",
});

export const revalidate = 300;

export default function TransparenciaRoute() {
  return <><SiteHeader /><TransparencyPage /><SiteFooter /></>;
}
