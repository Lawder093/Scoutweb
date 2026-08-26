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

## Acceso editorial y blog

1. Crea la cuenta editorial en Supabase Authentication → Users.
2. Configura `CONTENT_ADMIN_EMAILS` con el correo autorizado, separado por comas.
3. Configura `CONTENT_SOURCE=supabase` para que las publicaciones guardadas sean visibles en el blog público.
4. Entra a `/login` y, después de iniciar sesión, abre `/admin/blog`.

El formulario guarda borradores o publicaciones en `public.blog_posts`. El contenido escrito se convierte a HTML seguro en el servidor; no se permite insertar HTML arbitrario desde el formulario.

## Supabase

El esquema editorial se encuentra en `supabase/migrations/20260807120000_create_content_schema.sql`. Crea las tablas `content_authors`, `blog_posts` y `library_resources`, activa RLS y configura el bucket público `content-assets` para imágenes y archivos PDF.

Para cargar el contenido inicial, ejecuta después `supabase/seed.sql` desde el SQL Editor de Supabase. El sitio funciona mientras tanto con un fallback local tipado, por lo que el desarrollo no se bloquea si las tablas todavía no existen.

Las consultas públicas pasan por repositorios server-side y solo devuelven artículos publicados y recursos públicos. El cliente admin existe únicamente para futuras tareas protegidas de administración y nunca se importa desde el navegador.

### Importar el blog existente

El importador consulta la API pública de WordPress de `escultista.org`, conserva la fecha original de publicación y actualización, autor, categorías, etiquetas, URL fuente, extracto y contenido HTML sanitizado. Usa `source_id` para que pueda ejecutarse nuevamente sin duplicar entradas.

Después de aplicar las migraciones, configura temporalmente `SUPABASE_SECRET_KEY` en `.env.local` y ejecuta:

```bash
npm run import:blog
```

Para revisar el número de entradas y el rango de fechas sin escribir en Supabase:

```bash
npm run import:blog -- --dry-run
```

Si prefieres trabajar sin Supabase, exporta las entradas directamente al proyecto:

```bash
npm run sync:blog:local
```

Esto genera `content/blog/posts.json` con las 312 entradas y sus fechas. El sitio utiliza ese archivo como fallback completo cuando Supabase no está disponible.

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
