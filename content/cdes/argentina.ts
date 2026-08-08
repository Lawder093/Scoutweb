import type { CDEData } from "./types";

export const argentina: CDEData = {
  slug: "argentina",
  country: "Argentina",
  region: "Centro de Desarrollo Escultista · Argentina",
  communityName: "CDE Argentina",
  logoLabel: "CDE ARG",
  description: "Un espacio para recuperar el juego, la memoria y la acción colectiva como herramientas de transformación.",
  heroImage: "/images/scouts-hero.png",
  welcome: "Bienvenides al Centro de Desarrollo Escultista de Argentina. Aquí la alegría no es una pausa de la lucha: es una manera de organizarnos.",
  history: [
    "La comunidad crece alrededor de la pregunta por cómo sostener prácticas educativas críticas sin perder la imaginación, el juego y el deseo.",
    "Nos encontramos para recuperar memorias, inventar herramientas y compartirlas con quienes también están armando comunidad.",
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
  educators: [
    { name: "Lucía Fernández", role: "Coordinadora pedagógica", bio: "Diseña experiencias de juego, memoria y participación juvenil.", interests: ["Juego", "Memoria"], image: "/images/scouts-circle.png" },
    { name: "Tomás Pereyra", role: "Acompañante de grupo", bio: "Facilita procesos colectivos con una mirada puesta en el cuidado.", interests: ["Asambleas", "Cuerpo"], image: "/images/scouts-hero.png" },
    { name: "Emilia Sosa", role: "Articuladora comunitaria", bio: "Construye puentes entre organizaciones y espacios educativos.", interests: ["Redes", "Arte"], image: "/images/scouts-circle.png" },
  ],
  projects: [
    { title: "Juegos para asambleas", description: "Una colección de dinámicas para abrir la palabra y tomar decisiones juntes.", status: "En curso", date: "Octubre 2024", image: "/images/scouts-circle.png" },
    { title: "Archivo de experiencias", description: "Un espacio para guardar las historias que hacen crecer al movimiento.", status: "Próximo", date: "Diciembre 2024", image: "/images/scouts-hero.png" },
  ],
  gallery: [
    { src: "/images/scouts-circle.png", alt: "Grupo en círculo", label: "Abrir la palabra" },
    { src: "/images/scouts-hero.png", alt: "Grupo en camino", label: "Poner el cuerpo" },
    { src: "/images/scouts-circle.png", alt: "Taller colaborativo", label: "Inventar juntes" },
    { src: "/images/scouts-hero.png", alt: "Personas compartiendo un sendero", label: "Hacer memoria" },
  ],
  feed: [
    { author: "CDE Argentina", role: "Actualización de comunidad", text: "Abrimos el archivo para recibir relatos de juegos que hayan hecho comunidad.", time: "Hace 3 días", comments: 10, likes: 28, image: "/images/scouts-circle.png" },
    { author: "Lucía Fernández", role: "Coordinadora", text: "La alegría también puede ser una tecnología para sostenernos.", time: "Hace 6 días", comments: 5, likes: 22 },
  ],
};
