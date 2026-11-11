import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CoroEsperanza() {
  return (
    <section id="coro-esperanza" className="bg-white py-16 sm:py-24">
      <div className="section-shell grid items-center gap-9 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <figure className="min-w-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist">
            <Image src="/images/coro-esperanza-paulo-freire.jpg" alt="Integrantes del Coro Esperanza Paulo Freire reunidos con sus guitarras" fill className="object-contain" sizes="(min-width: 1024px) 620px, 100vw" />
          </div>
          <figcaption className="mt-3 text-sm text-ink/60">Voces, guitarras y un espacio para encontrarnos</figcaption>
        </figure>
        <div>
          <h2 className="display-title text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Coro Esperanza <span className="text-primary">Paulo Freire</span></h2>
          <p className="mt-6 text-lg leading-8 text-ink/75">Beneficiando a las juventudes a través de la música, la expresión y el encuentro.</p>
          <p className="mt-5 text-base leading-8 text-ink/70">El coro es un espacio para aprender a escucharnos, compartir lo que sentimos y construir confianza. Cada ensayo reúne voces distintas y nos recuerda que podemos crear algo juntos.</p>
          <Link href="/contacto" className="focus-ring mt-7 inline-flex items-center gap-3 rounded-lg py-2 font-extrabold text-primary hover:text-ink">Conocer y apoyar el coro <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
