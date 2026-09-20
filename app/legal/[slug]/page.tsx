import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LegalPageView } from "@/components/legal/legal-page-view";
import { getLegalPage, legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  return page ? pageMetadata({ title: page.title, description: page.summary, path: `/legal/${page.slug}` }) : { title: "Página legal no encontrada", robots: { index: false, follow: false } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return <><SiteHeader /><LegalPageView page={page} /><SiteFooter /></>;
}
