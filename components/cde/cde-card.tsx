import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CDEData } from "@/content/cdes/types";
import { BrandMark } from "@/components/brand-mark";

type CDECardProps = {
  cde: CDEData;
  index: number;
};

export function CDECard({ cde, index }: CDECardProps) {
  return (
    <Link href={`/cde/${cde.slug}`} className="focus-ring group block h-full rounded-[1.75rem]">
      <article className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft">
        <div className="relative flex min-h-[132px] items-end justify-between overflow-hidden bg-ink p-6 text-white">
          <div className="absolute -right-10 -top-16 h-36 w-36 rounded-full border border-white/20" aria-hidden="true" />
          <div className="absolute -bottom-20 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full border border-white/10" aria-hidden="true" />
          <div className="relative flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper p-1.5 shadow-lg">
              <BrandMark size={34} decorative />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">0{index + 1}</span>
          </div>
          <span className="relative rounded-full border border-white/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white/90">
            {cde.country}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-secondary">{cde.region}</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{cde.communityName}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-ink/65">{cde.description}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-secondary transition-colors group-hover:text-primary">
            Conocer el CDE <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}
