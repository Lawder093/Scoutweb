import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projects = [
  { category: "Encuentro", date: "15 · 18 agosto 2024", title: "Campamento de preguntas incómodas", text: "Tres días para desmontar certezas, cocinar juntes y volver a mirar el barrio.", color: "bg-primary", tag: "text-white/70" },
  { category: "Herramienta", date: "Nueva publicación", title: "Manual para una asamblea posible", text: "Una guía breve para tomar decisiones sin que siempre decidan les mismes.", color: "bg-accent", tag: "text-ink/55" },
  { category: "Conversación", date: "Ciclo abierto", title: "La patrulla también es política", text: "Charlas sobre poder, juego y las formas en que aprendemos a estar juntes.", color: "bg-secondary", tag: "text-white/70" },
];

export function ProjectsSection() {
  return (
    <section id="proyectos" className="bg-ink py-24 text-white sm:py-32">
      <div className="section-shell">
        <Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading dark eyebrow="En movimiento" title={<>Lo que estamos <span className="text-accent">haciendo.</span></>} description="Ideas que salen del cuaderno, se prueban en el territorio y regresan convertidas en preguntas nuevas." /><a href="#contacto" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-accent transition-colors hover:text-white">Ver todas las historias <ArrowUpRight size={16} /></a></div></Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => <Reveal key={project.title} delay={index * 0.08} className={`group flex min-h-[350px] flex-col justify-between rounded-[2rem] ${project.color} p-7 text-ink transition-transform hover:-translate-y-1 sm:p-8 ${index === 2 ? "text-white" : ""}`}><div><div className={`flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.17em] ${project.tag}`}><span>{project.category}</span><ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h3 className="display-title mt-14 max-w-xs text-3xl leading-[0.98]">{project.title}</h3><p className="mt-5 max-w-sm text-sm leading-6 opacity-70">{project.text}</p></div><div className={`flex items-center gap-2 border-t border-current/20 pt-5 text-xs font-bold ${project.tag}`}><CalendarDays size={15} />{project.date}</div></Reveal>)}
        </div>
      </div>
    </section>
  );
}
