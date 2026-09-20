import { notFound } from "next/navigation";
import { CDELayout } from "@/components/cde/cde-layout";
import { cdes, getCDE } from "@/content/cdes";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(cdes).map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const cde = getCDE(country);
  if (!cde) return { title: "CDE no encontrado", robots: { index: false, follow: false } };
  return pageMetadata({
    title: `CDE ${cde.country} · ${cde.communityName}`,
    description: cde.description,
    path: `/cde/${cde.slug}`,
    image: { path: cde.heroImage, alt: cde.communityName },
  });
}

export default async function CdeCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const cde = getCDE(country);
  if (!cde) notFound();
  return <CDELayout cde={cde} />;
}
