import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "./brand-mark";

const markers = [
  { name: "México", slug: "mexico", left: "20%", top: "12.5%", color: "bg-primary" },
  { name: "Colombia", slug: "colombia", left: "52%", top: "32.5%", color: "bg-accent" },
  { name: "Argentina", slug: "argentina", left: "63.5%", top: "74%", color: "bg-secondary" },
];

export function LatinAmericaMap() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative aspect-[760/900] w-full">
        <Image
          src="/images/latin-america-map.svg"
          alt="Mapa de Latinoamérica desde México hasta Argentina y Chile, con México, Colombia y Argentina resaltados"
          fill
          unoptimized
          className="object-contain"
          sizes="(max-width: 1024px) 92vw, 560px"
        />

        <div className="absolute inset-0">
          <span className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/25 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-secondary/70 sm:text-[10px]" style={{ left: "54.5%", top: "70.5%" }}>
            Chile
          </span>

          {markers.map((marker) => (
            <Link
              key={marker.slug}
              href={`/cde/${marker.slug}`}
              aria-label={`Abrir CDE ${marker.name}`}
              className="focus-ring group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl"
              style={{ left: marker.left, top: marker.top }}
            >
              <span className={`marker-pulse grid h-12 w-12 place-items-center rounded-full border-4 border-paper bg-paper p-1.5 shadow-lg transition-transform group-hover:scale-110 group-focus-visible:scale-110 sm:h-14 sm:w-14 ${marker.color}`}>
                <span className="grid h-full w-full place-items-center rounded-full bg-paper">
                  <BrandMark size={30} decorative />
                </span>
              </span>
              <span className="mt-1.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-white shadow-lg sm:text-[10px]">
                CDE · {marker.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <nav aria-label="Centros de Desarrollo Escultista activos" className="mt-5 grid grid-cols-3 gap-2 border-t border-ink/10 pt-4">
        {markers.map((marker) => (
          <Link key={marker.slug} href={`/cde/${marker.slug}`} className="focus-ring flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-1 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.08em] text-ink/60 transition-colors hover:text-primary sm:text-xs">
            <span className={`h-2 w-2 shrink-0 rounded-full ${marker.color}`} aria-hidden="true" />
            <span className="truncate">{marker.name}</span>
          </Link>
        ))}
      </nav>

      <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-ink/40">
        Los marcadores indican los CDE activos actualmente
      </p>
    </div>
  );
}
