# Plan de mejora y automatización — Productos Patagónicos (con Cowork)

Objetivo: optimizar el funcionamiento del sitio actual, agregarle nuevas capacidades y
aprovechar al máximo Claude Pro con una rutina diaria automatizada en Cowork.

---

## 0. Estado actual (diagnóstico)

- Landing estática (`index.html`) desplegada en Vercel: catálogo de picadas
  (Tradicional, La Odisea, Simple, Mundialista, etc.) con modal de detalle.
- Conversión: botón de pedido directo por WhatsApp (`wa.me/542920347453`) y
  formulario de descuento reducido a solo email (Formspree).
- Medición: Google Analytics 4 (`G-42YBW61Q1Q`) con Google Signals activado.
- SEO: robots.txt, sitemap.xml, Open Graph/Twitter, schema.org, canonical al dominio
  de Vercel. Bitácora de SEO en `seo-log/` que se actualiza a diario.
- Imágenes de producto ya comprimidas (commit de optimización JPEG).
- Contenido estacional manual (tema Mundialista atado a fechas de partidos).

**Debilidades detectadas:** todo vive en un solo HTML de ~72 KB (difícil de mantener),
los precios se editan a mano dentro del HTML (ya hubo un error `%2000` → `$2000`),
la bitácora SEO es un Excel (Claude no puede leerlo/escribirlo fácil en cada sesión),
no hay lista de emails trabajada (el formulario junta emails pero nadie les escribe),
y no hay registro de pedidos ni stock.

---

## Fase 1 — Optimizar lo que ya existe (semana 1)

1. **Separar datos de presentación.** Mover el catálogo (nombres, precios, pesos,
   componentes, foto, disponibilidad) a un `productos.json` y que el HTML lo renderice.
   Beneficio: la rutina diaria puede actualizar precios/stock tocando un JSON chico
   en vez de editar 72 KB de HTML (menos tokens, menos riesgo de romper el diseño).
2. **Bitácora SEO en Markdown.** Reemplazar `seo-log/vitacora de SEO PP.xlsx` por
   `seo-log/bitacora.md`. Claude lo lee y escribe en forma nativa y queda versionado
   legible en GitHub.
3. **Performance.** Servir imágenes en WebP/AVIF con fallback JPEG, `loading="lazy"`
   en las tarjetas, y `preload` de la imagen del hero. Meta: LCP < 2.5 s en móvil.
4. **Medición de conversión.** Eventos GA4 explícitos: `click_whatsapp` (por producto),
   `abrir_modal`, `envio_email_descuento`. Sin esto no se puede saber qué picada vende.
5. **SEO local.** Schema.org `LocalBusiness` con dirección de Carmen de Patagones,
   perfil de Google Business Profile, y keywords locales ("picadas Carmen de Patagones",
   "embutidos artesanales Viedma/Patagones") en títulos y descripciones.

## Fase 2 — Agregar capacidades nuevas (semanas 2-3)

Aprovechando los conectores ya disponibles en Cowork:

1. **Email marketing (MailerLite).** Pasar los emails del formulario a un grupo de
   MailerLite y armar: (a) automatización de bienvenida con el cupón de descuento,
   (b) campaña semanal/quincenal con la picada destacada. Es la mejora de mayor
   retorno: hoy los emails captados no se usan.
2. **Pedidos y stock (Supabase).** Tabla `pedidos` y tabla `productos` (precio, stock,
   activo). El sitio lee disponibilidad desde ahí y el botón de WhatsApp puede
   pre-cargar el mensaje con el producto elegido. Permite mostrar "agotado" sin tocar código.
3. **Contenido estacional automatizado.** Generalizar lo que hoy es "Mundialista":
   un bloque de tema/promoción del día definido por datos (fecha, evento, banner),
   que la rutina diaria actualiza (partidos, feriados, fechas patrias, invierno/verano).
4. **Prueba social.** Sección de testimonios (capturas de WhatsApp de clientes) y
   galería de picadas entregadas — en un negocio artesanal esto convierte mucho.
5. **Imágenes y promos (creador de fotos/videos + Canva).** Generar banners de promo
   y variantes de fotos de producto para las campañas de email y redes.

## Fase 3 — Rutina diaria en Cowork (la tarea que corre 1 vez por día)

Diseñar **una sola rutina diaria** con un prompt fijo, acotado y barato en tokens:

1. Leer `productos.json` y `seo-log/bitacora.md`.
2. Verificar que el deploy de Vercel esté OK (último deployment sin error).
3. Actualizar el bloque estacional del día (si hay evento/partido/feriado).
4. Chequeos rápidos de salud: precios con formato `$X.XXX`, links de WhatsApp
   válidos, sitemap/canonical consistentes.
5. Registrar en la bitácora qué se hizo y una métrica del día (visitas GA4 si está
   disponible, suscriptores nuevos en MailerLite).
6. Commit + push (deploy automático en Vercel).

**Reglas para gastar poco límite de Pro:** prompt corto y estable, tocar solo archivos
chicos (JSON + bitácora), nada de regenerar el HTML completo, y dejar las tareas
grandes (rediseños, campañas nuevas) para sesiones manuales aparte.

## Fase 4 — Medir y mejorar (continuo)

- Revisar 1 vez por semana (sesión manual): GA4 (qué producto recibe más clicks de
  WhatsApp), crecimiento de la lista de emails, apertura de campañas MailerLite.
- Ajustar catálogo y promos según esos datos.
- Cuando haya volumen: dominio propio (`productospatagonicos.com.ar`) apuntado a
  Vercel, y evaluar carrito simple si WhatsApp queda chico.

---

## Modelo recomendado para la rutina diaria (descartando Fable 5)

**Recomendación: Sonnet** (Claude Sonnet, la versión actual que ofrezca el selector).

| Modelo | Veredicto para una rutina diaria en plan Pro |
|---|---|
| **Sonnet** ✅ | El equilibrio justo: sobra capacidad para editar JSON/HTML, escribir la bitácora y usar los conectores, y consume una fracción del límite de Pro comparado con Opus. Corriendo 1 vez al día no vas a sentir el gasto. |
| **Haiku** (alternativa) | Si la rutina queda bien acotada (solo actualizar precios/bloque del día y anotar bitácora), Haiku alcanza y es lo que menos límite consume. Probalo después de que la rutina esté estable con Sonnet. |
| **Opus** ❌ para la rutina | Consume el límite de Pro mucho más rápido y es excesivo para una tarea repetitiva de mantenimiento. Reservalo para sesiones puntuales: rediseño del sitio, armar la integración con Supabase/MailerLite por primera vez. |

**Estrategia combinada:** construir las fases 1-2 en sesiones manuales (ahí sí puede
valer Opus para lo complejo), y dejar la rutina diaria en **Sonnet**, bajando a
**Haiku** cuando esté probada. Así el límite de Pro rinde para las dos cosas.
