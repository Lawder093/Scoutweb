import { UsersRound } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { CDEData } from "@/content/cdes/types";
import { CommunityCard } from "./community-card";
import { SectionTitle } from "./section-title";

export function CommunitiesSection({ cde }: { cde: CDEData }) {
  return <section id="comunidad" className="scroll-mt-36 bg-mist py-20 sm:py-28"><div className="section-shell"><Reveal><SectionTitle eyebrow="02 · Comunidades" title={<>Distintas edades,<br /><span className="text-secondary">una misma ronda.</span></>} description="Cada CDE puede mostrar aquí las comunidades que realmente tiene activas, con su propia descripción y rango de edad." /></Reveal>{cde.communities.length > 0 ? <div className="mt-14 grid gap-5 sm:grid-cols-2">{cde.communities.map((community, index) => <Reveal key={community.id} delay={index * 0.06}><CommunityCard community={community} /></Reveal>)}</div> : <div className="mt-14 rounded-[2rem] border border-dashed border-ink/20 bg-paper p-10 text-center"><UsersRound className="mx-auto text-primary" size={34} /><p className="mt-4 text-sm font-bold text-ink/60">Este CDE todavía no ha configurado sus comunidades.</p></div>}</div></section>;
}
