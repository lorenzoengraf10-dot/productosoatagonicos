# Plan de mejora y ampliación — Productos Patagónicos (con Cowork) — v3

Objetivo: que la rutina diaria automatizada haga todo el trabajo del proyecto de
SEO y conversión — mantenimiento, implementación de mejoras nuevas y análisis —
sin sesiones manuales aparte. El costo en tokens no es un factor limitante: se
prioriza la calidad del trabajo y la autonomía de la tarea programada.

Actualizado: 11/07/2026. Reemplaza la v2 (que dividía el trabajo en fases
automáticas y sesiones manuales).

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
  métricas, reporte). Este plan la reemplaza por una versión ampliada (sección 2).
- **Gobernanza (se mantiene sin cambios):** errores técnicos se corrigen solos;
  cambios de diseño y de conversión siempre se proponen primero y esperan
  aprobación. Proyecto Mundialista pre-aprobado (se mantiene solo; se revierte si
  Argentina queda eliminada o después del 19/07/2026). Esta es la única frontera
  que sigue existiendo entre "se aplica solo" y "se propone" — ya no hay una
  frontera aparte entre "tarea diaria" y "sesión manual".
- **Decisiones cerradas que este plan respeta:** GA4 ID correcto, simple.html no
  prioritaria, canonical en Vercel, espejo sin redirect, form solo-email
  (commit b624e30), imágenes optimizadas ~36% (commit 4d732d2).

---

## 1. Qué hace la rutina diaria (única tarea, sin fases separadas)

La tarea programada "seo" pasa a ser la única superficie de trabajo del proyecto:
mantiene lo que ya existe, implementa las mejoras pendientes y analiza resultados,
todo en la misma corrida diaria. La única regla de alcance es la de gobernanza
(aplicar solo vs. proponer), no un límite de tokens o de tamaño de tarea.

**Memoria y bitácora**
- Leer `seo-log/estado.json` al empezar (hallazgos ya confirmados, propuestas
  pendientes de aprobación, último resultado del Mundial verificado, bloqueos ya
  avisados) para no repetir trabajo ni avisos.
- Mantener `seo-log/bitacora.md` (reemplaza `seo-log/vitacora de SEO PP.xlsx`, que
  queda congelado como histórico) con una fila por hallazgo/acción del día.
- Actualizar `estado.json` al final de cada corrida.

**Auditoría técnica y performance (auto-aplicable)**
- Revisar sitio en vivo (Vercel y espejo de GitHub Pages), Core Web Vitals,
  crawlability, enlaces rotos, sitemap.xml, robots.txt, meta tags, y que GA4 y los
  eventos personalizados sigan funcionando. Corregir errores técnicos directo.
- Servir las imágenes de producto en WebP con fallback JPEG y agregar
  `preload`/`fetchpriority="high"` a la imagen del hero. Meta: LCP < 2,5 s en móvil.

**Catálogo y SEO estructurado (implementación, no solo propuesta)**
- Migrar el catálogo (nombres, precios, porciones, componentes, disponibilidad) a
  `productos.json` y hacer que el HTML lo renderice, para que futuras actualizaciones
  de precio/stock no requieran tocar 72 KB de HTML.
- Agregar JSON-LD de `Product`/`Offer` por picada (nombre, precio ARS, imagen,
  disponibilidad) al schema existente (`FoodEstablishment`) → rich results en
  Google con precio visible.
- SEO local: keywords "picadas Carmen de Patagones", "embutidos artesanales
  Viedma/Patagones" en title/description, y dejar preparado el copy para un perfil
  de Google Business Profile.

**Conversión**
- Implementar y mantener al día la automatización de MailerLite: bienvenida con el
  cupón del 10% al registrarse, y campaña periódica con la picada destacada según
  las métricas del funnel.
- Preparar la sección de prueba social (testimonios de WhatsApp, galería de
  picadas entregadas) — queda como propuesta con vista previa en el reporte, porque
  es un cambio de diseño (gobernanza no cambia esto).
- Vigilancia del funnel: comparar `clic_whatsapp` y `registro_descuento` del día
  contra el promedio de 7 días y avisar si hay una caída mayor al 30%.

**Estacionalidad**
- Mundialista: buscar en la web si Argentina jugó desde la última corrida, actualizar
  rival/fecha o revertir el diseño si quedó eliminada o terminó el torneo — regla
  ya pre-aprobada, se aplica sola.
- Una vez generalizado el mecanismo estacional, detectar y proponer cualquier otra
  fecha relevante (feriados, Día del Amigo 20/07, invierno/verano) — como
  propuesta, salvo que el dueño la pre-apruebe igual que el Mundialista.

**Métricas y análisis**
- GA4 + Facebook + Instagram vía Supermetrics, respetando las reglas de agregación
  ya documentadas (foto/flujo/reach), nunca inventando datos.
- Análisis de qué picada convierte más (clics de WhatsApp por producto) integrado
  en el reporte, con una comparativa de 7 días los lunes.

**Reporte diario**
- Qué se corrigió/implementó (con link a los commits), estado del proyecto
  Mundialista, propuestas de diseño/conversión pendientes de aprobación, métricas
  reales, y recordatorios de bloqueos pendientes (una sola vez, no todos los días).
- Commit + push al final de cada corrida.

## 2. Roadmap de largo plazo

La rutina diaria lo va incorporando con el tiempo, a medida que el negocio lo
justifique — no requiere una fase aparte:

- Dominio propio (`productospatagonicos.com.ar`) apuntado a Vercel.
- Pedidos/stock en Supabase si el volumen hace que WhatsApp quede chico.
- Cada propuesta aplicada se registra en la bitácora con fecha, para poder medir su
  efecto sobre el % de cierre a lo largo del tiempo.

---

## 3. Modelo recomendado para la rutina diaria

**Recomendación: Opus.** El dueño confirmó que el consumo de tokens no es un
factor limitante — se prioriza la capacidad de razonamiento.

| Modelo | Veredicto |
|---|---|
| **Opus** ✅ (elegido) | Da el margen de razonamiento más grande para una rutina que ahora hace mucho más en una sola corrida: implementar `productos.json`, mantener la integración MailerLite, decidir bien sobre estacionalidad, y generar propuestas de diseño de calidad — todo en el mismo prompt, sin sesiones manuales de respaldo. |
| **Sonnet** (alternativa) | Sigue siendo válida si en el futuro se quiere volver a acotar el alcance de la rutina, pero no es la recomendación actual dado que no hay restricción de tokens. |
| **Haiku** ❌ | Insuficiente para el alcance ampliado de la rutina (implementación de funcionalidades, no solo mantenimiento). |
| **Fable 5** — descartado explícitamente por el dueño, no se reconsidera. |

**Siguiente paso:** actualizar el prompt y el modelo de la tarea programada "seo"
en Configuración → Tareas programadas, reemplazando los 7 pasos actuales por la
lista de la sección 1 de este documento.
