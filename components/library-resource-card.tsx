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
    <article className={`group relative flex min-h-[300px] min-w-0 flex-col overflow-hidden rounded-[1.6rem] ${toneClasses[resource.tone]} p-5 transition-transform hover:-translate-y-1 sm:min-h-[350px] sm:p-7`}>
      <div className="flex items-start justify-between">
        <span className="text-3xl font-black opacity-20">{String(resource.displayOrder).padStart(2, "0")}</span>
        <BookOpen size={21} strokeWidth={1.6} />
      </div>
      {resource.coverImageUrl ? (
        <Image src={resource.coverImageUrl} alt="" fill className="absolute inset-0 -z-0 object-cover opacity-20" sizes="(max-width: 768px) 50vw, 33vw" />
      ) : (
        <div className="absolute -right-6 top-16 h-28 w-28 rounded-full border-[18px] border-current opacity-10" aria-hidden="true" />
      )}
      <div className="relative z-10 mt-auto">
        <p className="break-words text-[10px] font-extrabold uppercase tracking-[0.13em] opacity-60">{resource.creator}</p>
        <h3 className={`display-title mt-3 break-words leading-[0.95] ${compact ? "text-2xl" : "text-2xl sm:text-3xl"}`}>{resource.title}</h3>
        {!compact && <p className="mt-4 max-w-sm text-sm leading-6 opacity-70">{resource.description}</p>}
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={readerUrl} className="focus-ring inline-flex items-center gap-1 rounded-full bg-paper/20 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors hover:bg-paper/35">
            Leer <ArrowUpRight size={13} />
          </Link>
          {resource.downloadUrl ? (
            <a href={resource.downloadUrl} download className="focus-ring inline-flex items-center gap-1 rounded-full border border-current/25 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors hover:bg-paper/20">
              <ArrowDownToLine size={13} /> Descargar
            </a>
          ) : (
            <span title="El archivo se publicará próximamente" className="inline-flex cursor-not-allowed items-center gap-1 rounded-full border border-current/15 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] opacity-45">
              <ArrowDownToLine size={13} /> Descargar
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
