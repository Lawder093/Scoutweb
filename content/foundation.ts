export type FoundationCard = {
  title: string;
  description: string;
};

export const foundationMission =
  "Ser una asociación civil de asistencia y desarrollo social sin fines de lucro para niñas, niños y adolescentes de escasos recursos, especialmente en zonas populares y pueblos originarios, mediante actividades educativas no formales, talleres y cursos.";

export const foundationVision =
  "Ser una asociación asistencial y de desarrollo social referente, cuyas acciones ayuden a niñas, niños y adolescentes a alcanzar condiciones de vida más justas y humanas y a transformar su entorno social.";

export const foundationGeneralObjective =
  "Contribuir al bienestar y al desarrollo de niñas, niños y adolescentes en contextos de desigualdad mediante educación no formal, participación comunitaria, cultura, asistencia social y acciones que hagan efectivos sus derechos al descanso, al juego y a la vida cultural.";

export const foundationSpecificObjectives: FoundationCard[] = [
  {
    title: "Comunidades educativas",
    description: "Crear Centros de Desarrollo Escultista donde niñas, niños y adolescentes aprendan, participen y tomen parte en la transformación de su entorno.",
  },
  {
    title: "Asistencia y cuidados",
    description: "Organizar apoyos de alimentación, vestido, vivienda, becas y otras necesidades básicas junto con las comunidades.",
  },
  {
    title: "Salud y educación",
    description: "Vincular iniciativas de salud, nutrición, educación accesible y acompañamiento para responder a necesidades concretas.",
  },
  {
    title: "Inclusión y derechos",
    description: "Impulsar medidas de apoyo para pueblos originarios, personas con discapacidad y familias que enfrentan situaciones de riesgo.",
  },
  {
    title: "Alianzas sostenibles",
    description: "Construir colaboraciones con escuelas, organizaciones y comunidades para que los proyectos puedan sostenerse y crecer.",
  },
  {
    title: "Territorio y participación",
    description: "Promover campamentos, acciones ambientales, cultura y formación para reconocer el territorio y actuar sobre sus desigualdades.",
  },
];

export const foundationValues: FoundationCard[] = [
  { title: "Dignidad", description: "Reconocemos a cada persona como sujeto de derechos, saberes y decisiones." },
  { title: "Cuidado", description: "Construimos espacios seguros, libres de violencia y atentos a cada proceso." },
  { title: "Participación", description: "Las comunidades toman la palabra, organizan sus iniciativas y evalúan lo que hacen." },
  { title: "Justicia", description: "Trabajamos para reducir desigualdades y abrir oportunidades reales de desarrollo." },
];

export const foundationWorkAreas: FoundationCard[] = [
  {
    title: "Educación y desarrollo",
    description: "Procesos educativos, talleres y capacitación para que niñas, niños y adolescentes aprendan, participen y construyan autonomía.",
  },
  {
    title: "Asistencia social",
    description: "Apoyos en alimentación, vestido, vivienda, becas y otras necesidades básicas de personas y comunidades en situación de vulnerabilidad.",
  },
  {
    title: "Salud y bienestar",
    description: "Acciones de acompañamiento y vinculación para favorecer la salud, la nutrición y el bienestar integral.",
  },
  {
    title: "Cultura y comunidad",
    description: "Música, arte, juego y proyectos comunitarios como espacios para expresarse, encontrarse y participar en la vida colectiva.",
  },
  {
    title: "Derechos y protección",
    description: "Promovemos el derecho al descanso, al juego y a la participación cultural en ambientes libres de discriminación y violencia.",
  },
  {
    title: "Territorio y ambiente",
    description: "Campamentos, acciones ambientales y alianzas locales para cuidar el territorio y fortalecer proyectos sostenibles.",
  },
];

export const foundationRights = [
  "Espacios libres de estrés y discriminación",
  "Protección ante cualquier forma de daño o violencia",
  "Descanso adecuado y tiempo libre real",
  "Interacción con la naturaleza y el mundo animal",
  "Acceso a la cultura, las artes y el juego",
];

export const foundationBeneficiaries = [
  {
    title: "Infancias y adolescencias",
    description: "Niñas, niños y adolescentes que participan en procesos educativos, culturales, deportivos y de desarrollo social.",
  },
  {
    title: "Comunidades en situación de vulnerabilidad",
    description: "Personas, sectores y regiones con necesidades de alimentación, vestido, vivienda, salud, educación u orientación social.",
  },
  {
    title: "Pueblos y comunidades indígenas",
    description: "Comunidades con las que se construyen proyectos situados, reconociendo sus saberes, su cultura y sus propias formas de organización.",
  },
  {
    title: "Personas con discapacidad y sus familias",
    description: "Grupos que requieren medidas de apoyo y condiciones accesibles para participar y desarrollar sus proyectos de vida.",
  },
  {
    title: "Escuelas, casas hogar y organizaciones locales",
    description: "Espacios comunitarios con los que se realizan actividades piloto, talleres, alianzas y acciones de asistencia social.",
  },
];

export const foundationBankDetails = {
  account: "0117588771",
  clabe: "012650001175887715",
};

export const foundationODS = [
  "ODS 1 · Fin de la pobreza",
  "ODS 2 · Hambre cero",
  "ODS 3 · Salud y bienestar",
  "ODS 4 · Educación de calidad",
  "ODS 10 · Reducción de las desigualdades",
];

export type FoundationInitiative = FoundationCard & {
  place: string;
  sourcePath: string;
};

export const foundationInitiatives: FoundationInitiative[] = [
  {
    title: "Apoyos para Nanacatlán",
    place: "Sierra Norte de Puebla",
    description: "Recolección y entrega de ropa, calzado, juguetes, medicinas y alimentos para familias y para el desayunador comunitario de la escuela.",
    sourcePath: "/blog/escultista-9101-entrega-de-donativos-a-la-comunidad-de-nanacatlan",
  },
  {
    title: "Campañas de salud comunitaria",
    place: "Nanacatlán e Ixcuintepec",
    description: "Gestión solidaria de medicamentos y materiales para atender necesidades de salud identificadas junto con las comunidades.",
    sourcePath: "/blog/escultista-8430-donaciones-para-nanacatlan",
  },
  {
    title: "Ropa y juguetes para la niñez",
    place: "San Miguel Tecuanipa",
    description: "Colectas comunitarias entregadas con apoyo de educadoras y organizaciones locales, vinculando el servicio con la participación juvenil.",
    sourcePath: "/blog/escultista-1587-donacion-juguetes-y-ropa-a-la-comunidad-de-san-miguel-tecuanipa",
  },
  {
    title: "Juguetes para el juego",
    place: "Comunidades de Atlixco",
    description: "Entrega de juguetes para favorecer el juego y la recreación como parte del desarrollo de niñas y niños.",
    sourcePath: "/blog/escultista-1882-entrega-de-juguetes",
  },
  {
    title: "Redes para sostener la ayuda",
    place: "Puebla, Cholula y Tlaxcala",
    description: "Colaboración con colectivos locales para reunir, trasladar y distribuir donativos de manera más cercana y sostenible.",
    sourcePath: "/blog/escultista-9128-apoyos-continuos-para-la-sierra-norte-solidaridad-en-movimiento",
  },
];

export const foundationMilestones = [
  { year: "1933", title: "Primeras experiencias en Puebla", text: "La historia de la asociación se enlaza con el establecimiento del escultismo en la ciudad de Puebla." },
  { year: "2000", title: "Revisión del proyecto educativo", text: "Comienza un proceso para llevar el trabajo más allá de los servicios tradicionales y acercarlo a la vida comunitaria." },
  { year: "2003", title: "Trabajo con comunidades", text: "Se desarrollan actividades piloto con comunidades indígenas, casas hogar, infancias campesinas y escuelas públicas." },
  { year: "2021", title: "Constitución como asociación civil", text: "La Comunidad Crítica de Escultismo Popular articula educación no formal, cultura, asistencia social, medio ambiente y participación juvenil." },
];
