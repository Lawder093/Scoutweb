import Image from "next/image";
import { Music2 } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function CoroEsperanza() {
  return (
    <section id="coro-esperanza" className="bg-secondary py-24 text-white sm:py-32">
      <div className="section-shell grid min-w-0 items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Música y comunidad"
            title={<>Coro Esperanza <span className="text-accent">Paulo Freire</span></>}
            description="Una experiencia de música colectiva donde aprender también significa escucharnos, acompañarnos y tomar la palabra."
            dark
          />
          <div className="mt-8 space-y-5 text-base leading-8 text-white/70">
            <p>El Coro Esperanza Paulo Freire beneficia a las juventudes al crear un espacio de encuentro, expresión y aprendizaje compartido.</p>
            <p>Cada ensayo fortalece la confianza, la sensibilidad y la organización del grupo. La música se convierte en una forma de hacer comunidad, reconocer las voces de cada persona y construir esperanza desde el territorio.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
            <span className="rounded-full border border-accent/35 px-3 py-2">Música colectiva</span>
            <span className="rounded-full border border-accent/35 px-3 py-2">Participación juvenil</span>
            <span className="rounded-full border border-accent/35 px-3 py-2">Aprender haciendo</span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="order-1 min-w-0 lg:order-2">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-ink p-3 shadow-soft sm:p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.9rem]">
              <Image
                src="/images/coro-esperanza-paulo-freire.jpg"
                alt="Juventudes del Coro Esperanza Paulo Freire reunidas con sus guitarras"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
            </div>
            <div className="absolute bottom-8 left-8 flex items-center gap-3 rounded-2xl bg-paper/95 p-4 text-ink shadow-card backdrop-blur sm:left-10">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent"><Music2 size={19} aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-extrabold">Una voz compartida</p>
                <p className="mt-0.5 text-[11px] text-ink/55">La música también transforma.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
