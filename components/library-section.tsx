import type { LibraryResource } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LibraryBrowser } from "./library-browser";

export function LibrarySection({ resources }: { resources: LibraryResource[] }) {
  return (
    <section id="recursos" className="apple-module apple-module--mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><SectionHeading eyebrow="Colección de la asociación" title={<>Una biblioteca para <span className="text-primary">hacer comunidad</span></>} description="Publicaciones, documentos y materiales para leer, descargar, adaptar y compartir." /></Reveal>
        <LibraryBrowser resources={resources} />
      </div>
    </section>
  );
}
