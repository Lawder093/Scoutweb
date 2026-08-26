import { CheckCircle2 } from "lucide-react";
import type { CDETimelineItem } from "@/content/cdes/types";

export function Timeline({ items }: { items: CDETimelineItem[] }) {
  return <div className="relative space-y-5 before:absolute before:bottom-5 before:left-[15px] before:top-5 before:w-px before:bg-primary/20">{items.map((item) => <div key={`${item.year}-${item.title}`} className="relative flex min-w-0 gap-4"><span className="relative z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white"><CheckCircle2 size={16} /></span><div className="min-w-0 rounded-2xl border border-ink/10 bg-paper p-5"><p className="text-xs font-black uppercase tracking-[0.15em] text-primary">{item.year}</p><h3 className="mt-2 break-words text-lg font-extrabold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{item.text}</p></div></div>)}</div>;
}
