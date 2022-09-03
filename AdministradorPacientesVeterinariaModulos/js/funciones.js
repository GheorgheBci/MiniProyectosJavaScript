import Cita from './classes/Cita.js';
import UI from './classes/UI.js';
import { formulario, nombreInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from './selectores.js';

const citas = []; // Lista de citas

const ui = new UI();

ui.cambiarTitulo();

// Función que añade una instancia de cita al array de citas
const crearCita = () => {
    // Primero comprobamos que no haya ningún campo vacio
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

// Función que edita la cita que pasemos por parametro 
const guardarCita = cita => {
    const seguir = ui.comprobarCamposFormulario(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);
    const btnGuardar = formulario.querySelector('button');

    if (seguir) {
        cita.editarCita(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

        const { id } = cita;

        const indice = citas.findIndex(cita => cita.id === id);

        // Mediante el método splice sustituimos la cita por la misma cita pero con nuevas propiedades
        citas.splice(indice, 1, cita);

        ui.agregarDatosDOM(citas);

        formulario.reset();

        // Le cambiamos al valor original del botón
        btnGuardar.textContent = 'Crear Cita';
        btnGuardar.removeAttribute('data-id');

        ui.mostrarMensaje('Cita Modificada correctamente', 'exito');
    }
}

// Función que elimina la cita que pasamos por paramtero tanto del DOM como del array
const eliminarCita = (cita, indice) => {
    citas.splice(indice, 1);
    ui.eliminarCitaDOM(cita);
    ui.agregarDatosDOM(citas);
    ui.mostrarMensaje('Cita eliminada correctamente', 'exito');
}

// Función que recibe una cita y llama un método de la clase UI para que muestre los datos de una cita en el formulario
const mostrarCita = objeto => {
    ui.mostrarCitaEditar(objeto);
}

export default citas;
export { crearCita, guardarCita, eliminarCita, mostrarCita };