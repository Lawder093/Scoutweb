import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { storeProducts, type StoreProduct } from "@/content/store/products";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { StoreProductVisual } from "./store-product-visual";

function ProductCard({ product, index }: { product: StoreProduct; index: number }) {
  return (
    <Reveal delay={index * 0.06} className="apple-card group overflow-hidden rounded-[1.8rem] bg-paper">
      <StoreProductVisual product={product} />
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-secondary">
          <span>{product.category}</span>
          <BadgeCheck size={15} aria-hidden="true" />
        </div>
        <h2 className="display-title mt-4 text-3xl leading-[0.95]">{product.name}</h2>
        <p className="mt-4 text-sm leading-6 text-ink/65">{product.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
          <span className="text-xs font-extrabold text-ink/55">{product.availability}</span>
          <Link href={`/tienda/${product.id}`} className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">
            Ver producto <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function StoreShowcase() {
  return (
    <section id="productos" className="apple-module apple-module--mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Catálogo físico"
              title={<>Objetos que llevan la <span className="text-primary">ronda contigo</span></>}
              description="Una muestra de los materiales y prendas que podemos compartir desde nuestros Centros de Desarrollo Escultista."
            />
            <Link href="/sumate" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">
              Preguntar por disponibilidad <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">{storeProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      </div>
    </section>
  );
}
