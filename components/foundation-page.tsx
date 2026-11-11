import Link from "next/link";
import { ArrowLeft, ArrowUpRight, HeartHandshake, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";
import { foundationBankDetails, foundationBeneficiaries, foundationMission, foundationODS, foundationRights, foundationValues, foundationVision, foundationWorkAreas, foundationMilestones } from "@/content/foundation";

export function FoundationPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16">
        <section data-glass-tone="dark" className="bg-ink py-20 text-white sm:py-28">
          <div className="section-shell">
            <Link href="/" className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-white/70 transition-colors hover:text-accent">
              <ArrowLeft size={16} aria-hidden="true" /> Volver al inicio
            </Link>
            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
              <Reveal>
                <h1 className="display-title max-w-4xl text-6xl leading-[0.88] sm:text-8xl">La asociación que <span className="text-accent">acompaña.</span></h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-xl text-lg leading-8 text-white/70">La Comunidad Crítica de Escultismo Popular, A. C. es una organización sin fines de lucro que impulsa educación, cultura, asistencia social y participación comunitaria.</p>
                <Link href="/contacto" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">Platicar con la asociación <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-mist py-20 sm:py-28">
          <div className="section-shell grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] bg-primary p-8 text-white sm:p-10">
              <HeartHandshake className="text-accent" size={28} aria-hidden="true" />
              <h2 className="display-title mt-8 text-4xl sm:text-5xl">Nuestra misión</h2>
              <p className="mt-6 text-lg leading-8 text-white/75">{foundationMission}</p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[2rem] bg-white p-8 shadow-card sm:p-10">
              <ShieldCheck className="text-primary" size={28} aria-hidden="true" />
              <h2 className="display-title mt-8 text-4xl sm:text-5xl">Nuestra visión</h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">{foundationVision}</p>
            </Reveal>
          </div>
        </section>

        <section className="bg-ink py-20 text-white sm:py-24">
          <div className="section-shell grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="display-title text-4xl sm:text-5xl">Compromisos de desarrollo sostenible.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65">La información institucional anterior vincula el trabajo asistencial y educativo de la asociación con estos objetivos públicos.</p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {foundationODS.map((objective, index) => <Reveal key={objective} delay={index * 0.04} className="rounded-[1.25rem] border border-white/15 bg-white/5 p-5"><span className="text-xs font-black text-accent">0{index + 1}</span><p className="mt-5 text-sm font-extrabold leading-6 text-white/85">{objective}</p></Reveal>)}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="section-shell">
            <Reveal>
              <h2 className="display-title max-w-3xl text-5xl leading-[0.92] sm:text-7xl">Una red de apoyo que se construye <span className="text-secondary">en el territorio.</span></h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">El trabajo de la asociación se concreta en proyectos y alianzas que responden a las necesidades de cada comunidad.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {foundationWorkAreas.map((area, index) => (
                <Reveal key={area.title} delay={index * 0.04} className="rounded-[1.7rem] border border-ink/10 bg-mist p-6 sm:p-7">
                  <span className="text-3xl font-black text-primary/25">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-7 text-xl font-extrabold">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/60">{area.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mist py-20 sm:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-[1fr_.78fr] lg:items-start lg:gap-20">
            <Reveal>
              <h2 className="display-title text-5xl leading-[0.92] sm:text-7xl">A quiénes <span className="text-primary">acompañamos.</span></h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">La asociación trabaja con personas y comunidades, no sólo para ellas. Cada proyecto parte de una necesidad concreta y busca fortalecer las capacidades, los vínculos y las decisiones de quienes participan.</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {foundationBeneficiaries.map((beneficiary, index) => (
                  <Reveal key={beneficiary.title} delay={index * 0.04} className="rounded-[1.4rem] border border-ink/10 bg-white p-5 sm:p-6">
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-primary">0{index + 1}</span>
                    <h3 className="mt-5 text-lg font-extrabold">{beneficiary.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/60">{beneficiary.description}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">Donaciones electrónicas</p>
              <h2 className="display-title mt-7 text-4xl sm:text-5xl">Apoya un proceso.</h2>
              <p className="mt-5 text-base leading-7 text-white/65">Los datos bancarios publicados por la asociación son:</p>
              <dl className="mt-8 space-y-5 border-t border-white/15 pt-6">
                <div><dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">Cuenta</dt><dd className="mt-2 text-2xl font-black tracking-[0.08em] text-accent">{foundationBankDetails.account}</dd></div>
                <div className="border-t border-white/15 pt-5"><dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">CLABE</dt><dd className="mt-2 break-all text-xl font-black tracking-[0.08em] text-accent">{foundationBankDetails.clabe}</dd></div>
              </dl>
              <p className="mt-7 text-sm leading-6 text-white/55">Antes de realizar una transferencia, confirma los datos vigentes con la asociación.</p>
              <Link href="/donacion" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-ink transition-transform hover:-translate-y-1">Ver opciones para donar <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist py-20 sm:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:gap-20">
            <Reveal>
              <h2 className="display-title text-5xl leading-[0.92] sm:text-7xl">Derechos que <span className="text-primary">cuidamos.</span></h2>
              <p className="mt-6 text-lg leading-8 text-ink/65">En nuestros espacios, el juego, el descanso, la cultura y la participación no son premios: son parte del bienestar y del desarrollo.</p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {foundationRights.map((right, index) => (
                <Reveal key={right} delay={index * 0.05} className="rounded-[1.4rem] border border-ink/10 bg-white p-5 sm:p-6">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-primary">0{index + 1}</span>
                  <p className="mt-5 text-base font-extrabold leading-6">{right}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <Reveal>
              <h2 className="display-title text-5xl leading-[0.92] sm:text-7xl">Lo que nos <span className="text-accent">orienta.</span></h2>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {foundationValues.map((value) => <div key={value.title} className="border-t border-ink/15 pt-5"><h3 className="text-xl font-extrabold">{value.title}</h3><p className="mt-2 text-sm leading-7 text-ink/60">{value.description}</p></div>)}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <h2 className="display-title text-4xl sm:text-5xl">Una historia que sigue abierta.</h2>
              <div className="mt-8 space-y-6">
                {foundationMilestones.map((item) => <div key={item.year} className="border-t border-white/15 pt-5"><p className="text-sm font-black text-accent">{item.year}</p><h3 className="mt-2 text-lg font-extrabold">{item.title}</h3><p className="mt-2 text-sm leading-7 text-white/60">{item.text}</p></div>)}
              </div>
            </Reveal>
          </div>
        </section>

        <Timeline />
      </main>
      <SiteFooter />
    </>
  );
}
