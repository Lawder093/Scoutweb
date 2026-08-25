import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { BlogBrowser } from "@/components/blog-browser";
import { SiteFooter } from "@/components/site-footer";
import { getBlogPostSummaries } from "@/lib/content/services";

export const metadata = {
  title: "Blog",
  description: "El archivo completo de Escultista: historias, conversaciones, proyectos y aprendizajes del movimiento.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPostSummaries(1000);

  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <section className="section-shell py-20 sm:py-28">
          <span className="eyebrow">Blog del movimiento</span>
          <h1 className="display-title mt-6 max-w-4xl text-6xl leading-[0.88] sm:text-8xl">Historias que<br /><span className="text-primary">se organizan.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Explora el archivo completo de Escultista: experiencias, herramientas y conversaciones con su fecha de publicación original.</p>
          <a href="#historias" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">Leer historias <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
        <BlogBrowser posts={posts} />
      </main>
      <SiteFooter />
    </>
  );
}
