import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Method } from "@/components/method";
import { Map } from "@/components/map";
import { Timeline } from "@/components/timeline";
import { CoroEsperanza } from "@/components/coro-esperanza";
import { LibraryPreview } from "@/components/library-preview";
import { BlogPreview } from "@/components/blog-preview";
import { PostcardSection } from "@/components/postcards/postcard-section";
import { CTA } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { getBlogPosts, getLibraryResources } from "@/lib/content/services";
import { listActivePostcards } from "@/lib/content/repositories/postcards";

export const revalidate = 300;

export default async function HomePage() {
  const [posts, resources, postcards] = await Promise.all([getBlogPosts(3), getLibraryResources(6), listActivePostcards()]);

  return (
    <>
      <OrganizationJsonLd />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Method />
        <Map />
        <Timeline />
        <CoroEsperanza />
        <LibraryPreview resources={resources} />
        <BlogPreview posts={posts} />
        <PostcardSection postcards={postcards} />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
