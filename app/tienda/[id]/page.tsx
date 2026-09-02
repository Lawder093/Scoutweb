import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { getStoreProduct, storeProducts } from "@/content/store/products";
import { StoreProductVisual } from "@/components/store-product-visual";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 300;

export function generateStaticParams() {
  return storeProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getStoreProduct(id);

  if (!product) {
    return { title: "Producto no encontrado", robots: { index: false, follow: false } };
  }

  return {
    title: `${product.name} · Tienda`,
    description: product.description,
    alternates: { canonical: absoluteUrl(`/tienda/${product.id}`) },
    openGraph: {
      type: "website",
      url: absoluteUrl(`/tienda/${product.id}`),
      title: product.name,
      description: product.description,
      images: product.image ? [{ url: absoluteUrl(product.image), alt: product.imageAlt ?? product.name }] : undefined,
    },
  };
}

export default async function StoreProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getStoreProduct(id);

  if (!product) {
    notFound();
  }

  const details = [
    { label: "Categoría", value: product.category },
    { label: "Disponibilidad", value: product.availability },
    ...(product.details ?? []),
  ];

  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16">
        <article className="section-shell py-16 sm:py-24">
          <Link href="/tienda" className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><ArrowLeft size={16} aria-hidden="true" /> Volver a la tienda</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <div className="overflow-hidden rounded-[2rem] shadow-card ring-1 ring-ink/10"><StoreProductVisual product={product} variant="detail" /></div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-secondary">
                <span>{product.category}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-ink/65"><BadgeCheck size={14} aria-hidden="true" /> {product.availability}</span>
              </div>
              <h1 className="display-title mt-6 break-words text-5xl leading-[0.9] sm:text-7xl">{product.name}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/70">{product.description}</p>
              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {details.map((detail) => (
                  <div key={`${detail.label}-${detail.value}`} className="rounded-2xl border border-ink/10 bg-mist p-5">
                    <dt className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-secondary">{detail.label}</dt>
                    <dd className="mt-2 text-sm font-bold leading-6 text-ink">{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/sumate" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Consultar disponibilidad <ArrowUpRight size={16} aria-hidden="true" /></Link>
                <Link href="/tienda" className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-primary hover:text-primary">Ver otros productos</Link>
              </div>
            </div>
          </div>
          <div className="mt-16 rounded-[2rem] border border-ink/10 bg-paper p-7 shadow-card sm:p-10">
            <p className="eyebrow text-primary">Información del producto</p>
            <h2 className="display-title mt-4 max-w-2xl text-3xl sm:text-4xl">Un objeto para seguir construyendo comunidad.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65">Este catálogo muestra los objetos físicos disponibles de la comunidad. Para confirmar existencias, formas de entrega o cualquier detalle, escríbenos desde la sección Súmate.</p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
