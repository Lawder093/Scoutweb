import Link from "next/link";

const markers = [
  { name: "México", code: "MEX", slug: "mexico", className: "left-[28%] top-[28%]", color: "bg-primary text-white" },
  { name: "Colombia", code: "COL", slug: "colombia", className: "left-[52%] top-[57%]", color: "bg-accent text-ink" },
  { name: "Argentina", code: "ARG", slug: "argentina", className: "left-[60%] top-[85%]", color: "bg-secondary text-white" },
];

export function LatinAmericaMap() {
  return (
    <div className="relative mx-auto aspect-[1.22/1] w-full max-w-[650px]">
      <svg viewBox="0 0 620 510" className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa ilustrado de América Latina">
        <path d="M91 68c16-15 42-25 62-22 15 3 25 16 39 19 14 3 27-4 37 3 11 7 10 25 23 31 12 5 28-4 38 4 10 8 3 26 14 34 10 8 32 1 38 14 5 11-11 25-5 38 7 15 32 16 38 33 4 13-11 27-7 39 6 17 31 22 34 40 3 17-18 31-20 48-1 13 13 24 13 40 1 20-19 36-17 51 2 17 29 22 36 7 7-16-7-31-12-46-5-15 1-28 13-37 10-7 28-9 29-22 1-12-16-20-17-33-1-12 9-22 20-25 12-4 25 2 35-5 11-8 7-27 17-34 12-9 31 3 42-5 10-8 6-26 16-34 9-8 25-3 31-12 8-11-3-31-16-36-12-5-25 2-36 7-15 6-30 4-42-6-10-8-13-22-23-29-15-10-35-2-48-13-9-8-10-23-19-29-11-7-27 2-38-5-8-5-12-18-21-22-11-5-25 4-35 0-9-4-12-17-21-21-11-5-23 2-35-1-17-4-23-23-38-28-14-5-31 4-45-1-10-4-16-16-26-18-13-3-26 6-37 4-14-3-22-18-36-20-14-2-29 7-39 18-8 9-13 21-13 33 0 13 5 26 1 38-5 14-20 25-22 40-2 13 7 25 5 38-2 15-18 28-16 44 1 14 17 23 19 37 3 16-13 32-9 47 3 11 14 16 22 24 9 10 9 27 5 38-3 11-14 20-13 32 1 11 14 16 24 23 11 8 23 19 25 33 2 14-8 28-21 34-12 7-26 4-39 8-21 7-33 27-48 41-19 18-49 25-73 18-24-7-44-29-46-54-1-14 4-28 2-42-2-19-17-34-23-52-6-19-2-40 4-59 6-19 11-39 6-58-5-20-21-39-18-60 3-21 25-37 30-57 3-12-1-25 6-35z" fill="#ffffff" stroke="#831817" strokeWidth="3" strokeLinejoin="round" />
        <path d="M130 100c47 28 79 22 113 33 52 17 85 13 120 39M221 183c23 26 40 52 47 83m56-69c14 35 14 85 3 121m27-15c-12 45-11 99 4 136" fill="none" stroke="#f6a006" strokeWidth="2" strokeDasharray="5 8" />
        <path d="M463 284c23-14 44-12 65 3m-48 22c19 3 34 13 43 29" fill="none" stroke="#f6a006" strokeWidth="2" strokeDasharray="5 8" />
      </svg>
      <div className="absolute inset-0">
        {markers.map((marker) => (
          <Link key={marker.slug} href={`/cde/${marker.slug}`} className={`focus-ring group absolute -translate-x-1/2 -translate-y-1/2 ${marker.className}`}>
            <span className={`marker-pulse grid h-12 w-12 place-items-center rounded-full border-4 border-paper shadow-lg transition-transform group-hover:scale-110 ${marker.color}`}><span className="text-center leading-none"><span className="block text-[8px] font-black tracking-[0.08em]">CDE</span><span className="mt-0.5 block text-[8px] font-bold opacity-75">{marker.code}</span></span></span>
            <span className="absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">{marker.name}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-ink/10 bg-paper/85 px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-ink/55 backdrop-blur-sm">CDE · Centros de Desarrollo Escultista</div>
    </div>
  );
}
