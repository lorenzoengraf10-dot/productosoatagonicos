/* Registro de ventas: cada venta guarda una copia del precio unitario
 * del producto en ese momento, para que un cambio de precio futuro no
 * altere el historial de ventas ya cargadas. */

const Ventas = (() => {
  function listar() {
    return DB.obtenerVentas().sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  function registrar({ productoId, cantidad, cliente, fecha }) {
    const producto = Productos.buscarPorId(productoId);
    if (!producto) throw new Error('Producto inexistente');

    const ventas = DB.obtenerVentas();
    ventas.push({
      id: DB.generarId(),
      productoId,
      productoNombre: producto.nombre,
      cantidad,
      precioUnitario: producto.precio,
      total: producto.precio * cantidad,
      cliente: cliente || 'Consumidor final',
      fecha
    });
    DB.guardarVentas(ventas);
    Productos.ajustarStock(productoId, cantidad);
    Clientes.registrarCompra(cliente, producto.precio * cantidad);
  }

  function eliminar(id) {
    const ventas = DB.obtenerVentas().filter((v) => v.id !== id);
    DB.guardarVentas(ventas);
  }

  function totalIngresos() {
    return DB.obtenerVentas().reduce((acc, v) => acc + v.total, 0);
  }

  function productoMasVendido() {
    const conteo = {};
    DB.obtenerVentas().forEach((v) => {
      conteo[v.productoNombre] = (conteo[v.productoNombre] || 0) + v.cantidad;
    });
    const entradas = Object.entries(conteo);
    if (entradas.length === 0) return null;
    entradas.sort((a, b) => b[1] - a[1]);
    return { nombre: entradas[0][0], unidades: entradas[0][1] };
  }

  return { listar, registrar, eliminar, totalIngresos, productoMasVendido };
})();
