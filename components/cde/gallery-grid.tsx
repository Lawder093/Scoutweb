import Image from "next/image";
import type { CDEGalleryItem } from "@/content/cdes/types";

export function GalleryGrid({ items }: { items: CDEGalleryItem[] }) {
  return <div className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[150px] sm:gap-4 md:grid-cols-4">{items.map((item, index) => <figure key={`${item.label}-${index}`} className={`group relative overflow-hidden rounded-[1.5rem] bg-secondary ${index === 0 ? "row-span-2 md:col-span-2 md:row-span-3" : index === 1 ? "row-span-3 md:row-span-2" : "row-span-2"}`}><Image src={item.src} alt={item.alt} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" /><div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" /><figcaption className="absolute bottom-3 left-4 right-4 text-xs font-bold text-white">{item.label}</figcaption></figure>)}</div>;
}
