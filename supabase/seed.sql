insert into public.content_authors (id, name, slug, bio)
values (
  '11111111-1111-4111-8111-111111111111',
  'Comunidad Crítica de Escultismo Popular',
  'comunidad-critica-de-escultismo-popular',
  'Una comunidad educativa que aprende, organiza y transforma desde los territorios.'
)
on conflict (slug) do update
set name = excluded.name,
    bio = excluded.bio;

insert into public.blog_posts (
  slug,
  title,
  excerpt,
  body,
  category,
  cover_image_path,
  author_id,
  is_published,
  published_at
)
values
(
  'la-patrulla-tambien-es-politica',
  'La patrulla también es política',
  'Lo que aprendimos cuando dejamos que una asamblea tuviera más de una respuesta.',
  'Una crónica sobre poder, juego y las decisiones que construimos cuando todas las voces encuentran un lugar en la conversación.',
  'Crónica',
  '/images/scouts-circle.png',
  '11111111-1111-4111-8111-111111111111',
  true,
  '2024-09-12T12:00:00Z'
),
(
  'cinco-preguntas-para-caminar-el-barrio',
  'Cinco preguntas para caminar el barrio',
  'Una guía para mirar el territorio con curiosidad, cuidado y ganas de mover algo.',
  'Caminar también es investigar: cinco preguntas sencillas para leer el territorio junto al grupo y convertir la observación en acción compartida.',
  'Herramienta',
  '/images/scouts-hero.png',
  '11111111-1111-4111-8111-111111111111',
  true,
  '2024-08-28T12:00:00Z'
),
(
  'aprender-sin-pedir-permiso',
  'Aprender sin pedir permiso',
  'Sobre educación popular, autonomía y el valor de hacer espacio para otras voces.',
  'Una conversación sobre autonomía, cuidado y las condiciones que hacen posible aprender de manera colectiva.',
  'Conversación',
  '/images/scouts-circle.png',
  '11111111-1111-4111-8111-111111111111',
  true,
  '2024-08-06T12:00:00Z'
)
on conflict (slug) do update
set title = excluded.title,
    excerpt = excluded.excerpt,
    body = excluded.body,
    category = excluded.category,
    cover_image_path = excluded.cover_image_path,
    author_id = excluded.author_id,
    is_published = excluded.is_published,
    published_at = excluded.published_at;

insert into public.library_resources (
  slug,
  title,
  creator,
  description,
  is_public,
  published_at,
  display_order
)
values
(
  'la-asamblea-como-fogata',
  'La asamblea como fogata',
  'Cuaderno de prácticas',
  'Ideas para abrir conversaciones, repartir la palabra y tomar decisiones en colectivo.',
  true,
  '2024-09-20T12:00:00Z',
  1
),
(
  'jugar-en-serio',
  'Jugar en serio',
  'Herramientas para el grupo',
  'Juegos y dinámicas para aprender haciendo, cuidar el vínculo y mover preguntas.',
  true,
  '2024-09-18T12:00:00Z',
  2
),
(
  'mapa-de-cuidados',
  'Mapa de cuidados',
  'Guía de acompañamiento',
  'Una guía breve para reconocer necesidades, acuerdos y redes que sostienen al grupo.',
  true,
  '2024-09-16T12:00:00Z',
  3
),
(
  'bitacora-del-territorio',
  'Bitácora del territorio',
  'Miradas desde el barrio',
  'Preguntas para registrar lo que vemos, lo que sentimos y lo que queremos transformar.',
  true,
  '2024-09-14T12:00:00Z',
  4
),
(
  'desarmar-la-brujula',
  'Desarmar la brújula',
  'Ensayos breves',
  'Textos para revisar nuestras certezas y volver a orientarnos con otras personas.',
  true,
  '2024-09-12T12:00:00Z',
  5
),
(
  'manual-de-la-alegria',
  'Manual de la alegría',
  'Recursos para resistir',
  'Una colección de recursos para celebrar, descansar y sostener la organización cotidiana.',
  true,
  '2024-09-10T12:00:00Z',
  6
)
on conflict (slug) do update
set title = excluded.title,
    creator = excluded.creator,
    description = excluded.description,
    is_public = excluded.is_public,
    published_at = excluded.published_at,
    display_order = excluded.display_order;
