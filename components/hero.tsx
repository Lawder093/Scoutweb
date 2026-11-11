import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="bg-mist pb-12 pt-28 sm:pb-16 md:pt-44 xl:pt-32">
      <div className="section-shell">
        <div className="grid items-center gap-9 lg:grid-cols-[1fr_1.08fr] lg:gap-12">
          <div className="min-w-0 py-3 lg:py-10">
            <p className="max-w-sm text-sm font-bold leading-6 text-primary">Comunidad Crítica de Escultismo Popular, A. C.</p>
            <h1 className="display-title mt-7 max-w-2xl text-[clamp(3.25rem,6.7vw,6rem)] leading-[.98] text-ink">El futuro se construye <span className="text-primary">en comunidad</span></h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-ink/75">Acompañamos a niños, jóvenes y comunidades a través de la educación, la cultura y la solidaridad. Porque crecer también significa tener oportunidades, participar y contar con los demás.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/donacion" className="focus-ring inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-extrabold text-white transition-colors hover:bg-ink">Quiero apoyar <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#asociacion" className="focus-ring inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-4 text-sm font-extrabold text-ink hover:bg-white">Conoce nuestra labor <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
            <p className="mt-7 text-sm leading-6 text-ink/60">Asociación civil sin fines de lucro · Puebla, México</p>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[1.12/1] overflow-hidden rounded-[1.5rem] lg:aspect-[.94/1] lg:rounded-[2rem]">
              <Image src="/images/inicio-cover.jpg" alt="Una voluntaria acompaña a una niña durante una actividad comunitaria" fill priority className="object-cover object-center" sizes="(min-width: 1024px) 590px, 100vw" />
            </div>
            <figcaption className="mt-4 flex items-start gap-3 text-sm leading-6 text-ink/65"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />El acompañamiento empieza por estar presentes</figcaption>
          </figure>
        </div>
        <div className="mt-10 grid gap-4 border-t border-ink/15 pt-6 text-sm font-bold text-ink/75 sm:grid-cols-3 sm:gap-8">
          <p>Educación que abre oportunidades</p><p>Cultura que nos reúne</p><p>Solidaridad que se convierte en acción</p>
        </div>
      </div>
    </section>
  );
}
