import { ArrowUpRight, CalendarDays, Compass, HandHeart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";
import { MemberCard } from "./member-card";
import type { CDEData } from "@/content/cdes/types";

const waysToParticipate = [
  {
    number: "01",
    icon: Compass,
    title: "Acompañar una comunidad",
    description: "Participa en la vida cotidiana de Ronda, Manada, Tropa, Iris o Clan y ayuda a que cada experiencia tenga un sentido educativo.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Compartir un saber",
    description: "Tu oficio, interés o experiencia puede abrir una ruta de aprendizaje para niñas, niños, jóvenes y otras personas educadoras.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Sostener un proyecto",
    description: "También puedes colaborar en una actividad, una salida o una tarea concreta. Hay muchas maneras de poner el cuerpo en común.",
  },
];

const participationPath = [
  ["Conocernos", "Conversamos sobre tus intereses, tiempos y la comunidad con la que te gustaría vincularte."],
  ["Encontrar tu lugar", "Definimos una forma de participación que tenga sentido para ti y para el proceso del CDE."],
  ["Aprender en equipo", "La práctica se construye con otras personas: preguntando, haciendo, revisando y compartiendo."],
  ["Acompañar y revisar", "Cada experiencia se cuida con diálogo, acuerdos y una mirada atenta a lo que la comunidad necesita."],
] as const;

export function EducatorsSection({ cde }: { cde: CDEData }) {
  return (
    <section id="educadores" className="scroll-mt-36 bg-mist py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionTitle
            eyebrow="03 · Educadores"
            title={<>Acompañar también es <span className="text-secondary">educar.</span></>}
            description="En cada CDE, las personas adultas y jóvenes que acompañan hacen posible que el escultismo se vuelva encuentro, aprendizaje y organización comunitaria."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-[2rem] bg-secondary text-white shadow-soft sm:mt-14">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">El equipo de {cde.communityName}</p>
                <h3 className="mt-5 max-w-2xl text-3xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl">
                  Tu tiempo, tus saberes y tu forma de mirar también tienen un lugar aquí.
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                  Puedes acompañar una comunidad, compartir una habilidad o colaborar en una actividad puntual. El rol se conversa de acuerdo con tus posibilidades y con el momento que vive cada CDE.
                </p>
                <a href="/sumate" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-ink transition-transform hover:-translate-y-0.5">
                  Conocer cómo participar <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>

              <div className="flex flex-col justify-between gap-6 bg-ink/15 p-7 sm:p-10 lg:p-12">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink">
                  <HandHeart size={27} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-black leading-tight">Una tarea compartida.</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Acompañar no significa hacerlo todo: significa construir condiciones para que otras personas puedan aprender, decidir y participar.</p>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-5 text-center">
                  <div><p className="text-xl font-black text-accent">01</p><p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/55">Escuchar</p></div>
                  <div><p className="text-xl font-black text-accent">02</p><p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/55">Hacer</p></div>
                  <div><p className="text-xl font-black text-accent">03</p><p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/55">Revisar</p></div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 sm:mt-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-primary">Formas de participar</p>
                <h3 className="display-title mt-4 text-4xl leading-none sm:text-5xl">Hay más de una forma<br /><span className="text-primary">de estar.</span></h3>
              </div>
              <p className="max-w-sm text-sm leading-6 text-ink/55">La educación se sostiene con capacidades distintas, responsabilidades compartidas y ganas de aprender con otras personas.</p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {waysToParticipate.map(({ number, icon: Icon, title, description }, index) => (
              <Reveal key={number} delay={index * 0.08}>
                <article className="group h-full rounded-[1.7rem] border border-ink/10 bg-paper p-6 shadow-card transition-transform hover:-translate-y-1 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon size={22} aria-hidden="true" /></span>
                    <span className="font-mono text-sm font-bold text-ink/30">{number}</span>
                  </div>
                  <h4 className="mt-8 text-xl font-black tracking-[-0.02em]">{title}</h4>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] border border-ink/10 bg-paper p-7 shadow-card sm:mt-24 sm:p-10">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-secondary">Un camino acompañado</p>
              <h3 className="display-title mt-4 text-4xl leading-none sm:text-5xl">De la intención<br /><span className="text-secondary">a la práctica.</span></h3>
              <p className="mt-5 text-base leading-7 text-ink/60">La incorporación de nuevas personas se diseña junto con cada CDE. Esta ruta permite conversar expectativas, reconocer saberes y cuidar el vínculo educativo.</p>
            </div>
          </Reveal>
          <div className="mt-9 grid gap-x-7 gap-y-8 md:grid-cols-4">
            {participationPath.map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.07}>
                <div className="relative border-t-2 border-accent pt-4">
                  <span className="font-mono text-xs font-bold text-primary">0{index + 1}</span>
                  <h4 className="mt-3 text-lg font-black">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-ink/55">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {cde.educators.length > 0 ? (
          <div className="mt-20 sm:mt-24">
            <Reveal>
              <div className="mb-9">
                <p className="eyebrow text-primary">Personas educadoras</p>
                <h3 className="display-title mt-4 text-4xl leading-none sm:text-5xl">Quienes sostienen<br /><span className="text-primary">el proceso.</span></h3>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {cde.educators.map((educator, index) => <Reveal key={educator.name} delay={index * 0.08}><MemberCard educator={educator} /></Reveal>)}
            </div>
          </div>
        ) : (
          <Reveal delay={0.08}>
            <p className="mt-10 text-sm leading-6 text-ink/45">Los perfiles del equipo de {cde.country} se añadirán desde sus datos propios, sin cambiar esta plantilla.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
