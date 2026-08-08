import { notFound } from "next/navigation";
import { CDELayout } from "@/components/cde/cde-layout";
import { cdes, getCDE } from "@/content/cdes";

export function generateStaticParams() {
  return Object.keys(cdes).map((country) => ({ country }));
}

export async function generateMetadata({ params }: { params: { country: string } }) {
  const cde = getCDE(params.country);
  return { title: cde ? `${cde.communityName} · Escultismo Crítico Popular` : "CDE · Escultismo Crítico Popular", description: cde?.description };
}

export default function CdeCountryPage({ params }: { params: { country: string } }) {
  const cde = getCDE(params.country);
  if (!cde) notFound();
  return <CDELayout cde={cde} />;
}
