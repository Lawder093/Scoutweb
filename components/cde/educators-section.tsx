import { UsersRound } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";
import { MemberCard } from "./member-card";
import type { CDEData } from "@/content/cdes/types";

export function EducatorsSection({ cde }: { cde: CDEData }) {
  return (
    <section id="educadores" className="scroll-mt-36 bg-mist py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle eyebrow="03 · Educadores" title={<>Las personas hacen<br /><span className="text-secondary">la comunidad.</span></>} description="Perfiles de quienes acompañan los procesos, con su rol y la comunidad a la que pertenecen." />
        </Reveal>

        {cde.educators.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {cde.educators.map((educator, index) => <Reveal key={educator.name} delay={index * 0.08}><MemberCard educator={educator} /></Reveal>)}
          </div>
        ) : (
          <Reveal delay={0.08} className="mt-14 flex flex-col gap-5 rounded-[2rem] border border-dashed border-ink/15 bg-paper p-7 sm:flex-row sm:items-center sm:p-9">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-ink"><UsersRound size={25} aria-hidden="true" /></span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Equipo educativo</p>
              <h3 className="mt-2 text-2xl font-extrabold">Perfiles en preparación</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/60">El equipo de {cde.communityName} aparecerá aquí cuando estén confirmados sus nombres, roles, comunidades y fotografías.</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
