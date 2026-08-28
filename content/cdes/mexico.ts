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
  origin: "El grupo nace de la experiencia del escultismo en Puebla y de la necesidad de construir una educación no formal conectada con el barrio, el territorio y la organización popular.",
  communities: [
    { id: "ronda", kind: "Ronda", name: "Ronda", description: "Primeros encuentros con el juego, la imaginación y el cuidado compartido.", ageRange: "3 a 6 años" },
    { id: "manada", kind: "Manada", name: "Manada", description: "Explorar el entorno, aprender haciendo y construir autonomía en grupo.", ageRange: "7 a 10 años" },
    { id: "tropa", kind: "Tropa", name: "Tropa", description: "Aventuras, proyectos y preguntas para leer el territorio con otras personas.", ageRange: "11 a 14 años" },
    { id: "clan", kind: "Clan", name: "Clan", description: "Participación juvenil, servicio y acompañamiento para transformar lo cotidiano.", ageRange: "15 a 17 años" },
  ],
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
    { name: "Mariana López", role: "Acompañante de comunidad", community: "Ronda", bio: "Facilita procesos de grupo y espacios de escucha con adolescentes.", interests: ["Cuidado", "Asambleas"], image: "/images/scouts-circle.png" },
    { name: "Iván Herrera", role: "Coordinador de territorio", community: "Tropa", bio: "Diseña rutas educativas para leer el barrio caminando.", interests: ["Cartografía", "Juego"], image: "/images/scouts-hero.png" },
    { name: "Sofía Ramírez", role: "Formadora", community: "Clan", bio: "Acompaña talleres sobre pedagogía crítica y organización popular.", interests: ["Pedagogía", "Arte"], image: "/images/scouts-circle.png" },
  ],
  activities: [
    { id: "campamento-preguntas", title: "Campamento de preguntas incómodas", date: "Agosto 2024", image: "/images/scouts-hero.png", summary: "Tres días para desmontar certezas, cocinar juntes y volver a mirar el barrio.", content: "La actividad reúne a las comunidades del CDE para compartir preguntas, tareas y aprendizajes a través de la vida al aire libre." },
    { id: "escuela-acompanantes", title: "Escuela de acompañantes", date: "Octubre 2024", image: "/images/scouts-circle.png", summary: "Un espacio de formación para quienes sostienen grupos y comunidades educativas.", content: "La escuela abre un proceso de formación común sobre cuidado, escucha y herramientas para acompañar grupos." },
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
