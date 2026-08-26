import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="section-shell flex min-h-[70vh] items-center py-32">
        <div className="max-w-2xl">
          <span className="eyebrow text-primary">Ruta no encontrada</span>
          <h1 className="display-title mt-6 break-words text-5xl leading-[0.9] sm:text-8xl">Esta página tomó otro camino.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">El contenido que buscas no está disponible o se movió a otro territorio.</p>
          <Link href="/" className="focus-ring mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"><ArrowLeft size={16} /> Volver al inicio</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
