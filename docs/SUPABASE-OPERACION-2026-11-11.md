# Supabase: comprobación y puesta en marcha

Fecha: 11 de noviembre de 2026. Esta guía no contiene contraseñas ni claves.

## 1. Qué se comprobó y qué no

Se consultó **sin modificar datos** el proyecto `cmtrdwogfcjbcksqcnln`, identificado por la configuración local y por los archivos públicos del sitio. No se inspeccionaron las variables del despliegue en Vercel; confirma que producción usa ese mismo proyecto antes de aplicar cambios.

| Elemento | Resultado de la consulta |
| --- | --- |
| `admin_users`, `blog_posts`, `library_resources` | API accesible, HTTP 200 |
| `conecta_users`, `cde_activities` | API accesible, HTTP 200 |
| `conecta_postcards` | HTTP 404, `PGRST205`: no aparece en el esquema expuesto por la API |
| `cde_instagram_links` | HTTP 404, `PGRST205` |
| `content-assets` | Existe, público, límite 50 MiB |
| `conecta-private` | Existe, privado |
| `conecta-postcards` | No aparece en el listado de buckets |

Un `PGRST205` también puede requerir revisar el esquema/caché de la API: no demuestra por sí solo que una tabla no exista físicamente. El SQL siguiente distingue los casos. Una respuesta 200 no certifica todas las columnas, políticas ni un flujo de escritura completo.

**No se crearon usuarios, no se cambiaron contraseñas, no se publicaron pruebas y no se ejecutó ninguna migración en producción.**

## 2. Antes de tocar Supabase

1. Abre el proyecto correspondiente en Supabase y verifica su identificador.
2. En Vercel, abre el proyecto del sitio y comprueba las variables de **Production**. No compartas capturas que muestren claves.
3. Antes de migrar, confirma que tienes una copia de seguridad recuperable. Prueba primero en un proyecto de ensayo, con datos ficticios.
4. Abre **SQL Editor → New query** y ejecuta las consultas de solo lectura de abajo.
5. No desactives RLS, no hagas públicas las tablas de usuarios y no recrees cuentas existentes para solucionar un error.

## 3. Diagnóstico SQL de solo lectura

```sql
begin read only;

with esperadas(tabla) as (
  values ('admin_users'), ('blog_posts'), ('library_resources'),
    ('conecta_users'), ('conecta_postcards'), ('cde_activities'),
    ('cde_instagram_links')
)
select e.tabla, c.oid is not null as existe, c.relrowsecurity as rls_activo
from esperadas e
left join pg_class c on c.oid = to_regclass(format('public.%I', e.tabla))
order by e.tabla;

select table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name in ('admin_users', 'blog_posts', 'conecta_users', 'conecta_postcards')
order by table_name, ordinal_position;

select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where (schemaname = 'public' and tablename in
  ('admin_users', 'blog_posts', 'conecta_users', 'conecta_postcards'))
  or (schemaname = 'storage' and tablename = 'objects')
order by schemaname, tablename, policyname;

select id, public, file_size_limit, allowed_mime_types
from storage.buckets
where id in ('content-assets', 'conecta-private', 'conecta-postcards');

select to_regprocedure('public.set_updated_at()') is not null
  as existe_funcion_de_actualizacion;

rollback;
```

Esperado: RLS activo. En `admin_users` y `conecta_users` no debe abrirse lectura/escritura a visitantes: las operaciones autorizadas pasan por el servidor. Para postales, la lectura pública debe limitarse a aprobadas no vencidas. Los borradores del blog no deben poder leerse como visitante. Los archivos de un bucket público no se vuelven privados por marcar una fila como borrador. [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [privacidad de buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals).

Solo si ambas tablas existen, verifica la lectura pública:

```sql
begin read only;
set local role anon;
select count(*) as borradores_visibles
from public.blog_posts
where not is_published or published_at is null or published_at > now();
select count(*) as postales_no_publicables_visibles
from public.conecta_postcards
where status <> 'approved' or expires_at is null or expires_at <= now();
rollback;
```

Ambos resultados deben ser cero. Si no hay registros de esos tipos, repite después con datos controlados en ensayo; cero en una tabla vacía no prueba la protección.

## 4. Archivos que puede ser necesario aplicar

Las migraciones están en `supabase/migrations`. **No ejecutes todas a ciegas**: varias contienen creación de políticas/disparadores no repetible.

| Orden | Archivo | Uso |
| --- | --- | --- |
| 1 | `20260807120000_create_content_schema.sql` | Base editorial y función de actualización |
| 2 | `20260807150000_create_library_catalog.sql` | Catálogo normalizado adicional; no requerido por la biblioteca antigua `library_resources` |
| 3 | `20260808130000_extend_blog_for_wordpress_import.sql` | Columnas que también necesita el formulario actual del blog |
| 4 | `20260808133000_make_blog_source_id_upsertable.sql` | Índice para importaciones WordPress |
| 5 | `20260826120000_create_admin_and_cde_activities.sql` | Usuarios Conecta y actividades |
| 6 | `20260906120000_create_conecta_prototype.sql` | Teléfono, CDE y almacenamiento privado Conecta |
| 7 | `20261002120000_create_cde_instagram_links.sql` | Instagram; sección pública retirada, no bloquea el inicio |
| 8 | `20261003120000_create_admin_users.sql` | Permisos del panel; tabla ya accesible en la revisión |
| 9 | `20261102120000_create_conecta_postcards.sql` | Tabla y bucket de postales; revisar porque no aparecen en la API consultada |
| 10 | `20261111120000_restrict_editorial_storage_writes.sql` | Elimina cuatro políticas antiguas de escritura demasiado amplia en archivos |
| 11 | `20261111123000_private_postcard_assets.sql` | Hace privado el bucket de postales, 2 MiB y JPEG/PNG/WebP |

### Para activar postales

1. Confirma primero que existen `conecta_users` y `public.set_updated_at()` y que están aplicadas sus dependencias (1, 5 y 6).
2. Comprueba por SQL si existe `conecta_postcards`. Si no existe, ejecuta **9**, completa, dentro de una transacción (`begin;` y `commit;`). Si existe parcialmente, detente y corrige específicamente lo faltante; no borres la tabla.
3. Ejecuta **11**, que ya incluye su transacción. Debe quedar `conecta-postcards.public = false`. No contiene borrado de fotos.
4. Mantén el código de esta revisión, que utiliza enlaces temporales de hasta diez minutos para las portadas, y nunca más que el tiempo de publicación restante. La portada pública se genera solo después de comprobar aprobación y vigencia. El panel sí puede ver imágenes pendientes para moderarlas.
5. La página de inicio se sirve por solicitud para no conservar en caché enlaces temporales ya vencidos. Las postales vencidas permanecen en la tabla; no se borran por cumplir 72 horas.
6. Si el SQL confirma que la tabla existe pero la API aún devuelve `PGRST205`, verifica esquema `public`, acceso a Data API y su caché antes de repetir migraciones. Un responsable puede recargar el esquema con `notify pgrst, 'reload schema';` una vez comprobada la causa.
7. Si otros entornos ya tenían ese bucket público, el cambio impide nuevos accesos públicos permanentes; no puede retirar copias previamente descargadas ni garantizar que desaparezcan inmediatamente de cachés externas.

### Para cerrar permisos de archivos

1. Revisa las políticas con la consulta del apartado 3.
2. Ejecuta **10** primero en ensayo. Elimina exclusivamente las políticas nombradas en ese archivo. No borra archivos, no modifica lecturas públicas y no desactiva RLS.
3. Prueba una subida desde el panel con permiso Blog. Debe funcionar por la ruta del servidor.
4. Una cuenta autenticada sin ese permiso no debe poder subir, reemplazar ni borrar archivos directamente con su sesión Supabase.
5. Si hay otras políticas de escritura añadidas manualmente, requieren revisión separada: la migración no las elimina de forma indiscriminada.
6. No reapliques después las migraciones antiguas 1 o 2 sin revisar: recrearían las políticas amplias.

## 5. Variables de la aplicación

Se configuran en Vercel, no pegándolas en SQL. Todas deben apuntar al mismo proyecto. Tras cambiarlas, haz un nuevo despliegue.

| Variable | Dónde y para qué |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública del proyecto; navegador y servidor |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publicable; requerida por el formulario de acceso |
| `SUPABASE_SECRET_KEY` | Secreto solo del servidor para operaciones autorizadas |
| `SUPABASE_SERVICE_ROLE_KEY` | Alternativa a la anterior; no hace falta tener ambas |
| `SUPABASE_URL` | Alternativa del servidor; si existe debe coincidir con la URL pública |
| `CONECTA_SESSION_SECRET` | Secreto aleatorio de al menos 32 caracteres para sesiones por teléfono; no reutilizar una contraseña |
| `RESEND_API_KEY` | Secreto del proveedor que envía avisos de postales |
| `POSTCARD_FROM_EMAIL` | Remitente de un dominio verificado en Resend |
| `POSTCARD_NOTIFICATION_EMAIL` | Destinatario; conservar `lestath@escultista.org` |

Nunca uses prefijo `NEXT_PUBLIC_` para secretos. No pongas cadenas vacías en lugar de variables ausentes. Una clave secret/service-role omite RLS: se utiliza exclusivamente en código de servidor con comprobación de permisos. [Claves Supabase](https://supabase.com/docs/guides/getting-started/api-keys).

La configuración local revisada tiene URL, clave publicable y secreto Supabase. **No tiene** `CONECTA_SESSION_SECRET`, `RESEND_API_KEY` ni `POSTCARD_FROM_EMAIL`. Esto no permite concluir que falten en Vercel: revísalas allí sin compartir sus valores.

## 6. Avisos por correo

1. En Resend, verifica un dominio propio y añade sus registros DNS exactamente como los indica el proveedor.
2. Configura las tres variables de correo anteriores en el alojamiento.
3. El destinatario debe ser el propietario. No cambies esa dirección por la del participante.
4. En ensayo, envía una postal controlada y verifica por separado: fila pendiente, portada visible para el moderador y correo recibido.
5. Si el proveedor falla, la postal se conserva y el panel puede revisarla. El mensaje de la aplicación informa que el aviso no se envió; no prueba que el correo llegó. Actualmente **no hay cola de reintentos automática**: la entrega garantizada requiere un trabajo posterior de cola y reintentos.

Configurar SMTP de Supabase Auth no configura este correo personalizado. El acceso por contraseña asignada no envía una invitación automática. [Verificación de dominios en Resend](https://resend.com/docs/dashboard/domains/introduction).

## 7. Crear y comprobar usuarios sin romper cuentas existentes

El único propietario con acceso total sigue siendo `lestath@escultista.org`. Los administradores normales usan **correo + contraseña**. Los participantes Conecta usan **teléfono + contraseña** y no son cuentas del panel.

1. En **Authentication → Users**, busca el correo propietario exacto. No recrees la cuenta si ya existe ni cambies su contraseña como prueba.
2. Entra en `/login` con ese correo. El propietario no necesita una fila en `admin_users`; los demás sí necesitan una fila activa con el mismo UUID de Auth.
3. En `/admin/usuarios`, escribe nombre, correo, contraseña y marca únicamente los permisos necesarios.
4. Si el correo ya existe, usa su tarjeta en la lista para actualizar permisos o asignar una contraseña nueva deliberadamente. El botón Crear ahora responde con un aviso y no restablece contraseñas existentes.
5. Si aparece un error después de crear una cuenta, revisa Auth y `admin_users` antes de repetir. Auth y la tabla de permisos son servicios separados: un fallo intermedio todavía puede dejar una cuenta sin permisos. La revisión previene la tabla ausente antes de crear, pero no promete una transacción distribuida.
6. Prueba iniciar sesión en una ventana sin la sesión del propietario. Debe usar el correo exacto; `escultista.org` no es `escultismo.org`.
7. No compartas contraseñas por chat/correo. El usuario introduce su contraseña personalmente en el sitio.

Consulta opcional, solo lectura:

```sql
begin read only;
select id, email, email_confirmed_at is not null as confirmado,
  coalesce(banned_until > now(), false) as bloqueado
from auth.users where lower(trim(email)) = 'lestath@escultista.org';
select a.email, a.is_active, a.can_manage_blog, a.can_manage_conecta,
  a.can_manage_activities, a.can_manage_instagram,
  u.id is not null as existe_auth, lower(a.email) = lower(u.email) as correo_coincide
from public.admin_users a left join auth.users u on u.id = a.id;
rollback;
```

Conserva estos resultados de forma privada; contienen datos de usuarios. No exportes hashes de contraseña.

## 8. Lista de aceptación en ensayo

- Crear cuenta nueva controlada; iniciar sesión y comprobar solo los permisos asignados.
- Desactivar esa cuenta y comprobar que las API administrativas rechazan acceso.
- Guardar borrador con foto; cerrar sesión; el artículo no debe aparecer públicamente. El bucket editorial sigue público: no subir imágenes confidenciales a borradores.
- Reabrir borrador, editar, publicar y volver a borrador; comprobar visibilidad sin sesión en cada paso.
- Conecta: enviar una postal; comprobar que aún no aparece en inicio ni tiene una URL pública permanente.
- Aprobar una sola vez; verificar 72 horas y rechazo de una segunda aprobación (409).
- Comprobar correo y portada por separado. Rechazar otra postal de prueba.
- Para retirar acceso conservando el archivo histórico, **desactivar** al participante. Su eliminación tiene borrado en cascada de sus postales en el esquema actual.
- Antes de ampliar Conecta al público, configurar un límite distribuido de intentos de acceso y envíos. No hay un proveedor de rate limiting validado en esta revisión.

El acceso OTP de prototipo está deshabilitado fuera del modo local explícito. No uses ese flujo para autenticar participantes reales.
