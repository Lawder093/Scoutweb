import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";
import { MemberCard } from "./member-card";
import type { CDEData } from "@/content/cdes/types";

export function EducatorsSection({ cde }: { cde: CDEData }) {
  return <section id="nosotros" className="scroll-mt-36 bg-mist py-20 sm:py-28"><div className="section-shell"><Reveal><SectionTitle eyebrow="02 · Nosotros" title={<>Las personas hacen<br /><span className="text-secondary">la comunidad.</span></>} description="Un equipo de educadores que acompaña procesos, abre preguntas y aprende junto al grupo." /></Reveal><div className="mt-14 grid gap-5 md:grid-cols-3">{cde.educators.map((educator, index) => <Reveal key={educator.name} delay={index * 0.08}><MemberCard educator={educator} /></Reveal>)}</div></div></section>;
}
