import type {
  CDEActivity,
  CDECommunity,
  CDECommunityCurriculumItem,
  CDECommunityKind,
  CDEKnowledgeFoundationItem,
} from "./types";

export type CommunityFramework = {
  kind: CDECommunityKind;
  ageRange: string;
  groupStructure: string;
  description: string;
  introduction: string;
  purpose: string;
  progression: string;
  focusAreas: string[];
  curriculum: CDECommunityCurriculumItem[];
  knowledgeFoundation: CDEKnowledgeFoundationItem[];
  activities: CDEActivity[];
};

const sharedFocusAreas = [
  "Afectividad",
  "Carácter",
  "Salud",
  "Habilidades y creatividad",
  "Conciencia hacia las demás personas",
  "Arte y cultura",
  "Espiritualidad",
];

export const communityFramework: Record<CDECommunityKind, CommunityFramework> = {
  Ronda: {
    kind: "Ronda",
    ageRange: "3 a 6 años",
    groupStructure: "Cuadrillas pequeñas y círculos de encuentro",
    description: "Un primer territorio de juego, palabra y cuidado donde la curiosidad de cada niña y niño abre el programa.",
    introduction: "La Ronda es el primer espacio de pertenencia dentro del proyecto. No acelera a la infancia hacia la siguiente etapa: ofrece tiempo para jugar, moverse, imaginar, nombrar lo que se siente y descubrir que el cuidado se construye con otras personas.",
    purpose: "Acompañar a niñas y niños de 3 a 6 años en experiencias de juego, expresión y exploración que fortalezcan su autonomía, sus vínculos y su confianza, siempre en un entorno protegido y atento a sus ritmos.",
    progression: "Primeros acuerdos, Promesa y experiencias de cuidado; el Camino de Enlace prepara el paso a Manada cuando corresponde.",
    focusAreas: sharedFocusAreas,
    curriculum: [
      { title: "Juego, cuerpo y expresión", description: "La reunión parte del movimiento, la imaginación y la palabra para que cada integrante pueda explorar sin miedo a equivocarse.", topics: ["Juego cooperativo", "Movimiento", "Lenguaje"] },
      { title: "Cuidado y autonomía cotidiana", description: "Practicamos decisiones pequeñas: reconocer límites, pedir ayuda, ordenar lo común y cuidar a quienes comparten la experiencia.", topics: ["Afectividad", "Protección", "Autonomía"] },
      { title: "Preguntar y leer lo cercano", description: "Los sonidos, las plantas, las historias familiares y los lugares cotidianos se vuelven temas para observar, conversar y crear.", topics: ["Curiosidad", "Territorio", "Creatividad"] },
    ],
    knowledgeFoundation: [
      { title: "Comunalidad desde la infancia", text: "La pertenencia se aprende participando en círculos donde cada voz importa y donde el grupo se organiza alrededor del cuidado, no de la obediencia ciega." },
      { title: "Aprender haciendo con protección", text: "El cuerpo, el juego y la experiencia cotidiana son fuentes de conocimiento; la persona educadora acompaña, observa riesgos y cuida sin quitar iniciativa." },
      { title: "Buen vivir", text: "El desarrollo integral incluye afectos, salud, creatividad, vínculos y relación respetuosa con el entorno, no sólo la adquisición de habilidades." },
    ],
    activities: [
      { id: "ronda-circulo-charlas", title: "Círculo de charlas", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "Un encuentro breve para decir cómo llegamos, elegir un juego y cerrar con un acuerdo de cuidado.", content: "La persona educadora propone preguntas sencillas y deja que las niñas y los niños incorporen sus intereses al programa de la jornada." },
      { id: "ronda-minuto-filosofia", title: "Minuto de la filosofía", date: "Práctica del programa", image: "/images/scouts-hero.png", summary: "Una pregunta de la infancia se convierte en conversación, dibujo, movimiento o pequeña indagación.", content: "El objetivo no es encontrar una respuesta correcta, sino aprender a escuchar, formular preguntas y construir significados en grupo." },
      { id: "ronda-exploracion-cuidado", title: "Exploración y cuidado de lo cercano", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "Recorrer un espacio conocido para observar seres vivos, sonidos, personas y lugares que necesitan atención.", content: "La actividad termina con una acción posible y proporcional a la edad: recoger, regar, agradecer, ordenar o contar lo que descubrimos." },
    ],
  },
  Manada: {
    kind: "Manada",
    ageRange: "7 a 11 años",
    groupStructure: "Seisenas, Roca de Consejo y círculos de reunión",
    description: "Una comunidad de juego simbólico, exploración y primeras decisiones compartidas para crecer en compañía.",
    introduction: "La Manada abre un territorio de imaginación y cooperación para niñas y niños de 7 a 11 años. El marco simbólico ayuda a entrar al juego, pero el propósito educativo está en lo que el grupo aprende al escucharse, organizarse, resolver retos y cuidar su entorno.",
    purpose: "Fortalecer la autonomía, la imaginación y la conciencia comunitaria mediante juegos, historias, actividades prácticas y decisiones acordes con la edad de cada integrante.",
    progression: "Cachorrito, Primera Estrella y Segunda Estrella; la Senda de Enlace acompaña el paso a Tropa y permite cerrar una etapa con sentido.",
    focusAreas: sharedFocusAreas,
    curriculum: [
      { title: "Juego simbólico y narración", description: "Las historias y personajes crean una atmósfera para ensayar decisiones, reconocer emociones y preguntarnos qué significa cuidar a la comunidad.", topics: ["Imaginación", "Relato", "Identidad"] },
      { title: "Seisena y Consejo de Roca", description: "La organización en pequeños grupos permite distribuir tareas, escuchar propuestas y practicar acuerdos sin convertir el liderazgo en jerarquía.", topics: ["Participación", "Acuerdos", "Responsabilidad"] },
      { title: "Descubierta y cuidado del territorio", description: "Salimos a observar lo cercano, recuperamos historias y transformamos una necesidad concreta en una acción posible para el grupo.", topics: ["Exploración", "Memoria", "Servicio"] },
    ],
    knowledgeFoundation: [
      { title: "Educación popular", text: "Las experiencias, preguntas y saberes de niñas, niños, familias y educadores forman parte del conocimiento que la Manada construye." },
      { title: "El juego como lenguaje", text: "Jugar no es una pausa del aprendizaje: es una manera de representar el mundo, ensayar relaciones y elaborar lo que vivimos." },
      { title: "Decidir con otras personas", text: "Los pequeños grupos ofrecen una práctica concreta de escucha, responsabilidad y cuidado de lo común, adecuada al nivel de madurez de la Manada." },
    ],
    activities: [
      { id: "manada-consejo-roca", title: "Consejo de Roca", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "La Manada revisa lo vivido, escucha a sus Seisenas y decide una parte de la próxima aventura.", content: "El Consejo de Roca convierte la conversación en programa: qué queremos investigar, qué materiales necesitamos y cómo cuidaremos a las demás personas." },
      { id: "manada-caceria-sentidos", title: "Cacería de sentidos", date: "Práctica del programa", image: "/images/scouts-hero.png", summary: "Un recorrido de observación para descubrir sonidos, texturas, historias y señales del territorio.", content: "La actividad combina juego, orientación y conversación para que la exploración no sea consumo del paisaje, sino una forma de relacionarnos con él." },
      { id: "manada-accion-cuidado", title: "Acción de cuidado con la comunidad", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "Una tarea sencilla y compartida que responde a una necesidad identificada por la propia Manada.", content: "La acción puede ser cultural, ambiental o solidaria; se diseña con apoyo de las familias y se evalúa preguntando a quién benefició y qué aprendimos." },
    ],
  },
  Tropa: {
    kind: "Tropa",
    ageRange: "12 a 17 años",
    groupStructure: "Patrullas, Consejo de Patrulla y Corte de Honor",
    description: "Una comunidad de patrullas, técnicas y proyectos para leer el territorio y tomar la palabra en colectivo.",
    introduction: "La Tropa es el espacio de las adolescencias que investigan, se organizan y ponen el cuerpo en proyectos comunes. Las técnicas escultistas —campismo, orientación, primeros auxilios, cocina o nudos— tienen sentido cuando ayudan a resolver problemas, cuidar a otras personas y ampliar la autonomía del grupo.",
    purpose: "Acompañar procesos de participación juvenil donde las y los adolescentes puedan formular preguntas, distribuir responsabilidades, deliberar y actuar sobre situaciones que les afectan.",
    progression: "La progresión recorre Tercera, Segunda y Primera Clase; cada etapa articula habilidades, carácter, participación y servicio, no sólo pruebas técnicas.",
    focusAreas: sharedFocusAreas,
    curriculum: [
      { title: "Patrulla y liderazgo distribuido", description: "La Patrulla es una comunidad pequeña: reparte responsabilidades según capacidades e intereses y lleva sus inquietudes a los espacios comunes.", topics: ["Colaboración", "Organización", "Liderazgo"] },
      { title: "Técnicas para leer y cuidar", description: "La vida al aire libre integra orientación, campismo, cocina, primeros auxilios y prevención con una lectura crítica del ambiente y del territorio.", topics: ["Campismo", "Seguridad", "Buen vivir"] },
      { title: "Proyecto, deliberación y acción", description: "Una pregunta del grupo se convierte en investigación, decisión, acción y evaluación; la práctica vuelve a abrir nuevas preguntas.", topics: ["Praxis", "Democracia", "Incidencia"] },
    ],
    knowledgeFoundation: [
      { title: "Praxis transformadora", text: "La Tropa aprende al relacionar reflexión y acción: observa una situación, actúa con otras personas y revisa críticamente lo que ocurrió." },
      { title: "Democracia en pequeño grupo", text: "El Consejo de Patrulla y la Corte de Honor ejercitan la escucha, la representación y la distribución de responsabilidades sin convertir el liderazgo en dominio." },
      { title: "Buen vivir y justicia socioambiental", text: "La naturaleza es un medio didáctico y una comunidad de vida; las actividades consideran el cuidado del paisaje, la cultura y las personas que lo habitan." },
    ],
    activities: [
      { id: "tropa-consejo-patrulla", title: "Consejo de Patrulla", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "Cada Patrulla ordena sus preguntas, distribuye tareas y lleva una propuesta a la conversación de la Tropa.", content: "La actividad entrena una representación responsable: escuchar primero al pequeño grupo, argumentar después y devolver los acuerdos para que puedan revisarse." },
      { id: "tropa-campamento-descubierta", title: "Campamento de descubierta", date: "Práctica del programa", image: "/images/scouts-hero.png", summary: "Una salida para aprender técnicas, leer el paisaje y encontrarse con otras voces del territorio.", content: "La preparación incluye ruta, alimentación, seguridad y entrevistas; el cierre revisa qué aprendimos de la naturaleza, de la comunidad y de nuestra forma de organizarnos." },
      { id: "tropa-proyecto-incidencia", title: "Proyecto de incidencia comunitaria", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "Investigar una situación cercana y diseñar una acción que la comunidad pueda reconocer y hacer suya.", content: "El proyecto se construye con la comunidad implicada, evita hablar por otras personas y evalúa tanto los resultados como las relaciones que se tejieron." },
    ],
  },
  Clan: {
    kind: "Clan",
    ageRange: "18 a 21 años",
    groupStructure: "Equipo de proyectos, Asamblea de la Ruta y Consejo de Clan",
    description: "Una comunidad de ciudadanía activa para convertir la experiencia, el servicio y la reflexión en proyectos propios.",
    introduction: "El Clan acompaña a jóvenes que ya pueden asumir proyectos de mayor autonomía y profundidad. La ruta no se reduce a acumular méritos: enlaza la experiencia personal con la vida común, el descubrimiento de otros territorios y una relación responsable con las comunidades.",
    purpose: "Fortalecer la capacidad de las juventudes para investigar, organizarse, acompañar procesos y desarrollar iniciativas de servicio con reciprocidad y sentido político-pedagógico.",
    progression: "El itinerario puede pasar por Noviciado, Escudero y Caballero, articulando aprendizaje, servicio, desarrollo y una Carta de Clan construida por la comunidad.",
    focusAreas: sharedFocusAreas,
    curriculum: [
      { title: "Travesía y descubrimiento", description: "Recorrer otros territorios implica escuchar, reconocer diferencias y dejar que el encuentro transforme nuestras preguntas y certezas.", topics: ["Aire libre", "Interculturalidad", "Indagación"] },
      { title: "Servicio con la comunidad", description: "El servicio parte del diálogo y la reciprocidad: no convierte a otras personas en objetos de ayuda ni promete lo que el Clan no puede sostener.", topics: ["Reciprocidad", "Cuidado", "Organización"] },
      { title: "Proyecto vital y Carta de Clan", description: "El grupo relaciona sus intereses, responsabilidades y decisiones con una forma de vida comprometida con la dignidad y el bien común.", topics: ["Autonomía", "Ética", "Proyecto"] },
    ],
    knowledgeFoundation: [
      { title: "Ciudadanía activa", text: "La formación se expresa en la capacidad de leer el mundo, tomar posición, participar y sostener acciones que defiendan la vida en común." },
      { title: "Servicio con reciprocidad", text: "Antes de intervenir, el Clan escucha y acuerda con la comunidad; la acción devuelve lo aprendido y deja capacidades instaladas, no dependencia." },
      { title: "Autonomía en común", text: "La autonomía no significa aislarse: los itinerarios personales se nutren del equipo, la Asamblea de la Ruta y las responsabilidades compartidas." },
    ],
    activities: [
      { id: "clan-descubierta-comunitaria", title: "Descubierta con la comunidad", date: "Práctica del programa", image: "/images/scouts-hero.png", summary: "Un recorrido de escucha para comprender una realidad sin llegar con respuestas prefabricadas.", content: "El Clan acuerda el acercamiento, registra lo que aprende y devuelve una síntesis a las personas que compartieron su tiempo y sus saberes." },
      { id: "clan-proyecto-equipo", title: "Proyecto de Clan", date: "Práctica del programa", image: "/images/scouts-circle.png", summary: "Diseñar, probar y revisar una iniciativa que conecte las capacidades del equipo con una necesidad real.", content: "El proyecto define responsabilidades, recursos, límites y formas de evaluación; la comunidad involucrada participa en las decisiones que le afectan." },
      { id: "clan-ruta-reflexion", title: "Ruta de reflexión y cuidado", date: "Práctica del programa", image: "/images/scouts-hero.png", summary: "Una experiencia de aire libre para revisar el camino personal y las decisiones del Clan.", content: "La ruta combina técnicas, conversación y momentos de silencio para volver a la vida cotidiana con acuerdos concretos de cuidado y acción." },
    ],
  },
};

export function makeCommunity(
  kind: CDECommunityKind,
  overrides: Partial<Pick<CDECommunity, "name" | "description" | "image" | "photoReel" | "page">> = {},
): CDECommunity {
  const framework = communityFramework[kind];

  return {
    id: kind.toLowerCase(),
    kind,
    name: overrides.name ?? kind,
    description: overrides.description ?? framework.description,
    ageRange: framework.ageRange,
    structure: framework.groupStructure,
    ...(overrides.image ? { image: overrides.image } : {}),
    ...(overrides.photoReel ? { photoReel: overrides.photoReel } : {}),
    ...(overrides.page ? { page: overrides.page } : {}),
  };
}
