import { Compass, HeartHandshake, Lightbulb, Mountain, UsersRound } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { methodCards } from "@/lib/site-data";

const icons = [HeartHandshake, Lightbulb, UsersRound, Mountain, Compass];

export function Method() {
  return (
    <section id="metodo" className="bg-mist py-24 sm:py-32">
      <div className="section-shell"><Reveal><SectionHeading eyebrow="Nuestra práctica" title={<>Método Scout <span className="text-secondary">Crítico Popular</span></>} description="Cinco principios que convierten cada actividad en una experiencia de aprendizaje, participación y transformación." /></Reveal><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{methodCards.map((card, index) => { const Icon = icons[index]; return <Reveal key={card.number} delay={index * 0.06} className={`group rounded-[1.8rem] border border-ink/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-card sm:p-7 ${index === 0 ? "bg-primary text-white" : index === 1 ? "bg-accent text-ink" : index === 2 ? "bg-secondary text-white" : index === 3 ? "bg-paper text-ink" : "bg-ink text-white"}`}><div className="flex items-start justify-between"><span className="text-4xl font-black opacity-25">{card.number}</span><Icon size={25} strokeWidth={1.7} className="transition-transform duration-300 group-hover:rotate-12" /></div><h3 className="mt-12 text-xl font-extrabold leading-tight">{card.title}</h3><p className="mt-4 text-sm leading-6 opacity-75">{card.description}</p></Reveal>; })}</div></div>
    </section>
  );
}
