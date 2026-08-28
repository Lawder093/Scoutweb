import Image from "next/image";
import { MoveLeft } from "lucide-react";
import type { CDECommunityPhoto } from "@/content/cdes/types";

const sizeClasses: Record<CDECommunityPhoto["size"], string> = {
  small: "h-40 w-40 sm:h-48 sm:w-48",
  medium: "h-52 w-56 sm:h-64 sm:w-72",
  large: "h-56 w-72 sm:h-72 sm:w-96",
  tall: "h-72 w-48 sm:h-96 sm:w-64",
};

type CommunityPhotoReelProps = {
  communityName: string;
  photos: CDECommunityPhoto[];
};

export function CommunityPhotoReel({ communityName, photos }: CommunityPhotoReelProps) {
  if (photos.length === 0) {
    return null;
  }

  const loopPhotos = [...photos, ...photos];

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
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-ink/45">
            <MoveLeft size={15} className="text-secondary" aria-hidden="true" />
            Desplazamiento automático
          </p>
        </div>
      </div>

      <div className="photo-reel__viewport mt-10" aria-label={`Momentos de ${communityName}`} role="region">
        <div className="photo-reel__track">
          {loopPhotos.map((photo, index) => {
            const isDuplicate = index >= photos.length;

            return (
              <figure
                key={`${photo.label}-${index}`}
                className={`photo-reel__item ${sizeClasses[photo.size]}`}
                aria-hidden={isDuplicate}
              >
                <Image
                  src={photo.src}
                  alt={isDuplicate ? "" : photo.alt}
                  fill
                  loading={isDuplicate ? "lazy" : "eager"}
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 55vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-xs font-extrabold uppercase tracking-[0.1em] text-white">
                  {photo.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
