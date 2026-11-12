import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CoroEsperanza() {
  return (
    <section id="coro-esperanza" data-glass-tone="dark" className="bg-secondary py-24 text-white sm:py-32">
      <div className="section-shell grid min-w-0 items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="order-2 min-w-0 lg:order-1">
          <h2 className="display-title text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Coro Esperanza <span className="text-accent">Paulo Freire</span></h2>
          <p className="mt-6 text-lg leading-8 text-white/90">Beneficiando a las juventudes a través de la música, la expresión y el encuentro.</p>
          <p className="mt-5 text-base leading-8 text-white/80">El coro es un espacio para aprender a escucharnos, compartir lo que sentimos y construir confianza. Cada ensayo reúne voces distintas y nos recuerda que podemos crear algo juntos.</p>
          <Link href="/contacto" className="focus-ring mt-7 inline-flex items-center gap-3 rounded-lg py-2 font-extrabold text-accent hover:text-white">Conocer y apoyar el coro <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <figure className="order-1 min-w-0 lg:order-2">
          <div className="overflow-hidden rounded-[2.4rem] bg-ink p-3 shadow-soft sm:p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.9rem]">
              <Image src="/images/coro-esperanza-paulo-freire.jpg" alt="Integrantes del Coro Esperanza Paulo Freire reunidos con sus guitarras" fill className="object-contain" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
