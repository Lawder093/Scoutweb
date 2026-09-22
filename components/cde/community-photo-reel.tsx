import Image from "next/image";
import type { CDECommunityPhoto } from "@/content/cdes/types";

const mosaicPositionClasses = [
  "col-span-1 row-span-2 sm:col-span-2 sm:row-span-2",
  "col-start-2 row-start-1 sm:col-start-3 sm:row-start-1",
  "col-start-2 row-start-2 sm:col-start-4 sm:row-start-1",
  "col-span-2 row-start-3 sm:col-span-2 sm:col-start-3 sm:row-start-2",
];

const mosaicPhotoCount = 4;

function chunkPhotos(photos: CDECommunityPhoto[], chunkSize: number) {
  return Array.from({ length: Math.ceil(photos.length / chunkSize) }, (_, index) =>
    photos.slice(index * chunkSize, index * chunkSize + chunkSize),
  );
}

type CommunityPhotoReelProps = {
  communityName: string;
  photos: CDECommunityPhoto[];
};

export function CommunityPhotoReel({ communityName, photos }: CommunityPhotoReelProps) {
  if (photos.length === 0) {
    return null;
  }

  const slides = chunkPhotos(photos, mosaicPhotoCount);
  const loopSlides = [...slides, ...slides];

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
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink/45">Carrusel de derecha a izquierda</p>
        </div>
      </div>

      <div className="section-shell mt-10">
        <div className="photo-mosaic__viewport" aria-label={`Carrusel de momentos de ${communityName}`} aria-roledescription="carousel" role="region">
          <div className="photo-mosaic__track">
            {loopSlides.map((slide, slideIndex) => {
              const isDuplicate = slideIndex >= slides.length;

              return (
                <div key={`mosaic-slide-${slideIndex}`} className="photo-mosaic__slide" aria-hidden={isDuplicate}>
                  <div className="photo-mosaic">
                    {slide.map((photo, photoIndex) => (
                      <figure key={`${photo.src}-${slideIndex}`} className={`photo-mosaic__item ${mosaicPositionClasses[photoIndex]}`} aria-label={photo.label}>
                        <Image
                          src={photo.src}
                          alt={isDuplicate ? "" : photo.alt}
                          fill
                          loading={slideIndex === 0 ? "eager" : "lazy"}
                          className="object-cover transition duration-500 hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                        <figcaption className="absolute inset-x-4 bottom-4 text-xs font-extrabold text-white drop-shadow-sm sm:text-sm">{photo.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
