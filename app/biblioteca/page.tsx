import { SiteHeader } from "@/components/site-header";
import { LibrarySection } from "@/components/library-section";
import { SiteFooter } from "@/components/site-footer";
import { getLibraryResources } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Biblioteca de la asociación",
  description: "Publicaciones, documentos y herramientas de la asociación para leer, descargar y compartir.",
  path: "/biblioteca",
});

export const revalidate = 300;

export default async function BibliotecaPage() {
  const resources = await getLibraryResources(1000);

  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" tabIndex={-1} className="pt-20 sm:pt-16">
        <section className="section-shell apple-intro py-20 sm:py-28"><span className="eyebrow">Biblioteca de la asociación</span><h1 className="display-title mt-6 max-w-4xl break-words text-5xl leading-[0.88] sm:text-8xl">Leer, adaptar,<br /><span className="text-primary">compartir</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-ink/65 sm:text-xl">Una colección viva de publicaciones, documentos y herramientas para acompañar procesos de educación popular.</p></section>
        <LibrarySection resources={resources} />
      </main>
      <SiteFooter />
    </>
  );
}
