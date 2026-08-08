import Link from "next/link";
import type { LibraryResource } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LibraryResourceCard } from "./library-resource-card";

export function LibraryPreview({ resources }: { resources: LibraryResource[] }) {
  return (
    <section id="biblioteca" className="bg-paper py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Recursos libres" title={<>Biblioteca para <span className="text-primary">hacer.</span></>} description="Publicaciones, juegos y herramientas para descargar, adaptar y compartir sin pedir permiso." /><Link href="/biblioteca" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Ver biblioteca completa <span aria-hidden="true">↗</span></Link></div></Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{resources.slice(0, 6).map((resource, index) => <Reveal key={resource.id} delay={index * 0.05}><LibraryResourceCard resource={resource} compact /></Reveal>)}</div>
      </div>
    </section>
  );
}
