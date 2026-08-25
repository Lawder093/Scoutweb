import type { CDEData } from "./types";

export const colombia: CDEData = {
  slug: "colombia",
  country: "Colombia",
  region: "Centro de Desarrollo Escultista · Colombia",
  communityName: "CDE Colombia",
  logoLabel: "CDE COL",
  description: "Un punto de encuentro para cruzar saberes, territorios y formas de defender la vida en comunidad.",
  heroImage: "/images/scouts-circle.png",
  welcome: "Bienvenides al Centro de Desarrollo Escultista de Colombia. Nos encontramos para aprender a leer el territorio, defender la vida y caminar con otros ritmos.",
  origin: "El CDE Colombia surge del encuentro entre experiencias educativas, comunitarias y de cuidado que buscan defender la vida y leer cada territorio desde sus propias voces.",
  communities: [
    { id: "ronda", kind: "Ronda", name: "Ronda", description: "Jugar, preguntar y descubrir el territorio desde los primeros años.", ageRange: "5 a 6 años" },
    { id: "tropa", kind: "Tropa", name: "Tropa", description: "Caminatas, proyectos y aprendizajes para fortalecer la acción colectiva.", ageRange: "11 a 14 años" },
    { id: "clan", kind: "Clan", name: "Clan", description: "Juventudes que conectan memoria, participación y defensa de la vida.", ageRange: "15 a 17 años" },
  ],
  history: [
    "El CDE Colombia nace del deseo de reunir experiencias educativas, comunitarias y de cuidado que ya están transformando sus territorios.",
    "Cada encuentro suma una voz: la de quienes facilitan, juegan, acompañan y sostienen la vida cotidiana desde abajo.",
  ],
  philosophy: "La educación es una práctica de libertad cuando nos permite nombrar lo que vivimos, reconocer nuestras fuerzas y organizarnos para cambiarlo.",
  mission: "Conectar personas y experiencias que defienden la vida a través de la educación, el juego y el trabajo comunitario.",
  vision: "Construir una red de comunidades educativas que aprenda a cuidarse mientras transforma las condiciones de su territorio.",
  values: [
    { label: "Territorio", text: "Aprender de los lugares que habitamos." },
    { label: "Memoria", text: "Reconocer las historias que nos trajeron hasta aquí." },
    { label: "Comunidad", text: "Nadie transforma en soledad." },
  ],
  timeline: [
    { year: "Origen", title: "Cruzar caminos", text: "Distintas experiencias educativas comienzan a reconocerse como parte de una conversación común." },
    { year: "Proceso", title: "Cuidar los vínculos", text: "La formación se convierte también en una práctica de escucha y acompañamiento." },
    { year: "Hoy", title: "Defender la vida", text: "El CDE abre espacios para compartir herramientas y fortalecer la acción comunitaria." },
  ],
  educators: [
    { name: "Camila Torres", role: "Facilitadora territorial", community: "Ronda", bio: "Acompaña grupos juveniles y procesos de memoria comunitaria.", interests: ["Memoria", "Territorio"], image: "/images/scouts-circle.png" },
    { name: "Andrés Gómez", role: "Educador popular", community: "Tropa", bio: "Trabaja con metodologías participativas y educación al aire libre.", interests: ["Juego", "Cuidado"], image: "/images/scouts-hero.png" },
    { name: "Valentina Ríos", role: "Coordinadora de red", community: "Clan", bio: "Conecta experiencias y facilita encuentros entre comunidades.", interests: ["Redes", "Formación"], image: "/images/scouts-circle.png" },
  ],
  activities: [
    { id: "cartografias-cuidado", title: "Cartografías del cuidado", date: "Septiembre 2024", image: "/images/scouts-circle.png", summary: "Mapear personas, espacios y prácticas que sostienen la vida en nuestros barrios.", content: "El grupo reúne relatos y lugares significativos para construir una cartografía comunitaria del cuidado." },
    { id: "campamentos-comunitarios", title: "Campamentos comunitarios", date: "Noviembre 2024", image: "/images/scouts-hero.png", summary: "Aprender del paisaje y construir acuerdos para habitarlo de otra manera.", content: "Los campamentos proponen experiencias de vida al aire libre, escucha territorial y trabajo colectivo." },
  ],
  gallery: [
    { src: "/images/scouts-circle.png", alt: "Grupo compartiendo un mapa", label: "Escuchar el territorio" },
    { src: "/images/scouts-hero.png", alt: "Caminata colectiva", label: "Caminar juntes" },
    { src: "/images/scouts-circle.png", alt: "Encuentro educativo", label: "Compartir saberes" },
    { src: "/images/scouts-hero.png", alt: "Grupo en la montaña", label: "Defender la vida" },
  ],
  feed: [
    { author: "CDE Colombia", role: "Actualización de comunidad", text: "Estamos reuniendo historias para la próxima cartografía del cuidado.", time: "Hace 1 día", comments: 6, likes: 31, image: "/images/scouts-circle.png" },
    { author: "Camila Torres", role: "Facilitadora", text: "Caminar despacio también es una forma de estar atentes a lo que el territorio nos cuenta.", time: "Hace 4 días", comments: 3, likes: 19 },
  ],
};
