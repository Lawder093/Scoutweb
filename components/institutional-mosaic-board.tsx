import Link from "next/link";
import { HandHeart, HeartHandshake, History, ShieldCheck, Target, UsersRound } from "lucide-react";

const mosaics = [
  { id: "proposito", eyebrow: "Identidad", title: "Quiénes somos", description: "Misión, visión y valores para entender el sentido de la asociación.", icon: HeartHandshake, tone: "bg-primary text-white" },
  { id: "objetivos", eyebrow: "Trabajo", title: "Qué hacemos", description: "Líneas de trabajo, objetivos y formas de acompañar procesos comunitarios.", icon: Target, tone: "bg-mist text-ink" },
  { id: "beneficiarios", eyebrow: "Personas", title: "A quiénes acompañamos", description: "Infancias, adolescencias, familias y comunidades en situación de vulnerabilidad.", icon: UsersRound, tone: "bg-accent text-ink" },
  { id: "solidaridad", eyebrow: "Memoria", title: "Lo que hemos donado", description: "Campañas, apoyos y colaboraciones documentadas con las comunidades.", icon: HandHeart, tone: "bg-ink text-white" },
  { id: "historia", eyebrow: "Trayectoria", title: "Nuestra historia", description: "Los momentos que han dado forma a la asociación y a su trabajo territorial.", icon: History, tone: "bg-mist text-ink" },
  { id: "transparencia", eyebrow: "Confianza", title: "Transparencia y apoyo", description: "Informes, documentos públicos, datos bancarios y formas de colaborar.", icon: ShieldCheck, tone: "bg-primary text-white" },
] as const;

export function InstitutionalMosaicBoard() {
  return (
    <section className="apple-module apple-module--paper px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="curriculum-mosaicos-title">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Navegación institucional</p>
          <h2 id="curriculum-mosaicos-title" className="display-title mt-4 text-4xl leading-tight sm:text-6xl">Todo lo que necesitas saber, en un solo lugar</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">Elige un tema para ir directo a la información. El currículum reúne la historia, el trabajo, las donaciones y los documentos públicos de la asociación.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mosaics.map(({ id, eyebrow, title, description, icon: Icon, tone }) => (
            <a key={id} href={`#${id}`} className={`apple-card focus-ring rounded-[1.6rem] p-6 sm:p-7 ${tone}`}>
              <div className="flex items-start justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-current/15" aria-hidden="true"><Icon size={21} strokeWidth={1.8} /></span><span className="text-xs font-extrabold uppercase tracking-[0.14em] opacity-65">Ver sección</span></div>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em] opacity-70">{eyebrow}</p>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 opacity-75">{description}</p>
            </a>
          ))}
        </div>
        <div className="mt-5 rounded-[1.6rem] border border-ink/10 bg-mist p-6 sm:p-7">
          <p className="text-sm leading-6 text-ink/70">También puedes consultar todos los materiales en la <Link href="/biblioteca" className="font-extrabold text-primary underline underline-offset-4">biblioteca</Link> o conocer los <Link href="/cde" className="font-extrabold text-primary underline underline-offset-4">Centros de Desarrollo Escultista</Link>.</p>
        </div>
      </div>
    </section>
  );
}
