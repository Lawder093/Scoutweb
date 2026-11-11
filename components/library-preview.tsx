import Link from "next/link";
import type { LibraryResource } from "@/lib/content/types";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { LibraryResourceCard } from "./library-resource-card";

export function LibraryPreview({ resources }: { resources: LibraryResource[] }) {
  return (
    <section id="recursos" className="bg-paper py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading title={<>Documentos y <span className="text-primary">recursos</span></>} description="Conoce el proyecto de la asociación, consulta nuestros documentos y explora materiales para el trabajo comunitario." /><Link href="/biblioteca" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Ver todos los recursos <span aria-hidden="true">↗</span></Link></div></Reveal>
        <div className="mt-14 space-y-4">{resources.slice(0, 6).map((resource, index) => <Reveal key={resource.id} delay={index * 0.05}><LibraryResourceCard resource={resource} /></Reveal>)}</div>
      </div>
    </section>
  );
}
