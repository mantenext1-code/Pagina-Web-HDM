/*
 * ════════════════════════════════════════════════════════════════
 * principal.js — Lógica JavaScript centralizada del proyecto
 *               "Centro de Tutorías — Portal Estudiantil"
 *
 * Cubre: login.html, registro.html, menu.html, horarios.html,
 *        tutorias.html, notificaciones.html
 *
 * Técnica: Vanilla JS clásico (sin módulos, sin import/export)
 *          para garantizar funcionamiento en file:// local.
 *          Delegación de eventos en document: un solo listener
 *          maneja todos los clics filtrando por data-accion.
 *
 * CAMBIOS RESPECTO A LA VERSIÓN ANTERIOR:
 *   1. inicializarFormularioAcceso()  → redirige a menu.html tras el éxito
 *   2. inicializarFormularioRegistro() → redirige a login.html tras el éxito
 *   3. Acción 'notificaciones'        → redirige a notificaciones.html
 *   4. Acción 'nav' valor 'tutorias'  → redirige a tutorias.html
 *   5. Acciones nuevas de tutorias.html y notificaciones.html
 * ════════════════════════════════════════════════════════════════
 */


/* ══════════════════════════════════════════════════════════════
   ESTADO DEL CARRUSEL
══════════════════════════════════════════════════════════════ */
var indiceCarrusel    = 0;
var totalDiapositivas = 6;
var temporizadorAutoplay;


/* ──────────────────────────────────────────────────────────────
   iniciarCarrusel()
────────────────────────────────────────────────────────────── */
function iniciarCarrusel() {
  var pista = document.getElementById('carrusel-pista');
  if (!pista) { return; }

  var diapositivas = pista.querySelectorAll('.diapositiva');
  if (diapositivas.length > 0) {
    totalDiapositivas = diapositivas.length;
  }

  temporizadorAutoplay = setInterval(function() {
    irDiapositiva(indiceCarrusel + 1);
  }, 4000);
}


/* ──────────────────────────────────────────────────────────────
   irDiapositiva(n)
────────────────────────────────────────────────────────────── */
function irDiapositiva(n) {
  if (n < 0) { n = totalDiapositivas - 1; }
  if (n >= totalDiapositivas) { n = 0; }

  indiceCarrusel = n;

  var pista = document.getElementById('carrusel-pista');
  if (pista) {
    pista.style.transform = 'translateX(-' + (indiceCarrusel * 100) + '%)';
  }

  var puntos = document.querySelectorAll('[data-accion="carrusel-ir"]');
  for (var i = 0; i < puntos.length; i++) {
    puntos[i].classList.remove('punto-carrusel--activo');
  }
  if (puntos[indiceCarrusel]) {
    puntos[indiceCarrusel].classList.add('punto-carrusel--activo');
  }
}


/* ──────────────────────────────────────────────────────────────
   detenerAutoplay()
────────────────────────────────────────────────────────────── */
function detenerAutoplay() {
  clearInterval(temporizadorAutoplay);
}


/* ══════════════════════════════════════════════════════════════
   NAVEGACIÓN POR PESTAÑAS
══════════════════════════════════════════════════════════════ */
function activarPestana(pestanaPresionada) {
  var todasLasPestanas = document.querySelectorAll('[data-accion="nav"]');
  for (var i = 0; i < todasLasPestanas.length; i++) {
    todasLasPestanas[i].classList.remove('pestana-nav--activa');
    todasLasPestanas[i].setAttribute('aria-selected', 'false');
  }
  pestanaPresionada.classList.add('pestana-nav--activa');
  pestanaPresionada.setAttribute('aria-selected', 'true');
}


/* ══════════════════════════════════════════════════════════════
   VALIDACIÓN DEL FORMULARIO DE INICIO DE SESIÓN
   ✅ CORRECCIÓN: se agrega window.location.href = 'menu.html'
      después del alert de éxito para que el usuario sea
      redirigido automáticamente al menú principal.
══════════════════════════════════════════════════════════════ */
function inicializarFormularioAcceso() {
  var formulario = document.getElementById('formulario-acceso');
  if (!formulario) { return; }

  formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    var datos  = new FormData(this);
    var correo = datos.get('correo').trim();
    var clave  = datos.get('clave');

    if (!correo || !clave) {
      alert('Por favor, completá todos los campos.');
      return;
    }

    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert('El formato del correo no es válido.');
      return;
    }

    console.log('Acceso enviado:', { correo: correo });

    /* ✅ CORRECCIÓN: redirige al menú tras el inicio de sesión exitoso */
    alert('¡Bienvenido/a! Iniciando sesión…');
    window.location.href = 'menu.html';
  });
}


/* ══════════════════════════════════════════════════════════════
   VALIDACIÓN DEL FORMULARIO DE REGISTRO
   ✅ CORRECCIÓN: se agrega window.location.href = 'login.html'
      después del alert de éxito para que el usuario sea
      redirigido al login a completar el ingreso.
══════════════════════════════════════════════════════════════ */
function inicializarFormularioRegistro() {
  var formulario = document.getElementById('formulario-registro');
  if (!formulario) { return; }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var datos = new FormData(this);
    var nombre = datos.get('nombre').trim();
    var correo = datos.get('correo').trim();
    var clave = datos.get('clave');
    var claveRep = datos.get('clave-repetida');
    var terminosEl = document.getElementById('casilla-terminos');
    var terminos = terminosEl ? terminosEl.checked : false;

    if (!nombre || !correo || !clave || !claveRep) {
      alert('Por favor, completá todos los campos.');
      return;
    }

    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert('El formato del correo no es válido.');
      return;
    }

    if (clave.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (clave !== claveRep) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!terminos) {
      alert('Debés aceptar los términos y condiciones para continuar.');
      return;
    }

    console.log('Registro enviado:', { nombre: nombre, correo: correo });

    /* ✅ CORRECCIÓN: redirige al login para que el usuario inicie sesión */
    alert('¡Cuenta creada exitosamente! Por favor, iniciá sesión.');
    window.location.href = 'login.html';
  });
}


/* ══════════════════════════════════════════════════════════════
   DELEGACIÓN DE EVENTOS — CLIC GLOBAL
   Un solo listener maneja TODOS los clics de la app.
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', function (evento) {
  var elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  var accion = elemento.dataset.accion;
  var valor = elemento.dataset.valor;

  /* ── Botón Salir ── */
  if (accion === 'salir') {
    window.location.href = 'login.html';
    return;
  }

  /* ── Ir a registro ── */
  if (accion === 'ir-registro') {
    return; /* el <a href> ya navega */
  }

  /* ── Recuperar contraseña ── */
  if (accion === 'recuperar-clave') {
    evento.preventDefault();
    alert('Recuperación de contraseña: próximamente.');
    return;
  }

  /* ── Términos y condiciones ── */
  if (accion === 'terminos') {
    evento.preventDefault();
    alert('Términos y condiciones: próximamente.');
    return;
  }

  /* ── Política de privacidad ── */
  if (accion === 'privacidad') {
    evento.preventDefault();
    alert('Política de privacidad: próximamente.');
    return;
  }

  /* ── Carrusel: flecha anterior ── */
  if (accion === 'carrusel-anterior') {
    detenerAutoplay();
    irDiapositiva(indiceCarrusel - 1);
    return;
  }

  /* ── Carrusel: flecha siguiente ── */
  if (accion === 'carrusel-siguiente') {
    detenerAutoplay();
    irDiapositiva(indiceCarrusel + 1);
    return;
  }

  /* ── Carrusel: puntos indicadores ── */
  if (accion === 'carrusel-ir') {
    detenerAutoplay();
    irDiapositiva(parseInt(valor, 10));
    return;
  }

  /* ── Pestañas de navegación ── */
  if (accion === 'nav') {
    activarPestana(elemento);
    if (valor === 'inicio') {
      window.location.href = 'menu.html';
    } else if (valor === 'horarios') {
      window.location.href = 'horarios.html';
    } else if (valor === 'tutorias') {
      /* ✅ CORRECCIÓN: antes mostraba alert, ahora navega */
      window.location.href = 'tutorias.html';
    } else if (valor === 'foro') {
      window.location.href = 'foro.html';
    } else if (valor === 'configuracion') {
      /* ✅ Redirige a la pantalla de configuración */
      window.location.href = 'configuracion.html';
    }
    return;
  }

  /* ── Botón Reservar Tutoría (menu.html) ── */
  if (accion === 'reservar') {
    alert('Reserva de tutoría de "' + valor + '": próximamente.');
    return;
  }

  /* ── Campana de notificaciones ── */
  if (accion === 'notificaciones') {
    /* ✅ CORRECCIÓN: antes mostraba alert, ahora navega */
    window.location.href = 'notificaciones.html';
    return;
  }

  /* ── Configuración ── */
  if (accion === 'configuracion') {
    /* ✅ CORRECCIÓN: antes mostraba alert, ahora navega */
    window.location.href = 'configuracion.html';
    return;
  }

  /* ══════════════════════════════════════════════════════════
     ACCIONES DE tutorias.html
  ══════════════════════════════════════════════════════════ */

  /* ── Ver detalle de una notificación dentro de tutorías ── */
  if (accion === 'ver-notificacion') {
    var materia = elemento.dataset.materia || 'esta materia';
    alert('Abriendo detalle de la notificación de ' + materia + '.');
    return;
  }

  /* ── Unirse a una clase ── */
  if (accion === 'unirse-sesion') {
    var materiaSesion = elemento.dataset.materia || 'la sesión';
    alert('Uniéndote a la clase de ' + materiaSesion + '. ¡Buena suerte!');
    return;
  }

  /* ── Cancelar una sesión ── */
  if (accion === 'cancelar-sesion') {
    var materiaCancelar = elemento.dataset.materia || 'esta sesión';
    var confirmar = confirm(
      '¿Estás seguro de que querés cancelar la sesión de ' +
      materiaCancelar + '?\n\nEsta acción no se puede deshacer.'
    );
    if (confirmar) {
      alert('Sesión de ' + materiaCancelar + ' cancelada correctamente.');
    }
    return;
  }

  /* ── Agendar una sesión ── */
  if (accion === 'agendar-sesion') {
    var materiaAgendar = elemento.dataset.materia || 'la materia';
    alert('Agendando sesión de ' + materiaAgendar + '. Se enviará confirmación por correo.');
    return;
  }

  /* ══════════════════════════════════════════════════════════
     ACCIONES DE notificaciones.html
  ══════════════════════════════════════════════════════════ */

  /*
   * ── Marcar notificación como leída ──
   * Al tocar el botón de tilde en una tarjeta de notificación,
   * se agrega la clase --leida a la tarjeta para cambiar su
   * apariencia visual sin recargar la página.
   */
  if (accion === 'marcar-leida') {
    var tarjeta = elemento.closest('.tarjeta-aviso');
    if (tarjeta) {
      tarjeta.classList.add('tarjeta-aviso--leida');
      /* Oculta el punto de "no leído" dentro de la misma tarjeta */
      var punto = tarjeta.querySelector('.indicador-no-leido');
      if (punto) { punto.style.display = 'none'; }
    }
    return;
  }

  /*
   * ── Marcar TODAS las notificaciones como leídas ──
   * Botón global en el encabezado de la sección.
   */
  if (accion === 'marcar-todas-leidas') {
    var todasLasTarjetas = document.querySelectorAll('.tarjeta-aviso');
    for (var t = 0; t < todasLasTarjetas.length; t++) {
      todasLasTarjetas[t].classList.add('tarjeta-aviso--leida');
      var puntito = todasLasTarjetas[t].querySelector('.indicador-no-leido');
      if (puntito) { puntito.style.display = 'none'; }
    }
    /* Actualiza el contador del encabezado a cero */
    var contador = document.getElementById('contador-no-leidas');
    if (contador) { contador.textContent = '0 nuevas'; }
    return;
  }

});




/* ══════════════════════════════════════════════════════════════
   FORO — Lógica de publicación de mensajes
   Se suma al listener global de delegación ya existente arriba.
   Usamos un segundo listener específico para no modificar el
   bloque principal y evitar conflictos en Git.
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', function(evento) {
  var elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  /* ── Publicar mensaje en el foro ── */
  if (elemento.dataset.accion === 'publicar-mensaje') {
    /*
     * El submit real lo maneja el listener del formulario más abajo.
     * Este bloque queda como punto de extensión para feedback visual.
     */
    return;
  }
});

/* ── Formulario de nuevo mensaje en el foro ── */
var formularioForo = document.getElementById('formulario-foro');

if (formularioForo) {
  formularioForo.addEventListener('submit', function(evento) {
    evento.preventDefault();

    var datos   = new FormData(formularioForo);
    var mensaje = datos.get('mensaje').trim();

    if (!mensaje) {
      alert('Por favor, escribí tu mensaje antes de publicar.');
      return;
    }

    alert('Mensaje publicado correctamente.\n"' + mensaje + '"');
    formularioForo.reset();
  });
}

/* ══════════════════════════════════════════════════════════════
   INICIALIZACIÓN AL CARGAR LA PÁGINA
══════════════════════════════════════════════════════════════ */
inicializarFormularioAcceso();
inicializarFormularioRegistro();
iniciarCarrusel();


/* ══════════════════════════════════════════════════════════════
   CONFIGURACIÓN — Lógica de la pantalla configuracion.html
   Se agrega como listener adicional para no alterar el bloque
   principal y evitar conflictos en el repositorio.
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', function(evento) {
  var elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  var accion = elemento.dataset.accion;

  /* ── Guardar cambios de perfil ── */
  if (accion === 'guardar-perfil') {
    var campoNombre = document.getElementById('campo-nombre');
    var campoCorreo = document.getElementById('campo-correo');

    var nombre = campoNombre ? campoNombre.value.trim() : '';
    var correo = campoCorreo ? campoCorreo.value.trim() : '';

    if (!nombre || !correo) {
      alert('Por favor, completá todos los campos antes de guardar.');
      return;
    }

    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert('El formato del correo electrónico no es válido.');
      return;
    }

    alert('¡Cambios guardados correctamente!\nNombre: ' + nombre + '\nCorreo: ' + correo);
    return;
  }

  /* ── Cambiar contraseña ── */
  if (accion === 'cambiar-contrasena') {
    alert('Cambio de contraseña: en breve recibirás un correo con el enlace para restablecerla.');
    return;
  }

  /* ── Centro de ayuda ── */
  if (accion === 'centro-ayuda') {
    evento.preventDefault();
    alert('Centro de ayuda: esta sección estará disponible próximamente.');
    return;
  }

  /* ── Interruptor de notificación (toggle) ── */
  if (accion === 'alternar-notificacion') {
    var opcion     = elemento.dataset.opcion || 'esta opción';
    var activado   = elemento.checked;
    var nombresMapa = {
      'recordatorios':    'Recordatorios de tutorías',
      'cambios-horario':  'Cambios de horario',
      'nuevos-tutores':   'Nuevos tutores disponibles'
    };
    var etiqueta = nombresMapa[opcion] || opcion;
    var estadoTexto = activado ? 'activada' : 'desactivada';
    alert('Preferencia actualizada:\n"' + etiqueta + '" fue ' + estadoTexto + '.');
    return;
  }
});
