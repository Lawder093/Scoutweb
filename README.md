# ScoutWeb · Escultismo Crítico Popular

Sitio web en español para la Comunidad Crítica de Escultismo Popular. La aplicación usa Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React y Supabase para el contenido editorial.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` como `.env.local` y completa las variables públicas con la URL y la publishable key de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`SUPABASE_SECRET_KEY` solo debe existir en entornos de servidor y nunca debe utilizarse en componentes cliente ni subirse al repositorio.

## Supabase

El esquema editorial se encuentra en `supabase/migrations/20260807120000_create_content_schema.sql`. Crea las tablas `content_authors`, `blog_posts` y `library_resources`, activa RLS y configura el bucket público `content-assets` para imágenes y archivos PDF.

Para cargar el contenido inicial, ejecuta después `supabase/seed.sql` desde el SQL Editor de Supabase. El sitio funciona mientras tanto con un fallback local tipado, por lo que el desarrollo no se bloquea si las tablas todavía no existen.

Las consultas públicas pasan por repositorios server-side y solo devuelven artículos publicados y recursos públicos. El cliente admin existe únicamente para futuras tareas protegidas de administración y nunca se importa desde el navegador.

## Rutas editoriales

- `/blog` muestra los artículos publicados.
- `/blog/[slug]` muestra el detalle de un artículo.
- `/biblioteca` muestra los recursos públicos.
- `/biblioteca/[slug]` muestra el detalle y el enlace de descarga cuando existe un archivo.
- `/cde/[country]` continúa utilizando los datos estáticos escalables de `content/cdes`.

## Validación

```bash
npm run typecheck
npm run build
npm run audit
```

El primer commit de la integración debe incluir el código y las migraciones, pero nunca `.env.local`, claves secretas ni artefactos de `.next`.
