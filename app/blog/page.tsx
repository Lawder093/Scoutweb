import { SiteHeader } from "@/components/site-header";
import { BlogBrowser } from "@/components/blog-browser";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPostSummaries } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog del movimiento",
  description: "El archivo completo de Escultista: historias, conversaciones, proyectos y aprendizajes del movimiento.",
  path: "/blog",
});

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPostSummaries(1000);

  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="pt-20 sm:pt-16">
        <section className="section-shell apple-intro py-20 sm:py-28">
          <span className="eyebrow">Blog del movimiento</span>
          <h1 className="display-title mt-6 max-w-4xl break-words text-5xl leading-[0.88] sm:text-8xl">Historias que<br /><span className="text-primary">se organizan</span></h1>
        </section>
        <BlogBrowser posts={posts} />
      </main>
      <SiteFooter />
    </>
  );
}
