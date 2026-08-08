import { Accessibility, HeartHandshake, Lightbulb, UsersRound } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const principles = [
  { number: "01", title: "Pensamiento crítico", text: "Hacemos preguntas, ponemos en duda lo dado y buscamos nuevas formas de entender lo común.", icon: Lightbulb, color: "bg-accent" },
  { number: "02", title: "Cuidado colectivo", text: "Sostenemos los procesos con escucha, ternura y herramientas para que nadie quede atrás.", icon: HeartHandshake, color: "bg-primary text-white" },
  { number: "03", title: "Organización popular", text: "Aprendemos a decidir juntes, distribuir responsabilidades y mover lo que parecía inmóvil.", icon: UsersRound, color: "bg-secondary text-white" },
  { number: "04", title: "Accesibilidad", text: "Diseñamos espacios donde caben distintos cuerpos, ritmos, saberes, deseos y maneras de participar.", icon: Accessibility, color: "bg-mist" },
];

export function PrinciplesSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><SectionHeading eyebrow="Nuestros principios" title={<>Cuatro ideas para <span className="hand-underline">caminar distinto.</span></>} description="No son reglas escritas en piedra. Son preguntas que llevamos a cada reunión, salida y proyecto." /></Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return <Reveal key={principle.number} delay={index * 0.07} className={`rounded-[1.8rem] ${principle.color} p-6 transition-transform hover:-translate-y-1 sm:p-7`}><div className="flex items-start justify-between"><span className="text-4xl font-black opacity-20">{principle.number}</span><Icon size={25} strokeWidth={1.7} /></div><h3 className="mt-12 text-xl font-extrabold leading-tight">{principle.title}</h3><p className="mt-4 text-sm leading-6 opacity-70">{principle.text}</p></Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}
