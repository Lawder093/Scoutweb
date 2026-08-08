import { Globe2 } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LatinAmericaMap } from "./latin-america-map";

export function Map() {
  return (
    <section id="cde" className="overflow-hidden bg-paper py-24 sm:py-32">
      <div className="section-shell"><Reveal><SectionHeading align="center" eyebrow="La red" title={<>Nuestra comunidad en <span className="text-secondary">Latinoamérica</span></>} description="Los Centros de Desarrollo Escultista trabajan en distintos países compartiendo un mismo proyecto educativo." /></Reveal><div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20"><Reveal delay={0.1}><LatinAmericaMap /></Reveal><Reveal delay={0.16}><div className="rounded-[2rem] bg-mist p-7 sm:p-9"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white"><Globe2 size={23} /></div><h3 className="display-title mt-8 text-3xl leading-tight sm:text-4xl">Tres territorios,<br /><span className="text-primary">un mismo fuego.</span></h3><p className="mt-5 text-base leading-7 text-ink/65">Cada CDE nace de su contexto, pero nos conecta una convicción: las mejores ideas se vuelven más fuertes cuando circulan.</p><div className="mt-8 space-y-3 border-t border-ink/10 pt-6">{["México", "Colombia", "Argentina"].map((place, index) => <div key={place} className="flex items-center gap-3 text-sm font-bold"><span className="grid h-7 w-7 place-items-center rounded-full bg-paper text-xs text-secondary">0{index + 1}</span>{place}</div>)}</div></div></Reveal></div></div>
    </section>
  );
}
