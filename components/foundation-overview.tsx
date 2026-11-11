import Link from "next/link";
import { ArrowUpRight, HeartHandshake, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { foundationMission, foundationVision, foundationWorkAreas } from "@/content/foundation";

export function FoundationOverview() {
  return (
    <section id="asociacion" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:gap-20">
          <Reveal>
            <h2 className="display-title max-w-3xl text-5xl leading-[0.92] sm:text-7xl">
              Una asociación civil para <span className="text-primary">acompañar la vida.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/70">
              La Comunidad Crítica de Escultismo Popular trabaja por el bienestar y el desarrollo de niñas, niños, adolescentes y comunidades. Nuestro trabajo combina educación, cultura, asistencia social y organización comunitaria.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/asociacion" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">
                Conocer la asociación <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/donacion" className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3.5 text-sm font-extrabold text-ink transition-colors hover:border-primary hover:text-primary">
                Apoyar el proyecto <HeartHandshake size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[2rem] bg-primary p-7 text-white shadow-card sm:p-8">
              <HeartHandshake className="text-accent" size={27} strokeWidth={1.7} aria-hidden="true" />
              <h3 className="mt-7 text-2xl font-extrabold">Nuestra misión</h3>
              <p className="mt-4 text-base leading-7 text-white/75">{foundationMission}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-7 shadow-card sm:p-8">
              <ShieldCheck className="text-primary" size={27} strokeWidth={1.7} aria-hidden="true" />
              <h3 className="mt-7 text-2xl font-extrabold">Nuestra visión</h3>
              <p className="mt-4 text-base leading-7 text-ink/65">{foundationVision}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-ink/10 pt-10 sm:mt-24 sm:pt-14">
          <h3 className="display-title max-w-2xl text-4xl leading-tight sm:text-5xl">Lo que hacemos para que una comunidad pueda <span className="text-secondary">crecer.</span></h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foundationWorkAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 0.04} className="rounded-[1.6rem] border border-ink/10 bg-white p-6 transition-transform hover:-translate-y-1 sm:p-7">
                <span className="text-3xl font-black text-primary/25">{String(index + 1).padStart(2, "0")}</span>
                <h4 className="mt-7 text-xl font-extrabold">{area.title}</h4>
                <p className="mt-3 text-sm leading-7 text-ink/60">{area.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
