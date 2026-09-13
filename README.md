# Invitación Digital

Invitación interactiva **100% estática** (HTML + CSS + JS). No necesita servidor, PHP ni base de datos: funciona abriendo `index.html` o publicada en **GitHub Pages**.

> Diseñada para móviles (360–430 px) y compatible con el navegador interno de WhatsApp.

## Estructura

```
/
├── index.html
├── css/invitacion.css
├── js/invitacion.js
├── assets/
│   ├── images/    (sobre, vestido, pin, coronas, divisores)
│   ├── music/     (coloca aquí tu canción: assets/music/cancion.mp3)
│   ├── icons/     (favicon)
│   └── fonts/     (fuentes autohospedadas + fonts.css)
└── README.md
```

## Personalizar los datos

Abre **`js/invitacion.js`** y edita el objeto `INVITACION` (un único lugar):

- `fechaEvento` → fecha/hora del evento en formato ISO (`"2026-10-03T19:00:00"`). La cuenta regresiva y el calendario se calculan solos.
- `maps` → pega la URL real de Google Maps. Mientras esté en `"PENDIENTE"`, el botón "Ver ubicación" mostrará un aviso.
- `musica` → ruta del archivo de sonido.
- Nombres, textos, recomendaciones y colores → se muestran automáticamente en toda la página.

## Música

1. Coloca tu canción en `assets/music/cancion.mp3` (opcional: cambia la ruta).
2. Al pulsar "Iniciar invitación" o el botón flotante, el navegador autoriza la reproducción (los móviles bloquean el autoplay, por eso siempre hay un toque del usuario).
3. Si el archivo no existe, la invitación funciona igual y muestra un aviso discreto.

## Recursos visuales (placeholders)

Las ilustraciones actuales son SVG elegantes hechos a mano. Para sustituirlas por fotos reales, simplemente reemplaza los archivos en `assets/images/` conservando el mismo nombre y ruta:

| Archivo                  | Se usa en             |
|--------------------------|-----------------------|
| `sobre.svg`               | Portada y "Sobres y regalos" |
| `vestido.svg`            | Código de vestimenta |
| `pin.svg`                | Lugar                 |
| `corona.svg`             | Portada y cierre      |
| `divisor.svg`            | Divisores dorados     |

Para que WhatsApp genere una vista previa con imagen, crea `assets/images/portada.png` (suele verse mejor una imagen de 1200×630) y actualiza la etiqueta `og:image` del `index.html`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube todo el proyecto (las rutas ya son relativas, no dependen de `localhost`).
2. En el repositorio: **Settings → Pages → Deploy from a branch → `main`**.
3. Tu invitación quedará en: `https://USUARIO.github.io/REPOSITORIO/`.
4. Opcional: actualiza `og:url` en `index.html` con esa URL.
5. Comparte el enlace por WhatsApp.

## Verificación rápida

- El contador y el calendario toman la fecha de `INVITACION.fechaEvento`.
- No hay scroll horizontal (el CSS usa `overflow-x: clip`).
- Las secciones aparecen con `IntersectionObserver`; si el usuario reduce el movimiento (`prefers-reduced-motion`), se muestran sin animación.