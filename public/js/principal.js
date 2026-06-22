


/* ══════════════════════════════════════════════════════════════
   ESTADO DEL CARRUSEL
══════════════════════════════════════════════════════════════ */
let indiceCarrusel = 0;
let totalDiapositivas = 6;
let temporizadorAutoplay;


/* ──────────────────────────────────────────────────────────────
   iniciarCarrusel()
────────────────────────────────────────────────────────────── */
function iniciarCarrusel() {
  let pista = document.getElementById('carrusel-pista');
  if (!pista) { return; }

  let diapositivas = pista.querySelectorAll('.diapositiva');
  if (diapositivas.length > 0) {
    totalDiapositivas = diapositivas.length;
  }

  temporizadorAutoplay = setInterval(function () {
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

  let pista = document.getElementById('carrusel-pista');
  if (pista) {
    pista.style.transform = 'translateX(-' + (indiceCarrusel * 100) + '%)';
  }

  let puntos = document.querySelectorAll('[data-accion="carrusel-ir"]');
  for (let i = 0; i < puntos.length; i++) {
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
function actiletPestana(pestanaPresionada) {
  let todasLasPestanas = document.querySelectorAll('[data-accion="nav"]');
  for (let i = 0; i < todasLasPestanas.length; i++) {
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
function FormularioLogin() {
  let formulario = document.getElementById('formulario-acceso');
  if (!formulario) { return; }

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    let correo = document.getElementById('campo-correo').value;
    let contraseña = document.getElementById('campo-clave').value;

    const comprobacionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !contraseña) {
      alert('Por favor, completá todos los campos.');
    }
    else if (!comprobacionCorreo.test(correo)) {
      alert('El formato del correo no es válido.');
    }
    else {
      const respuesta = await fetch('http://localhost:3000/api/usuarios/mysql', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const datos = await respuesta.json();
      datos.forEach(Usuario => {
        if (Usuario.correo === correo && Usuario.contraseña === contraseña) {
          alert('✅ Usuario logueado exitosamente!');
          formulario.reset();
          window.location.href = 'menu.html';
        } else {
          alert('❌ Usuario o contraseña incorrectos');
        }
      })
    }
  });
}
function FormularioRegistro() {
  const formulario = document.getElementById('formulario-registro');
  if (!formulario) { return; }
  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const Usuario = {
      nombre: document.getElementById('campo-nombre').value,
      correo: document.getElementById('campo-correo').value,
      contraseña: document.getElementById('campo-clave').value
    }
    let claveRep = document.getElementById('campo-clave-repetida').value;
    let terminosEl = document.getElementById('casilla-terminos');
    let terminos = terminosEl ? terminosEl.checked : false;

    let formCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!Usuario.nombre || !Usuario.correo || !Usuario.contraseña || !claveRep) {
      alert('Por favor, completá todos los campos.');
    }
    else if (!formCorreo.test(Usuario.correo)) {
      alert('El formato del correo no es válido.');
    }
    else if (Usuario.contraseña.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
    }
    else if (Usuario.contraseña !== claveRep) {
      alert('Las contraseñas no coinciden.');
    }
    else if (!terminos) {
      alert('Debés aceptar los términos y condiciones para continuar.');
    }
    else {
      try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios/mysql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Usuario)
        });
        if (respuesta.ok) {
          alert('✅ Usuario guardado exitosamente!');
          formulario.reset();
          window.location.href = 'login.html';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al guardar el usuario');
      }
    }
  });
}



document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  let accion = elemento.dataset.accion;
  let valor = elemento.dataset.valor;

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
    actiletPestana(elemento);
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

  /* ── Botón Reserlet Tutoría (menu.html) ── */
  if (accion === 'reserlet') {
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
    let materia = elemento.dataset.materia || 'esta materia';
    alert('Abriendo detalle de la notificación de ' + materia + '.');
    return;
  }

  /* ── Unirse a una clase ── */
  if (accion === 'unirse-sesion') {
    let materiaSesion = elemento.dataset.materia || 'la sesión';
    alert('Uniéndote a la clase de ' + materiaSesion + '. ¡Buena suerte!');
    return;
  }

  /* ── Cancelar una sesión ── */
  if (accion === 'cancelar-sesion') {
    let materiaCancelar = elemento.dataset.materia || 'esta sesión';
    let confirmar = confirm(
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
    let materiaAgendar = elemento.dataset.materia || 'la materia';
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
    let tarjeta = elemento.closest('.tarjeta-aviso');
    if (tarjeta) {
      tarjeta.classList.add('tarjeta-aviso--leida');
      /* Oculta el punto de "no leído" dentro de la misma tarjeta */
      let punto = tarjeta.querySelector('.indicador-no-leido');
      if (punto) { punto.style.display = 'none'; }
    }
    return;
  }

  /*
   * ── Marcar TODAS las notificaciones como leídas ──
   * Botón global en el encabezado de la sección.
   */
  if (accion === 'marcar-todas-leidas') {
    let todasLasTarjetas = document.querySelectorAll('.tarjeta-aviso');
    for (let t = 0; t < todasLasTarjetas.length; t++) {
      todasLasTarjetas[t].classList.add('tarjeta-aviso--leida');
      let puntito = todasLasTarjetas[t].querySelector('.indicador-no-leido');
      if (puntito) { puntito.style.display = 'none'; }
    }
    /* Actualiza el contador del encabezado a cero */
    let contador = document.getElementById('contador-no-leidas');
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
document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
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
let formularioForo = document.getElementById('formulario-foro');

if (formularioForo) {
  formularioForo.addEventListener('submit', function (evento) {
    evento.preventDefault();

    let datos = new FormData(formularioForo);
    let mensaje = datos.get('mensaje').trim();

    if (!mensaje) {
      alert('Por favor, escribí tu mensaje antes de publicar.');
      return;
    }

    alert('Mensaje publicado correctamente.\n"' + mensaje + '"');
    formularioForo.reset();
  });
}
FormularioRegistro();
FormularioLogin();
iniciarCarrusel();


/* ══════════════════════════════════════════════════════════════
   CONFIGURACIÓN — Lógica de la pantalla configuracion.html
   Se agrega como listener adicional para no alterar el bloque
   principal y evitar conflictos en el repositorio.
══════════════════════════════════════════════════════════════ */
document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  let accion = elemento.dataset.accion;

  /* ── Guardar cambios de perfil ── */
  if (accion === 'guardar-perfil') {
    let campoNombre = document.getElementById('campo-nombre');
    let campoCorreo = document.getElementById('campo-correo');

    let nombre = campoNombre ? campoNombre.value.trim() : '';
    let correo = campoCorreo ? campoCorreo.value.trim() : '';

    if (!nombre || !correo) {
      alert('Por favor, completá todos los campos antes de guardar.');
      return;
    }

    let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    let opcion = elemento.dataset.opcion || 'esta opción';
    let activado = elemento.checked;
    let nombresMapa = {
      'recordatorios': 'Recordatorios de tutorías',
      'cambios-horario': 'Cambios de horario',
      'nuevos-tutores': 'Nuevos tutores disponibles'
    };
    let etiqueta = nombresMapa[opcion] || opcion;
    let estadoTexto = activado ? 'activada' : 'desactivada';
    alert('Preferencia actualizada:\n"' + etiqueta + '" fue ' + estadoTexto + '.');
    return;
  }
});
