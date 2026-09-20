import type { LibraryResource } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LibraryBrowser } from "./library-browser";

export function LibrarySection({ resources }: { resources: LibraryResource[] }) {
  return (
    <section id="biblioteca" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><SectionHeading eyebrow="Biblioteca abierta" title={<>Herramientas para <span className="text-primary">hacer.</span></>} description="Publicaciones, juegos y materiales para descargar, adaptar y compartir sin pedir permiso." /></Reveal>
        <LibraryBrowser resources={resources} />
      </div>
    </section>
  );
}
