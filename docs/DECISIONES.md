# Registro de decisiones de arquitectura

Formato breve: fecha, decisión, por qué, alternativas descartadas. Se agrega una
entrada nueva por cada decisión importante, no se reescriben las anteriores.

## 2026-07-02 — HTML/CSS/JS puro y localStorage para la Fase 1 del panel de gestión

**Decisión**: el panel de gestión (`/gestion`) se construyó sin frameworks ni
backend, usando `localStorage` como almacenamiento.

**Por qué**:
- Se puede publicar gratis con GitHub Pages, igual que el sitio público actual.
- Permite empezar a usar la herramienta con datos reales del negocio de inmediato,
  sin esperar a tener un servidor o base de datos.
- Es la base más simple para aprender bien HTML/CSS/JS y organización de código
  antes de sumar la complejidad de un backend.

**Alternativas descartadas**:
- PHP + MySQL desde el arranque: requiere hosting con PHP y una base de datos, más
  complejidad de entrada, y no aporta nada mientras se está aprendiendo lo básico.
- Un framework de JavaScript (React, Vue, etc.): agrega una capa de herramientas
  (build, dependencias) que no es necesaria para un panel interno de este tamaño y
  dificulta ver "qué hace cada línea", que es justamente el objetivo de esta etapa.

**Consecuencia aceptada**: los datos viven en el navegador de quien use el panel,
no se sincronizan entre dispositivos. Por eso existe la pestaña de copia de
seguridad (exportar/importar JSON). Se resuelve de raíz en la Fase 2 (backend real).

## 2026-07-02 — Sin autenticación en el panel de gestión

**Decisión**: el panel no pide usuario ni contraseña.

**Por qué**: es de uso interno y no se difunde el enlace. Una autenticación hecha
solo en JavaScript de cliente no protege nada real (el código es legible por
cualquiera), así que agregarla ahora daría una falsa sensación de seguridad sin
beneficio real.

**Cuándo se revisa**: en la Fase 2, cuando exista un backend, se agrega
autenticación real (usuario/contraseña con hash + sesiones del lado del servidor).
