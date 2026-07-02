/* Cálculo y render de las métricas del dashboard. */

const Dashboard = (() => {
  function formatearMoneda(numero) {
    return '$' + numero.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function render() {
    const productos = Productos.listar();
    const ventas = Ventas.listar();

    const tarjetas = document.getElementById('tarjetas-metricas');
    tarjetas.innerHTML = `
      <div class="tarjeta">
        <div class="valor">${productos.length}</div>
        <div class="etiqueta">Productos en catálogo</div>
      </div>
      <div class="tarjeta">
        <div class="valor">${ventas.length}</div>
        <div class="etiqueta">Ventas registradas</div>
      </div>
      <div class="tarjeta">
        <div class="valor">${formatearMoneda(Ventas.totalIngresos())}</div>
        <div class="etiqueta">Ingresos totales</div>
      </div>
      <div class="tarjeta">
        <div class="valor">${Clientes.listar().length}</div>
        <div class="etiqueta">Clientes</div>
      </div>
    `;

    const top = Ventas.productoMasVendido();
    document.getElementById('producto-top').textContent = top
      ? `${top.nombre} (${top.unidades} unidades vendidas)`
      : 'Todavía no hay ventas cargadas';

    const stockBajo = Productos.conStockBajo(5);
    const listaStock = document.getElementById('lista-stock-bajo');
    listaStock.innerHTML = stockBajo.length
      ? stockBajo.map((p) => `<li class="stock-critico">${p.nombre}: ${p.stock} unidades</li>`).join('')
      : '<li>Todo el stock está en niveles normales</li>';

    const cuerpoUltimasVentas = document.getElementById('tabla-ultimas-ventas');
    cuerpoUltimasVentas.innerHTML = ventas.slice(0, 5).map((v) => `
      <tr>
        <td>${v.fecha}</td>
        <td>${v.productoNombre}</td>
        <td>${v.cantidad}</td>
        <td>${formatearMoneda(v.total)}</td>
        <td>${v.cliente}</td>
      </tr>
    `).join('') || '<tr><td colspan="5">Sin ventas todavía</td></tr>';
  }

  return { render, formatearMoneda };
})();
