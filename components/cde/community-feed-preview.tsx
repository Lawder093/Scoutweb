import { MessageCircle, UsersRound } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "./section-title";

export function CommunityFeedPreview() {
  return <section id="conecta" data-glass-tone="dark" className="scroll-mt-36 bg-ink py-20 text-white sm:py-28"><div className="section-shell"><Reveal><SectionTitle dark eyebrow="05 · Conecta" title={<>Un espacio para<br /><span className="text-accent">conectar después.</span></>} description="Esta sección queda reservada para una futura implementación. Por ahora funciona únicamente como placeholder visual." /></Reveal><Reveal delay={0.1} className="mt-14 rounded-[2rem] border border-white/10 bg-black p-8 sm:p-12"><div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink"><UsersRound size={24} aria-hidden="true" /></span><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">Próximamente</p><h3 className="display-title mt-2 text-3xl sm:text-4xl">Conecta</h3></div></div><div className="flex items-center gap-3 text-sm text-white/45"><MessageCircle size={18} aria-hidden="true" /><span>Sin funcionalidad por ahora</span></div></div></Reveal></div></section>;
}
