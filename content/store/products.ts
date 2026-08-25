export type StoreProductTone = "primary" | "secondary" | "accent" | "ink";

export type StoreProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  availability: string;
  tone: StoreProductTone;
};

export const storeProducts: StoreProduct[] = [
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
