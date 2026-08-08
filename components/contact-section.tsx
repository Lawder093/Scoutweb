import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const contactWays = [
  { title: "Escríbenos", text: "hola@escultismocriticopopular.org", href: "mailto:hola@escultismocriticopopular.org", icon: Mail },
  { title: "Encuentra la red", text: "México · Colombia · Argentina", href: "/cde", icon: MapPin },
  { title: "Sigue la conversación", text: "Noticias, recursos y convocatorias", href: "#redes", icon: Instagram },
];

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="contacto" className="bg-mist py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            headingLevel={headingLevel}
            title={<>La ronda está <span className="text-primary">abierta.</span></>}
            description="Si quieres activar un proyecto, compartir una experiencia o simplemente saludar, aquí estamos. Este espacio se construye con muchas manos."
          />
        </Reveal>
        <div id="redes" className="mt-14 grid scroll-mt-32 gap-4 md:grid-cols-3">
          {contactWays.map((way, index) => {
            const Icon = way.icon;
            return (
              <Reveal key={way.title} delay={index * 0.08} className="group rounded-[1.8rem] border border-ink/10 bg-paper p-7 shadow-card transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white"><Icon size={21} /></span><ArrowUpRight className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={19} /></div>
                <h3 className="mt-14 text-xl font-extrabold">{way.title}</h3>
                <a href={way.href} className="focus-ring mt-3 inline-flex items-center gap-2 text-sm leading-6 text-ink/60 transition-colors hover:text-primary">{way.text}</a>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.12} className="mt-5 rounded-[2rem] bg-primary p-7 text-white sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><div className="flex items-center gap-2 text-accent"><MessageCircle size={20} /><span className="text-xs font-extrabold uppercase tracking-[0.16em]">Para empezar</span></div><h3 className="display-title mt-5 max-w-2xl text-4xl leading-[0.95] sm:text-5xl">Cuéntanos qué quieres poner en movimiento.</h3></div><a href="mailto:hola@escultismocriticopopular.org" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink transition-transform hover:-translate-y-1">Mandar un correo <ArrowUpRight size={16} /></a></div>
        </Reveal>
      </div>
    </section>
  );
}
