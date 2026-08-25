import { ArrowUpRight, Globe2 } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LatinAmericaMap } from "./latin-america-map";

export function CdeSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="cde" className="overflow-hidden bg-paper py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading headingLevel={headingLevel} eyebrow="La red" title={<>Crecer en <span className="text-secondary">comunidad.</span></>} description="Los Centros de Desarrollo Escultista son espacios autónomos para experimentar, compartir herramientas y poner el cuerpo a la transformación." />
        </Reveal>
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <Reveal delay={0.1} className="order-2 lg:order-1"><LatinAmericaMap /></Reveal>
          <Reveal delay={0.16} className="order-1 lg:order-2">
            <div className="rounded-[2rem] border border-ink/10 bg-mist p-7 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white"><Globe2 size={23} /></div>
              <h3 className="display-title mt-8 text-3xl leading-tight sm:text-4xl">Tres territorios,<br /><span className="text-primary">un mismo fuego.</span></h3>
              <p className="mt-5 text-base leading-7 text-ink/65">Cada CDE nace de su contexto, pero nos conecta una convicción: las mejores ideas se vuelven más fuertes cuando circulan.</p>
              <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
                {["Escuela de formación", "Laboratorio de proyectos", "Red de cuidados"].map((item, index) => <div key={item} className="flex items-center gap-3 text-sm font-bold"><span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs text-secondary">0{index + 1}</span>{item}</div>)}
              </div>
              <a href="/sumate" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Quiero activar un CDE <ArrowUpRight size={16} /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
