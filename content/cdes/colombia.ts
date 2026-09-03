import type { CDEData } from "./types";
import { makeCommunity } from "./community-framework";

export const colombia: CDEData = {
  slug: "colombia",
  country: "Colombia",
  region: "Centro de Desarrollo Escultista · Colombia",
  communityName: "CDE Colombia",
  logoLabel: "CDE COL",
  description: "Un punto de encuentro para cruzar saberes, territorios y formas de defender la vida en comunidad desde Colombia.",
  heroImage: "/images/scouts-circle.png",
  welcome: "Bienvenides al Centro de Desarrollo Escultista de Colombia. Nos encontramos para aprender a leer el territorio, defender la vida y caminar con otros ritmos.",
  origin: "El CDE Colombia se articula alrededor de experiencias como Meraki, en Bogotá, que llevan el escultismo crítico popular a los barrios, las calles y los proyectos culturales, ambientales y sociales construidos con la comunidad.",
  communities: [
    makeCommunity("Ronda", { description: "La Ronda colombiana parte del juego y la escucha para que las primeras preguntas sobre el territorio tengan un lugar seguro." }),
    makeCommunity("Tropa", { description: "La Tropa colombiana organiza patrullas, rutas y proyectos para convertir la lectura del barrio en acción colectiva." }),
    makeCommunity("Clan", { description: "El Clan colombiano conecta memoria, participación juvenil y defensa de la vida en proyectos con otras comunidades." }),
  ],
  history: [
    "El vínculo con Colombia se fortalece a través de grupos que trabajan desde sus propios territorios y entienden el escultismo como una herramienta de educación popular, no como un formato único.",
    "El encuentro con el CDE Meraki de Bogotá abrió una colaboración sostenida para compartir prácticas, proyectos y preguntas sobre cómo defender la vida desde el barrio.",
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
  educators: [],
  activities: [
    { id: "meraki-territorio", title: "Meraki: proyectos desde el territorio", date: "Línea de trabajo", image: "/images/scouts-circle.png", summary: "Experiencias en Bogotá que enlazan juego, campismo y proyectos culturales, ambientales y sociales.", content: "La propuesta parte de las preguntas del grupo y de las condiciones del barrio para construir acciones con otras personas, no para hablar en su nombre." },
    { id: "colombia-campismo-comunitario", title: "Campismo y organización comunitaria", date: "Práctica del programa", image: "/images/scouts-hero.png", summary: "Aprender técnicas al aire libre mientras se construyen acuerdos para cuidar el territorio.", content: "La vida al aire libre funciona como medio didáctico: prepara, observa, actúa y evalúa lo aprendido en comunidad." },
  ],
  gallery: [
    { src: "/images/scouts-circle.png", alt: "Grupo compartiendo un mapa", label: "Escuchar el territorio" },
    { src: "/images/scouts-hero.png", alt: "Caminata colectiva", label: "Caminar juntes" },
    { src: "/images/scouts-circle.png", alt: "Encuentro educativo", label: "Compartir saberes" },
    { src: "/images/scouts-hero.png", alt: "Grupo en la montaña", label: "Defender la vida" },
  ],
  feed: [
    { author: "CDE Colombia", role: "Nota de comunidad", text: "Reunimos historias para una cartografía comunitaria del cuidado.", time: "Próxima publicación", comments: 0, likes: 0, image: "/images/scouts-circle.png" },
    { author: "CDE Colombia", role: "Nota de comunidad", text: "Caminar despacio también es una forma de estar atentes a lo que el territorio nos cuenta.", time: "Próxima publicación", comments: 0, likes: 0 },
  ],
};
