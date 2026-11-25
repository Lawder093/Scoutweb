import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { foundationBeneficiaries, foundationDonationYears, foundationGeneralObjective, foundationInitiatives, foundationMission, foundationODS, foundationRights, foundationSpecificObjectives, foundationValues, foundationVision, foundationWorkAreas, foundationMilestones } from "@/content/foundation";
import type { FoundationInitiative } from "@/content/foundation";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Currículum institucional",
  description: "Presentación, historia, objetivos, donaciones, documentos y transparencia de la Comunidad Crítica de Escultismo Popular, A. C.",
  path: "/curriculum-institucional",
});

export const revalidate = 300;

const foundationTimeline = [...foundationDonationYears].reverse().map((year) => ({
  year,
  initiatives: foundationInitiatives.filter((initiative) => initiative.year === year),
}));

function InitiativeCard({ initiative }: { initiative: FoundationInitiative }) {
  return (
    <article className="apple-card group h-full overflow-hidden bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        {initiative.image ? <Image src={initiative.image} alt={`Registro fotográfico: ${initiative.title}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center px-8 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-primary/70">Memoria documental</div>}
      </div>
      <div className="p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{initiative.place}</p>
        <h4 className="mt-3 text-lg font-extrabold leading-7">{initiative.title}</h4>
        <p className="mt-3 text-sm leading-6 text-ink/65">{initiative.description}</p>
        <Link href={initiative.sourcePath} className="focus-ring mt-5 inline-flex items-center gap-2 rounded font-bold text-primary hover:text-ink">Ver memoria <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}

export default function CurriculumInstitucionalPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="pt-20 sm:pt-16">
        <section className="apple-module apple-module--ink px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-[1180px]"><div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent"><ShieldCheck size={16} aria-hidden="true" /> Información institucional</div><h1 className="display-title mt-6 max-w-4xl text-5xl leading-[0.92] sm:text-8xl">Currículum <span className="text-accent">institucional</span></h1><p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">La información que explica quiénes somos, a quiénes acompañamos, qué hacemos, cuáles son nuestras metas y qué hemos construido con las comunidades.</p><nav aria-label="Secciones del currículum institucional" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/70"><a href="#proposito" className="focus-ring rounded py-2 hover:text-accent">Propósito</a><a href="#objetivos" className="focus-ring rounded py-2 hover:text-accent">Trabajo</a><a href="#solidaridad" className="focus-ring rounded py-2 hover:text-accent">Donaciones</a><a href="#historia" className="focus-ring rounded py-2 hover:text-accent">Historia</a></nav></div>
        </section>

        <section id="proposito" className="apple-module apple-module--paper px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow">Quiénes somos</p><h2 className="display-title mt-5 text-4xl sm:text-6xl">Una asociación que acompaña procesos</h2><p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">{foundationMission}</p></div><div className="rounded-[2rem] bg-mist p-7 sm:p-10"><p className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary">Nuestra visión</p><p className="mt-5 text-xl leading-9 text-ink/80">{foundationVision}</p><div className="mt-8 border-t border-ink/10 pt-7"><p className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary">Valores que orientan el trabajo</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{foundationValues.map((value) => <div key={value.title}><h3 className="font-extrabold">{value.title}</h3><p className="mt-1 text-sm leading-6 text-ink/65">{value.description}</p></div>)}</div></div></div></div></div></section>

        <section id="objetivos" className="apple-module apple-module--mist px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="eyebrow">Objetivos de trabajo</p><h2 className="display-title mt-5 text-4xl sm:text-6xl">Ayuda que se convierte en oportunidades</h2><p className="mt-6 text-lg leading-8 text-ink/70">Atendemos necesidades concretas y fortalecemos las capacidades de las personas y comunidades que participan.</p></div><div className="grid gap-5 sm:grid-cols-2">{foundationWorkAreas.map((area, index) => <article key={area.title} className="apple-card bg-white p-6"><span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 text-xl font-extrabold">{area.title}</h3><p className="mt-2 text-sm leading-6 text-ink/65">{area.description}</p></article>)}</div></div><div id="beneficiarios" className="mt-16 scroll-mt-32 border-t border-ink/15 pt-10"><h2 className="text-2xl font-black">A quiénes acompañamos</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{foundationBeneficiaries.map((beneficiary) => <article key={beneficiary.title} className="apple-card bg-white p-6"><h3 className="font-extrabold">{beneficiary.title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{beneficiary.description}</p></article>)}</div><div className="mt-5 rounded-2xl bg-white p-6"><h3 className="font-extrabold">Derechos que cuidamos</h3><ul className="mt-4 grid gap-3 text-sm leading-6 text-ink/70 sm:grid-cols-2">{foundationRights.map((right) => <li key={right} className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span>{right}</li>)}</ul></div></div></div></section>

        <section id="metas" className="apple-module apple-module--paper px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><p className="eyebrow">Metas de desarrollo</p><h2 className="display-title mt-5 max-w-3xl text-4xl sm:text-6xl">Nuestro trabajo se conecta con objetivos públicos</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">{foundationGeneralObjective}</p><div className="mt-10 flex flex-wrap gap-3">{foundationODS.map((objective) => <span key={objective} className="rounded-full border border-ink/15 bg-mist px-5 py-3 text-sm font-bold">{objective}</span>)}</div><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{foundationSpecificObjectives.map((objective) => <article key={objective.title} className="apple-card bg-mist p-6"><h3 className="font-extrabold">{objective.title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{objective.description}</p></article>)}</div></div></section>

        <section id="solidaridad" className="apple-module apple-module--mist px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><p className="eyebrow">Memoria de actividades</p><h2 className="display-title mt-5 max-w-3xl text-4xl sm:text-6xl">La solidaridad se vuelve acción</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">La asociación conserva una memoria pública de campañas de donación, acompañamiento comunitario y colaboración con colectivos locales. Recuperamos del archivo editorial las acciones que ya tienen fecha, imagen y una memoria pública para que puedan consultarse con claridad.</p><div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-ink/65"><span className="rounded-full bg-white px-4 py-2 ring-1 ring-ink/10">{foundationInitiatives.length} acciones documentadas</span><span className="rounded-full bg-white px-4 py-2 ring-1 ring-ink/10">{foundationDonationYears[0]}–{foundationDonationYears[foundationDonationYears.length - 1]}</span><span className="rounded-full bg-white px-4 py-2 ring-1 ring-ink/10">Archivo WordPress recuperado</span></div><div className="mt-12 space-y-14">{foundationTimeline.map(({ year, initiatives }) => <section key={year} aria-labelledby={`donaciones-${year}`} className="relative border-l-2 border-primary/20 pl-6 sm:pl-10"><span aria-hidden="true" className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary ring-4 ring-mist" /><div className="flex flex-wrap items-baseline gap-x-5 gap-y-2"><h3 id={`donaciones-${year}`} className="display-title text-4xl sm:text-5xl">{year}</h3><p className="text-sm font-bold text-ink/55">{initiatives.length} {initiatives.length === 1 ? "registro" : "registros"} en el archivo</p></div><ol className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{initiatives.map((initiative) => <li key={initiative.id}><InitiativeCard initiative={initiative} /></li>)}</ol></section>)}</div><Link href="/donacion" className="focus-ring mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white hover:bg-ink">Conocer cómo apoyar <ArrowUpRight size={18} /></Link></div></section>

        <section id="historia" className="apple-module apple-module--paper px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px] grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><p className="eyebrow">Trayectoria institucional</p><h2 className="display-title mt-5 text-4xl leading-tight sm:text-6xl">Una historia que sigue creciendo</h2><p className="mt-6 text-lg leading-8 text-ink/70">Nuestras raíces están en la educación escultista. Con el tiempo, el proyecto amplió su mirada hacia el trabajo cultural, asistencial y comunitario.</p><Link href="/cde" className="focus-ring mt-6 inline-flex items-center gap-2 rounded py-2 font-bold text-primary">Conocer los CDE <ArrowUpRight size={17} /></Link></div><ol className="divide-y divide-ink/15 border-t border-ink/15">{foundationMilestones.map((item) => <li key={item.year} className="grid grid-cols-[4.5rem_1fr] gap-4 py-7 sm:grid-cols-[5.5rem_1fr]"><span className="text-2xl font-extrabold text-primary">{item.year}</span><div><h3 className="text-lg font-extrabold">{item.title}</h3><p className="mt-3 text-base leading-7 text-ink/70">{item.text}</p></div></li>)}</ol></div></section>

      </main>
      <SiteFooter />
    </>
  );
}
