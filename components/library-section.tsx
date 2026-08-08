import { ArrowUpRight } from "lucide-react";
import type { LibraryResource } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LibraryBrowser } from "./library-browser";

export function LibrarySection({ resources }: { resources: LibraryResource[] }) {
  return (
    <section id="biblioteca" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Biblioteca abierta" title={<>Herramientas para <span className="text-primary">hacer.</span></>} description="Publicaciones, juegos y materiales para descargar, adaptar y compartir sin pedir permiso." /><a href="#recursos" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Explorar la biblioteca <ArrowUpRight size={16} /></a></div></Reveal>
        <LibraryBrowser resources={resources} />
      </div>
    </section>
  );
}
