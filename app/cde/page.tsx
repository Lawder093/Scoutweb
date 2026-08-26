import { SiteHeader } from "@/components/site-header";
import { CdeSection } from "@/components/cde-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "CDE",
  description: "Conoce los Centros de Desarrollo Escultista y la red que los conecta.",
};

export default function CdePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16"><CdeSection headingLevel="h1" /></main>
      <SiteFooter />
    </>
  );
}
