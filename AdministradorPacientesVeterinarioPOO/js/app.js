"use strict";

const listaCitas = document.querySelector('#citas'),
    formulario = document.querySelector('#nueva-cita'),
    nombreInput = document.querySelector('#mascota'),
    propietarioInput = document.querySelector('#propietario'),
    telefonoInput = document.querySelector('#telefono'),
    fechaInput = document.querySelector('#fecha'),
    horaInput = document.querySelector('#hora'),
    sintomasInput = document.querySelector('#sintomas'),
    citas = [];

class Cita {
    constructor(id, nombre, propietario, telefono, fecha, hora, sintomas) {
        this.id = id;
        this.nombre = nombre;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
    }

    editarCita(nombre, propietario, telefono, fecha, hora, sintomas) {
        this.nombre = nombre;
        this.propietario = propietario;
        this.telefono = telefono;
        this.fecha = fecha;
        this.hora = hora;
        this.sintomas = sintomas;
    }
}

class UI {
    cambiarTitulo() {
        const titulo = document.querySelector('#administra');

        listaCitas.firstElementChild ? titulo.textContent = 'Administra tus Citas' : titulo.textContent = 'No hay Citas, comienza creando una';
    }

    limpiarListaCitas() {
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        }
    }

    mostrarMensaje(mensaje, tipo) {
        const mensajeDiv = document.createElement('div');
        const existeMensajeError = document.querySelector('.container .alert-danger');
        const contenido = document.querySelector('#contenido')

        if (existeMensajeError === null) {
            mensajeDiv.classList.add('alert', 'text-center');

            tipo === 'error' ? mensajeDiv.classList.add('alert-danger') : mensajeDiv.classList.add('alert-success');

            mensajeDiv.textContent = mensaje;

            document.querySelector('.container').insertBefore(mensajeDiv, contenido);

            setTimeout(() => {
                mensajeDiv.remove();
            }, 3000);
        }
    }

    comprobarCamposFormulario(nombre, propietario, telefono, fecha, hora, sintomas) {
        if (nombre === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
            this.mostrarMensaje('Todos los campos son obligatorios', 'error');

            return false;
        }

        return true;
    }

    agregarDatosDOM(citas) {
        this.limpiarListaCitas();

        citas.forEach(cita => {
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            const propietarioDiv = document.createElement('div');
            const telefonoDiv = document.createElement('div');
            const fechaDiv = document.createElement('div');
            const horaDiv = document.createElement('div');
            const sintomasDiv = document.createElement('div');
            const propietarioSpan = document.createElement('span');
            const telefonoSpan = document.createElement('span');
            const fechaSpan = document.createElement('span');
            const horaSpan = document.createElement('span');
            const sintomasSpan = document.createElement('span');
            const divBTN = document.createElement('div');
            const btnEliminar = document.createElement('button');
            const btnEditar = document.createElement('button');

            const { nombre, propietario, telefono, fecha, hora, sintomas, id } = cita;

            div.classList.add('ml-4', 'cita');

            h3.classList.add('font-weight-bold');
            h3.textContent = nombre;

            propietarioDiv.textContent = propietario;
            telefonoDiv.textContent = telefono;
            fechaDiv.textContent = fecha;
            horaDiv.textContent = hora;
            sintomasDiv.textContent = sintomas;

            propietarioSpan.classList.add('font-weight-bold');
            telefonoSpan.classList.add('font-weight-bold');
            fechaSpan.classList.add('font-weight-bold');
            horaSpan.classList.add('font-weight-bold');
            sintomasSpan.classList.add('font-weight-bold');

            propietarioSpan.textContent = 'Propietario: ';
            telefonoSpan.textContent = 'Teléfono: ';
            fechaSpan.textContent = 'Fecha: ';
            horaSpan.textContent = 'Hora: ';
            sintomasSpan.textContent = 'Síntomas: ';

            propietarioDiv.insertAdjacentElement('afterbegin', propietarioSpan);
            telefonoDiv.insertAdjacentElement('afterbegin', telefonoSpan);
            fechaDiv.insertAdjacentElement('afterbegin', fechaSpan);
            horaDiv.insertAdjacentElement('afterbegin', horaSpan);
            sintomasDiv.insertAdjacentElement('afterbegin', sintomasSpan);

            btnEliminar.textContent = 'ELIMINAR';
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.dataset.id = id;

            btnEditar.textContent = 'EDITAR';
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.dataset.id = id;

            divBTN.classList.add('mt-2');
            divBTN.append(btnEliminar, btnEditar);

            div.appendChild(h3);
            div.appendChild(propietarioDiv);
            div.appendChild(telefonoDiv);
            div.appendChild(fechaDiv);
            div.appendChild(horaDiv);
            div.appendChild(sintomasDiv);
            div.appendChild(divBTN);

            listaCitas.appendChild(div);
        });
    }

    eliminarCitaDOM(cita) {
        cita.remove();
        this.cambiarTitulo();
    }

    mostrarCitaEditar(cita) {
        const { id, nombre, propietario, telefono, fecha, hora, sintomas } = cita;

        const btnGuardar = formulario.querySelector('button');
        btnGuardar.textContent = 'Guardar Cambios';
        btnGuardar.dataset.id = id;

        nombreInput.value = nombre;
        propietarioInput.value = propietario;
        telefonoInput.value = telefono;
        fechaInput.value = fecha;
        horaInput.value = hora;
        sintomasInput.value = sintomas;
    }
}

const ui = new UI();

ui.cambiarTitulo();

const crearCita = () => {
    const seguir = ui.comprobarCamposFormulario(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

    if (seguir) {
        const cita = new Cita(Date.now(), nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

        citas.push(cita);

        ui.mostrarMensaje('Se agregó correctamente', 'exito');

        formulario.reset();

        ui.agregarDatosDOM(citas);

        ui.cambiarTitulo();
    }
};

const guardarCita = cita => {
    const seguir = ui.comprobarCamposFormulario(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);
    const btnGuardar = formulario.querySelector('button');

    if (seguir) {
        cita.editarCita(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

        const { id } = cita;

        const indice = citas.findIndex(cita => cita.id === id);

        citas.splice(indice, 1, cita);

        ui.agregarDatosDOM(citas);

        formulario.reset();

        btnGuardar.textContent = 'Crear Cita';
        btnGuardar.removeAttribute('data-id');

        ui.mostrarMensaje('Cita Modificada correctamente', 'exito');
    }
}

const eliminarCita = (cita, indice) => {
    citas.splice(indice, 1);
    ui.eliminarCitaDOM(cita);
    ui.agregarDatosDOM(citas);
    ui.mostrarMensaje('Cita eliminada correctamente', 'exito');
}

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const btnPulsado = e.target[6].textContent;

    switch (btnPulsado) {
        case 'Crear Cita':
            crearCita();
            break;
        case 'Guardar Cambios':
            const idCita = parseInt(e.target[6].dataset.id);
            const cita = citas.find(cita => cita.id === idCita);
            guardarCita(cita);
            break;
    }
});

listaCitas.addEventListener('click', e => {
    const btnPulsado = e.target.textContent;
    const citaDiv = e.target.parentElement.parentElement;
    const citaID = parseInt(e.target.dataset.id);

    switch (btnPulsado) {
        case 'ELIMINAR':
            const indice = citas.findIndex(cita => cita.id === citaID);
            eliminarCita(citaDiv, indice);
            break;
        case 'EDITAR':
            const objetoCita = citas.find(cita => cita.id === citaID);
            ui.mostrarCitaEditar(objetoCita);
            break;
    }
});