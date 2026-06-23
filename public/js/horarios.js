/* ══════════════════════════════════════════════════════════════
   horarios.js
   JS exclusivo para las 6 páginas de horario (horarios/*.html)
   Estructura: html/horarios/horario-*.html → js está en html/js/
══════════════════════════════════════════════════════════════ */

document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  let accion = elemento.dataset.accion;
  let valor  = elemento.dataset.valor;

  /* ── Botón Volver: regresa a la página de día correspondiente ── */
  if (accion === 'volver-paso') {
    evento.preventDefault();
    window.history.back();
    return;
  }

  /* ── Seleccionar horario: por ahora muestra confirmación ── */
  if (accion === 'seleccionar-horario') {
    let dia  = elemento.dataset.dia  || '';
    let hora = elemento.dataset.hora || '';
    alert('Horario seleccionado:\n' + dia + ' — ' + hora + '\n\nPróximamente: paso 4 (ingreso de datos).');
    return;
  }

  /* ── Pestañas de navegación ── */
  if (accion === 'nav') {
    if (valor === 'inicio')        { window.location.href = '../../html/menu.html';          return; }
    if (valor === 'horarios')      { window.location.href = '../../html/horarios.html';      return; }
    if (valor === 'tutorias')      { window.location.href = '../../html/tutorias.html';      return; }
    if (valor === 'foro')          { window.location.href = '../../html/foro.html';          return; }
    if (valor === 'configuracion') { window.location.href = '../../html/configuracion.html'; return; }
    return;
  }

  /* ── Botón Salir ── */
  if (accion === 'salir') {
    window.location.href = '../../html/login.html';
    return;
  }

  /* ── Notificaciones ── */
  if (accion === 'notificaciones') {
    window.location.href = '../../html/notificaciones.html';
    return;
  }

  /* ── Configuración ── */
  if (accion === 'configuracion') {
    window.location.href = '../../html/configuracion.html';
    return;
  }

});
