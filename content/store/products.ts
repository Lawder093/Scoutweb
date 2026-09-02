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
