import Image from "next/image";
import { GraduationCap } from "lucide-react";
import type { CDEEducator } from "@/content/cdes/types";

export function MemberCard({ educator }: { educator: CDEEducator }) {
  return (
    <article aria-label={`${educator.name}, ${educator.role}`} className="h-full overflow-hidden rounded-[1.7rem] border border-ink/10 bg-paper shadow-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Image
          src={educator.image}
          alt={`Foto de ${educator.name}, ${educator.role}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 384px"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{educator.name}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-primary">
          <GraduationCap size={19} className="shrink-0" aria-hidden="true" />
          {educator.role}
        </p>
        {educator.community && (
          <span className="mt-4 inline-flex rounded-full bg-mist px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-secondary">{educator.community}</span>
        )}
        {educator.bio && <p className="mt-3 text-sm leading-6 text-ink/60">{educator.bio}</p>}
        {!!educator.interests?.length && (
          <div className="mt-5 flex flex-wrap gap-2">
            {educator.interests.map((interest) => <span key={interest} className="rounded-full bg-mist px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-secondary">{interest}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}
