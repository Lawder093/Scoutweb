import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityDetailPage } from "@/components/cde/community-detail-page";
import { cdes, getCDE } from "@/content/cdes";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.values(cdes).flatMap((cde) => cde.communities.map((community) => ({ country: cde.slug, community: community.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; community: string }> }): Promise<Metadata> {
  const { country, community: communitySlug } = await params;
  const cde = getCDE(country);
  const community = cde?.communities.find((item) => item.id === communitySlug);

  if (!cde || !community) {
    return { title: "Comunidad no encontrada", robots: { index: false, follow: false } };
  }

  return {
    title: `${community.name} · ${cde.communityName}`,
    description: community.description,
    alternates: { canonical: absoluteUrl(`/cde/${cde.slug}/comunidades/${community.id}`) },
  };
}

export default async function CommunityPage({ params }: { params: Promise<{ country: string; community: string }> }) {
  const { country, community: communitySlug } = await params;
  const cde = getCDE(country);
  const community = cde?.communities.find((item) => item.id === communitySlug);

  if (!cde || !community) {
    notFound();
  }

  return <CommunityDetailPage cde={cde} community={community} />;
}
