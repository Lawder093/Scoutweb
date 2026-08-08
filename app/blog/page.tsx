import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Blog · Escultismo Crítico Popular",
  description: "Historias, conversaciones y proyectos del movimiento.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="section-shell py-20 sm:py-28"><span className="eyebrow">Blog del movimiento</span><h1 className="display-title mt-6 max-w-4xl text-6xl leading-[0.88] sm:text-8xl">Historias que<br /><span className="text-primary">se organizan.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Experiencias, herramientas y conversaciones que nacen en el territorio y regresan convertidas en preguntas nuevas.</p><a href="#historias" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Leer historias <ArrowUpRight size={16} /></a></section>
        <div id="historias"><ProjectsSection /></div>
      </main>
      <SiteFooter />
    </>
  );
}
