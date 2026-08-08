import { ArrowUpRight, Check, Sprout } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function HistorySection() {
  return (
    <section id="historia" className="bg-mist py-24 sm:py-32">
      <div className="section-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative">
          <div className="sticky top-32">
            <SectionHeading
              eyebrow="Nuestra historia"
              title={<>Una fogata para <span className="hand-underline">pensar juntes.</span></>}
              description="El escultismo puede ser mucho más que una colección de nudos y excursiones. Puede ser una práctica cotidiana de cuidado, organización y lectura crítica del mundo."
            />
            <a href="#cde" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-secondary underline decoration-secondary/30 underline-offset-8 transition-colors hover:text-primary hover:decoration-primary/30">
              Conoce nuestra red <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5">
          <div className="rounded-[2rem] bg-paper p-7 shadow-card sm:p-10">
            <div className="mb-8 flex items-center gap-3 text-primary"><Sprout size={22} /><span className="text-xs font-extrabold uppercase tracking-[0.17em]">Nacimos de una pregunta</span></div>
            <p className="display-title max-w-2xl text-3xl leading-tight sm:text-4xl">¿Cómo hacemos del grupo un lugar donde todas las voces puedan crecer?</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink/65">Entre reuniones, campamentos y barrios, fuimos juntando herramientas de educación popular, feminismos, antirracismo y organización comunitaria. Así apareció una forma de hacer escultismo con los pies en la tierra y la mirada puesta en el horizonte.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-ink/10 bg-accent p-7"><span className="text-5xl font-black text-ink/20">01</span><h3 className="mt-7 text-lg font-extrabold">Mirar el territorio</h3><p className="mt-3 text-sm leading-6 text-ink/70">Leer lo que pasa alrededor para que cada actividad tenga sentido.</p></div>
            <div className="rounded-[2rem] border border-ink/10 bg-primary p-7 text-white"><span className="text-5xl font-black text-white/25">02</span><h3 className="mt-7 text-lg font-extrabold">Hacer con otres</h3><p className="mt-3 text-sm leading-6 text-white/75">Convertir la diferencia en una fuerza para organizarnos.</p></div>
          </div>
          <div className="rounded-[2rem] border border-ink/10 bg-secondary p-7 text-white sm:p-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">Nuestro norte</p>
            <p className="display-title mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Que nadie tenga que caminar sole para cambiar las cosas.</p>
            <div className="mt-7 grid gap-3 text-sm font-semibold text-white/80 sm:grid-cols-2">
              {["Conocimiento compartido", "Organización desde abajo", "Cuidado como práctica", "Alegría y resistencia"].map((item) => <div key={item} className="flex items-center gap-2"><Check size={16} className="text-accent" />{item}</div>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
