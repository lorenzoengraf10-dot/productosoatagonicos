# Plan de mejora y ampliación — Productos Patagónicos (con Cowork) — v2

Objetivo: optimizar el funcionamiento del proyecto de SEO y conversión tal como está
configurado hoy, agregarle capacidades nuevas y aprovechar al máximo el límite de uso
de Claude Pro con la rutina diaria automatizada.

Actualizado: 11/07/2026. Reemplaza la versión anterior de este plan, que quedó
desactualizada respecto al estado real del proyecto.

---

## 0. Estado actual (base sobre la que se construye)

- **Sitio en vivo:** landing estática (`index.html`, ~72 KB) en Vercel
  (https://productosoatagonicos.vercel.app/ — dominio principal y canonical).
  GitHub Pages queda como espejo sin redirect (decisión cerrada 11/07/2026).
- **Conversión:** botón de pedido por WhatsApp (`wa.me/542920347453`) por producto y
  formulario de descuento 10% reducido a solo email (Formspree). Tasa de cierre
  actual: 35% — el objetivo del proyecto es subirla.
- **Medición:** GA4 `G-42YBW61Q1Q` con eventos `clic_whatsapp`, `generate_lead`,
  `registro_descuento`, `clic_producto`, `scroll_profundidad`.
- **Conectores (Supermetrics MCP):** GA4 (GAWA, cuenta 544249431 "producpat"),
  Facebook Insights (FB, página 1050949004765810), Instagram Insights (IGI, perfil
  17841472757597306). Reglas de agregación documentadas: métricas "foto" no se suman
  por rango de fechas; "reach" viene deduplicado; métricas de flujo sí se suman.
- **Rutina diaria "seo":** corre todos los días a las 8am con 7 pasos (auditoría
  técnica, conversión, estacionalidad, propuestas de diseño, bitácora Excel,
  métricas, reporte).
- **Gobernanza:** errores técnicos se corrigen solos; cambios de diseño y de
  conversión siempre se proponen primero. Proyecto Mundialista pre-aprobado
  (se mantiene solo; se revierte si Argentina queda eliminada o después del 19/07/2026).
- **Decisiones cerradas que este plan respeta:** GA4 ID correcto, simple.html no
  prioritaria, canonical en Vercel, espejo sin redirect, form solo-email
  (commit b624e30), imágenes optimizadas ~36% (commit 4d732d2).

---

## Fase 1 — Optimizar lo que ya corre (bajo esfuerzo, alto retorno)

Estas mejoras hacen que cada corrida diaria sea más barata en tokens y más confiable.

1. **Bitácora en Markdown.** Migrar `seo-log/vitacora de SEO PP.xlsx` a
   `seo-log/bitacora.md`. El Excel exige herramientas extra y más tokens en cada
   corrida; un `.md` se lee y escribe en forma nativa y queda legible y versionado
   en GitHub. El `.xlsx` se conserva congelado como histórico.
2. **Archivo de estado/memoria** (`seo-log/estado.json`). Guarda: hallazgos ya
   confirmados (para no repetirlos), propuestas pendientes de aprobación, último
   resultado del Mundial verificado, y bloqueos ya avisados (para avisar una sola
   vez). La rutina lo lee al empezar y lo actualiza al terminar. Es la mejora que
   más límite de Pro ahorra por corrida.
3. **Separar catálogo de presentación.** Mover nombres, precios, porciones,
   componentes y disponibilidad a un `productos.json` que el HTML renderice. Los
   precios se actualizan tocando un JSON chico en vez de editar 72 KB de HTML
   (menos tokens, menos riesgo de romper el diseño). *Requiere aprobación del dueño:
   es un cambio estructural, no un bug.*
4. **Performance (auto-aplicable por gobernanza).** Servir las 8 imágenes en WebP
   con fallback JPEG y agregar `preload`/`fetchpriority="high"` a la imagen del
   hero. Meta: LCP < 2,5 s en móvil.
5. **Reporte diario más barato.** Plantilla fija de reporte; métricas "foto"
   (seguidores) siempre con desglose por fecha tomando el valor más reciente
   (regla ya documentada); comparativa de 7 días solo los lunes.

## Fase 2 — Capacidades nuevas (priorizadas por impacto en el % de cierre)

1. **Email marketing (MailerLite, conector ya disponible).** Hoy los emails del
   formulario de 10% no se usan. Armar: (a) automatización de bienvenida que entrega
   el cupón, (b) campaña quincenal con la picada destacada. Es la mejora de mayor
   retorno directo sobre el cierre.
2. **JSON-LD de productos (auto-aplicable, SEO técnico).** Agregar `Product`/`Offer`
   por picada (nombre, precio en ARS, imagen, disponibilidad) al schema existente
   (`FoodEstablishment` en `index.html`) → rich results en Google con precio visible.
3. **SEO local + Google Business Profile.** Keywords "picadas Carmen de Patagones",
   "embutidos artesanales Viedma/Patagones" en title/description, y perfil de
   Google Business Profile. Es donde busca el cliente real de la zona.
4. **Bloque estacional generalizado (propuesta).** El mecanismo Mundialista muere el
   19/07/2026. Convertirlo en un bloque de promo por fecha definido por datos
   (feriados, Día del Amigo 20/07, invierno/verano) que la rutina actualiza —
   siempre como propuesta, según gobernanza.
5. **Prueba social (propuesta de diseño).** Sección de testimonios (capturas de
   WhatsApp de clientes) y galería de picadas entregadas — en un negocio artesanal
   esto convierte mucho.
6. **Vigilancia del funnel con alertas.** La rutina compara `clic_whatsapp` y
   `registro_descuento` del día contra el promedio de 7 días y solo alerta si hay
   una caída mayor al 30% (señal accionable, no ruido diario).
7. **Más adelante (cuando haya volumen):** dominio propio
   (`productospatagonicos.com.ar`) apuntado a Vercel, y pedidos/stock en Supabase
   si WhatsApp queda chico.

## Fase 3 — Rediseño de la rutina diaria (misma tarea "seo", prompt actualizado)

Orden de cada corrida:

1. Leer `seo-log/estado.json` (memoria de corridas anteriores).
2. Auditoría técnica **solo de diferencias** contra el estado conocido (sitio en
   vivo, sitemap, robots, meta tags, tracking GA4). Auto-fix de errores técnicos.
3. Mundialista/estacional: verificar en la web si Argentina jugó; actualizar rival
   y fecha, o revertir el diseño si quedó eliminada o terminó el Mundial.
4. Métricas con plantilla fija (GA4 + FB + IG vía Supermetrics, respetando las
   reglas foto/flujo/reach). Chequeo de alerta de funnel (caída >30%).
5. Registrar en `seo-log/bitacora.md` (sin repetir hallazgos ya confirmados).
6. Reporte en el chat: qué se corrigió (link al commit), estado Mundialista,
   propuestas pendientes, métricas, bloqueos (una sola vez).
7. Actualizar `estado.json` y hacer commit + push.

**Regla de presupuesto:** la corrida diaria toca solo archivos chicos (JSON +
bitácora + parches puntuales al HTML). Los trabajos grandes — rediseños, la
migración a `productos.json`, la integración MailerLite — se hacen en sesiones
manuales aparte, no dentro de la rutina.

## Fase 4 — Medir y mejorar (continuo)

- Sesión manual semanal: qué picada recibe más `clic_whatsapp`, crecimiento de la
  lista de emails, apertura de campañas MailerLite. Ajustar catálogo y promos según
  esos datos.
- Cada propuesta aplicada se registra en la bitácora con fecha, para poder medir su
  efecto sobre el % de cierre.

---

## Modelo recomendado para la rutina diaria (Fable 5 descartado)

**Recomendación: Sonnet** (la versión actual que ofrezca el selector de Cowork).

| Modelo | Veredicto para una rutina diaria en plan Pro |
|---|---|
| **Sonnet** ✅ | Capacidad de sobra para la auditoría multi-paso, las consultas Supermetrics con sus reglas de agregación, las ediciones de HTML/JSON y la búsqueda web del Mundial. En plan Pro lo que importa es el consumo del límite de uso, y Sonnet gasta una fracción de lo que gasta Opus por corrida: corriendo 1 vez al día no compromete el resto del uso. |
| **Haiku** (opcional, después) | Recién cuando la rutina esté estable y bien acotada (estado.json + bitácora.md + plantillas fijas). Riesgo hoy: es el más débil para razonar las reglas de métricas (foto vs. flujo) y para decidir correctamente sobre el Mundialista. |
| **Opus** ❌ para la rutina | Excesivo para mantenimiento repetitivo y agota el límite de Pro mucho más rápido. Reservarlo para sesiones manuales puntuales: implementar `productos.json`, armar la integración con MailerLite, rediseños. |

**Estrategia combinada:** rutina diaria en **Sonnet**; las fases de construcción
(1 y 2) en sesiones manuales, usando Opus solo si la tarea lo amerita; evaluar bajar
la rutina a **Haiku** cuando lleve 2+ semanas estable sin errores. Así el límite de
Pro rinde para las dos cosas.
