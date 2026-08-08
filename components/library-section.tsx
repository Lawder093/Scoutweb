import { ArrowUpRight } from "lucide-react";
import type { LibraryResource } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LibraryResourceCard } from "./library-resource-card";

export function LibrarySection({ resources }: { resources: LibraryResource[] }) {
  return (
    <section id="biblioteca" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Biblioteca abierta" title={<>Herramientas para <span className="text-primary">hacer.</span></>} description="Publicaciones, juegos y materiales para descargar, adaptar y compartir sin pedir permiso." /><a href="#contacto" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Explorar la biblioteca <ArrowUpRight size={16} /></a></div></Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {resources.map((resource, index) => <Reveal key={resource.id} delay={index * 0.05}><LibraryResourceCard resource={resource} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
