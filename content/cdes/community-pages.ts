import type { CDECommunity, CDECommunityKind, CDECommunityPageData, CDECommunityPhoto, CDEData } from "./types";
import { communityFramework } from "./community-framework";

const communityPhotoReels: Record<CDECommunityKind, CDECommunityPhoto[]> = {
  Ronda: [
    { src: "/images/scouts-circle.png", alt: "Niñas y niños compartiendo un juego", label: "Abrir la ronda", size: "medium" },
    { src: "/images/inicio-cover.jpg", alt: "Comunidad scout reunida", label: "Encontrarnos", size: "large" },
    { src: "/images/scouts-hero.png", alt: "Grupo caminando por el territorio", label: "Explorar", size: "tall" },
    { src: "/images/scouts-circle.png", alt: "Grupo aprendiendo en comunidad", label: "Cuidarnos", size: "small" },
  ],
  Manada: [
    { src: "/images/inicio-cover.jpg", alt: "Comunidad scout compartiendo una actividad", label: "Hacer juntes", size: "large" },
    { src: "/images/scouts-circle.png", alt: "Personas reunidas en círculo", label: "Escuchar", size: "small" },
    { src: "/images/scouts-hero.png", alt: "Grupo explorando al aire libre", label: "Descubrir", size: "tall" },
    { src: "/images/inicio-cover.jpg", alt: "Grupo scout en movimiento", label: "Jugar", size: "medium" },
  ],
  Tropa: [
    { src: "/images/scouts-hero.png", alt: "Tropa caminando por el territorio", label: "Preparar la ruta", size: "large" },
    { src: "/images/inicio-cover.jpg", alt: "Comunidad scout reunida", label: "Leer el territorio", size: "tall" },
    { src: "/images/scouts-circle.png", alt: "Grupo compartiendo una actividad", label: "Compartir la tarea", size: "small" },
    { src: "/images/scouts-hero.png", alt: "Personas scouts en movimiento", label: "Caminar juntes", size: "medium" },
    { src: "/images/inicio-cover.jpg", alt: "Comunidad en acción", label: "Cerrar el día", size: "small" },
  ],
  Iris: [
    { src: "/images/scouts-circle.png", alt: "Juventudes reunidas en comunidad", label: "Tomar la palabra", size: "large" },
    { src: "/images/scouts-hero.png", alt: "Grupo scout recorriendo el territorio", label: "Investigar", size: "tall" },
    { src: "/images/inicio-cover.jpg", alt: "Comunidad compartiendo aprendizajes", label: "Compartir saberes", size: "small" },
    { src: "/images/scouts-circle.png", alt: "Personas construyendo acuerdos", label: "Organizarnos", size: "medium" },
  ],
  Clan: [
    { src: "/images/inicio-cover.jpg", alt: "Juventudes reunidas en comunidad", label: "Tomar la palabra", size: "large" },
    { src: "/images/scouts-hero.png", alt: "Grupo scout recorriendo el territorio", label: "Organizarnos", size: "tall" },
    { src: "/images/scouts-circle.png", alt: "Personas construyendo acuerdos", label: "Cuidar el proceso", size: "small" },
    { src: "/images/inicio-cover.jpg", alt: "Comunidad compartiendo aprendizajes", label: "Transformar", size: "medium" },
  ],
};

export function getCommunityPage(cde: CDEData, community: CDECommunity): CDECommunityPageData {
  const framework = communityFramework[community.kind];
  const customPage = community.page;
  const activities = customPage?.activities ?? framework.activities;

  return {
    introduction: customPage?.introduction ?? framework.introduction,
    purpose: customPage?.purpose ?? framework.purpose,
    groupStructure: customPage?.groupStructure ?? framework.groupStructure,
    progression: customPage?.progression ?? framework.progression,
    focusAreas: customPage?.focusAreas ?? framework.focusAreas,
    curriculum: customPage?.curriculum ?? framework.curriculum,
    knowledgeFoundation: customPage?.knowledgeFoundation ?? framework.knowledgeFoundation,
    photoReel: community.photoReel ?? customPage?.photoReel ?? communityPhotoReels[community.kind],
    activities: activities.map((activity) => ({
      ...activity,
      id: `${cde.slug}-${community.id}-${activity.id}`,
      title: `${activity.title} · ${cde.country}`,
      content: `${activity.content ?? activity.summary} Esta experiencia se adapta al territorio de ${cde.communityName}.`,
    })),
  };
}
