import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { BlogBrowser } from "@/components/blog-browser";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPostSummaries } from "@/lib/content/services";

export const metadata = {
  title: "Blog",
  description: "El archivo completo de Escultista: historias, conversaciones, proyectos y aprendizajes del movimiento.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPostSummaries(1000);

  return (
    <>
      <SiteHeader />
      <main className="pt-20 sm:pt-16">
        <section className="section-shell py-20 sm:py-28">
          <span className="eyebrow">Blog del movimiento</span>
          <h1 className="display-title mt-6 max-w-4xl break-words text-5xl leading-[0.88] sm:text-8xl">Historias que<br /><span className="text-primary">se organizan.</span></h1>
          <a href="#historias" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Leer historias <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
        <BlogBrowser posts={posts} />
      </main>
      <SiteFooter />
    </>
  );
}
