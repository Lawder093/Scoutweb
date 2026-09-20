import Image from "next/image";
import type { CDECommunityPhoto } from "@/content/cdes/types";

const mosaicClasses: Record<CDECommunityPhoto["size"], string> = {
  small: "col-span-1 row-span-1",
  medium: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
};

type CommunityPhotoReelProps = {
  communityName: string;
  photos: CDECommunityPhoto[];
};

export function CommunityPhotoReel({ communityName, photos }: CommunityPhotoReelProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-paper py-14 sm:py-20" aria-labelledby="momentos-comunidad-title">
      <div className="section-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow text-secondary">Momentos de la comunidad</span>
            <h2 id="momentos-comunidad-title" className="display-title mt-4 text-4xl leading-[0.95] sm:text-5xl">
              {communityName} <span className="text-primary">en movimiento.</span>
            </h2>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink/45">Un mosaico de momentos compartidos</p>
        </div>
      </div>

      <div className="section-shell mt-10">
        <div className="photo-mosaic" aria-label={`Momentos de ${communityName}`} role="region">
          {photos.map((photo, index) => (
            <figure key={photo.src} className={`photo-mosaic__item ${mosaicClasses[photo.size]}`} aria-label={photo.label}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={index < 4 ? "eager" : "lazy"}
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-4 text-xs font-extrabold text-white drop-shadow-sm sm:text-sm">{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
