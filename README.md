# Wayne's Barbershop · Neón Lounge (versión A)

Este repo abre en la versión A (Neón Lounge). La versión B está en [waynebarbershop_clasica](https://github.com/DarylValverdeMora/waynebarbershop_clasica); el código es el mismo, solo cambia `VITE_DEFAULT_VARIANT`.

Landing de una sola página para Wayne's Barbershop (Turrialba). Vite + React + TypeScript + Tailwind v4, con GSAP y Lenis. Build estática, lista para Vercel.

## Correrlo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ para revisar la build
```

## Secciones (en orden)

1. Inicio · 2. Servicios · 3. Horario · 4. Barberos · 5. Wayne's Shop · 6. Trabajos (cortes + fotos del local) · 7. Reseñas · 8. Ubicación, y después el CTA final y el footer.

La galería del local es un carrusel con flechas y deslizar táctil; no fija ni secuestra el scroll de la página.

## Las dos versiones

- `?v=a` → A · Neón Lounge (oscura, azul eléctrico, línea LED).
- `?v=b` → B · Clásica premium (editorial, papel y negro, diagonales de navaja).
- `?present=1` muestra el panel para cambiar entre las dos (también con las teclas 1 y 2).
  Ejemplo para la reunión: `/?present=1&v=a`.

Sin `?present=1` el panel no existe. Al elegir una versión, se borra la otra carpeta de `src/variants/` y sus ramas en los componentes.

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Nombre, slogan, WhatsApp, Instagram, mapa | `src/data/business.ts` |
| Horario y regla del domingo | `src/data/schedule.ts` |
| Servicios y precios | `src/data/services.ts` |
| Wayne's Shop | `src/data/products.ts` |
| Fotos (todas) | `src/data/images.ts` → archivos en `src/assets/capturas/` |
| Equipo / reseñas | `src/data/team.ts`, `src/data/reviews.ts` |
| Colores y fuentes | `src/variants/neon/tokens.css`, `src/variants/clasica/tokens.css` |

Para cambiar una foto por la versión en alta resolución, reemplazá el archivo en `src/assets/capturas/` con el mismo nombre.

## Citas

Todos los botones de "agendar" pasan por `src/lib/booking.ts`. Hoy abren WhatsApp con un mensaje prellenado; los domingos (orden de llegada) llevan a la ubicación. Para el sistema propio: agregar el caso `internal` y poner `VITE_BOOKING_MODE=internal`.

## Pendientes

Buscá `[PLACEHOLDER]` en el código. Hoy quedan: confirmar WhatsApp, dirección con señas, precios del aceite Tec.co, si siguen a la venta Sport, Menta y Minoxidil, año de apertura, equipo, reseñas, fotos originales y dominio (la imagen de Open Graph necesita URL absoluta cuando haya dominio).

## Control de calidad (etapa 3, 5 nov. 2026)

Lighthouse 13.6 sobre la build (`npm run preview`), sin caché:

| Versión | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A · Neón | Móvil | 100 | 100 | 100 | 100 | 0,8 s | 0 |
| A · Neón | Escritorio | 100 | 100 | 100 | 100 | 0,6 s | 0 |
| B · Clásica | Móvil | 99 | 100 | 100 | 100 | 0,8 s | 0,001 |
| B · Clásica | Escritorio | 100 | 100 | 100 | 100 | 0,2 s | 0,001 |

- axe-core (WCAG 2.1 AA + buenas prácticas): 0 problemas en las dos versiones, a 390 y 1440 px.
- Teclado: enlace "Saltar al contenido", foco visible en todo, el menú móvil cierra con Escape y el selector de tamaño cambia el precio y el mensaje con las flechas.
- Sin scroll horizontal en 390, 768 y 1440 px; sin errores en la consola.
- SEO: `lang="es-CR"`, meta descripción, Open Graph y datos estructurados `BarberShop` (horario, coordenadas, Instagram).

Pendiente para cuando lleguen las fotos originales: generar varios tamaños (`srcset`) de las fotos de productos y del local. Con las capturas actuales el ahorro es mínimo.

## Seguridad y privacidad (etapa 4, 5 nov. 2026)

- `npm audit`: 0 vulnerabilidades. No hay API keys ni secretos en el código; `.env` está en `.gitignore`.
- Cabeceras en `vercel.json`: Content-Security-Policy estricta (solo recursos del propio dominio, sin scripts ni estilos inline; único tercero permitido: el iframe de `www.google.com` para el mapa), HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, COOP y Permissions-Policy.
- `npm run preview` aplica las mismas cabeceras (menos HSTS) para probar la CSP en local. Probado en las dos versiones: 0 violaciones.
- Si agregás un script, estilo o servicio externo (analítica, un widget de reseñas, el sistema de citas), hay que sumarlo a la CSP o el navegador lo bloquea.
- El script que fija la versión antes del primer pintado vive en `public/variant.js` para no necesitar `'unsafe-inline'`.
- Todos los enlaces externos abren con `rel="noopener noreferrer"`.
- No hay formularios. Cuando llegue el sistema de citas: validación en el servidor, anti-spam (Turnstile u honeypot) y actualizar el aviso de privacidad.
- Privacidad (Ley 8968): el sitio no usa cookies propias ni analítica. El mapa de Google se carga solo si el visitante toca "Mostrar mapa". El footer tiene un aviso de privacidad corto.
- Fotos: Daryl confirmó el 4 nov. 2026 que hay autorización de los padres para las fotos de menores y permiso para usar las fotos del Instagram del negocio.
