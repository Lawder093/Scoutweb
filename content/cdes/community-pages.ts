import type { CDECommunity, CDECommunityKind, CDECommunityPageData, CDEData } from "./types";

const communityTemplates: Record<CDECommunityKind, CDECommunityPageData> = {
  Ronda: {
    introduction: "Ronda es el primer espacio de encuentro con el escultismo crítico popular: un lugar para jugar, imaginar, preguntar y descubrir el cuidado compartido.",
    purpose: "Acompañar a niñas y niños de 3 a 6 años en experiencias de juego, expresión y exploración que fortalezcan su autonomía, sus vínculos y su confianza.",
    curriculum: [
      { title: "Juego y expresión", description: "El juego libre y acompañado abre posibilidades para nombrar lo que sentimos e imaginar otros mundos.", topics: ["Imaginación", "Movimiento", "Expresión"] },
      { title: "Cuidado compartido", description: "Aprendemos a reconocer el cuerpo propio y el de las demás personas como territorio de respeto y protección.", topics: ["Escucha", "Límites", "Acuerdos"] },
      { title: "Explorar el entorno", description: "Miramos lo cercano con curiosidad: los sonidos, las plantas, las historias y las personas que habitan el territorio.", topics: ["Naturaleza", "Preguntas", "Comunidad"] },
    ],
    knowledgeFoundation: [
      { title: "Pedagogía crítica", text: "Las preguntas de la infancia son conocimiento valioso y punto de partida para aprender en comunidad." },
      { title: "Aprender haciendo", text: "El cuerpo, el juego y la experiencia cotidiana permiten construir sentidos antes que repetir respuestas." },
      { title: "Desarrollo integral", text: "Acompañamos dimensiones afectivas, sociales, corporales y creativas sin separar a la persona de su contexto." },
    ],
    activities: [
      { id: "ronda-juego-cuidado", title: "Ronda de juego y cuidado", date: "Actividad de la comunidad", image: "/images/scouts-circle.png", summary: "Juegos de bienvenida, movimiento y reconocimiento para encontrarnos con confianza.", content: "La actividad combina juego libre, expresión corporal y acuerdos sencillos para comenzar a construir comunidad." },
      { id: "exploracion-territorio", title: "Explorar lo cercano", date: "Actividad de la comunidad", image: "/images/scouts-hero.png", summary: "Una caminata breve para mirar el territorio con todos los sentidos.", content: "La exploración invita a observar, escuchar y compartir preguntas sobre los lugares que habitamos." },
    ],
  },
  Manada: {
    introduction: "Manada es una comunidad para crecer en compañía: exploramos el entorno, aprendemos haciendo y convertimos la curiosidad en una forma de participar.",
    purpose: "Fortalecer la autonomía y la imaginación de niñas y niños mediante experiencias de juego, colaboración y lectura crítica de su entorno.",
    curriculum: [
      { title: "Aprender haciendo", description: "Probamos, construimos, nos equivocamos y volvemos a intentar con otras personas.", topics: ["Experimentación", "Creatividad", "Colaboración"] },
      { title: "Autonomía acompañada", description: "Tomamos pequeñas decisiones y aprendemos a reconocer sus efectos en el grupo y el territorio.", topics: ["Decisión", "Responsabilidad", "Confianza"] },
      { title: "Historias del territorio", description: "Escuchamos las memorias, los saberes y las preguntas que viven en nuestra comunidad.", topics: ["Memoria", "Identidad", "Entorno"] },
    ],
    knowledgeFoundation: [
      { title: "Educación popular", text: "Cada integrante aporta saberes y experiencias que hacen del grupo un espacio de aprendizaje colectivo." },
      { title: "Juego cooperativo", text: "La aventura se construye con acuerdos y cuidado mutuo, no desde la competencia como única forma de aprender." },
      { title: "Lectura del mundo", text: "Nombrar lo que ocurre alrededor nos ayuda a comprenderlo y a participar en su transformación." },
    ],
    activities: [
      { id: "manada-mapa-barrio", title: "Mapa vivo del barrio", date: "Actividad de la comunidad", image: "/images/scouts-circle.png", summary: "Recorremos lugares importantes y construimos un mapa con historias, cuidados y preguntas.", content: "La actividad reúne observación, dibujo y conversación para reconocer los saberes que ya existen en el territorio." },
      { id: "manada-taller-hacer", title: "Taller de aprender haciendo", date: "Actividad de la comunidad", image: "/images/scouts-hero.png", summary: "Una experiencia práctica para crear herramientas con materiales disponibles.", content: "El taller propone resolver un reto en equipo, documentar lo aprendido y compartirlo con la comunidad." },
    ],
  },
  Tropa: {
    introduction: "Tropa es una comunidad de aventuras, proyectos y preguntas. Aquí ponemos el cuerpo para leer el territorio y organizarnos con otras personas.",
    purpose: "Acompañar procesos de participación juvenil donde las y los adolescentes puedan investigar, decidir y actuar sobre situaciones que les afectan.",
    curriculum: [
      { title: "Proyecto colectivo", description: "Transformamos una pregunta del grupo en una acción concreta con objetivos, tareas y acuerdos.", topics: ["Planeación", "Organización", "Evaluación"] },
      { title: "Territorio y justicia", description: "Aprendemos a observar las desigualdades y las posibilidades de cambio que existen en nuestro entorno.", topics: ["Cartografía", "Derechos", "Acción"] },
      { title: "Vida al aire libre", description: "El campamento y la caminata se convierten en experiencias de autonomía, cuidado y aprendizaje colectivo.", topics: ["Seguridad", "Técnica", "Interdependencia"] },
    ],
    knowledgeFoundation: [
      { title: "Pedagogía de la pregunta", text: "Una buena pregunta abre investigación, diálogo y posibilidades de acción; no busca una respuesta única." },
      { title: "Praxis transformadora", text: "Reflexionamos sobre lo que hacemos y hacemos cambios a partir de lo que aprendemos en la experiencia." },
      { title: "Participación juvenil", text: "Las decisiones del proceso se construyen con las y los jóvenes como sujetos activos, no como receptores de instrucciones." },
    ],
    activities: [
      { id: "tropa-proyecto-territorio", title: "Proyecto de lectura del territorio", date: "Actividad de la comunidad", image: "/images/scouts-hero.png", summary: "Un proceso para investigar una situación del entorno y convertir la pregunta en acción colectiva.", content: "La tropa define una pregunta, recoge voces y diseña una intervención que pueda compartirse con el territorio." },
      { id: "tropa-ruta-aprendizajes", title: "Ruta de aprendizajes", date: "Actividad de la comunidad", image: "/images/scouts-circle.png", summary: "Caminata, técnicas y conversación para aprender a cuidarnos mientras avanzamos.", content: "La ruta articula habilidades prácticas, lectura del paisaje y acuerdos de corresponsabilidad." },
    ],
  },
  Clan: {
    introduction: "Clan es una comunidad de participación juvenil, servicio y acompañamiento. Un espacio para convertir la experiencia en organización y proyecto.",
    purpose: "Fortalecer la autonomía política y pedagógica de las juventudes para que impulsen iniciativas propias y acompañen a otras comunidades.",
    curriculum: [
      { title: "Autogestión y liderazgo colectivo", description: "Organizamos tiempos, responsabilidades y decisiones sin separar el liderazgo del cuidado.", topics: ["Autogestión", "Acuerdos", "Cuidado"] },
      { title: "Servicio y transformación", description: "Diseñamos acciones que respondan a necesidades reales y que puedan sostenerse con la comunidad.", topics: ["Diagnóstico", "Incidencia", "Solidaridad"] },
      { title: "Acompañar procesos", description: "Compartimos herramientas para facilitar grupos, abrir conversaciones y multiplicar aprendizajes.", topics: ["Escucha", "Mediación", "Formación"] },
    ],
    knowledgeFoundation: [
      { title: "Educación emancipadora", text: "La formación busca ampliar la capacidad de decidir, organizarse y transformar las condiciones de vida." },
      { title: "Organización popular", text: "Los proyectos se sostienen en vínculos, acuerdos y acciones compartidas con otras personas y colectivos." },
      { title: "Reflexión crítica", text: "Analizamos las estructuras que atraviesan nuestra experiencia para no confundir participación con obediencia." },
    ],
    activities: [
      { id: "clan-laboratorio-proyectos", title: "Laboratorio de proyectos", date: "Actividad de la comunidad", image: "/images/scouts-circle.png", summary: "Un espacio para convertir una preocupación común en una iniciativa con sentido comunitario.", content: "El laboratorio acompaña la formulación, prueba y revisión de proyectos impulsados por las juventudes." },
      { id: "clan-escuela-acompanamiento", title: "Escuela de acompañamiento", date: "Actividad de la comunidad", image: "/images/scouts-hero.png", summary: "Herramientas para cuidar procesos, facilitar conversaciones y compartir responsabilidades.", content: "La escuela articula práctica, conversación y reflexión para acompañar grupos desde una posición ética y cercana." },
    ],
  },
};

export function getCommunityPage(cde: CDEData, community: CDECommunity): CDECommunityPageData {
  if (community.page) {
    return community.page;
  }

  const template = communityTemplates[community.kind];
  return {
    ...template,
    activities: template.activities.map((activity) => ({
      ...activity,
      id: `${cde.slug}-${community.id}-${activity.id}`,
      title: `${activity.title} · ${cde.country}`,
      content: `${activity.content} Esta experiencia se adapta al territorio del ${cde.communityName}.`,
    })),
  };
}
