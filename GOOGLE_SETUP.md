# Configuración de Google

Esta guía deja lista la web pública para SEO, Google Search Console y Google Analytics 4 sin sustituir Vercel, Supabase ni el sistema de autenticación existente.

## Variables de entorno

Configura estas variables en Vercel —para `Production`, y también para `Preview` si quieres probarlas— y vuelve a desplegar:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio-final.org
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=valor-de-verificacion
```

`NEXT_PUBLIC_SITE_URL` debe ser la URL canónica definitiva, sin una ruta final. Se utiliza para canonicals, Open Graph, JSON-LD, robots y sitemap.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` es opcional. Si se deja vacío o no tiene el formato `G-XXXXXXXXXX`, Analytics no se carga y la aplicación continúa funcionando normalmente.

`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` también es opcional. Su valor se obtiene de Search Console y se convierte automáticamente en la etiqueta de verificación del sitio.

No pongas aquí claves secretas de Supabase ni tokens privados.

## Google Analytics 4

1. En Google Analytics, crea o selecciona una propiedad GA4.
2. En **Administrador → Flujos de datos**, crea un flujo **Web** con el dominio definitivo.
3. Copia el **ID de medición**, que empieza por `G-`.
4. Guarda ese valor como `NEXT_PUBLIC_GA_MEASUREMENT_ID` en Vercel.
5. Despliega de nuevo y comprueba en **Informes → Tiempo real** que aparece una visita pública.

La etiqueta se carga una sola vez desde el layout de Next.js, únicamente cuando existe un ID válido. No se carga en `/admin`, `/login`, `/conecta`, `/perfil` ni `/configuracion`.

## Google Search Console

1. Añade el dominio o la URL de producción en [Google Search Console](https://search.google.com/search-console).
2. Elige la verificación mediante etiqueta HTML si usas una propiedad de prefijo de URL.
3. Copia únicamente el contenido de `content` de la etiqueta de verificación.
4. Guárdalo como `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` en Vercel.
5. Despliega de nuevo y pulsa **Verificar** en Search Console.
6. En **Sitemaps**, envía:

```text
https://tu-dominio-final.org/sitemap.xml
```

También puedes revisar directamente:

- `https://tu-dominio-final.org/robots.txt`
- `https://tu-dominio-final.org/sitemap.xml`

Usa la herramienta **Inspección de URL** para solicitar rastreo de una página pública concreta. Las rutas administrativas, de autenticación, Conecta y API no se incluyen en el sitemap y están excluidas en `robots.txt`.

## Open Graph y compartir enlaces

Las páginas usan `/public/images/scouts-hero.png` como imagen social predeterminada. Si más adelante se prepara una imagen específica para compartir, puede colocarse en `/public/og-image.jpg` y registrarse como la imagen predeterminada en `lib/seo.ts`.

Las páginas de blog, biblioteca, CDE y tienda reutilizan su imagen propia cuando existe; si no, usan la imagen institucional predeterminada.

## Eventos implementados

La capa `lib/analytics.ts` ignora eventos si Analytics está desactivado y no envía nombres, correos, teléfonos, direcciones, datos de menores, IDs de Supabase ni contenido de formularios.

Eventos disponibles:

- `page_view`: navegación por páginas públicas.
- `click_whatsapp`: apertura de WhatsApp desde los contactos públicos.
- `contact_email_click`: clic en correos institucionales.
- `contact_phone_click`: clic en teléfonos institucionales o de un CDE.
- `download_document`: descarga de un documento desde la biblioteca.

No se añadieron eventos de formulario, registro de actividades, membresía o voluntariado porque esas acciones no existen como formularios públicos en la versión actual.

## Conversiones recomendadas

En GA4 conviene marcar como eventos clave principales:

1. `click_whatsapp`
2. `contact_email_click`

Como evento secundario de interés puede marcarse `download_document`. `page_view` y clics genéricos de navegación no deberían ser conversiones principales.

Cuando los eventos estén validados en GA4, vincula la propiedad desde **Administrador → Enlaces de producto → Enlaces con Google Ads**. La configuración de campañas y de Google Ad Grants se hará después desde las cuentas correspondientes; este repositorio no accede a esas cuentas.

## Privacidad y comprobaciones

- No se usa Google Tag Manager.
- No se envía información personal a Analytics.
- Las claves privadas de Supabase permanecen del lado del servidor.
- Antes de publicar, confirma que `NEXT_PUBLIC_SITE_URL` corresponde al dominio real y que la imagen institucional esté disponible en producción.
