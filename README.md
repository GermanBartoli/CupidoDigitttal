# Cupido Digitttal

**Sitio de un estudio creativo de Córdoba: servicios, proceso, trabajos, publicaciones y contacto.**

[![Repositorio](https://img.shields.io/badge/GitHub-GermanBartoli-181717?logo=github)](https://github.com/GermanBartoli/CupidoDigitttal)
[![Verificaciones](https://github.com/GermanBartoli/CupidoDigitttal/actions/workflows/cloudflare.yml/badge.svg)](https://github.com/GermanBartoli/CupidoDigitttal/actions/workflows/cloudflare.yml)

[Abrir sitio](https://cupido-digitttal.pages.dev/) · [Empezar](#primeros-pasos) · [Mapa del repositorio](#mapa-del-repositorio) · [Autoría](#autoría-de-esta-documentación)

![Vista del proyecto: Cupido Digitttal](docs/images/vista-actual.jpg)

*Captura de la página publicada, tomada el 9 de noviembre de 2026. Conservada sin redimensionar ni recomprimir.*

## Primeros pasos

1. Recorré Qué hacemos y Cómo trabajamos para conocer la propuesta.
2. Abrí Contenidos e Instagram para explorar diseños, carruseles y reels dentro del sitio.
3. Usá Hablemos o WhatsApp para preparar una consulta; el visitante decide cuándo enviar el mensaje.

## Enlaces

- [Sitio publicado en Cloudflare Pages](https://cupido-digitttal.pages.dev/)
- [Repositorio en GitHub](https://github.com/GermanBartoli/CupidoDigitttal)

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

Las tarjetas abren un visor dentro del sitio con los dos reels, su audio y la publicación de imagen. Cada visor conserva el enlace original de Instagram. Los videos se cargan al abrir la tarjeta y se detienen al cerrar. Las historias destacadas enlazan directamente a Instagram. Para actualizar publicaciones, modificar las tarjetas de `#instagram` en `index.html`. La sincronización automática requiere acceso autorizado a la API de Meta.

Las imágenes de portada, servicios y moodboard fueron creadas con IA como material visual inicial. Reemplazar `assets/hero.png`, `assets/branding.png` y `assets/contenido.png` por producción real cuando esté disponible. El reproductor usa el embed oficial de Spotify y requiere conexión a ese servicio.

## Publicación

Proyecto de Cloudflare Pages: `cupido-digitttal`. `npm run build` prepara `dist/` con los archivos públicos y `_worker.js`. Este último atiende el formulario y sirve los archivos estáticos; funciona con la carga directa de Cloudflare Pages. Para publicar, cargar el contenido de `dist/` o un ZIP de ese directorio.

Cada push a `main` ejecuta `.github/workflows/cloudflare.yml`: verifica las pruebas y la sintaxis, compila el sitio y publica en el proyecto existente. El flujo utiliza los secretos de GitHub Actions `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`; también admite ejecución manual. Sitio: https://cupido-digitttal.pages.dev/.

## Historia, contenidos y WhatsApp

La presentación explica la referencia al álbum Cupido (16 de febrero de 2023) y las tres T de La Triple T. La sección de contenidos muestra dos diseños y las tres versiones de los boletos de Almacén La Paz, con navegación por flechas, teclado y gesto táctil, además del PDF original. Los archivos están en assets/trabajos/.

La sección de WhatsApp y el botón flotante apuntan al 5493518794427 e incluyen un mensaje personalizado. Abrir el enlace prepara el mensaje; el visitante decide cuándo enviarlo.

## Mapa del repositorio

- [package.json](<package.json>)
- [index.html](<index.html>)
- [docs/PUBLICACION.md](<docs/PUBLICACION.md>)

## Autoría de esta documentación

Repositorio mantenido por [Germán Bartoli](https://github.com/GermanBartoli). Guía revisada y actualizada con **Codex**, coautor de esta actualización documental. Los autores, colaboradores, licencias y recursos de terceros conservan sus créditos originales.

Los commits de esta revisión incluyen `Co-authored-by: Codex <noreply@openai.com>`; esta atribución no modifica la autoría del historial anterior.

<!-- firma-german-bartoli -->
<p align="center">
  <a href="https://germanbartoli.pages.dev/">
    <img src="docs/autor/german-bartoli.webp" alt="German Bartoli — Developer" width="96" height="96" /><br />
    Hecho por Germán Bartoli · Ver portfolio
  </a>
</p>
