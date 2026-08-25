import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BookOpen, Flag, Shirt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { storeProducts, type StoreProduct } from "@/content/store/products";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const productIcons: Record<StoreProduct["category"], LucideIcon> = {
  Identidad: Flag,
  Vestimenta: Shirt,
  Materiales: BookOpen,
};

const toneClasses: Record<StoreProduct["tone"], { panel: string; icon: string; text: string }> = {
  primary: { panel: "bg-primary", icon: "bg-accent text-ink", text: "text-white" },
  secondary: { panel: "bg-secondary", icon: "bg-white text-secondary", text: "text-white" },
  accent: { panel: "bg-accent", icon: "bg-ink text-white", text: "text-ink" },
  ink: { panel: "bg-ink", icon: "bg-primary text-white", text: "text-white" },
};

function ProductCard({ product, index }: { product: StoreProduct; index: number }) {
  const Icon = productIcons[product.category];
  const colors = toneClasses[product.tone];

  return (
    <Reveal delay={index * 0.06} className="group overflow-hidden rounded-[1.8rem] bg-paper shadow-card ring-1 ring-ink/10 transition-transform hover:-translate-y-1">
      <div className={`relative flex h-48 items-end justify-between overflow-hidden p-6 ${colors.panel} ${colors.text}`}>
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/20" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-white/15" aria-hidden="true" />
        <span className={`relative grid h-14 w-14 place-items-center rounded-2xl ${colors.icon}`}><Icon size={25} strokeWidth={1.8} /></span>
        <span className="relative text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-65">Objeto físico</span>
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-secondary">
          <span>{product.category}</span>
          <BadgeCheck size={15} aria-hidden="true" />
        </div>
        <h2 className="display-title mt-4 text-3xl leading-[0.95]">{product.name}</h2>
        <p className="mt-4 text-sm leading-6 text-ink/65">{product.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
          <span className="text-xs font-extrabold text-ink/55">{product.availability}</span>
          <Link href="/sumate" className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">
            Consultar <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function StoreShowcase() {
  return (
    <section id="productos" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Catálogo físico"
              title={<>Objetos que llevan la <span className="text-primary">ronda contigo.</span></>}
              description="Una muestra de los materiales y prendas que podemos compartir desde nuestros Centros de Desarrollo Escultista."
            />
            <Link href="/sumate" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">
              Preguntar por disponibilidad <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">{storeProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        <Reveal delay={0.12} className="mt-5 rounded-[2rem] border border-ink/10 bg-paper p-7 shadow-card sm:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">Importante</p>
              <h2 className="display-title mt-3 text-3xl sm:text-4xl">No es una tienda en línea todavía.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/65">Por ahora mostramos el catálogo físico. Para conocer existencias, tallas, modelos y formas de entrega, escríbenos.</p>
            </div>
            <Link href="/sumate" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">
              Hablar con la comunidad <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
