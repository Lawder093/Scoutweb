import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FoundationTrust() {
  return (
    <section id="confianza" className="bg-primary py-16 text-white sm:py-24" data-glass-tone="dark">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-20">
        <div><h2 className="display-title text-4xl leading-[1.05] sm:text-6xl">La confianza se construye <span className="text-accent">con claridad</span></h2><p className="mt-6 max-w-xl text-lg leading-8 text-white/85">Detrás de cada proyecto hay personas, una historia compartida y un compromiso. Queremos que conozcas quiénes somos, cómo trabajamos y cómo puedes participar.</p></div>
        <div className="divide-y divide-white/25 border-y border-white/25">
          {[{ href: "/#historia", title: "Nuestra historia", text: "De nuestras raíces educativas al trabajo como asociación civil" }, { href: "/legal/transparencia", title: "Transparencia", text: "Información institucional, responsabilidades y documentos" }, { href: "/biblioteca", title: "Documentos de la asociación", text: "Consulta el proyecto, los estatutos y otros recursos" }].map((item) => <Link key={item.href} href={item.href} className="focus-ring flex items-center justify-between gap-5 py-6 hover:text-accent"><span><span className="block text-xl font-extrabold">{item.title}</span><span className="mt-2 block text-sm leading-6 text-white/80">{item.text}</span></span><ArrowUpRight className="shrink-0" size={22} aria-hidden="true" /></Link>)}
        </div>
      </div>
    </section>
  );
}
