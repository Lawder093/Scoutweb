import { notFound } from "next/navigation";
import { CDELayout } from "@/components/cde/cde-layout";
import { cdes, getCDE } from "@/content/cdes";

export function generateStaticParams() {
  return Object.keys(cdes).map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const cde = getCDE(country);
  return { title: cde?.communityName ?? "CDE", description: cde?.description };
}

export default async function CdeCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const cde = getCDE(country);
  if (!cde) notFound();
  return <CDELayout cde={cde} />;
}
