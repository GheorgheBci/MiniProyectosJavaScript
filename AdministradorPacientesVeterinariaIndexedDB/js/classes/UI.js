import { listaCitas, formulario, nombreInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from '../selectores.js';

class UI {

    // Método que cambía el titulo de la lista dependiendo si existen citas o no
    cambiarTitulo() {
        const titulo = document.querySelector('#administra');

        // Para comprobar si existen citas, lo haremos a través de la propiedad firstElementChild que selecciona el primer elemento hijo que tenga el padre
        listaCitas.firstElementChild ? titulo.textContent = 'Administra tus Citas' : titulo.textContent = 'No hay Citas, comienza creando una';
    };

    // Método que 'limpia' todas las citas de la lista para que no haya citas duplicadas
    limpiarListaCitas() {
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        };
    };

    // Método que muestra un mensaje tanto de error como de exito. Por parametro pasamos el mensaje y el tipo de mensaje que es, es decir, si es de error o de exito
    mostrarMensaje(mensaje, tipo) {
        const mensajeDiv = document.createElement('div');
        const existeMensajeError = document.querySelector('.container .alert-danger');
        const contenido = document.querySelector('#contenido')

        // Comprobamos si en el DOM hay un mensaje de error ya mostrado, en caso de que haya, no entrá en la condición. En caso contrario mostrará el mensaje de error. Los mensajes de exito siempre van a entrar en la condición
        if (existeMensajeError === null) {
            mensajeDiv.classList.add('alert', 'text-center');

            tipo === 'error' ? mensajeDiv.classList.add('alert-danger') : mensajeDiv.classList.add('alert-success');

            mensajeDiv.textContent = mensaje;

            document.querySelector('.container').insertBefore(mensajeDiv, contenido);

            setTimeout(() => {
                mensajeDiv.remove();
            }, 3000);
        };
    };

    // Método que comprueba si existe algún campo vacío en el formulario. Por parametro pasamos el valor de cada campo 
    comprobarCamposFormulario(nombre, propietario, telefono, fecha, hora, sintomas) {
        if (nombre === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
            this.mostrarMensaje('Todos los campos son obligatorios', 'error');

            return false;
        };

        return true;
    };

    // Método que agrega citas en el DOM. Por parametro pasamos un array que contendrá todas las citas que tengamos almacenadas en la BD
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

            const { paciente, propietario, telefono, fecha, hora, sintomas, id } = cita;

            div.classList.add('ml-4', 'cita');

            h3.classList.add('font-weight-bold');
            h3.textContent = paciente;

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

    // Método que mostrará todas las propiedades de la cita que pasemos por parametro en el formulario para que podamos editar dicha cita
    mostrarCitaEditar(cita) {
        const { id, paciente, propietario, telefono, fecha, hora, sintomas } = cita;

        // Al botón le cambiamos el valor y además le añadimos la id de la cita
        const btnGuardar = formulario.querySelector('button');
        btnGuardar.textContent = 'Guardar Cambios';
        btnGuardar.dataset.id = id;

        nombreInput.value = paciente;
        propietarioInput.value = propietario;
        telefonoInput.value = telefono;
        fechaInput.value = fecha;
        horaInput.value = hora;
        sintomasInput.value = sintomas;
    }
}

export default UI;