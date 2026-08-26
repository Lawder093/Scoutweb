import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDownToLine, ArrowLeft, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getLibraryResourceBySlug } from "@/lib/content/services";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getLibraryResourceBySlug(slug);

  if (!resource) {
    return { title: "Recurso no encontrado", robots: { index: false, follow: false } };
  }

  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: absoluteUrl(`/biblioteca/${resource.slug}`) },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/biblioteca/${resource.slug}`),
      title: resource.title,
      description: resource.description,
      images: resource.coverImageUrl ? [resource.coverImageUrl] : undefined,
    },
  };
}

export default async function LibraryResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = await getLibraryResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16">
        <article className="section-shell py-20 sm:py-28">
          <Link href="/biblioteca" className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-secondary hover:text-primary"><ArrowLeft size={16} /> Volver a la biblioteca</Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="relative aspect-[0.78/1] overflow-hidden rounded-[2rem] bg-primary p-8 text-white">
              {resource.coverImageUrl ? <Image src={resource.coverImageUrl} alt="" fill className="object-cover opacity-70" sizes="(max-width: 1024px) 90vw, 420px" /> : <BookOpen className="absolute bottom-8 right-8 opacity-20" size={120} strokeWidth={1} />}
              <div className="relative z-10 flex h-full flex-col justify-between"><span className="text-5xl font-black opacity-25">{String(resource.displayOrder).padStart(2, "0")}</span><p className="display-title text-4xl leading-[0.95]">{resource.title}</p></div>
            </div>
            <div>
              <span className="eyebrow">{resource.creator}</span>
              <h1 className="display-title mt-6 break-words text-5xl leading-[0.9] sm:text-7xl">{resource.title}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/70">{resource.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {resource.downloadUrl ? <a href={resource.downloadUrl} download className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white"><ArrowDownToLine size={16} /> Descargar recurso</a> : <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-bold text-ink/45"><ArrowDownToLine size={16} /> Archivo en preparación</span>}
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
