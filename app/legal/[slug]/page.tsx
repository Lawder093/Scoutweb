import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LegalPageView } from "@/components/legal/legal-page-view";
import { getLegalPage, legalPages } from "@/content/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  return page ? { title: page.title, description: page.summary, alternates: { canonical: `/legal/${page.slug}` } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return <><SiteHeader /><LegalPageView page={page} /><SiteFooter /></>;
}
