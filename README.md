# Cupido Digitttal

Landing page del estudio creativo Cupido Digitttal. Sitio estático con un Worker de Cloudflare Pages para el formulario.

## Sitio publicado

- [Abrir la página en Cloudflare Pages](https://cupido-digitttal.pages.dev/)
- [Ver el proyecto en Cloudflare](https://dash.cloudflare.com/3523de741e46113fc18e3e1dd118f1d2/pages/view/cupido-digitttal)

## Contenido

- Portada, presentación, servicios, proceso, publicaciones de Instagram, reproductor del álbum *Cupido* de TINI y contacto.
- Imágenes originales generadas para esta página y favicon SVG.
- Diseño adaptable a celular, navegación accesible y metadatos para buscadores.
- Mapa de Plaza España, Córdoba.

## Desarrollo

Los archivos fuente son HTML, CSS y JavaScript sin dependencias de ejecución. Para probar el sitio y el formulario localmente:

1. Crear `.dev.vars` con `CONTACT_RECIPIENT=<correo de destino>`.
2. Ejecutar `npm run build` y `npx wrangler pages dev dist`.
3. Abrir la dirección local que indique Wrangler.

En Cloudflare Pages, configurar `CONTACT_RECIPIENT` como variable de entorno de producción y vincular el espacio KV `CONTACT_LIMITS`. El Worker valida los datos y limita a dos intentos por IP durante un minuto. El formulario se envía a [FormSubmit](https://formsubmit.co/), cuyo buzón debe activarse desde el correo inicial. Cuando FormSubmit limita la salida de Cloudflare, el navegador reintenta directamente; en ese caso la dirección técnica de destino queda visible en `script.js`. La dirección gris mostrada en la página es la solicitada para el público. No se debe guardar `.dev.vars` en Git.

Las tarjetas enlazan a las tres publicaciones visibles en el perfil al crear el sitio y usan sus miniaturas originales. Las historias destacadas enlazan directamente a Instagram. Para actualizar publicaciones, modificar las tarjetas de `#instagram` en `index.html`. La sincronización automática requiere acceso autorizado a la API de Meta.

Las imágenes de portada, servicios y moodboard fueron creadas con IA como material visual inicial. Reemplazar `assets/hero.png`, `assets/branding.png` y `assets/contenido.png` por producción real cuando esté disponible. El reproductor usa el embed oficial de Spotify y requiere conexión a ese servicio.

## Publicación

Proyecto de Cloudflare Pages: `cupido-digitttal`. `npm run build` prepara `dist/` con los archivos públicos y `_worker.js`. Este último atiende el formulario y sirve los archivos estáticos; funciona con la carga directa de Cloudflare Pages. Para publicar, cargar el contenido de `dist/` o un ZIP de ese directorio.
