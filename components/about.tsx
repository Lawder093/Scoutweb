import Image from "next/image";
import { ArrowUpRight, BookOpenCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="introduccion" className="bg-paper py-24 sm:py-32">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1fr_.86fr] lg:gap-24">
        <Reveal><SectionHeading eyebrow="Introducción" title={<>¿Qué es el <span className="text-primary">Escultismo Crítico Popular?</span></>} description="Una forma de hacer del escultismo una práctica cotidiana de lectura del mundo, organización y cuidado colectivo." /><div className="mt-8 space-y-5 text-base leading-8 text-ink/70"><p>El Escultismo Crítico Popular es una propuesta de educación no formal que retoma el escultismo, la pedagogía crítica y las educaciones populares para acompañar procesos de niñas, niños, adolescentes y comunidades.</p><p>Entendemos el escultismo como una forma operativa y organizativa: aprendemos a ponernos de acuerdo, a distribuir responsabilidades y a transformar una pregunta en una acción compartida. La aventura no está separada de la realidad; nace de mirarla con curiosidad y compromiso.</p><p>Por eso cada salida, juego, campamento y asamblea puede convertirse en una oportunidad para leer el territorio, reconocer saberes y construir condiciones más justas y humanas.</p></div><a href="#metodo" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Conoce nuestro método <ArrowUpRight size={16} /></a></Reveal>
        <Reveal delay={0.12} className="relative"><div className="relative overflow-hidden rounded-[2.4rem] bg-secondary p-3 shadow-soft sm:p-4"><div className="relative aspect-[4/5] overflow-hidden rounded-[1.9rem]"><Image src="/images/scouts-circle.png" alt="Scouts y facilitadores aprendiendo en comunidad" fill className="object-cover" sizes="(max-width: 1024px) 90vw, 42vw" /></div><div className="absolute bottom-8 left-8 right-8 flex items-center gap-3 rounded-2xl bg-paper/95 p-4 shadow-card backdrop-blur"><span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink"><BookOpenCheck size={19} /></span><div><p className="text-xs font-extrabold">Aprender haciendo</p><p className="mt-0.5 text-[11px] text-ink/55">El territorio también es aula.</p></div></div></div><div className="absolute -right-5 -top-5 -z-0 h-24 w-24 rounded-full border-[14px] border-accent sm:-right-8 sm:-top-8" /></Reveal>
      </div>
    </section>
  );
}
