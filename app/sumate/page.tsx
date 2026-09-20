import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Súmate a la comunidad",
  description: "Encuentra los canales oficiales, representantes y Centros de Desarrollo Escultista de la Comunidad Crítica de Escultismo Popular.",
  path: "/sumate",
});

export default function SumatePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16"><ContactSection headingLevel="h1" /></main>
      <SiteFooter />
    </>
  );
}
