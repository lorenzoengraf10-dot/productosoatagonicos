/* Clientes: se crean automáticamente al registrar una venta con nombre,
 * y también se pueden cargar a mano para guardar datos de contacto. */

const Clientes = (() => {
  function listar() {
    return DB.obtenerClientes();
  }

  function buscarPorNombre(nombre) {
    return listar().find((c) => c.nombre.toLowerCase() === nombre.toLowerCase());
  }

  function guardar({ nombre, contacto }) {
    const clientes = listar();
    const existente = buscarPorNombre(nombre);
    if (existente) {
      existente.contacto = contacto;
    } else {
      clientes.push({ id: DB.generarId(), nombre, contacto, compras: 0, totalGastado: 0 });
    }
    DB.guardarClientes(clientes);
  }

  function registrarCompra(nombre, monto) {
    if (!nombre) return;
    const clientes = listar();
    let cliente = clientes.find((c) => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (!cliente) {
      cliente = { id: DB.generarId(), nombre, contacto: '', compras: 0, totalGastado: 0 };
      clientes.push(cliente);
    }
    cliente.compras += 1;
    cliente.totalGastado += monto;
    DB.guardarClientes(clientes);
  }

  return { listar, buscarPorNombre, guardar, registrarCompra };
})();
