import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" data-glass-tone="dark" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white sm:min-h-screen">
      <Image src="/images/inicio-cover.jpg" alt="Una voluntaria acompaña a una niña durante una actividad comunitaria" fill priority className="object-cover object-[55%_center] sm:object-[60%_center]" sizes="100vw" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(29,43,52,.92)_0%,rgba(29,43,52,.74)_36%,rgba(29,43,52,.22)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent" />
      <div className="section-shell relative z-10 pb-28 pt-40 sm:pb-32 md:pt-48 xl:pt-40">
        <div className="min-w-0 max-w-3xl">
          <p className="max-w-sm text-sm font-bold leading-6 text-white/90">Comunidad Crítica de Escultismo Popular, A. C.</p>
          <h1 className="display-title mt-7 max-w-3xl text-[clamp(3.25rem,6.7vw,6rem)] leading-[.98]">El futuro se construye <span className="text-accent">en comunidad</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/90">Acompañamos a niños, jóvenes y comunidades a través de la educación, la cultura y la solidaridad. Porque crecer también significa tener oportunidades, participar y contar con los demás.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/donacion" className="focus-ring inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-extrabold text-white shadow-card transition-transform hover:-translate-y-1">Quiero apoyar <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="#asociacion" className="focus-ring inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-sm hover:border-accent hover:text-accent">Conoce nuestra labor <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
