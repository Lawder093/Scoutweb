import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { articles } from "@/lib/site-data";

export function BlogPreview() {
  return (
    <section id="blog" className="bg-mist py-24 sm:py-32"><div className="section-shell"><Reveal><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Ideas en movimiento" title={<>Últimos <span className="text-secondary">artículos.</span></>} description="Historias, herramientas y conversaciones que nacen en el territorio y regresan convertidas en preguntas nuevas." /><Link href="/blog" className="focus-ring inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-secondary transition-colors hover:text-primary">Ver todo el blog <ArrowUpRight size={16} /></Link></div></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-3">{articles.map((article, index) => <Reveal key={article.title} delay={index * 0.08} className="group overflow-hidden rounded-[1.8rem] bg-paper shadow-card transition-transform hover:-translate-y-1"><div className="relative aspect-[1.35/1] overflow-hidden"><Image src={article.image} alt={article.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 90vw, 33vw" /><div className={`absolute inset-0 ${article.tone} opacity-20 mix-blend-multiply`} /></div><div className="p-6 sm:p-7"><div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.15em] text-ink/45"><span>{article.category}</span><span className="flex items-center gap-1"><CalendarDays size={13} />{article.date}</span></div><h3 className="display-title mt-5 text-2xl leading-[0.98]">{article.title}</h3><p className="mt-4 text-sm leading-6 text-ink/60">{article.text}</p><Link href="/blog#historias" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-primary">Leer más <ArrowUpRight size={16} /></Link></div></Reveal>)}</div></div></section>
  );
}
