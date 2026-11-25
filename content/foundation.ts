import importedBlogPosts from "@/content/blog/posts.json";

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
  id: string;
  place: string;
  sourcePath: string;
  date: string;
  year: string;
  image: string | null;
};

const legacyDonationIds = new Set([
  "escultista-11666",
  "escultista-11464",
  "escultista-9941",
  "escultista-9668",
  "escultista-9483",
  "escultista-1137",
  "escultista-9128",
  "escultista-9101",
  "escultista-9042",
  "escultista-9030",
  "escultista-9013",
  "escultista-9007",
  "escultista-8999",
  "escultista-8910",
  "escultista-8804",
  "escultista-8772",
  "escultista-8482",
  "escultista-8430",
  "escultista-2464",
  "escultista-2517",
  "escultista-2358",
  "escultista-2306",
  "escultista-1882",
  "escultista-1587",
  "escultista-1419",
  "escultista-1337",
  "escultista-1219",
  "escultista-1205",
  "escultista-1187",
  "escultista-1180",
  "escultista-1164",
  "escultista-1154",
]);

const normalizeExcerpt = (excerpt: string) => {
  const clean = excerpt.replace(/\s+/g, " ").replace(/\[\.\.\.\]/g, "").trim();
  return clean.length > 210 ? `${clean.slice(0, 207).trimEnd()}…` : clean;
};

const placeForInitiative = (value: string) => {
  const text = value.toLocaleLowerCase("es-MX");
  if (text.includes("xacxamayo")) return "San José Xacxamayo";
  if (text.includes("nanacatlán") || text.includes("nanacatlan") || text.includes("ixcuintepec")) return "Sierra Norte de Puebla";
  if (text.includes("guerrero")) return "Centro de acopio · Guerrero";
  if (text.includes("tecuanipa")) return "San Miguel Tecuanipa";
  if (text.includes("resurrección")) return "Junta auxiliar de La Resurrección";
  if (text.includes("chetla") || text.includes("totimehuacán")) return "Chetla · San Francisco Totimehuacán";
  if (text.includes("oaxaca")) return "Ixcuintepec · Oaxaca";
  if (text.includes("alfabetiza")) return "Puebla se Alfabetiza";
  if (text.includes("pandemia")) return "Puebla y sus comunidades";
  return "Puebla y sus comunidades";
};

const importedDonationInitiatives: FoundationInitiative[] = importedBlogPosts
  .filter((post) => legacyDonationIds.has(post.id))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((post) => ({
    id: post.id,
    title: post.title,
    place: placeForInitiative(`${post.title} ${post.excerpt}`),
    description: normalizeExcerpt(post.excerpt),
    sourcePath: `/blog/${post.slug}`,
    date: post.dateLabel,
    year: post.publishedAt.slice(0, 4),
    image: post.coverImageUrl ?? null,
  }));

export const foundationInitiatives = importedDonationInitiatives;
export const foundationDonationYears = Array.from(new Set(foundationInitiatives.map((initiative) => initiative.year))).sort();

export const foundationMilestones = [
  { year: "1933", title: "Primeras experiencias en Puebla", text: "La historia de la asociación se enlaza con el establecimiento del escultismo en la ciudad de Puebla." },
  { year: "2000", title: "Revisión del proyecto educativo", text: "Comienza un proceso para llevar el trabajo más allá de los servicios tradicionales y acercarlo a la vida comunitaria." },
  { year: "2003", title: "Trabajo con comunidades", text: "Se desarrollan actividades piloto con comunidades indígenas, casas hogar, infancias campesinas y escuelas públicas." },
  { year: "2021", title: "Constitución como asociación civil", text: "La Comunidad Crítica de Escultismo Popular articula educación no formal, cultura, asistencia social, medio ambiente y participación juvenil." },
];
