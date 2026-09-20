import { SiteHeader } from "@/components/site-header";
import { CdeSection } from "@/components/cde-section";
import { SiteFooter } from "@/components/site-footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Centros de Desarrollo Escultista",
  description: "Conoce los Centros de Desarrollo Escultista y la red que los conecta.",
  path: "/cde",
});

export default function CdePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16"><CdeSection headingLevel="h1" /></main>
      <SiteFooter />
    </>
  );
}
