export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  kind: "email" | "phone" | "social" | "network";
};

export type ContactPerson = {
  role: string;
  name: string;
};

export type CDEContact = {
  country: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  mapUrl: string;
  website?: string;
  email?: string;
  phone?: string;
  responsible: string;
  social: Array<{ label: string; href: string }>;
};

export const institutionalContact = {
  name: "Comunidad Crítica de Escultismo Popular, A. C.",
  address: "Av. Campestre #5303, Santa Cruz Buenavista, C.P. 72150, Puebla, Puebla. México.",
  email: "scouts@escultista.org",
  phone: "+52 222 743 1265",
  whatsappUrl: "https://api.whatsapp.com/send?phone=522227431265&text=Hola%20CCEP%2C%20quiero%20conocer%20la%20comunidad.",
};

export const contactChannels: ContactChannel[] = [
  {
    label: "Correo institucional",
    value: institutionalContact.email,
    href: `mailto:${institutionalContact.email}`,
    kind: "email",
  },
  {
    label: "WhatsApp",
    value: institutionalContact.phone,
    href: institutionalContact.whatsappUrl,
    kind: "phone",
  },
  {
    label: "Conoce la red",
    value: "Tres territorios, un proyecto educativo",
    href: "/cde",
    kind: "network",
  },
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/escultistas" },
  { label: "Instagram", href: "https://www.instagram.com/scouts_puebla/" },
  { label: "YouTube", href: "https://www.youtube.com/@escultismo" },
];

export const representatives: ContactPerson[] = [
  { role: "Presidente", name: "Gerardo Martínez Hernández" },
  { role: "Tesorera", name: "Ericka Meredith Méndez Moguel" },
  { role: "Secretario del Consejo directivo", name: "José Fidel Sánchez Juárez" },
  { role: "Mediador de honor y justicia", name: "Miguel Zúñiga Cervantes" },
];

export const legalDetails = [
  { label: "Notaría de registro", value: "No. 19 para el Estado de Oaxaca" },
  { label: "Número de registro", value: "Vol. 863, Núm. 47153 / 25-02-2021" },
  { label: "RFC", value: "CCE210225FV4" },
  { label: "Donataria autorizada folio", value: "700-02-01-00-00-2021-6556" },
];

export const cdeContacts: CDEContact[] = [
  {
    country: "México",
    slug: "mexico",
    name: "Primero de Puebla «IMG»",
    description: "Un Centro de Desarrollo Escultista que acompaña procesos educativos en Puebla y su territorio.",
    address: "Privada A Pte. de La 16 de Sept. 3906-Interior 4, Gabriel Pastor 1ra Secc, 72420 Heroica Puebla de Zaragoza, Pue.",
    mapUrl: "https://maps.app.goo.gl/Pnwm9gSv7P1fwJfN7",
    website: "https://escultista.org/centro-de-desarrollo-escultista-primero-de-puebla/",
    email: "joseruben@escultista.org",
    phone: "+52 222 923 1415",
    responsible: "José Rubén Hernández Rossainz",
    social: [
      { label: "Facebook", href: "https://www.facebook.com/ScoutsGIP" },
      { label: "Instagram", href: "https://www.instagram.com/scouts_puebla/" },
      { label: "TikTok", href: "https://www.tiktok.com/@scouts_g1p" },
    ],
  },
  {
    country: "Argentina",
    slug: "argentina",
    name: "San Lucas – Grünbein de Bahía Blanca",
    description: "Una adhesión voluntaria a los principios de la CCEP desde Bahía Blanca, en el sur del continente.",
    address: "San Lucas 5001, Bahía Blanca, B8000 Provincia de Buenos Aires, Argentina.",
    mapUrl: "https://goo.gl/maps/u1aaDaUGFsCUsEXf8",
    email: "wild@escultista.org",
    phone: "+54 9 2915 04-2309",
    responsible: "Horacio Wild",
    social: [
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100070528373113" },
      { label: "Instagram", href: "https://www.instagram.com/centrodesarrolloscoutsanlucas/" },
    ],
  },
  {
    country: "Colombia",
    slug: "colombia",
    name: "Meraki – Bogotá",
    description: "Grupo Scout Meraki: Almas Libres que aprenden, se organizan y cuidan el territorio desde Bogotá.",
    address: "Parque Brazil, Cl. 39 #17-20, Bogotá, Colombia.",
    mapUrl: "https://goo.gl/maps/Rg12b1DFsWtS9fps9",
    website: "https://sites.google.com/view/gscoutmeraki",
    email: "meraki@escultista.org",
    phone: "+57 315 511 3581",
    responsible: "Josh Gómez",
    social: [
      { label: "Facebook", href: "https://www.facebook.com/gscoutmeraki" },
      { label: "Instagram", href: "https://www.instagram.com/gscoutmeraki/" },
      { label: "TikTok", href: "https://www.tiktok.com/@gscoutmeraki" },
    ],
  },
];

export const legalNotice = [
  {
    title: "Contenido de este sitio web",
    text: "Los contenidos de este sitio web han sido elaborados con el mayor cuidado y son de acceso libre y gratuito. Sin embargo, la CCEP no garantiza la exactitud, integridad ni actualidad de toda la información proporcionada.",
  },
  {
    title: "Enlaces externos",
    text: "Este sitio web contiene enlaces a páginas web externas de terceros. La CCEP no se hace responsable del contenido de dichas páginas. En caso de detectar infracciones legales, se revisarán y retirarán los enlaces correspondientes.",
  },
  {
    title: "Derechos de autor",
    text: "Los contenidos publicados están protegidos por la legislación mexicana en materia de derechos de autor. Cualquier uso fuera de los límites legales requiere autorización previa y por escrito.",
  },
];
