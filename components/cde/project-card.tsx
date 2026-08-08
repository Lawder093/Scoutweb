import Image from "next/image";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import type { CDEProject } from "@/content/cdes/types";

export function ProjectCard({ project }: { project: CDEProject }) {
  return <article className="group overflow-hidden rounded-[1.8rem] bg-paper shadow-card transition-transform hover:-translate-y-1"><div className="relative aspect-[1.35/1] overflow-hidden bg-secondary"><Image src={project.image} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 90vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" /><span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-ink">{project.status}</span><ArrowUpRight className="absolute bottom-5 right-5 text-white opacity-0 transition-opacity group-hover:opacity-100" size={20} /></div><div className="p-6"><div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink/45"><CalendarDays size={13} />{project.date}</div><h3 className="display-title mt-4 text-2xl leading-[0.98]">{project.title}</h3><p className="mt-4 text-sm leading-6 text-ink/60">{project.description}</p></div></article>;
}
