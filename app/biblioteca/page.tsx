import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { LibrarySection } from "@/components/library-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Biblioteca · Escultismo Crítico Popular",
  description: "Recursos, juegos y herramientas libres para compartir y adaptar.",
};

export default function BibliotecaPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="section-shell py-20 sm:py-28"><span className="eyebrow">Biblioteca abierta</span><h1 className="display-title mt-6 max-w-4xl text-6xl leading-[0.88] sm:text-8xl">Leer, adaptar,<br /><span className="text-primary">compartir.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Una colección viva de publicaciones, juegos y materiales para acompañar procesos de educación popular.</p><a href="#recursos" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Ver recursos <ArrowUpRight size={16} /></a></section>
        <div id="recursos"><LibrarySection /></div>
      </main>
      <SiteFooter />
    </>
  );
}
