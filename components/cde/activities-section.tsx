import { Reveal } from "@/components/reveal";
import type { CDEData } from "@/content/cdes/types";
import { ActivityCard } from "./activity-card";
import { SectionTitle } from "./section-title";

export function ActivitiesSection({ cde, activities = cde.activities }: { cde: CDEData; activities?: CDEData["activities"] }) {
  return <section id="actividades" className="scroll-mt-36 bg-paper py-20 sm:py-28"><div className="section-shell"><Reveal><SectionTitle eyebrow="04 · Actividades" title={<>Lo que pasa<br /><span className="text-primary">en el grupo.</span></>} description="Noticias, encuentros y publicaciones propias del CDE. La estructura queda lista para crecer hacia un pequeño blog por grupo." /></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-2">{activities.map((activity, index) => <Reveal key={activity.id} delay={index * 0.08}><ActivityCard activity={activity} /></Reveal>)}</div></div></section>;
}
