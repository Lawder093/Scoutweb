import Link from "next/link";
import { BookOpen, Globe2, HandHeart, HeartHandshake, Music2, Store } from "lucide-react";
import { homeMosaics, type HomeMosaic } from "@/content/home-mosaics";

const icons = { heart: HeartHandshake, globe: Globe2, book: BookOpen, store: Store, music: Music2, hand: HandHeart } as const;
const toneClasses: Record<HomeMosaic["tone"], string> = {
  primary: "bg-primary text-white",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-white",
  accent: "bg-accent text-ink",
};

export function HomeMosaicBoard() {
  return (
    <section id="mosaicos" className="apple-module apple-module--paper py-16 sm:py-24" aria-labelledby="mosaicos-title">
      <div className="section-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Explora el proyecto</p>
            <h2 id="mosaicos-title" className="display-title mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">Cada parte de la comunidad tiene su propio espacio</h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-ink/65">Organizamos el sitio en módulos para que puedas encontrar una historia, un territorio o una forma de participar con claridad.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeMosaics.map((mosaic) => {
            const Icon = icons[mosaic.icon];
            return <Link key={mosaic.id} href={mosaic.href} className={`home-mosaic-card apple-card focus-ring group rounded-[1.75rem] p-6 sm:p-7 ${toneClasses[mosaic.tone]} ${mosaic.span === "wide" ? "lg:col-span-2" : ""}`}>
              <div><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-current/15" aria-hidden="true"><Icon size={21} strokeWidth={1.8} /></span></div>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.15em] opacity-70">{mosaic.eyebrow}</p>
              <h3 className="mt-3 max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl">{mosaic.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 opacity-75">{mosaic.description}</p>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
