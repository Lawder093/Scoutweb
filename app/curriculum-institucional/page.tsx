import type { Metadata } from "next";
import { ArrowUpRight, FileText, HeartHandshake, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InstitutionalMosaicBoard } from "@/components/institutional-mosaic-board";
import { foundationBankDetails, foundationBeneficiaries, foundationGeneralObjective, foundationInitiatives, foundationMission, foundationODS, foundationRights, foundationSpecificObjectives, foundationValues, foundationVision, foundationWorkAreas, foundationMilestones } from "@/content/foundation";
import { getLegalPage } from "@/content/legal";
import type { LegalBlock } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Currículum institucional",
  description: "Presentación, historia, objetivos, donaciones, documentos y transparencia de la Comunidad Crítica de Escultismo Popular, A. C.",
  path: "/curriculum-institucional",
});

export const revalidate = 300;

const transparencyPage = getLegalPage("transparencia");
const transparencyLinks = transparencyPage?.blocks.filter((block): block is Extract<LegalBlock, { type: "link" }> => block.type === "link") ?? [];
const documentYear = (link: Extract<LegalBlock, { type: "link" }>) => {
  const years = `${link.label} ${link.href}`.match(/\b20\d{2}\b/g)?.map(Number) ?? [];
  return years.length > 0 ? Math.max(...years) : 0;
};
const transparencyPdfLinks = transparencyLinks
  .filter((link) => link.href.includes("drive.google.com") || /\.pdf(?:$|[?#])/i.test(link.label) || /\.pdf(?:$|[?#])/i.test(link.href))
  .sort((a, b) => documentYear(b) - documentYear(a) || a.label.localeCompare(b.label, "es"));
const transparencyOtherLinks = transparencyLinks.filter((link) => !transparencyPdfLinks.includes(link));

function PdfPreviewCard({ label, href }: { label: string; href: string }) {
  const viewerUrl = `${href}#page=1&view=FitH`;

  return (
    <article className="apple-card overflow-hidden rounded-[1.5rem] bg-white/10 ring-1 ring-white/10">
      <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <FileText size={19} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <div className="min-w-0"><h3 className="text-sm font-bold leading-6 text-white sm:text-base">{label}</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">PDF · visor integrado</p></div>
        </div>
        <a href={href} target="_blank" rel="noreferrer" className="focus-ring shrink-0 rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white transition hover:border-accent hover:text-accent">Abrir</a>
      </div>
      <div className="bg-white p-2 sm:p-3"><iframe src={viewerUrl} title={`Vista previa del PDF: ${label}`} loading="eager" className="block h-[380px] w-full rounded-xl border border-ink/10 bg-white sm:h-[520px]" /></div>
      <p className="px-5 py-3 text-xs leading-5 text-white/60 sm:px-6">Desplázate dentro del visor para recorrer las páginas. También puedes abrirlo en otra pestaña para descargarlo.</p>
    </article>
  );
}

export default function CurriculumInstitucionalPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="pt-20 sm:pt-16">
        <section className="apple-module apple-module--ink px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-[1180px]"><div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent"><ShieldCheck size={16} aria-hidden="true" /> Información institucional</div><h1 className="display-title mt-6 max-w-4xl text-5xl leading-[0.92] sm:text-8xl">Currículum <span className="text-accent">institucional</span></h1><p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">La información que explica quiénes somos, a quiénes acompañamos, qué hacemos, cuáles son nuestras metas, qué hemos donado y cómo rendimos cuentas.</p><nav aria-label="Secciones del currículum institucional" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/70"><a href="#proposito" className="focus-ring rounded py-2 hover:text-accent">Propósito</a><a href="#objetivos" className="focus-ring rounded py-2 hover:text-accent">Trabajo</a><a href="#solidaridad" className="focus-ring rounded py-2 hover:text-accent">Donaciones</a><a href="#historia" className="focus-ring rounded py-2 hover:text-accent">Historia</a><a href="#transparencia" className="focus-ring rounded py-2 hover:text-accent">Transparencia</a></nav></div>
        </section>

        <InstitutionalMosaicBoard />

        <section id="proposito" className="apple-module apple-module--paper px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><div className="grid gap-10 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow">Quiénes somos</p><h2 className="display-title mt-5 text-4xl sm:text-6xl">Una asociación que acompaña procesos</h2><p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">{foundationMission}</p></div><div className="rounded-[2rem] bg-mist p-7 sm:p-10"><p className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary">Nuestra visión</p><p className="mt-5 text-xl leading-9 text-ink/80">{foundationVision}</p><div className="mt-8 border-t border-ink/10 pt-7"><p className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary">Valores que orientan el trabajo</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{foundationValues.map((value) => <div key={value.title}><h3 className="font-extrabold">{value.title}</h3><p className="mt-1 text-sm leading-6 text-ink/65">{value.description}</p></div>)}</div></div></div></div></div></section>

        <section id="objetivos" className="apple-module apple-module--mist px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><p className="eyebrow">Objetivos de trabajo</p><h2 className="display-title mt-5 text-4xl sm:text-6xl">Ayuda que se convierte en oportunidades</h2><p className="mt-6 text-lg leading-8 text-ink/70">Atendemos necesidades concretas y fortalecemos las capacidades de las personas y comunidades que participan.</p></div><div className="grid gap-5 sm:grid-cols-2">{foundationWorkAreas.map((area, index) => <article key={area.title} className="apple-card bg-white p-6"><span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 text-xl font-extrabold">{area.title}</h3><p className="mt-2 text-sm leading-6 text-ink/65">{area.description}</p></article>)}</div></div><div id="beneficiarios" className="mt-16 scroll-mt-32 border-t border-ink/15 pt-10"><h2 className="text-2xl font-black">A quiénes acompañamos</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{foundationBeneficiaries.map((beneficiary) => <article key={beneficiary.title} className="apple-card bg-white p-6"><h3 className="font-extrabold">{beneficiary.title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{beneficiary.description}</p></article>)}</div><div className="mt-5 rounded-2xl bg-white p-6"><h3 className="font-extrabold">Derechos que cuidamos</h3><ul className="mt-4 grid gap-3 text-sm leading-6 text-ink/70 sm:grid-cols-2">{foundationRights.map((right) => <li key={right} className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span>{right}</li>)}</ul></div></div></div></section>

        <section id="metas" className="apple-module apple-module--paper px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><p className="eyebrow">Metas de desarrollo</p><h2 className="display-title mt-5 max-w-3xl text-4xl sm:text-6xl">Nuestro trabajo se conecta con objetivos públicos</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">{foundationGeneralObjective}</p><div className="mt-10 flex flex-wrap gap-3">{foundationODS.map((objective) => <span key={objective} className="rounded-full border border-ink/15 bg-mist px-5 py-3 text-sm font-bold">{objective}</span>)}</div><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{foundationSpecificObjectives.map((objective) => <article key={objective.title} className="apple-card bg-mist p-6"><h3 className="font-extrabold">{objective.title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{objective.description}</p></article>)}</div></div></section>

        <section id="solidaridad" className="apple-module apple-module--mist px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px]"><p className="eyebrow">Memoria de actividades</p><h2 className="display-title mt-5 max-w-3xl text-4xl sm:text-6xl">La solidaridad se vuelve acción</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-ink/70">La asociación conserva una memoria pública de campañas de donación, acompañamiento comunitario y colaboración con colectivos locales. Estas son algunas de las acciones documentadas.</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{foundationInitiatives.map((initiative) => <article key={initiative.title} className="apple-card bg-white p-6"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{initiative.place}</p><h3 className="mt-3 font-extrabold">{initiative.title}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{initiative.description}</p><Link href={initiative.sourcePath} className="focus-ring mt-5 inline-flex items-center gap-2 rounded font-bold text-primary hover:text-ink">Ver memoria <ArrowUpRight size={15} /></Link></article>)}</div><Link href="/donacion" className="focus-ring mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white hover:bg-ink">Conocer cómo apoyar <ArrowUpRight size={18} /></Link></div></section>

        <section id="historia" className="apple-module apple-module--paper px-4 py-16 sm:px-6 sm:py-24"><div className="mx-auto max-w-[1180px] grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20"><div><p className="eyebrow">Trayectoria institucional</p><h2 className="display-title mt-5 text-4xl leading-tight sm:text-6xl">Una historia que sigue creciendo</h2><p className="mt-6 text-lg leading-8 text-ink/70">Nuestras raíces están en la educación escultista. Con el tiempo, el proyecto amplió su mirada hacia el trabajo cultural, asistencial y comunitario.</p><Link href="/cde" className="focus-ring mt-6 inline-flex items-center gap-2 rounded py-2 font-bold text-primary">Conocer los CDE <ArrowUpRight size={17} /></Link></div><ol className="divide-y divide-ink/15 border-t border-ink/15">{foundationMilestones.map((item) => <li key={item.year} className="grid grid-cols-[4.5rem_1fr] gap-4 py-7 sm:grid-cols-[5.5rem_1fr]"><span className="text-2xl font-extrabold text-primary">{item.year}</span><div><h3 className="text-lg font-extrabold">{item.title}</h3><p className="mt-3 text-base leading-7 text-ink/70">{item.text}</p></div></li>)}</ol></div></section>

        <section id="transparencia" className="apple-module apple-module--primary px-4 py-16 text-white sm:px-6 sm:py-24" data-glass-tone="dark"><div className="mx-auto max-w-[1180px]"><div className="max-w-3xl"><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-accent">Documentos públicos</p><h2 className="display-title mt-5 text-4xl sm:text-6xl">Transparencia para participar con confianza</h2><p className="mt-6 text-lg leading-8 text-white/80">Aquí reunimos los informes institucionales, declaraciones y documentos públicos que antes estaban separados. Cada PDF se puede leer directamente dentro de su propia caja, con desplazamiento por páginas.</p></div><div className="mt-10 grid gap-6 lg:grid-cols-[.72fr_1.28fr]"><aside className="apple-card self-start rounded-[1.5rem] bg-white/10 p-6 ring-1 ring-white/10 sm:p-7"><div className="flex items-center gap-3 text-accent"><Landmark size={22} aria-hidden="true" /><span className="text-xs font-extrabold uppercase tracking-[0.14em]">Apoyo por transferencia</span></div><h3 className="display-title mt-6 text-3xl">Donar con claridad</h3><p className="mt-4 text-sm leading-6 text-white/75">Confirma la vigencia de los datos con la asociación antes de transferir y solicita la información fiscal que corresponda.</p><dl className="mt-7 space-y-4 border-t border-white/15 pt-6 text-sm"><div><dt className="text-white/55">Cuenta</dt><dd className="mt-1 font-mono text-xl font-bold text-accent">{foundationBankDetails.account}</dd></div><div><dt className="text-white/55">CLABE</dt><dd className="mt-1 break-all font-mono text-lg font-bold text-accent">{foundationBankDetails.clabe}</dd></div></dl><Link href="/donacion" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink">Ver formas de donar <ArrowUpRight size={16} /></Link></aside><div className="grid gap-6 md:grid-cols-2">{transparencyPdfLinks.map((link) => <PdfPreviewCard key={link.href} label={link.label} href={link.href} />)}</div></div>{transparencyOtherLinks.length > 0 ? <div className="mt-10"><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-accent">Fuentes externas</p><div className="mt-4 grid gap-4 md:grid-cols-2">{transparencyOtherLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="focus-ring group flex items-center justify-between gap-5 rounded-2xl bg-white/10 px-5 py-5 transition hover:bg-white/15"><span className="flex min-w-0 items-center gap-3"><FileText size={18} className="shrink-0 text-accent" /><span className="text-sm font-bold">{link.label}</span></span><ArrowUpRight size={18} className="shrink-0 text-accent" /></a>)}</div></div> : null}<div className="mt-10 flex flex-wrap gap-4"><Link href="/biblioteca" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-extrabold text-ink hover:bg-white">Consultar todos los recursos <ArrowUpRight size={17} /></Link><Link href="/legal/donataria-donaciones" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/10">Información fiscal y donaciones <ArrowUpRight size={17} /></Link></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
