/* CRUD de productos del catálogo interno. */

const Productos = (() => {
  function listar() {
    return DB.obtenerProductos();
  }

  function buscarPorId(id) {
    return listar().find((p) => p.id === id);
  }

  function guardar(datos) {
    const productos = listar();

    if (datos.id) {
      const indice = productos.findIndex((p) => p.id === datos.id);
      if (indice !== -1) {
        productos[indice] = { ...productos[indice], ...datos };
      }
    } else {
      productos.push({
        id: DB.generarId(),
        nombre: datos.nombre,
        categoria: datos.categoria,
        precio: datos.precio,
        stock: datos.stock,
        notas: datos.notas
      });
    }

    DB.guardarProductos(productos);
  }

  function eliminar(id) {
    const productos = listar().filter((p) => p.id !== id);
    DB.guardarProductos(productos);
  }

  function ajustarStock(id, cantidadVendida) {
    const productos = listar();
    const producto = productos.find((p) => p.id === id);
    if (producto) {
      producto.stock = Math.max(0, producto.stock - cantidadVendida);
      DB.guardarProductos(productos);
    }
  }

  function conStockBajo(umbral = 5) {
    return listar().filter((p) => p.stock < umbral);
  }

  return { listar, buscarPorId, guardar, eliminar, ajustarStock, conStockBajo };
})();
