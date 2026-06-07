/*
 * ════════════════════════════════════════════════════════════════
 * principal.js — Lógica JavaScript centralizada del proyecto
 *               "Centro de Tutorías — Portal Estudiantil"
 *
 * Cubre: login.html, registro.html, menu.html, horarios.html
 *
 * Técnica: Vanilla JS clásico (sin módulos, sin import/export)
 *          para garantizar funcionamiento en file:// local.
 *          Delegación de eventos en document: un solo listener
 *          maneja todos los clics filtrando por data-accion.
 * ════════════════════════════════════════════════════════════════
 */


/* ══════════════════════════════════════════════════════════════
   ESTADO DEL CARRUSEL
   Guardamos el estado del carrusel en variables globales.
   Cada vez que cambia el índice, actualizamos el CSS transform
   de la pista y las clases de los puntos indicadores.
══════════════════════════════════════════════════════════════ */
var indiceCarrusel = 0;       /* índice de la diapositiva actual (0 a totalDiapositivas-1) */
var totalDiapositivas = 6;    /* total de diapositivas en el carrusel */
var temporizadorAutoplay;     /* referencia al setInterval del autoplay */


/* ──────────────────────────────────────────────────────────────
   iniciarCarrusel()
   Recupera los elementos del DOM y arranca el autoplay.
   Se llama al final del script para asegurar que el DOM esté
   completamente cargado (el <script> está al final del <body>).
────────────────────────────────────────────────────────────── */
function iniciarCarrusel() {
  var pista = document.getElementById('carrusel-pista');
  if (!pista) { return; } /* si no existe el carrusel en esta página, salimos */

  /* Inicializar conteo dinámico de diapositivas */
  var diapositivas = pista.querySelectorAll('.diapositiva');
  if (diapositivas.length > 0) {
    totalDiapositivas = diapositivas.length;
  }

  /* Arrancar el autoplay: avanza una diapositiva cada 4 segundos */
  temporizadorAutoplay = setInterval(function () {
    irDiapositiva(indiceCarrusel + 1);
  }, 4000);
}


/* ──────────────────────────────────────────────────────────────
   irDiapositiva(n)
   Función central del carrusel.
   Recibe el número de diapositiva destino y:
   1. Actualiza la variable de estado (indiceCarrusel)
   2. Mueve la pista con translateX (CSS transform)
   3. Actualiza qué punto indicador tiene la clase activa
────────────────────────────────────────────────────────────── */
function irDiapositiva(n) {
  /* Carrusel circular: si llega al final vuelve al principio y viceversa */
  if (n < 0) { n = totalDiapositivas - 1; }
  if (n >= totalDiapositivas) { n = 0; }

  indiceCarrusel = n;

  var pista = document.getElementById('carrusel-pista');
  if (pista) {
    /*
     * translateX mueve la pista hacia la izquierda:
     * índice 0 → translateX(0%)   = primera diapositiva
     * índice 1 → translateX(-100%) = segunda diapositiva
     * índice 2 → translateX(-200%) = tercera diapositiva
     */
    pista.style.transform = 'translateX(-' + (indiceCarrusel * 100) + '%)';
  }

  /* Actualizar puntos: quitar clase activa de todos y ponerla al actual */
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
   Detiene el avance automático cuando el usuario interactúa
   manualmente con el carrusel (flechas o puntos).
────────────────────────────────────────────────────────────── */
function detenerAutoplay() {
  clearInterval(temporizadorAutoplay);
}


/* ══════════════════════════════════════════════════════════════
   NAVEGACIÓN POR PESTAÑAS
   Al hacer clic en una pestaña:
   1. Quitamos la clase activa de TODAS las pestañas
   2. Se la ponemos solo a la que fue presionada
   3. Actuamos según el data-valor de la pestaña
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
══════════════════════════════════════════════════════════════ */
function inicializarFormularioAcceso() {
  var formulario = document.getElementById('formulario-acceso');
  if (!formulario) { return; }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); /* evita recarga de página */

    /*
     * FormData lee todos los campos del formulario usando su
     * atributo "name". Es la forma nativa de recopilar campos en JS.
     */
    var datos = new FormData(this);
    var correo = datos.get('correo').trim();
    var clave = datos.get('clave');

    /* Validación 1: campos vacíos */
    if (!correo || !clave) {
      alert('Por favor, completá todos los campos.');
      return;
    }

    /* Validación 2: formato de correo electrónico */
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert('El formato del correo no es válido.');
      return;
    }

    /*
     * Todas las validaciones pasaron.
     * Aquí iría la llamada fetch() a la API real de autenticación.
     */
    console.log('Acceso enviado:', { correo: correo });
    alert('Credenciales recibidas correctamente.');
  });
}


/* ══════════════════════════════════════════════════════════════
   VALIDACIÓN DEL FORMULARIO DE REGISTRO
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

    /* Validación 1: campos vacíos */
    if (!nombre || !correo || !clave || !claveRep) {
      alert('Por favor, completá todos los campos.');
      return;
    }

    /* Validación 2: formato de correo electrónico */
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert('El formato del correo no es válido.');
      return;
    }

    /* Validación 3: longitud mínima de contraseña */
    if (clave.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    /* Validación 4: las contraseñas deben coincidir */
    if (clave !== claveRep) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    /* Validación 5: términos y condiciones aceptados */
    if (!terminos) {
      alert('Debés aceptar los términos y condiciones para continuar.');
      return;
    }

    /*
     * Todas las validaciones pasaron.
     * Aquí iría el fetch() a la API real de registro.
     */
    console.log('Registro enviado:', { nombre: nombre, correo: correo });
    alert('Cuenta creada exitosamente.');
  });
}


/* ══════════════════════════════════════════════════════════════
   DELEGACIÓN DE EVENTOS — CLIC GLOBAL
   Un solo listener en el documento maneja TODOS los clics.
   closest('[data-accion]') sube por el árbol DOM buscando el
   elemento con ese atributo, aunque el clic caiga en un SVG
   hijo del botón (el SVG sería evento.objetivo, pero el botón
   tiene el data-accion).
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', function (evento) {
  var elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  var accion = elemento.dataset.accion;
  var valor = elemento.dataset.valor;

  /* ── Botón Salir: redirige a login.html ── */
  if (accion === 'salir') {
    window.location.href = 'login.html';
    return;
  }

  /* ── Enlace: ir a la pantalla de registro ── */
  if (accion === 'ir-registro') {
    /* El <a href> ya navega; este bloque queda reservado para lógica futura */
    return;
  }

  /* ── Enlace: recuperar contraseña ── */
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

  /* ── Flecha anterior del carrusel ── */
  if (accion === 'carrusel-anterior') {
    detenerAutoplay();
    irDiapositiva(indiceCarrusel - 1);
    return;
  }

  /* ── Flecha siguiente del carrusel ── */
  if (accion === 'carrusel-siguiente') {
    detenerAutoplay();
    irDiapositiva(indiceCarrusel + 1);
    return;
  }

  /* ── Puntos indicadores: ir a diapositiva específica ── */
  if (accion === 'carrusel-ir') {
    detenerAutoplay();
    irDiapositiva(parseInt(valor, 10));
    return;
  }

  /* ── Pestañas de navegación ── */
  if (accion === 'nav') {
    activarPestana(elemento);
    /*
     * Navegamos a la página correspondiente según el data-valor.
     * Este patrón centraliza toda la lógica de navegación en un
     * solo lugar, sin href en el HTML de los botones.
     */
    if (valor === 'inicio') {
      window.location.href = 'menu.html';
    } else if (valor === 'horarios') {
      window.location.href = 'horarios.html';
    } else if (valor === 'tutorias') {
      window.location.href = 'tutorias.html';
    } else if (valor === 'foro') {
      alert('Sección Foro: próximamente.');
    }
    return;
  }

  /* ── Botón Reservar Tutoría ── */
  if (accion === 'reservar') {
    alert('Reserva de tutoría de "' + valor + '" próximamente.');
    return;
  }

  /* ── Campana de notificaciones ── */
  if (accion === 'notificaciones') {
    alert('Notificaciones: próximamente.');
    return;
  }

  /* ── Ícono llave / Configuración ── */
  if (accion === 'configuracion') {
    alert('Configuración: próximamente.');
    return;
  }
});

inicializarFormularioAcceso();
inicializarFormularioRegistro();
iniciarCarrusel();
