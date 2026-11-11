"use client";

import { PointerEvent, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Globe2, Rotate3D, Sparkles } from "lucide-react";
import type { PostcardView } from "@/lib/content/postcards-types";

function flagFor(country: string): string {
  return country === "México" ? "🇲🇽" : country === "Colombia" ? "🇨🇴" : country === "Argentina" ? "🇦🇷" : "🌎";
}

function dateLabel(value: string | null): string {
  return value ? new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Hoy";
}

function PostcardCanvas({ postcard, onSwipe }: { postcard: PostcardView; onSwipe: (direction: "next" | "previous") => void }) {
  const [flipped, setFlipped] = useState(false);
  const [dragX, setDragX] = useState(0);
  const pointerStart = useRef<number | null>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null || flipped) return;
    setDragX(event.clientX - pointerStart.current);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    setDragX(0);
    if (Math.abs(distance) >= 56) {
      onSwipe(distance < 0 ? "next" : "previous");
      return;
    }
    setFlipped((current) => !current);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFlipped((current) => !current);
    }
  }

  const rotation = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
  const tilt = dragX ? `rotate(${dragX / 38}deg)` : "rotate(0deg)";

  return <div role="button" tabIndex={0} aria-label={`${flipped ? "Ver portada" : "Leer mensaje"} de ${postcard.author_name}`} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} className="relative mx-auto h-[min(78vw,38rem)] min-h-[30rem] w-full max-w-5xl cursor-grab touch-pan-y select-none [perspective:1800px] active:cursor-grabbing sm:min-h-[34rem]">
    <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: `${rotation} ${tilt} translateX(${dragX}px)` }}>
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[#d7c2a1] bg-[#f5ead7] p-3 shadow-[0_24px_70px_rgba(71,43,21,0.18)] sm:rounded-[2.5rem] sm:p-5 [backface-visibility:hidden]">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#dec9a8] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.72),transparent_34%),linear-gradient(145deg,#f8eedc,#ead7b8)] sm:rounded-[1.8rem]">
          <div className="absolute left-5 top-5 z-10 rounded-sm border border-[#315c48]/15 bg-[#fff9ed]/95 px-3 py-2 text-2xl shadow-sm sm:left-8 sm:top-8 sm:px-4 sm:py-3 sm:text-4xl">{flagFor(postcard.country_name)}</div>
          {postcard.group_logo_url ? <img src={postcard.group_logo_url} alt={`Logo de ${postcard.group_name}`} className="absolute right-5 top-5 z-10 h-14 w-14 rounded-xl border border-[#315c48]/15 bg-[#fff9ed]/95 object-contain p-2 shadow-sm sm:right-8 sm:top-8 sm:h-20 sm:w-20 sm:rounded-2xl sm:p-3" /> : <span className="absolute right-5 top-5 z-10 grid h-14 w-14 place-items-center rounded-xl border border-[#315c48]/15 bg-[#fff9ed]/95 text-3xl text-[#315c48] shadow-sm sm:right-8 sm:top-8 sm:h-20 sm:w-20 sm:rounded-2xl sm:text-5xl">⚜</span>}
          <div className="relative mx-7 mt-16 aspect-[4/3] overflow-hidden rounded-sm border-[5px] border-[#fffaf0] bg-[#d8d8d3] shadow-[0_8px_18px_rgba(71,43,21,0.18)] sm:mx-14 sm:mt-24 sm:aspect-[16/8.5] sm:border-[8px]">
            {postcard.cover_image_url ? <img src={postcard.cover_image_url} alt={`Portada de la postal de ${postcard.author_name}`} loading="lazy" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-center text-[#7c7a75]"><span><span className="block text-5xl">⌁</span><span className="mt-2 block text-sm font-black uppercase tracking-[0.16em]">Foto de la postal</span></span></div>}
          </div>
          <div className="mt-auto px-8 pb-6 text-center sm:px-12 sm:pb-9"><p className="font-serif text-[clamp(1.8rem,5vw,3.8rem)] font-bold italic leading-none tracking-[-0.04em] text-[#164e3d]">{postcard.group_name}</p><div className="mx-auto mt-3 inline-flex max-w-full items-center gap-3 rounded-full bg-[#315c48] px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#fff9ed] shadow-sm"><span className="truncate">{postcard.country_name}</span><span className="h-1 w-1 shrink-0 rounded-full bg-[#f1b344]" /><span className="truncate">{dateLabel(postcard.published_at)}</span></div></div>
          <div className="absolute bottom-5 left-5 hidden text-[#315c48]/70 sm:block sm:left-8"><span className="text-4xl">▲</span><span className="ml-[-8px] text-2xl">▲</span></div>
          <div className="absolute bottom-5 right-5 hidden text-[#315c48]/70 sm:block sm:right-8"><span className="text-4xl">⌂</span></div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[#d7c2a1] bg-[#f8efdf] p-7 shadow-[0_24px_70px_rgba(71,43,21,0.18)] sm:rounded-[2.5rem] sm:p-12 [backface-visibility:hidden] [transform:rotateY(180deg)]">
        <div className="flex h-full flex-col rounded-[1.5rem] border border-dashed border-[#bfa582] p-6 sm:p-10"><div className="flex items-start justify-between gap-5 border-b border-[#cdbb9d] pb-5"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#315c48]">{flagFor(postcard.country_name)} {postcard.country_name}</p><p className="mt-2 font-serif text-2xl font-bold italic text-[#164e3d] sm:text-4xl">{postcard.group_name}</p></div><span className="rounded-xl border border-[#315c48]/20 bg-[#fffaf0] px-3 py-2 text-2xl">✉</span></div><p className="flex flex-1 items-center whitespace-pre-wrap font-serif text-[clamp(1.25rem,3vw,2.3rem)] leading-[1.45] text-[#463c33]">{postcard.message}</p><div className="flex items-end justify-between gap-5 border-t border-[#cdbb9d] pt-5 text-sm text-[#786f65]"><span><strong className="block text-base text-[#164e3d]">{postcard.author_name}</strong><span className="mt-1 block">{dateLabel(postcard.published_at)} · Visible 72 horas</span></span><span className="text-right"><Globe2 className="ml-auto" size={21} /><span className="mt-1 block">Desde {postcard.country_name}</span></span></div></div>
      </div>
    </div>
  </div>;
}

export function PostcardSection({ postcards }: { postcards: PostcardView[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < postcards.length - 1;
  const move = (direction: "next" | "previous") => setActiveIndex((current) => direction === "next" ? Math.min(postcards.length - 1, current + 1) : Math.max(0, current - 1));

  return <section id="conecta" className="overflow-hidden bg-mist py-24 sm:py-32"><div className="section-shell"><div className="flex flex-wrap items-end justify-between gap-8"><div className="max-w-2xl"><span className="eyebrow text-secondary"><Sparkles size={14} /> Conecta</span><h2 className="display-title mt-5 text-5xl leading-[0.92] sm:text-7xl">Postales que<br /><span className="text-secondary">cruzan fronteras</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-ink/60">Una ventana breve para saber que otros grupos scouts también están aquí, trabajando y haciendo comunidad.</p></div>{postcards.length > 0 && <div className="flex items-center gap-2"><button type="button" onClick={() => move("previous")} disabled={!hasPrevious} aria-label="Postal anterior" className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"><ArrowLeft size={18} /></button><button type="button" onClick={() => move("next")} disabled={!hasNext} aria-label="Siguiente postal" className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"><ArrowRight size={18} /></button></div>}</div>{postcards.length === 0 ? <div className="mt-12 rounded-[2rem] border border-dashed border-secondary/30 bg-paper p-10 text-center shadow-card"><p className="mx-auto max-w-xl text-2xl font-black leading-tight text-ink sm:text-3xl">“Un scout nunca camina solo: siempre encuentra otra comunidad con quien compartir el camino.”</p><p className="mt-4 text-sm text-ink/50">Pronto aparecerán aquí las primeras postales del mundo.</p></div> : <div className="mt-12"><PostcardCanvas key={postcards[activeIndex].id} postcard={postcards[activeIndex]} onSwipe={move} /><p className="mt-5 flex items-center justify-center gap-2 text-center text-xs font-bold text-ink/45"><Rotate3D size={15} /> Toca para voltear · desliza para cambiar de postal</p><div className="mt-4 flex justify-center gap-2" aria-label="Paginación de postales">{postcards.map((postcard, index) => <button key={postcard.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Ver postal ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-8 bg-secondary" : "w-2 bg-ink/20"}`} />)}</div></div>}</div></section>;
}
