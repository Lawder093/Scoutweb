import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Súmate",
  description: "Encuentra los canales oficiales, representantes y Centros de Desarrollo Escultista de la Comunidad Crítica de Escultismo Popular.",
};

export default function SumatePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16"><ContactSection headingLevel="h1" /></main>
      <SiteFooter />
    </>
  );
}
