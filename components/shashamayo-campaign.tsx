import Link from "next/link";
import { Facebook, HandCoins, HeartHandshake, MapPin } from "lucide-react";

const campaignUrl = "https://www.facebook.com/photo/?fbid=1581822990645739&set=a.553090213519027";

export function ShashamayoCampaign() {
  return (
    <section id="shashamayo" data-glass-tone="dark" className="bg-primary py-24 text-white sm:py-32">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-start lg:gap-20">
          <div>
            <p className="eyebrow text-accent"><HeartHandshake size={14} aria-hidden="true" /> Campaña solidaria</p>
            <h2 className="display-title mt-5 text-5xl leading-[0.94] sm:text-7xl">Apoyo para <span className="text-accent">Xacxamayo</span></h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">Estamos impulsando una campaña de donativos económicos para atender necesidades prioritarias de San José Xacxamayo, Puebla.</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">La comunidad ha identificado necesidades concretas que requieren una respuesta solidaria, cercana y transparente. Súmate para acompañar este esfuerzo y fortalecer las condiciones de vida en el territorio.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={campaignUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-extrabold text-ink transition-transform hover:-translate-y-0.5"><Facebook size={17} aria-hidden="true" /> Ver campaña en Facebook</a>
              <Link href="/donacion" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-white/10">Otras formas de donar</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.7rem] bg-white/10 p-6 ring-1 ring-white/10 sm:p-7">
              <HandCoins className="text-accent" size={25} aria-hidden="true" />
              <h3 className="mt-8 text-xl font-extrabold">Qué se va a recolectar</h3>
              <p className="mt-3 text-sm leading-7 text-white/75">Donativos económicos para atender las necesidades prioritarias de la comunidad. La publicación de Facebook contiene el código QR y los datos bancarios para participar.</p>
            </article>
            <article className="rounded-[1.7rem] bg-white/10 p-6 ring-1 ring-white/10 sm:p-7">
              <MapPin className="text-accent" size={25} aria-hidden="true" />
              <h3 className="mt-8 text-xl font-extrabold">Dónde se realizará</h3>
              <p className="mt-3 text-sm leading-7 text-white/75">En San José Xacxamayo, Puebla, en coordinación con la comunidad y con atención a las necesidades identificadas en el territorio.</p>
            </article>
            <article className="rounded-[1.7rem] bg-white/10 p-6 ring-1 ring-white/10 sm:col-span-2 sm:p-7">
              <HeartHandshake className="text-accent" size={25} aria-hidden="true" />
              <h3 className="mt-8 text-xl font-extrabold">Qué vamos a hacer</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">Reunir las aportaciones, canalizarlas a la atención de las necesidades prioritarias de Xacxamayo y compartir el avance de la campaña. Cada persona puede contribuir, compartir la publicación y ayudar a que más gente conozca esta iniciativa.</p>
            </article>
          </div>
        </div>
        <p className="mt-10 border-t border-white/15 pt-5 text-sm leading-6 text-white/60">¿Llegaste desde Facebook? Aquí puedes conocer el contexto de la campaña. ¿Llegaste desde esta página? Consulta la publicación original para ver el QR, los datos de participación y las actualizaciones.</p>
      </div>
    </section>
  );
}
