import type { CDECommunityPhoto, CDEData } from "./types";
import { makeCommunity } from "./community-framework";

const merakiAsset = "/images/cde/colombia/meraki";

const merakiPhotoReel: CDECommunityPhoto[] = [
  { src: `${merakiAsset}/meraki-actividad.jpg`, alt: "Grupo Scout Meraki caminando y observando el territorio", label: "Almas libres en movimiento", size: "large" },
  { src: `${merakiAsset}/meraki-historia-2021.jpg`, alt: "Grupo scout recorriendo un espacio natural", label: "Avistar y cuidar", size: "tall" },
  { src: `${merakiAsset}/meraki-actividad.jpg`, alt: "Personas jóvenes compartiendo una actividad al aire libre", label: "Aprender haciendo", size: "small" },
  { src: `${merakiAsset}/meraki-historia-2021.jpg`, alt: "Caminata comunitaria junto a un cuerpo de agua", label: "Leer el territorio", size: "medium" },
];

export const colombia: CDEData = {
  slug: "colombia",
  country: "Colombia",
  region: "Centro de Desarrollo Escultista · Grupo Scout Meraki",
  communityName: "CDE Colombia · Grupo Scout Meraki",
  logoLabel: "MERAKI",
  description: "Una comunidad de Almas Libres que convierte el escultismo en una práctica de autonomía, pensamiento crítico y ciudadanía activa.",
  heroImage: `${merakiAsset}/meraki-actividad.jpg`,
  welcome: "¡Haz parte de esta gran familia! Vincúlate y vive la aventura de ser un Alma Libre.",
  origin: "El CDE Colombia incorpora la experiencia del Grupo Scout Meraki, una comunidad que trabaja desde Bogotá con una metodología propia para reinterpretar el Método Scout y ponerlo al servicio de la educación popular, la participación juvenil y la transformación del territorio.",
  heritage: {
    label: "Metodología Meraki",
    text: "Libertad, autonomía, solidaridad y apoyo mutuo se vuelven práctica mediante la Investigación-Acción Participativa: leer la realidad, actuar con otras personas y volver a reflexionar sobre lo aprendido.",
  },
  history: [
    "2021–2022 · Los primeros pasos. El grupo comenzó a construir su experiencia con actividades de exploración, incluida una caminata de avistamiento de aves con el Jardín Botánico y el primer campamento del grupo en enero de 2022.",
    "2022–2023 · Crecer en familia. La comunidad amplió sus recorridos con una caminata a Zabrinsky y un recorrido por el Centro Histórico, haciendo del territorio una fuente de memoria, preguntas y encuentro.",
    "El presente y el futuro. Meraki proyecta un escultismo crítico y comunitario con una membresía activa, propuestas pedagógicas innovadoras y una red de Almas Libres capaces de transformar su realidad.",
  ],
  communities: [
    makeCommunity("Ronda", {
      ageRange: "3 a 6 años",
      description: "Un primer espacio de juego, cuidado y exploración para que cada niña y niño descubra que aprender también es hacerlo con otras personas.",
      image: `${merakiAsset}/meraki-actividad.jpg`,
    }),
    makeCommunity("Manada", {
      name: "Manada Argonautas",
      ageRange: "6 a 10 años",
      structure: "Tripulación del Argos, Viejos Lobos y espacios de consejo",
      description: "Una tripulación de niñas y niños que navega entre mitos, juego y aventura para crecer siempre mejor.",
      image: `${merakiAsset}/meraki-manada.png`,
      imageFit: "contain",
      page: {
        introduction: "La Manada Argonautas da la bienvenida a niñas y niños de 6 a 10 años. Como parte de una tripulación y junto a héroes y heroínas de la mitología griega, cada Lobato y Lobata se embarca en el Argos para surcar los mares en busca de aventuras.",
        purpose: "Acompañar a cada Lobato y Lobata para que esté Siempre Mejor: ayudar a las demás personas, aceptar nuevos retos y disfrutar la experiencia de aprender en comunidad.",
        groupStructure: "Tripulación del Argos, Viejos Lobos y espacios de consejo",
        progression: "El Libro de la Selva, la investidura de los Misterios Eleusinos y una ruta del Programa de Jóvenes que reconoce los avances de cada integrante.",
        focusAreas: ["Juego y aventura", "Libro de la Selva", "Cuidado", "Siempre Mejor", "Exploración"],
        curriculum: [
          { title: "El viaje del Argos", description: "El marco de los Argonautas convierte la exploración y la mitología en una invitación a imaginar, colaborar y asumir pequeños desafíos.", topics: ["Aventura", "Imaginación", "Equipo"] },
          { title: "El Libro de la Selva", description: "Mowgli, la selva del Seeonee y la compañía de los animales ofrecen un lenguaje simbólico para conversar sobre cuidado, amistad y pertenencia.", topics: ["Marco simbólico", "Relato", "Cuidado"] },
          { title: "Siempre Mejor", description: "Cada experiencia busca que niñas y niños se reten, ayuden a las demás personas y encuentren alegría en lo que pueden aprender y compartir.", topics: ["Autonomía", "Servicio", "Juego"] },
        ],
        knowledgeFoundation: [
          { title: "El juego como lenguaje", text: "El juego permite representar el mundo, ensayar decisiones y expresar lo que se siente sin separar la imaginación de la experiencia educativa." },
          { title: "Viejos Lobos que acompañan", text: "Las personas adultas cuidan el ambiente y ofrecen referencias para que la Manada pueda explorar con seguridad, iniciativa y confianza." },
          { title: "Aventura con propósito", text: "La salida, el relato y el reto tienen sentido cuando ayudan a reconocer a otras personas, cuidar el entorno y construir acuerdos." },
        ],
        activities: [
          { id: "argonautas-viaje", title: "Navegar en el Argos", date: "Programa de Manada", image: `${merakiAsset}/meraki-actividad.jpg`, summary: "Una aventura de exploración donde la tripulación decide qué quiere descubrir y cómo cuidará el lugar que visita.", content: "La propuesta recupera el espíritu aventurero de los Argonautas y lo convierte en una experiencia situada: observar, preguntar, jugar y volver a contar lo vivido." },
          { id: "argonautas-selva", title: "Historias del Libro de la Selva", date: "Marco simbólico", image: `${merakiAsset}/meraki-manada.png`, summary: "Historias, personajes y juegos para conversar sobre la amistad, la confianza y el cuidado compartido.", content: "Los Viejos Lobos acompañan la conversación sin imponer una respuesta única; el grupo relaciona el relato con sus propios vínculos y su territorio." },
          { id: "argonautas-eleusinos", title: "Misterios Eleusinos", date: "Ruta de progresión", image: `${merakiAsset}/meraki-historia-2021.jpg`, summary: "Un momento de reconocimiento para celebrar aprendizajes y preparar nuevos caminos.", content: "La investidura se entiende como una experiencia significativa de pertenencia y responsabilidad, no como una prueba aislada de obediencia." },
        ],
        photoReel: merakiPhotoReel,
      },
    }),
    makeCommunity("Tropa", {
      name: "Tropa Artemisa",
      ageRange: "10 a 14 años",
      structure: "Patrullas Águilas, Fénix y Panteras; Corte de Honor",
      description: "Una comunidad de patrullas, aventura y habilidades para encender el fuego interior y estar siempre listas para la acción.",
      image: `${merakiAsset}/meraki-tropa.png`,
      imageFit: "contain",
      page: {
        introduction: "La Tropa Artemisa recibe a quienes tienen entre 10 y 14 años y sienten el impulso de descubrir el mundo, construir amistades y dominar habilidades para afrontar nuevos desafíos. Al vincularse a una Patrulla, cada Scout encuentra compañeras y compañeros listos para la aventura.",
        purpose: "Vivir el lema Siempre Listas como una práctica concreta: ayudar a las demás personas, convertir los obstáculos en oportunidades de crecimiento y terminar lo que se empieza sin rendirse ante la dificultad.",
        groupStructure: "Patrullas Águilas, Fénix y Panteras; Corte de Honor",
        progression: "El Plan de adelanto de Tropa articula habilidades, responsabilidades, participación en la Patrulla y decisiones tomadas en la vida común.",
        focusAreas: ["Patrulla", "Siempre Listas", "Campismo", "Autogobierno", "Servicio"],
        curriculum: [
          { title: "Patrullas Artemisa", description: "Águilas, Fénix y Panteras son pequeños equipos donde la amistad, la técnica y la responsabilidad se convierten en una experiencia compartida.", topics: ["Equipo", "Técnica", "Confianza"] },
          { title: "Siempre Listas", description: "La preparación se demuestra en la acción: ayudar, aprender de los errores y responder con voluntad a los retos que el grupo decide asumir.", topics: ["Resiliencia", "Servicio", "Acción"] },
          { title: "Corte de Honor", description: "Las Guías de Patrulla llevan la voz de sus equipos, organizan aventuras y evalúan el progreso de la Tropa desde la participación juvenil.", topics: ["Democracia", "Representación", "Autonomía"] },
        ],
        knowledgeFoundation: [
          { title: "Autogobierno en pequeño grupo", text: "La Corte de Honor es un espacio de participación y responsabilidad: allí se planean aventuras, se toman decisiones y se revisa cómo vive la Tropa su propia Ley y Promesa." },
          { title: "Aprender haciendo", text: "Las habilidades escultistas adquieren sentido cuando sirven para resolver situaciones, cuidar a otras personas y ampliar la autonomía de cada Patrulla." },
          { title: "Fuerza para proteger", text: "La imagen de Artemisa enlaza fuerza, cuidado y protección: la aventura no es conquista del territorio, sino una manera de conocerlo y defender la vida." },
        ],
        activities: [
          { id: "artemisa-patrullas", title: "Patrullas en acción", date: "Programa de Tropa", image: `${merakiAsset}/meraki-actividad.jpg`, summary: "Un reto de campismo y organización para que cada Patrulla distribuya tareas y tome decisiones propias.", content: "La experiencia comienza con la planeación de la Patrulla, continúa con la acción y cierra con una evaluación colectiva que reconoce tanto los logros como lo que aún se necesita aprender." },
          { id: "artemisa-corte-honor", title: "Corte de Honor", date: "Autogobierno", image: `${merakiAsset}/meraki-tropa.png`, summary: "Las Guías de Patrulla organizan la próxima aventura y llevan a la conversación las voces de sus equipos.", content: "La Corte de Honor sostiene el espíritu de la Tropa, cuida la participación y devuelve los acuerdos para que puedan ser revisados por todas las Patrullas." },
          { id: "artemisa-siempre-listas", title: "Siempre Listas para la acción", date: "Vida al aire libre", image: `${merakiAsset}/meraki-historia-2021.jpg`, summary: "Una salida para poner en práctica orientación, cuidado del entorno y apoyo mutuo.", content: "Cada integrante identifica qué puede aportar, cómo pedir ayuda y de qué manera una habilidad técnica se vuelve una forma de cuidar a la comunidad." },
        ],
        photoReel: merakiPhotoReel,
      },
    }),
    makeCommunity("Iris", {
      name: "Comunidad Iris",
      ageRange: "14 a 18 años",
      structure: "Corax, Likos, Numenios y Tavros; Programa de Jóvenes",
      description: "Una comunidad juvenil para profundizar la autonomía, descubrir intereses y construir proyectos con otras personas.",
      image: `${merakiAsset}/meraki-iris.png`,
      imageFit: "contain",
      page: {
        introduction: "La Comunidad Iris acompaña a jóvenes de 14 a 18 años. Su vida se organiza a través de Corax, Likos, Numenios y Tavros, cuatro espacios que permiten sostener la identidad del grupo, compartir búsquedas y asumir responsabilidades cada vez más autónomas.",
        purpose: "Ofrecer una ruta de participación juvenil donde cada persona pueda transformar sus intereses en saberes, proyectos y acciones que fortalezcan la vida de la comunidad.",
        groupStructure: "Corax, Likos, Numenios y Tavros; Programa de Jóvenes",
        progression: "Sistema de Especialidades, Certificaciones HEFESTO y Programa LiMa como rutas complementarias para reconocer aprendizajes, búsquedas y responsabilidades.",
        focusAreas: ["Intereses", "Especialidades", "Participación juvenil", "Cuidado", "Proyecto"],
        curriculum: [
          { title: "Cuatro espacios de identidad", description: "Corax, Likos, Numenios y Tavros ofrecen una estructura para crear pertenencia y distribuir responsabilidades dentro de la Comunidad Iris.", topics: ["Identidad", "Equipo", "Participación"] },
          { title: "Sistema de Especialidades", description: "Los intereses individuales se vuelven oportunidades para investigar, practicar y compartir habilidades con la familia scout.", topics: ["Intereses", "Investigación", "Reconocimiento"] },
          { title: "HEFESTO y LiMa", description: "Las certificaciones y el Programa LiMa amplían la ruta de jóvenes con aprendizajes aplicables a su vida y a sus proyectos.", topics: ["Progresión", "Proyecto", "Autonomía"] },
        ],
        knowledgeFoundation: [
          { title: "Interés que se comparte", text: "Una especialidad no es sólo un distintivo: es una manera de profundizar una pregunta y poner lo aprendido al servicio de otras personas." },
          { title: "Participación juvenil protagónica", text: "Las decisiones sobre el programa parten de las búsquedas de las y los jóvenes, con acompañamiento adulto que cuida sin sustituir su voz." },
          { title: "Aprendizaje reconocido", text: "HEFESTO y LiMa se integran como rutas para hacer visible el proceso, conectar saberes y reconocer avances sin reducirlos a una competencia." },
        ],
        activities: [
          { id: "iris-especialidades", title: "Laboratorio de especialidades", date: "Sistema de Especialidades", image: `${merakiAsset}/meraki-iris.png`, summary: "Elegir una pregunta, investigarla y compartir con el grupo lo que se descubre en el camino.", content: "La Comunidad Iris acompaña intereses diversos —arte, tecnología, territorio, cultura o servicio— y los convierte en aprendizajes que circulan." },
          { id: "iris-hefesto", title: "Ruta HEFESTO", date: "Certificaciones", image: `${merakiAsset}/meraki-actividad.jpg`, summary: "Reconocer habilidades y procesos mediante experiencias que combinan práctica, reflexión y colaboración.", content: "La certificación se entiende como un registro de lo que una persona puede hacer y de cómo contribuye a la comunidad, no como una carrera individual." },
          { id: "iris-lima", title: "Programa LiMa", date: "Programa de Jóvenes", image: `${merakiAsset}/meraki-historia-2021.jpg`, summary: "Conectar búsquedas personales con un proyecto de juventud que tenga sentido en el territorio.", content: "El programa ayuda a traducir intereses en decisiones y acciones concretas, con una evaluación que permite volver a preguntar y ajustar el rumbo." },
        ],
        photoReel: merakiPhotoReel,
      },
    }),
    makeCommunity("Clan", {
      name: "Clan Atenea",
      ageRange: "18 a 23 años",
      structure: "Clan Atenea, equipos de proyecto y Programa de Jóvenes",
      description: "Un espacio para convertir la experiencia scout, el pensamiento crítico y la ciudadanía activa en proyectos propios.",
      image: `${merakiAsset}/meraki-emblema.png`,
      imageFit: "contain",
      page: {
        introduction: "El Clan Atenea acompaña a jóvenes de 18 a 23 años en una etapa de mayor autonomía. El proyecto educativo se vuelve una oportunidad para poner en diálogo la experiencia scout, las búsquedas personales y la responsabilidad de participar en la transformación del entorno.",
        purpose: "Fortalecer la capacidad de las juventudes para investigar, organizarse, acompañar procesos y sostener iniciativas que defiendan la vida con otras comunidades.",
        groupStructure: "Clan Atenea, equipos de proyecto y Programa de Jóvenes",
        progression: "Sistema de Especialidades, Certificaciones HEFESTO y Programa LiMa como rutas para articular aprendizajes, proyecto vital y compromiso comunitario.",
        focusAreas: ["Ciudadanía activa", "Proyecto vital", "Servicio", "Autonomía", "Organización"],
        curriculum: [
          { title: "Atenea: pensar y actuar", description: "El nombre del Clan convoca inteligencia, estrategia y cuidado para leer la realidad antes de decidir cómo intervenir en ella.", topics: ["Pensamiento crítico", "Ética", "Acción"] },
          { title: "Proyectos con reciprocidad", description: "Las iniciativas nacen del diálogo con las comunidades, definen responsabilidades y dejan aprendizajes que pueden continuar más allá del Clan.", topics: ["Reciprocidad", "Organización", "Cuidado"] },
          { title: "Programa de Jóvenes", description: "Especialidades, HEFESTO y LiMa se integran para acompañar un camino que conecta desarrollo personal, experiencia y participación social.", topics: ["Autonomía", "Progresión", "Proyecto"] },
        ],
        knowledgeFoundation: [
          { title: "Ciudadanía activa", text: "La formación se expresa en la capacidad de leer el mundo, tomar posición y sostener acciones que defiendan la dignidad y la vida en común." },
          { title: "Servicio que transforma", text: "Servir significa construir con otras personas, reconocer sus saberes y evitar intervenciones que sustituyan la organización de la comunidad." },
          { title: "Almas libres", text: "La libertad se ejerce con responsabilidad: el Clan decide su ruta, cuida sus vínculos y devuelve al territorio lo que aprende." },
        ],
        activities: [
          { id: "atenea-proyecto", title: "Proyecto de Clan", date: "Programa de Jóvenes", image: `${merakiAsset}/meraki-emblema.png`, summary: "Diseñar una iniciativa que conecte capacidades del equipo con una necesidad reconocida junto a la comunidad.", content: "El Clan define el problema con quienes lo viven, acuerda límites y recursos, actúa y evalúa el proceso para que el proyecto no dependa de una sola persona." },
          { id: "atenea-especialidades", title: "Especialidades al servicio", date: "Sistema de Especialidades", image: `${merakiAsset}/meraki-iris.png`, summary: "Poner conocimientos e intereses personales en circulación para fortalecer el trabajo colectivo.", content: "Cada especialidad puede abrir una colaboración: documentar, facilitar, reparar, investigar o enseñar algo que el grupo necesita." },
          { id: "atenea-ruta", title: "Ruta Atenea", date: "Autonomía y cuidado", image: `${merakiAsset}/meraki-historia-2021.jpg`, summary: "Una experiencia de recorrido, conversación y toma de decisiones para revisar el camino compartido.", content: "La ruta articula momentos de silencio, diálogo y acción para volver a la vida cotidiana con acuerdos concretos y una lectura más clara del territorio." },
        ],
        photoReel: merakiPhotoReel,
      },
    }),
  ],
  philosophy: "El Método Scout es un sistema vivo de autoeducación no formal: crea ambientes seguros, activos y divertidos donde la aventura se encuentra con la conciencia crítica y las personas se reconocen como sujetos capaces de transformar su realidad.",
  mission: "Contribuir a la educación de niñas, niños y jóvenes mediante un sistema de valores basado en la Promesa y la Ley Scout —en una versión tradicional o adaptada según la elección personal—, aplicado a través de un Método Scout reinterpretado y de la Metodología Meraki para desarrollar autonomía, pensamiento crítico y ciudadanía activa.",
  vision: "Para 2031, el CDE Grupo Scout Meraki será un referente nacional de escultismo crítico y comunitario, con una membresía activa y estable de 150 niñas, niños, jóvenes y personas adultas, y con propuestas pedagógicas que transformen el escultismo colombiano desde la educación popular, la autonomía y la participación juvenil protagónica.",
  values: [
    { label: "Libertad", text: "Elegir con responsabilidad y construir espacios donde cada persona pueda ser, preguntar y participar." },
    { label: "Autonomía", text: "Aprender a decidir, organizarse y asumir las consecuencias de lo que se construye en común." },
    { label: "Solidaridad", text: "Reconocer que las vidas están conectadas y que el cuidado se vuelve acción cuando se comparte." },
    { label: "Apoyo mutuo", text: "Poner capacidades, tiempo y saberes en circulación para que nadie tenga que caminar en soledad." },
  ],
  timeline: [
    { year: "2021–2022", title: "Los primeros pasos", text: "Avistamiento de aves con el Jardín Botánico y primer campamento del grupo en enero de 2022." },
    { year: "2022–2023", title: "Crecer en familia", text: "Caminata a Zabrinsky y recorrido por el Centro Histórico para reconocer el territorio como espacio de aprendizaje." },
    { year: "Hoy", title: "Almas Libres", text: "Una comunidad que enlaza escultismo, educación popular, autonomía y participación juvenil en Colombia." },
    { year: "2031", title: "Un referente comunitario", text: "Consolidar una membresía activa y propuestas pedagógicas capaces de transformar el escultismo colombiano." },
  ],
  educators: [],
  activities: [
    { id: "meraki-territorio", title: "Meraki: Almas Libres en el territorio", date: "Identidad del grupo", image: `${merakiAsset}/meraki-actividad.jpg`, summary: "Caminatas, campamentos y proyectos para convertir la lectura del territorio en una práctica de cuidado y organización.", content: "La experiencia del Grupo Scout Meraki combina aventura, participación juvenil y educación popular para que cada actividad abra preguntas sobre la realidad que habitamos." },
    { id: "meraki-programa-jovenes", title: "Un programa para crecer", date: "Programa de Jóvenes", image: `${merakiAsset}/meraki-iris.png`, summary: "Manada, Tropa, Comunidad Iris y Clan recorren rutas distintas dentro de un mismo proyecto educativo.", content: "El Programa de Jóvenes se apoya en el juego, las patrullas, las especialidades, las certificaciones HEFESTO y el Programa LiMa para reconocer procesos y acompañar decisiones." },
    { id: "meraki-aprender-haciendo", title: "Aprender haciendo", date: "Método Scout", image: `${merakiAsset}/meraki-historia-2021.jpg`, summary: "La experiencia directa, la reflexión y el apoyo mutuo conectan cada técnica scout con la transformación del entorno.", content: "La propuesta de Meraki entiende el Método Scout como una herramienta para desarrollar autonomía, pensamiento crítico y ciudadanía activa." },
  ],
  gallery: [
    { src: `${merakiAsset}/meraki-actividad.jpg`, alt: "Grupo Scout Meraki caminando entre árboles", label: "Almas Libres en movimiento" },
    { src: `${merakiAsset}/meraki-historia-2021.jpg`, alt: "Caminata scout junto a un humedal", label: "Avistamiento y cuidado" },
    { src: `${merakiAsset}/meraki-actividad.jpg`, alt: "Personas jóvenes preparándose para una actividad", label: "Aprender haciendo" },
    { src: `${merakiAsset}/meraki-historia-2021.jpg`, alt: "Grupo recorriendo el territorio", label: "Una comunidad que camina" },
  ],
  feed: [
    { author: "Grupo Scout Meraki", role: "Almas Libres", text: "¡Haz parte de esta gran familia! Vive la aventura de construir un escultismo crítico y comunitario.", time: "Identidad Meraki", comments: 0, likes: 0, image: `${merakiAsset}/meraki-actividad.jpg` },
    { author: "Grupo Scout Meraki", role: "Programa de Jóvenes", text: "De la Manada Argonautas al Clan Atenea, cada etapa abre una forma distinta de aprender, decidir y cuidar.", time: "Programa de Jóvenes", comments: 0, likes: 0, image: `${merakiAsset}/meraki-emblema.png` },
  ],
};
