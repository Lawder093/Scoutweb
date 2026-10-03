import { ArrowUpRight, Instagram } from "lucide-react";
import { cdes } from "@/content/cdes";
import type { CDEInstagramLink } from "@/lib/content/services";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const cdeOrder = ["mexico", "colombia", "argentina"] as const;

export function Partners({ links }: { links: CDEInstagramLink[] }) {
  const linksByCDE = new Map(links.map((link) => [link.cdeSlug, link.instagramUrl]));

  return (
    <section className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Desde nuestros CDE"
            title={<>Publicaciones <span className="text-secondary">en Instagram</span></>}
            description="Conoce lo que está pasando en México, Colombia y Argentina. El equipo de cada CDE puede actualizar su publicación destacada desde el panel de administración."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cdeOrder.map((slug, index) => {
            const cde = cdes[slug];
            const instagramUrl = linksByCDE.get(slug);
            return (
              <Reveal key={slug} delay={0.08 + index * 0.06}>
                <article className="flex h-full min-w-0 flex-col rounded-[2rem] bg-paper p-7 shadow-card sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white">
                      <Instagram size={22} aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-accent/25 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink/65">CDE</span>
                  </div>
                  <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.14em] text-ink/45">{cde.country}</p>
                  <h3 className="mt-2 break-words text-2xl font-extrabold leading-tight">{cde.communityName}</h3>
                  <p className="mt-4 flex-1 text-sm leading-6 text-ink/60">{instagramUrl ? "Mira la publicación más reciente de este Centro de Desarrollo Escultista." : "Pronto compartiremos una publicación de este Centro de Desarrollo Escultista."}</p>
                  {instagramUrl ? (
                    <a href={instagramUrl} target="_blank" rel="noreferrer" className="focus-ring mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
                      Ver publicación <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-sm font-bold text-ink/45">En preparación</span>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
