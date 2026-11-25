import { ArrowUpRight, FileText, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { foundationBankDetails } from "@/content/foundation";
import { getLegalPage } from "@/content/legal";
import type { LegalBlock } from "@/content/legal";

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
          <div className="min-w-0"><h2 className="text-sm font-bold leading-6 text-white sm:text-base">{label}</h2><p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">PDF · visor integrado</p></div>
        </div>
        <a href={href} target="_blank" rel="noreferrer" className="focus-ring shrink-0 rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white transition hover:border-accent hover:text-accent">Abrir</a>
      </div>
      <div className="bg-white p-2 sm:p-3"><iframe src={viewerUrl} title={`Vista previa del PDF: ${label}`} loading="eager" className="block h-[380px] w-full rounded-xl border border-ink/10 bg-white sm:h-[520px]" /></div>
      <p className="px-5 py-3 text-xs leading-5 text-white/60 sm:px-6">Desplázate dentro del visor para recorrer las páginas. También puedes abrirlo en otra pestaña para descargarlo.</p>
    </article>
  );
}

export function TransparencyPage() {
  return (
    <main id="contenido-principal" tabIndex={-1} className="pt-20 sm:pt-16">
      <section className="apple-module apple-module--primary px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-24 sm:pt-32" data-glass-tone="dark">
        <div className="mx-auto max-w-[1180px]"><div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent"><ShieldCheck size={16} aria-hidden="true" /> Información pública</div><h1 className="display-title mt-6 max-w-4xl text-5xl leading-[0.92] sm:text-8xl">Transparencia <span className="text-accent">para participar</span></h1><p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">Informes institucionales, declaraciones, documentos fiscales, datos públicos y formas claras de conocer el trabajo de la asociación.</p><nav aria-label="Secciones de transparencia" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-white/70"><a href="#documentos" className="focus-ring rounded py-2 hover:text-accent">Documentos públicos</a><a href="#donar" className="focus-ring rounded py-2 hover:text-accent">Datos para donar</a><a href="#recursos" className="focus-ring rounded py-2 hover:text-accent">Recursos relacionados</a></nav></div>
      </section>

      <section id="documentos" className="apple-module apple-module--primary px-4 pb-16 text-white sm:px-6 sm:pb-24" data-glass-tone="dark"><div className="mx-auto max-w-[1180px]"><div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]"><aside id="donar" className="apple-card self-start rounded-[1.5rem] bg-white/10 p-6 ring-1 ring-white/10 sm:p-7"><div className="flex items-center gap-3 text-accent"><Landmark size={22} aria-hidden="true" /><span className="text-xs font-extrabold uppercase tracking-[0.14em]">Apoyo por transferencia</span></div><h2 className="display-title mt-6 text-3xl">Donar con claridad</h2><p className="mt-4 text-sm leading-6 text-white/75">Confirma la vigencia de los datos con la asociación antes de transferir y solicita la información fiscal que corresponda.</p><dl className="mt-7 space-y-4 border-t border-white/15 pt-6 text-sm"><div><dt className="text-white/55">Cuenta</dt><dd className="mt-1 font-mono text-xl font-bold text-accent">{foundationBankDetails.account}</dd></div><div><dt className="text-white/55">CLABE</dt><dd className="mt-1 break-all font-mono text-lg font-bold text-accent">{foundationBankDetails.clabe}</dd></div></dl><Link href="/donacion" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink">Ver formas de donar <ArrowUpRight size={16} /></Link></aside><div><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-accent">Informes y declaraciones</p><h2 className="display-title mt-4 text-4xl sm:text-5xl">Documentos públicos</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">Aquí reunimos los informes institucionales, declaraciones y documentos que antes estaban distribuidos entre distintas secciones de WordPress. Cada PDF se puede leer directamente dentro de su propia caja.</p><div className="mt-8 grid gap-6 md:grid-cols-2">{transparencyPdfLinks.map((link) => <PdfPreviewCard key={link.href} label={link.label} href={link.href} />)}</div></div></div>{transparencyOtherLinks.length > 0 ? <div id="recursos" className="mt-10"><p className="text-sm font-extrabold uppercase tracking-[0.16em] text-accent">Fuentes externas</p><div className="mt-4 grid gap-4 md:grid-cols-2">{transparencyOtherLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="focus-ring group flex items-center justify-between gap-5 rounded-2xl bg-white/10 px-5 py-5 transition hover:bg-white/15"><span className="flex min-w-0 items-center gap-3"><FileText size={18} className="shrink-0 text-accent" /><span className="text-sm font-bold">{link.label}</span></span><ArrowUpRight size={18} className="shrink-0 text-accent" /></a>)}</div></div> : null}<div className="mt-10 flex flex-wrap gap-4"><Link href="/biblioteca" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-extrabold text-ink hover:bg-white">Consultar todos los recursos <ArrowUpRight size={17} /></Link><Link href="/legal/donataria-donaciones" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/10">Información fiscal y donaciones <ArrowUpRight size={17} /></Link></div></div></section>
    </main>
  );
}
