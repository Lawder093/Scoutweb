import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import type { LegalBlock, LegalPage } from "@/content/legal";

function renderText(text: string) {
  return text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < text.split("\n").length - 1 ? <br /> : null}
    </span>
  ));
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "lead") {
    return <p className="text-lg font-medium leading-8 text-ink/75 sm:text-xl">{renderText(block.text)}</p>;
  }

  if (block.type === "quote") {
    return (
      <blockquote className="rounded-[1.75rem] border-l-4 border-accent bg-accent/10 px-6 py-5 text-xl font-semibold leading-8 text-ink sm:px-8 sm:py-7 sm:text-2xl">
        <p>“{block.text}”</p>
        {block.cite ? <cite className="mt-3 block text-sm font-bold not-italic uppercase tracking-[0.16em] text-ink/55">{block.cite}</cite> : null}
      </blockquote>
    );
  }

  if (block.type === "heading") {
    const className = block.level === 3
      ? "mt-9 text-xl font-black tracking-[-0.02em] text-ink sm:text-2xl"
      : "mt-12 text-2xl font-black tracking-[-0.03em] text-ink first:mt-0 sm:text-3xl";
    return block.level === 3 ? <h3 className={className}>{block.text}</h3> : <h2 className={className}>{block.text}</h2>;
  }

  if (block.type === "paragraph") {
    return <p className="text-[15px] leading-8 text-ink/72 sm:text-base">{renderText(block.text)}</p>;
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";
    const listStyle = block.style === "upper-roman" ? "list-[upper-roman]" : "list-decimal";
    return (
      <ListTag className={`space-y-3 pl-6 text-[15px] leading-8 text-ink/72 sm:text-base ${block.ordered ? listStyle : "list-disc"}`}>
        {block.items.map((item) => <li key={item}>{renderText(item)}</li>)}
      </ListTag>
    );
  }

  return (
    <a href={block.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 rounded-2xl border border-ink/10 bg-white px-5 py-4 text-sm font-bold text-secondary shadow-[0_12px_30px_rgba(28,25,23,0.06)] transition hover:-translate-y-0.5 hover:border-secondary/30 hover:text-primary focus-ring sm:px-6">
      <span className="flex min-w-0 items-center gap-3"><FileText size={18} className="shrink-0 text-primary" /><span>{block.label}</span></span>
      <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-ink px-4 pb-14 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-[980px]">
          <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent"><ShieldCheck size={16} /> Información institucional</div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.055em] sm:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{page.summary}</p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Contenido local · última revisión editorial: {page.lastReviewed}</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[820px]">
          <div className="space-y-7">
            {page.blocks.map((block, index) => <LegalBlockView block={block} key={`${block.type}-${index}`} />)}
          </div>
          <div className="mt-16 border-t border-ink/10 pt-6 text-sm leading-7 text-ink/55">
            <p>Esta versión se presenta como contenido local del proyecto. Consulta la fuente original para verificar documentos externos y cualquier actualización legal.</p>
            <a href={page.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-bold text-secondary hover:text-primary focus-ring">Ver fuente original <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
