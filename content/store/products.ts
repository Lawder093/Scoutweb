export type StoreProductTone = "primary" | "secondary" | "accent" | "ink";

export type StoreProductDetail = {
  label: string;
  value: string;
};

export type StoreProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  availability: string;
  tone: StoreProductTone;
  image?: string;
  imageAlt?: string;
  details?: StoreProductDetail[];
};

export const storeProducts: StoreProduct[] = [
  {
    id: "guia-progresion-comunidades",
    name: "Guía de progresión para las comunidades educativas de Ronda, Manada, Tropa y Clan",
    category: "Materiales",
    description: "Una guía impresa para acompañar las comunidades educativas de Ronda, Manada, Tropa y Clan desde el Escultismo Crítico Popular.",
    availability: "Disponible",
    tone: "ink",
    image: "/images/store/guia-progresion-comunidades.jpg",
    imageAlt: "Portada de la Guía de progresión para las comunidades educativas de Ronda, Manada, Tropa y Clan",
    details: [
      { label: "Formato", value: "Publicación impresa" },
      { label: "Comunidades", value: "Ronda · Manada · Tropa · Clan" },
    ],
  },
  {
    id: "cantar-para-transformar",
    name: "Cantar para transformar: El legado musical juvenil alemán en diálogo con Nuestra América",
    category: "Materiales",
    description: "Un recorrido por el legado de la Jugendmusikbewegung y la obra de Fritz Jöde, en diálogo con las tradiciones musicales de Nuestra América. Propone el canto colectivo y la música popular como herramientas de educación, convivencia y transformación.",
    availability: "Disponible",
    tone: "ink",
    image: "/images/store/cantar-para-transformar.jpg",
    imageAlt: "Portada del libro Cantar para transformar, de Gerardo Martínez Hernández",
    details: [
      { label: "Autor", value: "Gerardo Martínez Hernández" },
      { label: "Editorial", value: "BUAP" },
      { label: "Tema", value: "Música, educación y comunidad" },
    ],
  },
  {
    id: "el-poder-de-la-musica",
    name: "El poder de la música: Nuevas estrategias para el desarrollo de la creatividad en la enseñanza musical infantil",
    category: "Materiales",
    description: "Una propuesta práctica que integra el juego y la ludificación a la enseñanza musical para fortalecer la creatividad y el desarrollo cognitivo, emocional y social de niñas y niños.",
    availability: "Disponible",
    tone: "accent",
    image: "/images/store/el-poder-de-la-musica.jpg",
    imageAlt: "Portada del libro El poder de la música, de Nadia Borislova y Gerardo Martínez",
    details: [
      { label: "Autores", value: "Nadia Borislova · Gerardo Martínez" },
      { label: "Editorial", value: "Laberinto" },
      { label: "Tema", value: "Creatividad y enseñanza musical" },
    ],
  },
  {
    id: "panolleta-institucional",
    name: "Pañoleta institucional",
    category: "Identidad",
    description: "La pañoleta que acompaña ceremonias, encuentros y rutas compartidas.",
    availability: "Consultar existencia",
    tone: "primary",
  },
  {
    id: "playera-comunidad",
    name: "Playera de la comunidad",
    category: "Vestimenta",
    description: "Una prenda para llevar el proyecto educativo también fuera del CDE.",
    availability: "Consultar tallas",
    tone: "secondary",
  },
  {
    id: "insignias-parches",
    name: "Insignias y parches",
    category: "Identidad",
    description: "Piezas textiles para reconocer procesos, historias y pertenencias.",
    availability: "Consultar modelos",
    tone: "accent",
  },
  {
    id: "publicaciones-impresas",
    name: "Publicaciones impresas",
    category: "Materiales",
    description: "Materiales físicos para leer, conversar y compartir en comunidad.",
    availability: "Consultar títulos",
    tone: "ink",
  },
];

export function getStoreProduct(id: string): StoreProduct | undefined {
  return storeProducts.find((product) => product.id === id);
}
