/*
 * Capa de datos del panel de gestión.
 * Fase 1 del proyecto: no hay servidor ni base de datos real todavía,
 * así que simulamos "tablas" con arrays guardados en localStorage.
 * El día que se migre a PHP + MySQL (Fase 2, ver docs/ROADMAP-APRENDIZAJE.md)
 * solo hay que reemplazar las funciones de este archivo por llamadas a una API;
 * el resto del código (productos.js, ventas.js, etc.) no debería cambiar.
 */

const DB = (() => {
  const CLAVES = {
    productos: 'pp_productos',
    ventas: 'pp_ventas',
    clientes: 'pp_clientes'
  };

  function leer(clave) {
    const crudo = localStorage.getItem(clave);
    return crudo ? JSON.parse(crudo) : [];
  }

  function escribir(clave, lista) {
    localStorage.setItem(clave, JSON.stringify(lista));
  }

  function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  return {
    CLAVES,
    generarId,

    obtenerProductos: () => leer(CLAVES.productos),
    guardarProductos: (lista) => escribir(CLAVES.productos, lista),

    obtenerVentas: () => leer(CLAVES.ventas),
    guardarVentas: (lista) => escribir(CLAVES.ventas, lista),

    obtenerClientes: () => leer(CLAVES.clientes),
    guardarClientes: (lista) => escribir(CLAVES.clientes, lista),

    exportarTodo() {
      return {
        version: 1,
        exportadoEl: new Date().toISOString(),
        productos: leer(CLAVES.productos),
        ventas: leer(CLAVES.ventas),
        clientes: leer(CLAVES.clientes)
      };
    },

    importarTodo(datos) {
      if (datos.productos) escribir(CLAVES.productos, datos.productos);
      if (datos.ventas) escribir(CLAVES.ventas, datos.ventas);
      if (datos.clientes) escribir(CLAVES.clientes, datos.clientes);
    },

    borrarTodo() {
      Object.values(CLAVES).forEach((clave) => localStorage.removeItem(clave));
    }
  };
})();
