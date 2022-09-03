"use strict"

// Variables

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    campoVacio = /[A-Za-z0-9]/;

const inputs = document.querySelectorAll('#enviar-mail .border'),
    enviar = document.querySelector('#enviar'),
    resetear = document.querySelector('#resetBtn');

// Funciones

const comprobarInputs = () => {
    if (emailRegex.test(document.querySelector('#email').value) && campoVacio.test(document.querySelector('#asunto').value) && campoVacio.test(document.querySelector('#mensaje').value)) {
        document.querySelector('#enviar').classList.remove('opacity-50');
        document.querySelector('#enviar').classList.remove('cursor-not-allowed');

        return true;
    } else {
        document.querySelector('#enviar').classList.add('opacity-50');
        document.querySelector('#enviar').classList.add('cursor-not-allowed');

        return false;
    };
};

const enviarFormulario = e => {
    e.preventDefault();

    if (comprobarInputs()) {
        document.querySelector('#spinner').style.display = 'flex';

        setTimeout(() => {
            document.querySelector('#spinner').style.display = 'none';
            document.querySelector('.mensaje__enviado').classList.add('activo');
        }, 3000);

        setTimeout(() => {
            document.querySelector('.mensaje__enviado').classList.remove('activo');
            resetearFormulario();
            comprobarInputs();
        }, 6000);
    };
};

const validarFormulario = e => {
    switch (e.target.id) {
        case 'email':
            if (e.target.value === '') {
                validarCampo(emailRegex, e.target.value, 'email', 'mensaje-error-mail', 'El campo email es obligatorio');
                comprobarInputs();
            } else {
                validarCampo(emailRegex, e.target.value, 'email', 'mensaje-error-mail', 'Email no valido');
                comprobarInputs();
            };
            break;

        case 'asunto':
            validarCampo(campoVacio, e.target.value, 'asunto', 'mensaje-error-asunto', 'El campo asunto es obligatorio');
            comprobarInputs();
            break;

        case 'mensaje':
            validarCampo(campoVacio, e.target.value, 'mensaje', 'mensaje-error-cuerpo', 'El campo mensaje es obligatorio');
            comprobarInputs();
            break;
    };
};

const validarCampo = (expresion, valor, campo, mensajeError, mensaje) => {
    if (expresion.test(valor)) {
        document.querySelector(`.${mensajeError}`).classList.remove('activo');
        document.querySelector(`.${mensajeError}`).textContent = '';
        document.querySelector(`#${campo}`).classList.remove('border-rojo');

        document.querySelector(`#${campo}`).classList.add('border-verde');
    } else {
        document.querySelector(`#${campo}`).classList.remove('border-verde');

        document.querySelector(`#${campo}`).classList.add('border-rojo');
        document.querySelector(`.${mensajeError}`).classList.add('activo');
        document.querySelector(`.${mensajeError}`).textContent = mensaje;
    };
};

const resetearFormulario = () => {
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('border-verde');
        input.classList.remove('border-rojo');
    });

    document.querySelector('.mensaje-error-mail').classList.remove('activo');
    document.querySelector('.mensaje-error-asunto').classList.remove('activo');
    document.querySelector('.mensaje-error-cuerpo').classList.remove('activo');

    comprobarInputs();
};

inputs.forEach(input => input.addEventListener('blur', validarFormulario));
enviar.addEventListener('click', enviarFormulario);
resetear.addEventListener('click', resetearFormulario);