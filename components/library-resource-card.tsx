import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, BookOpen } from "lucide-react";
import type { ContentTone, LibraryResource } from "@/lib/content/types";

const toneClasses: Record<ContentTone, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent text-ink",
  ink: "bg-ink text-white",
  mist: "bg-mist text-ink",
};

export function LibraryResourceCard({ resource, compact = false }: { resource: LibraryResource; compact?: boolean }) {
  const readerUrl = resource.readerUrl ?? `/biblioteca/${resource.slug}#lector-pdf`;

  if (!compact) {
    return (
      <article className="group flex flex-col gap-5 rounded-[1.6rem] border border-ink/10 bg-paper p-4 shadow-card transition-shadow hover:shadow-soft sm:flex-row sm:items-center sm:p-5">
        <Link href={readerUrl} aria-label={`Abrir vista previa de ${resource.title}`} className="focus-ring flex min-w-0 flex-1 flex-col gap-5 rounded-xl sm:flex-row sm:items-center">
          <div className={`relative h-24 w-full shrink-0 overflow-hidden rounded-[1.15rem] ${toneClasses[resource.tone]} sm:h-28 sm:w-40`}>
            {resource.coverImageUrl ? <Image src={resource.coverImageUrl} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 160px" /> : <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full border-[18px] border-current opacity-15" aria-hidden="true" />}
            <span className="absolute bottom-3 left-3 text-2xl font-black opacity-75">{String(resource.displayOrder).padStart(2, "0")}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-words text-[10px] font-extrabold uppercase tracking-[0.13em] text-ink/50">{resource.creator}</p>
            <h3 className="display-title mt-2 break-words text-2xl leading-[0.95] text-ink sm:text-3xl">{resource.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/60">{resource.description}</p>
            {resource.categories.length > 0 && <p className="mt-3 text-xs font-bold text-ink/45">{resource.categories.join(" · ")}</p>}
          </div>
        </Link>
        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
          <Link href={readerUrl} className="focus-ring inline-flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white transition-colors hover:bg-secondary">
            Leer <ArrowUpRight size={13} />
          </Link>
          {resource.downloadUrl ? <a href={resource.downloadUrl} download className="focus-ring inline-flex items-center justify-center gap-1 rounded-full border border-ink/15 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-primary/40 hover:text-primary"><ArrowDownToLine size={13} /> Descargar</a> : <span title="El archivo se publicará próximamente" className="inline-flex cursor-not-allowed items-center justify-center gap-1 rounded-full border border-ink/10 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink/35"><ArrowDownToLine size={13} /> Descargar</span>}
        </div>
      </article>
    );
  }

  return (
    <article className="group min-w-0">
      <Link href={readerUrl} aria-label={`Abrir vista previa de ${resource.title}`} className="focus-ring block rounded-[1.35rem]">
        <div className={`relative aspect-[0.72] overflow-hidden rounded-[1.35rem] ${toneClasses[resource.tone]} shadow-card ring-1 ring-ink/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-soft`}>
          {resource.coverImageUrl ? <Image src={resource.coverImageUrl} alt="" fill className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 220px" /> : <><div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border-[18px] border-current opacity-15" aria-hidden="true" /><BookOpen className="absolute bottom-5 right-5 opacity-20" size={48} strokeWidth={1.2} aria-hidden="true" /></>}
          <span className="absolute left-4 top-4 text-2xl font-black opacity-35">{String(resource.displayOrder).padStart(2, "0")}</span>
        </div>
        <div className="mt-4 px-1">
          <p className="break-words text-[10px] font-extrabold uppercase tracking-[0.13em] text-ink/50">{resource.creator}</p>
          <h3 className="display-title mt-2 line-clamp-3 break-words text-xl leading-[0.98] text-ink sm:text-2xl">{resource.title}</h3>
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-secondary">Leer <ArrowUpRight size={13} /></p>
        </div>
      </Link>
    </article>
  );
}
