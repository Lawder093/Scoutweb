import Link from "next/link";
import { BookOpen, HandHeart, HeartHandshake, History, ShieldCheck, UsersRound } from "lucide-react";

const mosaics = [
  { id: "proposito", eyebrow: "Identidad", title: "Nuestra misión", description: "Quiénes somos, qué defendemos y hacia dónde orientamos el trabajo.", icon: HeartHandshake, tone: "bg-primary text-white" },
  { id: "trabajo", eyebrow: "Acción", title: "Qué hacemos", description: "Educación, asistencia social, cultura, salud, derechos y territorio.", icon: BookOpen, tone: "bg-mist text-ink" },
  { id: "beneficiarios", eyebrow: "Personas", title: "A quiénes acompañamos", description: "Infancias, adolescencias, comunidades y organizaciones locales.", icon: UsersRound, tone: "bg-accent text-ink" },
  { id: "solidaridad", eyebrow: "Memoria", title: "Solidaridad que se vuelve acción", description: "Campañas, donativos y colaboraciones realizadas con las comunidades.", icon: HandHeart, tone: "bg-ink text-white" },
  { id: "historia", eyebrow: "Origen", title: "Nuestra historia", description: "Las raíces del proyecto y los momentos que han dado forma a la asociación.", icon: History, tone: "bg-mist text-ink" },
  { id: "transparencia", eyebrow: "Confianza", title: "Transparencia y apoyo", description: "Información pública, donataria, datos bancarios y compromisos institucionales.", icon: ShieldCheck, tone: "bg-primary text-white" },
] as const;

export function NosotrosMosaicBoard() {
  return (
    <section className="bg-paper px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="nosotros-mosaicos-title">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Mapa de la asociación</p>
          <h2 id="nosotros-mosaicos-title" className="display-title mt-4 text-4xl leading-tight sm:text-6xl">La información de Nosotros, por partes claras</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">Selecciona un mosaico para ir directamente al tema que quieres conocer. El contenido completo permanece reunido en esta misma página.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mosaics.map(({ id, eyebrow, title, description, icon: Icon, tone }) => (
            <a key={id} href={`#${id}`} className={`focus-ring rounded-[1.6rem] p-6 transition-transform hover:-translate-y-1 sm:p-7 ${tone}`}>
              <div className="flex items-start justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-current/15" aria-hidden="true"><Icon size={21} strokeWidth={1.8} /></span><span className="text-xs font-extrabold uppercase tracking-[0.14em] opacity-65">Ver sección</span></div>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em] opacity-70">{eyebrow}</p>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 opacity-75">{description}</p>
            </a>
          ))}
        </div>
        <div className="mt-5 rounded-[1.6rem] border border-ink/10 bg-mist p-6 sm:p-7">
          <p className="text-sm leading-6 text-ink/70">¿Buscas documentos específicos? Consulta también el <Link href="/curriculum-institucional" className="font-extrabold text-primary underline underline-offset-4">currículum institucional</Link>, la <Link href="/legal/donataria-donaciones" className="font-extrabold text-primary underline underline-offset-4">información de donataria</Link> y la <Link href="/biblioteca" className="font-extrabold text-primary underline underline-offset-4">biblioteca</Link>.</p>
        </div>
      </div>
    </section>
  );
}
