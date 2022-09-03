import { listaCitas, formulario, nombreInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from '../selectores.js';

class UI {
    // Método que cambia el titulo de la lista de citas en caso de que haya alguna cita o no
    cambiarTitulo() {
        const titulo = document.querySelector('#administra');

        // Comprobamos si la lista tiene algún elemento hijo
        listaCitas.firstElementChild ? titulo.textContent = 'Administra tus Citas' : titulo.textContent = 'No hay Citas, comienza creando una';
    }

    // Método que 'limpia' todas las citas de la lista en el DOM para que no haya duplicados al insertar una nueva cita
    limpiarListaCitas() {
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        }
    }

    // Método que muestra un mensaje tanto de error como de exito en el DOM. Por parametros pasamos el mensaje y el tipo
    mostrarMensaje(mensaje, tipo) {
        const mensajeDiv = document.createElement('div');
        const existeMensajeError = document.querySelector('.container .alert-danger');
        const contenido = document.querySelector('#contenido')

        // Controlamos que solo se inserte un mensaje de error en el DOM 
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

    // Método que comprueba si algún campo del formulario esta vacio. En caso de que haya un campo vacio mostramos un error y devolvemos false, en caso contrario solo devolvemos true
    comprobarCamposFormulario(nombre, propietario, telefono, fecha, hora, sintomas) {
        if (nombre === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
            this.mostrarMensaje('Todos los campos son obligatorios', 'error');

            return false;
        }

        return true;
    }

    // Método que recibe por parametros un array y muestra el contenido en el DOM
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

    // Método que elimina la cita que pasemos por parametro del DOM
    eliminarCitaDOM(cita) {
        cita.remove();
        this.cambiarTitulo(); // En caso de que ya no haya citas en la lista cambiamos el titulo
    }

    // Método que muestra todas las propiedades de la cita que pasemos por parametro en el formulario
    mostrarCitaEditar(cita) {
        const { id, nombre, propietario, telefono, fecha, hora, sintomas } = cita;

        // Cambiamos el valor del botón para que aparezaca 'Guardar Cambios' y le pasamos la id de la cita a editar
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

export default UI;