import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Method } from "@/components/method";
import { Map } from "@/components/map";
import { Timeline } from "@/components/timeline";
import { Partners } from "@/components/partners";
import { LibraryPreview } from "@/components/library-preview";
import { BlogPreview } from "@/components/blog-preview";
import { CTA } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPosts, getLibraryResources } from "@/lib/content/services";

export const revalidate = 300;

export default async function HomePage() {
  const [posts, resources] = await Promise.all([getBlogPosts(3), getLibraryResources(6)]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Method />
        <Map />
        <Timeline />
        <Partners />
        <LibraryPreview resources={resources} />
        <BlogPreview posts={posts} />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
