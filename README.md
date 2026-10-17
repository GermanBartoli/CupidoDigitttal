# Cupido Digitttal

Landing page del estudio creativo Cupido Digitttal. Sitio estático con una función de Cloudflare Pages para el formulario.

## Contenido

- Portada, presentación, servicios, proceso, publicaciones de Instagram y contacto.
- Imágenes originales generadas para esta página y favicon SVG.
- Diseño adaptable a celular, navegación accesible y metadatos para buscadores.
- Mapa de Plaza España, Córdoba.

## Desarrollo

Los archivos `index.html`, `styles.css`, `script.js` y `assets/` no necesitan compilación. Para probar la función del formulario localmente:

1. Crear `.dev.vars` con `CONTACT_RECIPIENT=<correo de destino>`.
2. Ejecutar `npx wrangler pages dev .`.
3. Abrir la dirección local que indique Wrangler.

En Cloudflare Pages, configurar `CONTACT_RECIPIENT` como variable de entorno de producción. El formulario se envía desde la función a [FormSubmit](https://formsubmit.co/); ese servicio requiere confirmar el correo de destino desde el mensaje de activación inicial. La dirección visible en la página es independiente de la dirección real configurada en Cloudflare. No se debe guardar `.dev.vars` en Git.

Las tarjetas enlazan a las tres publicaciones visibles en el perfil al crear el sitio. Las imágenes de las tarjetas son ilustrativas, no miniaturas de Instagram. Las historias destacadas enlazan directamente a Instagram. Para actualizar publicaciones, modificar las tarjetas de `#instagram` en `index.html`. La sincronización automática requiere acceso autorizado a la API de Meta.

Las imágenes fueron creadas con IA como material visual inicial. Reemplazar `assets/hero.png`, `assets/branding.png` y `assets/contenido.png` por producción real cuando esté disponible.

## Publicación

Proyecto de Cloudflare Pages: `cupido-digitttal`. El directorio de salida es la raíz del repositorio. Las funciones de Pages se toman de `functions/`.
