import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Contacto",
  description: "Ponte en contacto con la red de Escultismo Crítico Popular.",
};

export default function ContactoPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16"><ContactSection headingLevel="h1" /></main>
      <SiteFooter />
    </>
  );
}
