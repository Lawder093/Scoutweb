import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Súmate",
  description: "Ponte en contacto con la red de Escultismo Crítico Popular y encuentra una forma de participar.",
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
