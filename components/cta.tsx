import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { Reveal } from "./reveal";

export function CTA() {
  return (
    <section id="sumate" className="bg-primary px-4 py-20 text-white sm:px-6 sm:py-28"><Reveal className="mx-auto max-w-[1180px] text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink"><Heart size={24} fill="currentColor" /></div><h2 className="display-title mx-auto mt-7 max-w-3xl text-5xl leading-[0.9] sm:text-7xl">Forma parte de esta comunidad educativa.</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">Hay muchas formas de sumarse: una pregunta, una experiencia, un taller o una caminata compartida.</p><Link href="/sumate" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-extrabold text-primary transition-transform hover:-translate-y-1">Súmate a la comunidad <ArrowUpRight size={17} /></Link></Reveal></section>
  );
}
