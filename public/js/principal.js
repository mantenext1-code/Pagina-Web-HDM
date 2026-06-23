let indiceCarrusel = 0;
let totalDiapositivas = 6;

function iniciarCarrusel() {
  let pista = document.getElementById('carrusel-pista');
  if (!pista) { return; }

  let diapositivas = pista.querySelectorAll('.diapositiva');
  if (diapositivas.length > 0) {
    totalDiapositivas = diapositivas.length;
  }
}

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
      let alerta = true
      const datos = await respuesta.json();
      datos.forEach(Usuario => {
        if (Usuario.correo === correo && Usuario.contraseña === contraseña) {
          alert('✅ Usuario logueado exitosamente!');
          formulario.reset();
          window.location.href = 'menu.html';
          alerta = false;
        }
      })
      if (alerta == true) {
        alert('❌ Usuario o contraseña incorrectos')
      }
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

  if (accion === 'salir') {
    window.location.href = 'login.html';
    return;
  }

  if (accion === 'ir-registro') {
    return;
  }

  if (accion === 'recuperar-clave') {
    evento.preventDefault();
    alert('Recuperación de contraseña: próximamente.');
    return;
  }

  if (accion === 'terminos') {
    evento.preventDefault();
    alert('Términos y condiciones: próximamente.');
    return;
  }

  if (accion === 'privacidad') {
    evento.preventDefault();
    alert('Política de privacidad: próximamente.');
    return;
  }

  if (accion === 'carrusel-anterior') {
    irDiapositiva(indiceCarrusel - 1);
    return;
  }

  if (accion === 'carrusel-siguiente') {
    irDiapositiva(indiceCarrusel + 1);
    return;
  }

  if (accion === 'carrusel-ir') {
    irDiapositiva(parseInt(valor));
    return;
  }

  if (accion === 'nav') {
    if (valor === 'inicio') {
      window.location.href = 'menu.html';
    } else if (valor === 'horarios') {
      window.location.href = 'horarios.html';
    } else if (valor === 'tutorias') {
      window.location.href = 'tutorias.html';
    } else if (valor === 'foro') {
      window.location.href = 'foro.html';
    } else if (valor === 'configuracion') {
      window.location.href = 'configuracion.html';
    }
    return;
  }


  if (accion === 'notificaciones') {
    window.location.href = 'notificaciones.html';
    return;
  }

  if (accion === 'agendar-sesion') {
    let materiaAgendar = elemento.dataset.materia || 'la materia';
    alert('Agendando sesión de ' + materiaAgendar + '. Se enviará confirmación por correo.');
    return;
  }

  if (accion === 'marcar-leida') {
    let tarjeta = elemento.closest('.tarjeta-aviso');
    if (tarjeta) {
      tarjeta.classList.add('tarjeta-aviso--leida');
      let punto = tarjeta.querySelector('.indicador-no-leido');
      if (punto) { punto.style.display = 'none'; }
    }
    return;
  }

  if (accion === 'marcar-todas-leidas') {
    let todasLasTarjetas = document.querySelectorAll('.tarjeta-aviso');
    for (let t = 0; t < todasLasTarjetas.length; t++) {
      todasLasTarjetas[t].classList.add('tarjeta-aviso--leida');
      let puntito = todasLasTarjetas[t].querySelector('.indicador-no-leido');
      if (puntito) { puntito.style.display = 'none'; }
    }
    let contador = document.getElementById('contador-no-leidas');
    if (contador) { contador.textContent = '0 nuevas'; }
    return;
  }

});

document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  if (elemento.dataset.accion === 'publicar-mensaje') {
    return;
  }
});

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

document.addEventListener('click', function (evento) {
  let elemento = evento.target.closest('[data-accion]');
  if (!elemento) { return; }

  let accion = elemento.dataset.accion;

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

  if (accion === 'cambiar-contrasena') {
    alert('Cambio de contraseña: en breve recibirás un correo con el enlace para restablecerla.');
    return;
  }

  if (accion === 'centro-ayuda') {
    evento.preventDefault();
    alert('Centro de ayuda: esta sección estará disponible próximamente.');
    return;
  }
});
