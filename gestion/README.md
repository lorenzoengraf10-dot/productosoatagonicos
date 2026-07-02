# Panel de gestión interna — Productos Patagónicos

Esta carpeta es una aplicación **de uso interno** para administrar el emprendimiento
Productos Patagónicos: catálogo de productos, registro de ventas, clientes y métricas
básicas del negocio. No es un producto para vender ni ofrecer a terceros; es la
herramienta de trabajo diario del dueño del emprendimiento y, al mismo tiempo, un
proyecto real para aprender desarrollo de software de punta a punta.

## Cómo usarla

Abrí `gestion/index.html` en el navegador (localmente o publicado con GitHub Pages).
No requiere instalación ni servidor.

1. **Productos**: cargá el catálogo (nombre, categoría, precio, stock).
2. **Ventas**: registrá cada venta eligiendo el producto y la cantidad. El stock se
   descuenta solo y se guarda el precio unitario de ese momento.
3. **Clientes**: se crean automáticamente al cargar una venta con nombre de cliente,
   o se pueden cargar a mano.
4. **Dashboard**: ingresos totales, producto más vendido, alertas de stock bajo.
5. **Copia de seguridad**: exportá los datos a un `.json` seguido. Es la única forma
   de no perder información, porque todo se guarda en el navegador (ver más abajo).

## Cómo está armada (para quien la vaya a modificar)

```
gestion/
  index.html         estructura de la página, un <section> por pestaña
  css/estilo.css      estilos, reutiliza la paleta de colores del sitio público
  js/db.js            capa de datos (hoy: localStorage a modo de "base de datos")
  js/productos.js      lógica de catálogo (alta, baja, modificación, stock)
  js/ventas.js         lógica de ventas y cálculo de ingresos
  js/clientes.js       lógica de clientes
  js/dashboard.js      cálculo y render de métricas
  js/backup.js         exportar/importar todo en JSON
  js/app.js            conecta los formularios y las pestañas con la lógica anterior
```

Cada archivo de `js/` tiene una sola responsabilidad a propósito, para que sea fácil
encontrar qué tocar cuando algo cambie (por ejemplo, si el día de mañana `db.js` pasa
a llamar a una API en lugar de usar `localStorage`, el resto de los archivos no debería
cambiar).

## Por qué no tiene servidor ni base de datos todavía

Esta es la **Fase 1** del proyecto (ver `docs/ROADMAP-APRENDIZAJE.md` en la raíz del
repositorio): HTML, CSS y JavaScript puros, sin backend, para poder publicarlo gratis
con GitHub Pages y empezar a usarlo ya con datos reales del negocio. Migrar a PHP y una
base de datos de verdad es un paso posterior, deliberado, cuando ya haya práctica sólida
con lo básico.

## Seguridad: qué falta y por qué es esperable

Este panel **no tiene autenticación real**. Cualquiera con el enlace puede verlo y
modificar los datos guardados en su propio navegador. Es aceptable porque:

- Es de uso interno, no se difunde el enlace públicamente.
- No hay backend ni base de datos compartida expuesta: cada usuario solo ve y edita
  los datos guardados en su propio navegador, no los del dueño real del negocio.
- Se registra como pendiente en `docs/ROADMAP-APRENDIZAJE.md`, dentro de la etapa de
  "seguridad en capas" (autenticación, backend, HTTPS, luego CDN/DNS/firewall/caché).

No agregar un login "de mentira" en el cliente: daría una falsa sensación de seguridad
sin proteger nada real, porque cualquiera puede leer el código JavaScript del navegador.
