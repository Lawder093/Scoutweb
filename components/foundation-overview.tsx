import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { title: "Aprender y participar", text: "Experiencias educativas donde niños y jóvenes descubren sus capacidades, conviven y aprenden haciendo.", image: "/images/inicio-cover.jpg", alt: "Acompañamiento durante una actividad educativa", href: "/cde", link: "Conoce los espacios educativos" },
  { title: "Compartir y acompañar", text: "Jornadas de colaboración, entrega de materiales y encuentros que fortalecen los vínculos con las comunidades.", image: "/images/conecta/actividades/actividad-09.jpg", alt: "Integrantes de la asociación y de la comunidad reunidos durante una jornada", href: "/donacion", link: "Mira las actividades comunitarias" },
  { title: "Crear y expresarnos", text: "La música y el arte abren espacios de encuentro para las juventudes y nuevas formas de participar en comunidad.", image: "/images/coro-esperanza-paulo-freire.jpg", alt: "Jóvenes del Coro Esperanza con sus instrumentos", href: "#coro-esperanza", link: "Descubre el Coro Esperanza" },
];

export function FoundationOverview() {
  return (
    <section id="asociacion" className="bg-mist py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-7 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <h2 className="display-title max-w-2xl text-4xl leading-[1.03] sm:text-6xl">Estar cerca también <span className="text-primary">transforma</span></h2>
          <div><p className="text-lg leading-8 text-ink/75">Somos una asociación civil que une educación, cultura y asistencia social. Trabajamos con las comunidades para responder a necesidades reales y abrir posibilidades de una vida más justa y humana.</p><Link href="/asociacion" className="focus-ring mt-5 inline-flex items-center gap-3 rounded-lg py-2 font-extrabold text-primary hover:text-ink">Nuestra misión y forma de trabajar <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </div>
        <div className="mt-12 grid gap-9 md:grid-cols-3 md:gap-6">
          {projects.map((project) => (
            <article key={project.title} className="flex min-w-0 flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white"><Image src={project.image} alt={project.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" /></div>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{project.title}</h3>
              <p className="mb-5 mt-3 text-base leading-7 text-ink/70">{project.text}</p>
              <Link href={project.href} className="focus-ring mt-auto inline-flex items-start gap-2 rounded-lg py-2 text-sm font-extrabold text-primary hover:text-ink">{project.link}<ArrowUpRight className="shrink-0" size={17} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
