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
  const readerUrl = resource.readerUrl ?? `/biblioteca/${resource.slug}`;

  return (
    <article className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.6rem] ${toneClasses[resource.tone]} p-5 transition-transform hover:-translate-y-1 sm:min-h-[350px] sm:p-7`}>
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
        <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] opacity-60">{resource.creator}</p>
        <h3 className={`display-title mt-3 leading-[0.95] ${compact ? "text-2xl" : "text-2xl sm:text-3xl"}`}>{resource.title}</h3>
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
