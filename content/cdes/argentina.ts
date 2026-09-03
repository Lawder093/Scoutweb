import type { CDEData } from "./types";
import { makeCommunity } from "./community-framework";

export const argentina: CDEData = {
  slug: "argentina",
  country: "Argentina",
  region: "Centro de Desarrollo Escultista · Argentina",
  communityName: "CDE Argentina",
  logoLabel: "CDE ARG",
  description: "Un espacio para recuperar el juego, la memoria y la acción colectiva como herramientas de transformación desde Argentina.",
  heroImage: "/images/scouts-hero.png",
  welcome: "Bienvenides al Centro de Desarrollo Escultista de Argentina. Aquí la alegría no es una pausa de la lucha: es una manera de organizarnos.",
  origin: "El CDE Argentina se vincula con experiencias como San Lucas, en Bahía Blanca, y con una comunidad que busca sostener la imaginación, el juego, la memoria y el deseo de construir con otras personas.",
  communities: [
    makeCommunity("Manada", { description: "La Manada argentina hace del juego, las historias y la exploración una entrada sensible a la vida en comunidad." }),
    makeCommunity("Tropa", { description: "La Tropa argentina pone el cuerpo en aventuras, proyectos y acuerdos que conectan memoria local y participación." }),
    makeCommunity("Clan", { description: "El Clan argentino convierte la memoria y la autonomía juvenil en proyectos de servicio con otras personas." }),
  ],
  history: [
    "La colaboración con Argentina se enlaza con experiencias de grupos como San Lucas, en Bahía Blanca, que muestran que la transformación puede comenzar en una comunidad pequeña.",
    "Nos encontramos para recuperar memorias, inventar herramientas y compartirlas con quienes también están armando una educación escultista crítica y popular en el Cono Sur.",
  ],
  philosophy: "Aprender también es ensayar otros modos de relación. El juego, la memoria y la palabra colectiva abren caminos para una educación emancipadora.",
  mission: "Crear espacios de formación y encuentro que fortalezcan la autonomía, la alegría y la capacidad de organización comunitaria.",
  vision: "Una comunidad educativa que multiplica herramientas, cuida sus vínculos y participa activamente en la transformación de su entorno.",
  values: [
    { label: "Juego", text: "Imaginar alternativas y ponerlas a prueba." },
    { label: "Memoria", text: "Aprender de las luchas y experiencias que nos anteceden." },
    { label: "Acción", text: "Hacer visible que otra forma de vivir ya está en marcha." },
  ],
  timeline: [
    { year: "Memoria", title: "Recuperar las voces", text: "Las historias de quienes educan y se organizan se vuelven material para aprender." },
    { year: "Presente", title: "Jugar con seriedad", text: "El grupo prueba herramientas que permiten imaginar otros futuros posibles." },
    { year: "Futuro", title: "Multiplicar la ronda", text: "Cada experiencia compartida puede convertirse en una nueva puerta de entrada." },
  ],
  educators: [],
  activities: [
    { id: "san-lucas-memoria", title: "San Lucas: memoria, juego y comunidad", date: "Línea de trabajo", image: "/images/scouts-circle.png", summary: "Recuperar historias locales y convertirlas en juegos, conversaciones y experiencias compartidas.", content: "La memoria no se guarda como pieza de museo: se vuelve una pregunta para leer el presente y construir nuevas formas de participación." },
    { id: "argentina-intercambio", title: "Intercambio de prácticas del Cono Sur", date: "Proceso de colaboración", image: "/images/scouts-hero.png", summary: "Compartir herramientas de educación popular, aire libre y acompañamiento entre grupos.", content: "El intercambio permite adaptar las propuestas al territorio de cada comunidad y devolver lo aprendido a la red." },
  ],
  gallery: [
    { src: "/images/scouts-circle.png", alt: "Grupo en círculo", label: "Abrir la palabra" },
    { src: "/images/scouts-hero.png", alt: "Grupo en camino", label: "Poner el cuerpo" },
    { src: "/images/scouts-circle.png", alt: "Taller colaborativo", label: "Inventar juntes" },
    { src: "/images/scouts-hero.png", alt: "Personas compartiendo un sendero", label: "Hacer memoria" },
  ],
  feed: [
    { author: "CDE Argentina", role: "Nota de comunidad", text: "Abrimos un archivo para recibir relatos de juegos que hayan hecho comunidad.", time: "Próxima publicación", comments: 0, likes: 0, image: "/images/scouts-circle.png" },
    { author: "CDE Argentina", role: "Nota de comunidad", text: "La alegría también puede ser una tecnología para sostenernos.", time: "Próxima publicación", comments: 0, likes: 0 },
  ],
};
