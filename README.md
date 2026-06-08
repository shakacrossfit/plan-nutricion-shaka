# Plan de Nutrición Shaka CrossFit — Landing page

Landing page estática (sin servidor, sin base de datos, sin login) para captar interesados
en el servicio **Plan de Nutrición Shaka CrossFit**. Hecha con HTML, CSS y un poco de
JavaScript. Rápida, responsive y fácil de editar.

---

## 1. Archivos del proyecto

```
PLAN DE NUTRICION SHAKA/
├── index.html      ← La página (estructura y textos)
├── styles.css      ← Diseño y colores
├── script.js       ← Menú móvil, animaciones suaves, año del footer
├── README.md       ← Este archivo
└── img/
    ├── logo.png              ← (Coloca aquí TU logo. Mientras no exista, se ve "SHAKA CROSSFIT" en texto)
    ├── hero-entreno.jpg      ← Foto de cabecera (entrenamiento)
    ├── comida-plan.jpg       ← Foto sección "Qué incluye"
    ├── compra-supermercado.jpg ← Foto sección "Supermercado / vida real"
    └── entreno-fuerza.jpg    ← Foto sección "Para quién es"
```

---

## 2. Cómo abrir la landing en local

- **Opción rápida:** haz doble clic en `index.html`. Se abre en tu navegador. ✅
- **Opción recomendada** (para verla como en producción, con un mini-servidor):
  - Con Python: abre la terminal en esta carpeta y ejecuta `python3 -m http.server 8000`,
    luego entra en `http://localhost:8000`.
  - O usa la extensión **Live Server** de VS Code.

> Las fotos están guardadas en `/img`, así que la página se ve bien aunque no tengas internet.

---

## 3. Dónde cambiar el enlace de PayPal (cuando esté listo)

Hoy hay un texto provisional: `PAYPAL_LINK_PENDIENTE`.

1. Abre `index.html`.
2. Busca `PAYPAL_LINK_PENDIENTE` (sección **Precio**).
3. Sustitúyelo por tu enlace real de PayPal, por ejemplo `https://paypal.me/tucuenta`.
4. En esa misma línea, **quita** `aria-disabled="true"` para activar el botón, y si quieres,
   cambia el texto del botón de `Pagar con PayPal (pronto)` a `Pagar con PayPal`.

---

## 4. Dónde cambiar textos, precio o formulario

Todo el contenido está en **`index.html`** (busca con `Ctrl/Cmd + F`):

| Quieres cambiar… | Busca esto en `index.html` |
|---|---|
| **Precio (60 €)** | `class="price-num"` (el número) y `60 €` en la línea de stats del hero |
| **Enlace del formulario** | `docs.google.com/forms` (aparece 4 veces: cabecera, hero, precio y CTA final) |
| **WhatsApp** | `wa.me/34697287928` (cámbialo en todos los sitios, incluido el botón flotante) |
| **Textos del hero** | sección `<!-- 1. HERO -->` |
| **Qué incluye / pasos / FAQ** | secciones comentadas `<!-- 4 -->`, `<!-- 5 -->`, `<!-- 8 -->` |
| **Dirección y email** | sección `<!-- 10. FOOTER -->` |
| **Colores de marca** | `styles.css`, bloque `:root` (variables `--accent`, `--bg`, etc.) |

> Consejo: el enlace del formulario está repetido en 4 botones. Si cambia, actualízalo en los 4.

### Cambiar las fotos por las reales
Sustituye los archivos dentro de `/img` **manteniendo el mismo nombre** (por ejemplo,
guarda tu foto del box como `hero-entreno.jpg`). No hace falta tocar el código.
Las fotos actuales son de stock (Unsplash) y sirven de marcador de posición.

### Poner tu logo
Guarda tu logo como `img/logo.png` (o `.svg` y ajusta la extensión en el `<img>` del header).
Si no hay logo, la página muestra automáticamente el texto "SHAKA CROSSFIT".

---

## 5. Recomendaciones para publicar y compartir

1. **Publicar gratis** (recomendado por su sencillez):
   - **Netlify Drop**: arrastra esta carpeta a https://app.netlify.com/drop y tienes una URL en segundos.
   - **GitHub Pages**, **Cloudflare Pages** o **Vercel** también valen (proyecto estático).
2. **Antes de publicar**, en `index.html` cambia `DOMINIO` (en las etiquetas Open Graph del `<head>`)
   por tu dominio real, para que al compartir por WhatsApp/Instagram salga la imagen de portada.
3. **Compartir en el box**: genera un **QR** que apunte a tu URL y ponlo en un cartel.
   En Instagram, añade el enlace en la bio o en stories.
4. **Mídelo (opcional)**: si quieres saber cuánta gente entra, añade Google Analytics o Plausible.
5. **Accesibilidad y velocidad** ya están cuidadas (contraste, navegación por teclado,
   imágenes con carga diferida). Si añades más fotos, optimízalas (formato WebP, ~150–300 KB).

---

Hecho para **Shaka CrossFit Madrid** · Paseo de los Melancólicos 11, 28005 Madrid · shakacrossfit@gmail.com
