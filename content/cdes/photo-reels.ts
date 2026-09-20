import type { CDECommunityKind, CDECommunityPhoto, CDECommunityPhotoSize } from "./types";

type PhotoDefinition = {
  folder: string;
  community: string;
  file: string;
  label: string;
  size: CDECommunityPhotoSize;
};

function localPhoto({ folder, community, file, label, size }: PhotoDefinition): CDECommunityPhoto {
  return {
    src: `/images/${folder}/${file}`,
    alt: `Fotografía de la comunidad ${community} del CDE México`,
    label,
    size,
  };
}

const mexicoPhotoReels: Partial<Record<CDECommunityKind, CDECommunityPhoto[]>> = {
  Ronda: [
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "0be2484d-218b-42d3-b4a2-ddb582d3de82.jpg", label: "Jugar en comunidad", size: "medium" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_0819.jpeg", label: "Explorar juntes", size: "large" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_1814.jpeg", label: "Primeros caminos", size: "tall" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_1897.jpeg", label: "Encontrarnos", size: "tall" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_2288.jpeg", label: "Aprender jugando", size: "tall" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_2445.jpeg", label: "Compartir la aventura", size: "large" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_2495.jpeg", label: "Cuidar el entorno", size: "tall" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "IMG_3616.jpeg", label: "Seguir la ruta", size: "tall" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "ronda-nuevo-carrete-01.jpg", label: "Jugar entre árboles", size: "large" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "ronda-nuevo-carrete-03.png", label: "Compartir el encuentro", size: "large" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "ronda-nuevo-carrete-04.png", label: "Descubrir jugando", size: "large" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "ronda-nuevo-carrete-05.png", label: "Jugar bajo la lluvia", size: "large" }),
    localPhoto({ folder: "RondaMexico", community: "Ronda", file: "ronda-nuevo-carrete-06.png", label: "Compartir la comida", size: "large" }),
  ],
  Manada: [
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "IMG_0432.JPG", label: "Imaginar en grupo", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "IMG_1414.jpeg", label: "Explorar el entorno", size: "tall" }),
    localPhoto({ folder: "RondaMexico", community: "Manada", file: "ronda-nuevo-carrete-02.png", label: "Encontrarnos en comunidad", size: "medium" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-01.png", label: "Acompañar el camino", size: "medium" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-02.png", label: "Escuchar el territorio", size: "tall" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-03.png", label: "Compartir la mesa", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-04.png", label: "Celebrar en grupo", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-05.png", label: "Acompañar el crecimiento", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-06.png", label: "Cuidar los primeros pasos", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-07.png", label: "Caminar el territorio", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-08.png", label: "Jugar en el barrio", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-09.png", label: "Organizarse en comunidad", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-10.png", label: "Celebrar la historia", size: "large" }),
    localPhoto({ folder: "ManadaMexico", community: "Manada", file: "manada-nuevo-carrete-11.png", label: "Viajar en comunidad", size: "large" }),
  ],
  Tropa: [
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0051.jpeg", label: "Preparar la ruta", size: "tall" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0180.jpeg", label: "Aprender haciendo", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0205.jpeg", label: "Resolver en equipo", size: "tall" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0284.jpeg", label: "Leer el territorio", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0396.jpeg", label: "Caminar juntes", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0441.jpeg", label: "Compartir saberes", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0779.jpeg", label: "Construir acuerdos", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_0861.jpeg", label: "Cuidar la vida al aire libre", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_1097.jpeg", label: "Organizar el proyecto", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "IMG_1243.jpeg", label: "Vivir la aventura", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-01.png", label: "Aprender entre pares", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-02.png", label: "Compartir la ruta", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-03.png", label: "Celebrar el camino", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-04.png", label: "Escuchar al grupo", size: "tall" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-05.png", label: "Crear en comunidad", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-06.png", label: "Caminar en equipo", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-07.png", label: "Explorar el territorio", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-08.png", label: "Compartir saberes", size: "medium" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-09.png", label: "Conversar en comunidad", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-10.png", label: "Acompañar el aprendizaje", size: "large" }),
    localPhoto({ folder: "TropaMexico", community: "Tropa", file: "tropa-nuevo-carrete-11.png", label: "Resolver en equipo", size: "large" }),
  ],
  Clan: [
    localPhoto({ folder: "ClanMexico", community: "Clan", file: "IMG_0025.jpeg", label: "Construir proyecto", size: "large" }),
    localPhoto({ folder: "ClanMexico", community: "Clan", file: "clan-nuevo-carrete-01.png", label: "Compartir la ruta", size: "large" }),
    localPhoto({ folder: "ClanMexico", community: "Clan", file: "clan-nuevo-carrete-02.png", label: "Sostener la experiencia", size: "large" }),
    localPhoto({ folder: "ClanMexico", community: "Clan", file: "clan-nuevo-carrete-03.png", label: "Acompañar a la comunidad", size: "large" }),
    localPhoto({ folder: "ClanMexico", community: "Clan", file: "clan-nuevo-carrete-04.png", label: "Conversar y acompañar", size: "large" }),
  ],
};

const photoReelsByCDE: Record<string, Partial<Record<CDECommunityKind, CDECommunityPhoto[]>>> = {
  mexico: mexicoPhotoReels,
};

export function getCDEPhotoReel(cdeSlug: string, communityKind: CDECommunityKind) {
  return photoReelsByCDE[cdeSlug]?.[communityKind];
}
