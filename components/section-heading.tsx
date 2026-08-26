import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, description, align = "left", dark = false, headingLevel = "h2" }: { eyebrow: string; title: ReactNode; description?: string; align?: "left" | "center"; dark?: boolean; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${align === "center" ? "justify-center" : ""} ${dark ? "text-accent" : ""}`}>{eyebrow}</span>
      <Heading className={`display-title mt-5 break-words text-4xl leading-[0.98] sm:text-5xl md:text-6xl ${dark ? "text-white" : "text-ink"}`}>{title}</Heading>
      {description && <p className={`mt-5 max-w-xl text-base leading-7 sm:text-lg ${dark ? "text-white/65" : "text-ink/65"}`}>{description}</p>}
    </div>
  );
}
