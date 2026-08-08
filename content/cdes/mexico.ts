import type { CDEData } from "./types";

export const mexico: CDEData = {
  slug: "mexico",
  country: "México",
  region: "Centro de Desarrollo Escultista · Puebla",
  communityName: "CDE México",
  logoLabel: "CDE MEX",
  description: "Un laboratorio para imaginar pedagogías que nazcan del barrio, del cuerpo y de la organización cotidiana.",
  heroImage: "/images/scouts-hero.png",
  welcome: "Bienvenides al Centro de Desarrollo Escultista de México. Aquí la aventura comienza cuando nos preguntamos qué podemos hacer juntes con lo que tenemos a la mano.",
  history: [
    "Nuestro punto de partida está en la historia del escultismo en Puebla y en las experiencias que han buscado llevar la educación más allá del aula.",
    "Hoy construimos un espacio para compartir prácticas, acompañar procesos juveniles y fortalecer el vínculo entre territorio, juego y organización popular.",
  ],
  philosophy: "Creemos en una educación que no baja respuestas desde arriba: camina con la comunidad, escucha sus preguntas y convierte el aprendizaje en una forma de participación.",
  mission: "Acompañar procesos educativos y comunitarios que hagan posible una vida más justa, autónoma y solidaria.",
  vision: "Ser una comunidad educativa abierta, alegre y crítica, capaz de multiplicar experiencias transformadoras desde Puebla hacia otros territorios.",
  values: [
    { label: "Cuidado", text: "Sostener personas y procesos con atención." },
    { label: "Autonomía", text: "Aprender a decidir y actuar colectivamente." },
    { label: "Alegría", text: "Encontrar fuerza en el juego y la celebración." },
  ],
  timeline: [
    { year: "1933", title: "Una historia que nos precede", text: "El escultismo se establece en Puebla y abre una primera conversación con la educación no formal." },
    { year: "2000", title: "Volver a mirar el proyecto", text: "Comienza un proceso de análisis para ampliar su trascendencia comunitaria." },
    { year: "Hoy", title: "Una red en movimiento", text: "El CDE conecta formación, territorio y cuidado para seguir aprendiendo juntes." },
  ],
  educators: [
    { name: "Mariana López", role: "Acompañante de comunidad", bio: "Facilita procesos de grupo y espacios de escucha con adolescentes.", interests: ["Cuidado", "Asambleas"], image: "/images/scouts-circle.png" },
    { name: "Iván Herrera", role: "Coordinador de territorio", bio: "Diseña rutas educativas para leer el barrio caminando.", interests: ["Cartografía", "Juego"], image: "/images/scouts-hero.png" },
    { name: "Sofía Ramírez", role: "Formadora", bio: "Acompaña talleres sobre pedagogía crítica y organización popular.", interests: ["Pedagogía", "Arte"], image: "/images/scouts-circle.png" },
  ],
  projects: [
    { title: "Campamento de preguntas incómodas", description: "Tres días para desmontar certezas, cocinar juntes y volver a mirar el barrio.", status: "En curso", date: "Agosto 2024", image: "/images/scouts-hero.png" },
    { title: "Escuela de acompañantes", description: "Un espacio de formación para quienes sostienen grupos y comunidades educativas.", status: "Próximo", date: "Octubre 2024", image: "/images/scouts-circle.png" },
  ],
  gallery: [
    { src: "/images/scouts-hero.png", alt: "Grupo caminando por la montaña", label: "Salir al territorio" },
    { src: "/images/scouts-circle.png", alt: "Grupo reunido alrededor de un mapa", label: "Aprender juntes" },
    { src: "/images/scouts-hero.png", alt: "Personas scouts en un sendero", label: "Hacer comunidad" },
    { src: "/images/scouts-circle.png", alt: "Facilitación al aire libre", label: "Cuidar el proceso" },
  ],
  feed: [
    { author: "CDE México", role: "Actualización de comunidad", text: "Esta semana abrimos la ronda de preguntas para el próximo campamento.", time: "Hace 2 días", comments: 8, likes: 24, image: "/images/scouts-circle.png" },
    { author: "Mariana López", role: "Acompañante", text: "Una asamblea no tiene que ser perfecta para ser un lugar donde todas las voces puedan aparecer.", time: "Hace 5 días", comments: 4, likes: 17 },
  ],
};
