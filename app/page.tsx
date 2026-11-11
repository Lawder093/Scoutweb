import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { FoundationOverview } from "@/components/foundation-overview";
import { Map } from "@/components/map";
import { Timeline } from "@/components/timeline";
import { CoroEsperanza } from "@/components/coro-esperanza";
import { LibraryPreview } from "@/components/library-preview";
import { PostcardSection } from "@/components/postcards/postcard-section";
import { CTA } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { getLibraryResources } from "@/lib/content/services";
import { listActivePostcards } from "@/lib/content/repositories/postcards";

export const revalidate = 300;

export default async function HomePage() {
  const [resources, postcards] = await Promise.all([getLibraryResources(6), listActivePostcards()]);

  return (
    <>
      <OrganizationJsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <CoroEsperanza />
        <FoundationOverview />
        <Map />
        <Timeline />
        <LibraryPreview resources={resources} />
        <PostcardSection postcards={postcards} />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
