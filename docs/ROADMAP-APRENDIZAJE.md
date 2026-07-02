# Roadmap de aprendizaje — Productos Patagónicos como caso de estudio

Este documento resume el plan de trabajo: usar el emprendimiento real Productos
Patagónicos como vehículo para aprender desarrollo de software de forma autodidacta,
sin apuro y sin exponer el negocio ni a terceros mientras se aprende.

## Principio general

- Uso **interno**: el panel de gestión (`/gestion`) es una herramienta de trabajo
  propia, no un servicio que se ofrece a otras personas o negocios.
- Se avanza por fases. No se pasa a la siguiente sin haber usado la anterior con
  datos reales del negocio (probar, cambiar, registrar por qué).
- Cada cambio importante se anota en `CHANGELOG.md` (qué cambió y por qué) y las
  decisiones de arquitectura en `docs/DECISIONES.md`.
- Sin ansiedad: esto se trabaja en tiempos libres, no reemplaza el estudio.

## Fase 1 — Fundamentos: HTML, CSS y JavaScript (actual)

- [x] Panel de gestión interno en `/gestion`: productos, ventas, clientes, dashboard.
- [x] Persistencia simple con `localStorage` (sin backend todavía).
- [ ] Usar el panel con datos reales del negocio durante un tiempo prudencial.
- [ ] Anotar en el changelog qué resultó incómodo de usar (UX) y qué faltó.
- [ ] Iterar sobre el diseño y la usabilidad a partir de ese uso real, no de supuestos.

## Fase 2 — Backend real: PHP y base de datos

- [ ] Reescribir `gestion/js/db.js` para hablar con una API en vez de `localStorage`.
- [ ] Armar un backend simple en PHP con endpoints para productos, ventas y clientes.
- [ ] Pasar los datos a una base de datos real (MySQL/MariaDB o SQLite para empezar).
- [ ] Recién acá tiene sentido un login real (usuario/contraseña con hash, sesiones).

## Fase 3 — Dominio, DNS y CDN

- [ ] Página de pruebas simple (ver repo `informatica`) para practicar sin arriesgar
      el sitio del negocio: comprar o usar un dominio de prueba, apuntar DNS.
- [ ] Entender registros DNS (A, CNAME, MX) apuntando la página de pruebas.
- [ ] Publicar el sitio público de Productos Patagónicos detrás de un CDN.

## Fase 4 — Seguridad en capas y robustez

- [ ] HTTPS en todos los dominios.
- [ ] Firewall / reglas básicas (por ejemplo, un WAF de CDN).
- [ ] Caché (CDN y del propio backend) para performance.
- [ ] Copias de seguridad automáticas de la base de datos.
- [ ] Recién en esta etapa evaluar si el panel de gestión pasa a estar expuesto
      fuera de la red local, siempre con autenticación real.

## Proyectos paralelos de práctica (en el repo `informatica`)

- **Página de pruebas**: para romper cosas sin miedo y aprender HTML/CSS/JS/DOM.
- **Blog personal**: para practicar publicar contenido, estructura semántica y SEO.
- Ver `ROADMAP.md` y `BITACORA.md` del repo `informatica` para el detalle.

## Qué NO hacer todavía

- No ofrecer el panel de gestión ni ningún proyecto de prueba a terceros como servicio.
- No agregar autenticación "de mentira" en el cliente (da falsa sensación de
  seguridad).
- No saltar fases por ansiedad de "tenerlo ya listo": el objetivo es aprender
  organización, registro de cambios y buenas prácticas, no solo que funcione.
