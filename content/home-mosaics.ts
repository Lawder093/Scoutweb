export type HomeMosaic = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  tone: "primary" | "mist" | "ink" | "accent";
  icon: "heart" | "globe" | "book" | "store" | "music" | "hand";
  span?: "wide" | "standard";
};

/** Inicio se compone de módulos configurables para facilitar futuras ediciones. */
export const homeMosaics: HomeMosaic[] = [
  { id: "nosotros", eyebrow: "La asociación", title: "Quiénes somos y cómo trabajamos", description: "Conoce nuestra historia, propósito, beneficiarios, donaciones y compromisos de transparencia.", href: "/nosotros", tone: "primary", icon: "heart", span: "wide" },
  { id: "cde", eyebrow: "La red", title: "Centros de Desarrollo Escultista", description: "Explora los territorios y comunidades que forman parte de la red.", href: "/cde", tone: "mist", icon: "globe", span: "wide" },
  { id: "blog", eyebrow: "Historias", title: "Blog", description: "Ideas, experiencias y conversaciones desde el territorio.", href: "/blog", tone: "ink", icon: "book" },
  { id: "tienda", eyebrow: "Objetos con sentido", title: "Tienda", description: "Materiales y publicaciones para acompañar el proyecto.", href: "/tienda", tone: "accent", icon: "store" },
  { id: "biblioteca", eyebrow: "Recursos", title: "Biblioteca", description: "Documentos, herramientas y materiales de la asociación.", href: "/biblioteca", tone: "mist", icon: "book", span: "wide" },
  { id: "coro", eyebrow: "Cultura y comunidad", title: "Coro Esperanza Paulo Freire", description: "Voces, guitarras y un espacio para encontrarnos.", href: "#coro-esperanza", tone: "ink", icon: "music", span: "wide" },
  { id: "apoyo", eyebrow: "Participa", title: "Apoya una causa", description: "Conoce las campañas activas y las formas de colaborar.", href: "/donacion", tone: "primary", icon: "hand" },
];
