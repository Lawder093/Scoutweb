import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreShowcase } from "@/components/store-showcase";

export const metadata = {
  title: "Tienda",
  description: "Catálogo físico de prendas, insignias y materiales de la Comunidad Crítica de Escultismo Popular.",
};

export default function TiendaPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16">
        <section className="section-shell py-20 sm:py-28">
          <span className="eyebrow">Tienda de la comunidad</span>
          <h1 className="display-title mt-6 max-w-4xl break-words text-5xl leading-[0.88] sm:text-8xl">Objetos para<br /><span className="text-primary">seguir andando.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Conoce las prendas, insignias y publicaciones físicas que acompañan nuestros procesos educativos y comunitarios.</p>
          <a href="#productos" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Ver disponibles <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
        <StoreShowcase />
      </main>
      <SiteFooter />
    </>
  );
}
