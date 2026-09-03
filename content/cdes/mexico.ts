import type { CDEData } from "./types";
import { makeCommunity } from "./community-framework";

export const mexico: CDEData = {
  slug: "mexico",
  country: "México",
  region: "Centro de Desarrollo Escultista IMG · El Primero de Puebla",
  communityName: "CDE México · IMG",
  logoLabel: "IMG",
  description: "Un centro permanente en Puebla donde el juego, el arte, la vida al aire libre y la organización comunitaria se convierten en educación no formal.",
  heroImage: "/images/scouts-hero.png",
  welcome: "Bienvenides al CDE IMG, El Primero de Puebla. Aquí la aventura comienza cuando una pregunta del grupo se convierte en juego, encuentro y acción compartida.",
  origin: "El CDE IMG se enlaza con la memoria del primer grupo scout de Puebla y con una transformación pedagógica que busca que el escultismo sea una plataforma educativa para la comunidad, no una actividad aislada del territorio.",
  heritage: {
    label: "Memoria de IMG",
    text: "Ignacio Martínez González fue el primer Maestrescout de Tropa de los Scouts de México en Puebla y una figura fundadora de esa historia local. El nombre IMG mantiene visible ese vínculo con la memoria del escultismo poblano.",
  },
  communities: [
    makeCommunity("Ronda", { description: "En IMG, la Ronda abre un espacio protegido de juego, lenguaje y cuidado para explorar el barrio a su propio ritmo." }),
    makeCommunity("Manada", { description: "En IMG, la Manada convierte la imaginación, las historias y las primeras decisiones compartidas en una forma de leer el entorno." }),
    makeCommunity("Tropa", { description: "En IMG, la Tropa investiga preguntas del territorio, aprende técnicas para cuidarse y organiza proyectos con otras personas." }),
    makeCommunity("Clan", { description: "En IMG, el Clan enlaza ciudadanía activa, servicio y proyecto de vida para devolver a la comunidad lo que aprende." }),
  ],
  history: [
    "En 1933 comenzaron en Puebla las primeras experiencias que dieron forma al escultismo local, con Alfonso Espino Silva e Ignacio Martínez González entre sus figuras fundadoras. Esa memoria explica por qué el CDE IMG se nombra también como El Primero de Puebla.",
    "Entre 2000 y 2003 el proyecto revisó su forma de educar y organizó una propuesta más crítica, popular y vinculada con las comunidades; en marzo de 2003 inició además una etapa de trabajo con la WFIS y con contextos indígenas, escuelas públicas y casas hogar.",
    "Desde 2021, la Comunidad Crítica de Escultismo Popular sostiene esta experiencia como una asociación civil que articula educación no formal, arte, asistencia social, medio ambiente y participación juvenil.",
  ],
  philosophy: "El CDE IMG entiende el escultismo como una práctica de educación no formal que aprende con la comunidad: escucha sus preguntas, reconoce sus saberes y relaciona reflexión, juego y acción para defender la vida.",
  mission: "Promover el desarrollo integral de niñas, niños y adolescentes, especialmente en contextos populares e indígenas, mediante experiencias educativas, culturales y comunitarias orientadas a condiciones más justas y humanas.",
  vision: "Consolidar desde Puebla un referente de educación no formal crítica y popular que cuide a las personas, fortalezca la organización comunitaria y multiplique proyectos con otros Centros de Desarrollo Escultista.",
  values: [
    { label: "Cuidado", text: "Sostener personas y procesos con atención." },
    { label: "Autonomía", text: "Aprender a decidir y actuar colectivamente." },
    { label: "Alegría", text: "Encontrar fuerza en el juego y la celebración." },
  ],
  timeline: [
    { year: "1933", title: "El primer grupo en Puebla", text: "La memoria histórica local sitúa aquí el inicio del escultismo poblano y reconoce el trabajo de Alfonso Espino Silva e Ignacio Martínez González." },
    { year: "2000–2003", title: "Revisar para transformar", text: "El proyecto analiza su práctica, se vincula con la WFIS y comienza a profundizar una propuesta de educación no formal crítica y popular." },
    { year: "2021", title: "Nace la CCEP", text: "La Comunidad Crítica de Escultismo Popular se constituye como asociación civil y articula el trabajo educativo, cultural y comunitario." },
    { year: "Hoy", title: "IMG en movimiento", text: "El Primero de Puebla sostiene actividades permanentes y abre vínculos con comunidades y proyectos de Colombia y Argentina." },
  ],
  educators: [],
  activities: [
    { id: "cde-img-programa", title: "Programa educativo del CDE IMG", date: "Práctica permanente", image: "/images/scouts-hero.png", summary: "Juego, arte, vida al aire libre y organización comunitaria para aprender desde Puebla.", content: "El programa articula las cuatro comunidades educativas y convierte las preguntas del grupo en experiencias de reflexión, acción y cuidado." },
    { id: "cde-img-formacion", title: "Canto colectivo y formación", date: "Línea de trabajo", image: "/images/scouts-circle.png", summary: "La música y la formación de acompañantes abren espacios para compartir saberes y fortalecer la comunidad.", content: "Las actividades de formación retoman la escucha, el diálogo y la creación colectiva como herramientas de educación no formal." },
  ],
  gallery: [
    { src: "/images/scouts-hero.png", alt: "Grupo caminando por la montaña", label: "Salir al territorio" },
    { src: "/images/scouts-circle.png", alt: "Grupo reunido alrededor de un mapa", label: "Aprender juntes" },
    { src: "/images/scouts-hero.png", alt: "Personas scouts en un sendero", label: "Hacer comunidad" },
    { src: "/images/scouts-circle.png", alt: "Facilitación al aire libre", label: "Cuidar el proceso" },
  ],
  feed: [
    { author: "CDE IMG", role: "Nota de comunidad", text: "Abrimos la ronda de preguntas para el próximo encuentro al aire libre.", time: "Próxima publicación", comments: 0, likes: 0, image: "/images/scouts-circle.png" },
    { author: "CDE IMG", role: "Nota de comunidad", text: "Una asamblea no tiene que ser perfecta para ser un lugar donde todas las voces puedan aparecer.", time: "Próxima publicación", comments: 0, likes: 0 },
  ],
};
