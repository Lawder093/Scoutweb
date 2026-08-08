import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";
import { ProjectCard } from "./project-card";
import type { CDEData } from "@/content/cdes/types";

export function ProjectsSection({ cde }: { cde: CDEData }) {
  return <section id="actividades" className="scroll-mt-36 bg-paper py-20 sm:py-28"><div className="section-shell"><Reveal><SectionTitle eyebrow="03 · Actividades" title={<>Proyectos que ponen<br /><span className="text-primary">el cuerpo.</span></>} description="Experiencias en curso, talleres y encuentros que convierten las preguntas en acciones compartidas." /></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-2">{cde.projects.map((project, index) => <Reveal key={project.title} delay={index * 0.08}><ProjectCard project={project} /></Reveal>)}</div></div></section>;
}
