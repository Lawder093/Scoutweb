import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, description, dark = false }: { eyebrow: string; title: ReactNode; description?: string; dark?: boolean }) {
  return <div className="max-w-2xl"><span className={`eyebrow ${dark ? "text-accent" : ""}`}>{eyebrow}</span><h2 className={`display-title mt-5 break-words text-4xl leading-[0.94] sm:text-5xl md:text-6xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>{description && <p className={`mt-5 max-w-xl text-base leading-7 sm:text-lg ${dark ? "text-white/65" : "text-ink/65"}`}>{description}</p>}</div>;
}
