/* Exportar/importar todos los datos como JSON, para no depender
 * únicamente del localStorage de un solo navegador. */

const Backup = (() => {
  function exportar() {
    const datos = DB.exportarTodo();
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    const fecha = new Date().toISOString().slice(0, 10);
    enlace.href = url;
    enlace.download = `productos-patagonicos-backup-${fecha}.json`;
    enlace.click();
    URL.revokeObjectURL(url);
  }

  function importar(archivo, alTerminar) {
    const lector = new FileReader();
    lector.onload = () => {
      try {
        const datos = JSON.parse(lector.result);
        DB.importarTodo(datos);
        alTerminar(null);
      } catch (error) {
        alTerminar('El archivo no es un backup válido.');
      }
    };
    lector.readAsText(archivo);
  }

  function borrarTodo() {
    DB.borrarTodo();
  }

  return { exportar, importar, borrarTodo };
})();
