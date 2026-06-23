/* ══════════════════════════════════════════════════════════════
   reservas.js
   JS exclusivo para las 6 páginas de reserva (reservas/*.html)
   No modifica ni depende de principal.js
══════════════════════════════════════════════════════════════ */

document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  let accion  = elemento.dataset.accion;
  let valor   = elemento.dataset.valor;

  /* ── Botón Volver: regresa a tutorias.html ── */
  if (accion === 'volver-paso') {
    evento.preventDefault();
    window.location.href = '../tutorias.html';
    return;
  }

  /* ── Pestañas de navegación (están en el encabezado de cada página de reserva) ── */
  if (accion === 'nav') {
    if (valor === 'inicio')        { window.location.href = '../menu.html';          return; }
    if (valor === 'horarios')      { window.location.href = '../horarios.html';      return; }
    if (valor === 'tutorias')      { window.location.href = '../tutorias.html';      return; }
    if (valor === 'foro')          { window.location.href = '../foro.html';          return; }
    if (valor === 'configuracion') { window.location.href = '../configuracion.html'; return; }
    return;
  }

  /* ── Botón Salir ── */
  if (accion === 'salir') {
    window.location.href = '../login.html';
    return;
  }

  /* ── Notificaciones ── */
  if (accion === 'notificaciones') {
    window.location.href = '../notificaciones.html';
    return;
  }

  /* ── Configuración (ícono del encabezado) ── */
  if (accion === 'configuracion') {
    window.location.href = '../configuracion.html';
    return;
  }

});
