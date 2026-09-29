import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contacto",
  description: "Ponte en contacto con la Comunidad Crítica de Escultismo Popular y encuentra sus canales oficiales.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16"><ContactSection headingLevel="h1" /></main>
      <SiteFooter />
    </>
  );
}
