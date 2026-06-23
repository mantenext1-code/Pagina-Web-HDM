document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  let accion  = elemento.dataset.accion;
  let valor   = elemento.dataset.valor;

  if (accion === 'volver-paso') {
    evento.preventDefault();
    window.location.href = 'tutorias.html';
    return;
  }

  if (accion === 'nav') {
    if (valor === 'inicio')        { window.location.href = 'menu.html';          return; }
    if (valor === 'horarios')      { window.location.href = 'horarios.html';      return; }
    if (valor === 'tutorias')      { window.location.href = 'tutorias.html';      return; }
    if (valor === 'foro')          { window.location.href = 'foro.html';          return; }
    if (valor === 'configuracion') { window.location.href = 'configuracion.html'; return; }
    return;
  }

  if (accion === 'salir') {
    window.location.href = 'login.html';
    return;
  }

  if (accion === 'notificaciones') {
    window.location.href = 'notificaciones.html';
    return;
  }

  if (accion === 'configuracion') {
    window.location.href = 'configuracion.html';
    return;
  }

});
