/* Controlador general: cambio de pestañas y conexión de los formularios
 * con las funciones de productos.js / ventas.js / clientes.js / backup.js. */

document.addEventListener('DOMContentLoaded', () => {
  configurarTabs();
  configurarFormularioProducto();
  configurarFormularioVenta();
  configurarFormularioCliente();
  configurarBackup();

  document.getElementById('venta-fecha').value = new Date().toISOString().slice(0, 10);

  renderTodo();
});

function renderTodo() {
  Dashboard.render();
  renderTablaProductos();
  renderSelectProductos();
  renderTablaVentas();
  renderTablaClientes();
}

function configurarTabs() {
  const botones = document.querySelectorAll('.tab-btn');
  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      botones.forEach((b) => b.classList.remove('activo'));
      boton.classList.add('activo');

      document.querySelectorAll('.vista').forEach((v) => v.classList.remove('activa'));
      document.getElementById(`vista-${boton.dataset.tab}`).classList.add('activa');

      renderTodo();
    });
  });
}

/* --- Productos --- */

function configurarFormularioProducto() {
  const form = document.getElementById('form-producto');
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    Productos.guardar({
      id: document.getElementById('producto-id').value || null,
      nombre: document.getElementById('producto-nombre').value.trim(),
      categoria: document.getElementById('producto-categoria').value.trim(),
      precio: Number(document.getElementById('producto-precio').value),
      stock: Number(document.getElementById('producto-stock').value),
      notas: document.getElementById('producto-notas').value.trim()
    });
    form.reset();
    document.getElementById('producto-id').value = '';
    renderTodo();
  });

  document.getElementById('btn-cancelar-producto').addEventListener('click', () => {
    form.reset();
    document.getElementById('producto-id').value = '';
  });
}

function renderTablaProductos() {
  const cuerpo = document.getElementById('tabla-productos');
  const productos = Productos.listar();

  cuerpo.innerHTML = productos.map((p) => `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.categoria || '-'}</td>
      <td>${Dashboard.formatearMoneda(p.precio)}</td>
      <td class="${p.stock < 5 ? 'stock-critico' : ''}">${p.stock}</td>
      <td>${p.notas || '-'}</td>
      <td>
        <button class="btn-mini" onclick="editarProducto('${p.id}')">Editar</button>
        <button class="btn-mini" onclick="eliminarProducto('${p.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="6">Todavía no cargaste productos</td></tr>';
}

function editarProducto(id) {
  const p = Productos.buscarPorId(id);
  if (!p) return;
  document.getElementById('producto-id').value = p.id;
  document.getElementById('producto-nombre').value = p.nombre;
  document.getElementById('producto-categoria').value = p.categoria || '';
  document.getElementById('producto-precio').value = p.precio;
  document.getElementById('producto-stock').value = p.stock;
  document.getElementById('producto-notas').value = p.notas || '';
  document.querySelector('[data-tab="productos"]').click();
}

function eliminarProducto(id) {
  if (!confirm('¿Eliminar este producto del catálogo?')) return;
  Productos.eliminar(id);
  renderTodo();
}

/* --- Ventas --- */

function configurarFormularioVenta() {
  const form = document.getElementById('form-venta');
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const productoId = document.getElementById('venta-producto').value;
    if (!productoId) {
      alert('Cargá al menos un producto antes de registrar una venta.');
      return;
    }
    Ventas.registrar({
      productoId,
      cantidad: Number(document.getElementById('venta-cantidad').value),
      cliente: document.getElementById('venta-cliente').value.trim(),
      fecha: document.getElementById('venta-fecha').value
    });
    form.reset();
    document.getElementById('venta-fecha').value = new Date().toISOString().slice(0, 10);
    document.getElementById('venta-cantidad').value = 1;
    renderTodo();
  });
}

function renderSelectProductos() {
  const select = document.getElementById('venta-producto');
  const seleccionActual = select.value;
  select.innerHTML = Productos.listar().map((p) =>
    `<option value="${p.id}">${p.nombre} (stock: ${p.stock})</option>`
  ).join('') || '<option value="">Sin productos cargados</option>';
  select.value = seleccionActual;
}

function renderTablaVentas() {
  const cuerpo = document.getElementById('tabla-ventas');
  const ventas = Ventas.listar();

  cuerpo.innerHTML = ventas.map((v) => `
    <tr>
      <td>${v.fecha}</td>
      <td>${v.productoNombre}</td>
      <td>${v.cantidad}</td>
      <td>${Dashboard.formatearMoneda(v.precioUnitario)}</td>
      <td>${Dashboard.formatearMoneda(v.total)}</td>
      <td>${v.cliente}</td>
      <td><button class="btn-mini" onclick="eliminarVenta('${v.id}')">Eliminar</button></td>
    </tr>
  `).join('') || '<tr><td colspan="7">Todavía no hay ventas registradas</td></tr>';
}

function eliminarVenta(id) {
  if (!confirm('¿Eliminar esta venta del historial? (no repone el stock automáticamente)')) return;
  Ventas.eliminar(id);
  renderTodo();
}

/* --- Clientes --- */

function configurarFormularioCliente() {
  const form = document.getElementById('form-cliente');
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    Clientes.guardar({
      nombre: document.getElementById('cliente-nombre').value.trim(),
      contacto: document.getElementById('cliente-contacto').value.trim()
    });
    form.reset();
    renderTodo();
  });
}

function renderTablaClientes() {
  const cuerpo = document.getElementById('tabla-clientes');
  const clientes = Clientes.listar();

  cuerpo.innerHTML = clientes.map((c) => `
    <tr>
      <td>${c.nombre}</td>
      <td>${c.contacto || '-'}</td>
      <td>${c.compras}</td>
      <td>${Dashboard.formatearMoneda(c.totalGastado)}</td>
    </tr>
  `).join('') || '<tr><td colspan="4">Todavía no hay clientes cargados</td></tr>';
}

/* --- Backup --- */

function configurarBackup() {
  document.getElementById('btn-exportar').addEventListener('click', Backup.exportar);

  document.getElementById('input-importar').addEventListener('change', (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;
    Backup.importar(archivo, (error) => {
      const mensaje = document.getElementById('mensaje-backup');
      mensaje.textContent = error || 'Datos importados correctamente.';
      if (!error) renderTodo();
      evento.target.value = '';
    });
  });

  document.getElementById('btn-borrar-todo').addEventListener('click', () => {
    if (!confirm('Esto borra productos, ventas y clientes de este navegador. ¿Continuar?')) return;
    Backup.borrarTodo();
    renderTodo();
    document.getElementById('mensaje-backup').textContent = 'Se borraron todos los datos locales.';
  });
}
