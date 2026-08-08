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
