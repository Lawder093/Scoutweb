import { ArrowUpRight, BookOpen } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const books = [
  { title: "La asamblea como fogata", author: "Cuaderno de prácticas", tone: "bg-primary", label: "text-white", mark: "01" },
  { title: "Jugar en serio", author: "Herramientas para el grupo", tone: "bg-accent", label: "text-ink", mark: "02" },
  { title: "Mapa de cuidados", author: "Guía de acompañamiento", tone: "bg-secondary", label: "text-white", mark: "03" },
  { title: "Bitácora del territorio", author: "Miradas desde el barrio", tone: "bg-mist", label: "text-ink", mark: "04" },
  { title: "Desarmar la brújula", author: "Ensayos breves", tone: "bg-ink", label: "text-white", mark: "05" },
  { title: "Manual de la alegría", author: "Recursos para resistir", tone: "bg-[#fff0d8]", label: "text-ink", mark: "06" },
];

export function LibrarySection() {
  return (
    <section id="biblioteca" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Biblioteca abierta" title={<>Herramientas para <span className="text-primary">hacer.</span></>} description="Publicaciones, juegos y materiales para descargar, adaptar y compartir sin pedir permiso." /><a href="#contacto" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Explorar la biblioteca <ArrowUpRight size={16} /></a></div></Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {books.map((book, index) => <Reveal key={book.title} delay={index * 0.05} className={`group relative min-h-[280px] overflow-hidden rounded-[1.5rem] ${book.tone} ${book.label} p-5 transition-transform hover:-translate-y-1 sm:min-h-[330px] sm:p-7`}><div className="flex items-start justify-between"><span className="text-3xl font-black opacity-20">{book.mark}</span><BookOpen size={21} strokeWidth={1.6} /></div><div className="absolute -right-6 top-16 h-28 w-28 rounded-full border-[18px] border-current opacity-10" /><div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7"><p className="text-[10px] font-extrabold uppercase tracking-[0.13em] opacity-60">{book.author}</p><h3 className="display-title mt-3 text-2xl leading-[0.95] sm:text-3xl">{book.title}</h3><div className="mt-5 flex items-center gap-1 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-70">Abrir recurso <ArrowUpRight size={14} /></div></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}
