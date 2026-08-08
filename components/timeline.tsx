import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { timeline } from "@/lib/site-data";

export function Timeline() {
  return (
    <section id="historia" className="bg-ink py-24 text-white sm:py-32">
      <div className="section-shell"><Reveal><SectionHeading dark eyebrow="Desde 1933" title={<>Nuestra <span className="text-accent">Historia</span></>} description="Lo que cuenta es el espíritu." /></Reveal><div className="relative mt-16 space-y-7 before:absolute before:bottom-8 before:left-[17px] before:top-8 before:w-px before:bg-white/20 sm:before:left-1/2 sm:before:-translate-x-1/2">{timeline.map((item, index) => <Reveal key={item.year} delay={index * 0.06} className={`relative grid gap-6 pl-12 sm:grid-cols-2 sm:gap-16 sm:pl-0 ${index % 2 === 1 ? "sm:text-right" : ""}`}><span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border-4 border-ink bg-accent text-[9px] font-black text-ink sm:left-1/2 sm:-translate-x-1/2">{index + 1}</span><div className={index % 2 === 1 ? "sm:order-2 sm:pt-1" : "sm:pt-1"}><span className="text-4xl font-black text-primary sm:text-5xl">{item.year}</span><h3 className="mt-3 text-xl font-extrabold sm:text-2xl">{item.title}</h3><p className="mt-4 max-w-md text-sm leading-7 text-white/65 sm:ml-auto">{item.text}</p></div><div className={index % 2 === 1 ? "sm:order-1" : ""}><div className="group relative overflow-hidden rounded-[1.5rem] bg-secondary"><Image src={item.image} alt={item.label} width={700} height={440} className="aspect-[1.5/1] w-full object-cover opacity-80 grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/80">{item.label}</span><ArrowUpRight className="absolute right-4 top-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" size={20} /></div></div></Reveal>)}</div></div>
    </section>
  );
}
