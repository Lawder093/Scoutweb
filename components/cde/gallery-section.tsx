import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "./gallery-grid";
import type { CDEData } from "@/content/cdes/types";

export function GallerySection({ cde }: { cde: CDEData }) {
  return <section className="bg-mist py-20 sm:py-28"><div className="section-shell"><Reveal><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><span className="eyebrow">Galería</span><h2 className="display-title mt-5 text-4xl leading-none sm:text-5xl">Lo que pasa<br /><span className="text-secondary">cuando nos encontramos.</span></h2></div><p className="max-w-sm text-sm leading-6 text-ink/60">Imágenes placeholder listas para conectarse más adelante a una galería dinámica.</p></div></Reveal><Reveal delay={0.1} className="mt-12"><GalleryGrid items={cde.gallery} /></Reveal></div></section>;
}
