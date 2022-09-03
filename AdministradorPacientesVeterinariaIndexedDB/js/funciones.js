import Cita from './classes/Cita.js';
import UI from './classes/UI.js';
import { formulario, nombreInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput } from './selectores.js';
import DB, { crearTransaction } from './indexedDB/db.js';

// Instanciamos un objeto UI
const ui = new UI();

// Evento que se activa cuando la BD se ha abierto sin ningún problema
DB.onsuccess = () => {
    cargarCitas();
};

// Función que crea una nueva cita y lo almacena en la BD
const crearCita = () => {
    const seguir = ui.comprobarCamposFormulario(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

    if (seguir) {
        // Instanciamos un nuevo objeto cita con los valores del formulario. Para la id usaré el método now del objeto Date
        const cita = new Cita(Date.now(), nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

        const objectStore = crearTransaction('readwrite');
        // Realizamos una petición para que guarde la cita en la BD
        const peticion = objectStore.add(cita);

        // Evento que se activa cuando la petición ha tenido exito
        peticion.onsuccess = () => {
            ui.mostrarMensaje('Se agregó correctamente', 'exito');

            formulario.reset();

            cargarCitas();
        };
    };
};

// Función que recoge todas las citas de la BD 
const cargarCitas = () => {
    const objectStore = crearTransaction('readonly');
    // Realizamos la petición que recoga todas las citas
    const peticion = objectStore.getAll();

    // Evento que se activa cuando la petición ha tenido exito
    peticion.onsuccess = e => {
        ui.agregarDatosDOM(e.target.result);
        ui.cambiarTitulo();
    };
};

// Función que obtiene una cita de la BD para luego poder editar dicha cita. Por parametro pasamos la key de la cita a editar
const obtenerCitaEditar = key => {
    const seguir = ui.comprobarCamposFormulario(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

    if (seguir) {
        const objectStore = crearTransaction('readonly');
        // Realizamos la petición para que nos devuelva la cita de la BD
        const peticion = objectStore.get(key);

        // Evento que se activa cuando la petición ha tenido exito
        peticion.onsuccess = e => {
            const cita = e.target.result

            actualizarCita(cita);
        };
    };
};

// Función que modifica la cita que pasemos por parametro
const actualizarCita = cita => {
    const btnGuardar = formulario.querySelector('button');

    const { id, paciente, propietario, telefono, fecha, hora, sintomas } = cita;

    // Instanciamos un objeto Cita con las propiedades de la cita que recibimos por parametro para poder usar el método de editarCita
    const citaEditar = new Cita(id, paciente, propietario, telefono, fecha, hora, sintomas);
    citaEditar.editarCita(nombreInput.value, propietarioInput.value, telefonoInput.value, fechaInput.value, horaInput.value, sintomasInput.value);

    const objectStore = crearTransaction('readwrite');

    // Realizamos la petición para que modifique la cita 
    const peticion = objectStore.put(citaEditar);

    // Evento que se activa cuando la petición ha tenido exito
    peticion.onsuccess = () => {
        cargarCitas();

        formulario.reset();

        // Al botón le cambiamos a su valor original
        btnGuardar.textContent = 'Crear Cita';
        btnGuardar.removeAttribute('data-id');

        ui.mostrarMensaje('Cita Modificada correctamente', 'exito');
    };
};

// Función que elimina una cita de la BD. Por parametro pasamos la key de la cita a eliminar
const eliminarCita = key => {
    const objectStore = crearTransaction('readwrite');

    // Realizamos la petición para que elimine la cita
    const peticion = objectStore.delete(key);

    // Evento que se activa cuando la petición ha tenido exito
    peticion.onsuccess = () => {
        cargarCitas();
        ui.mostrarMensaje('Cita eliminada correctamente', 'exito');
    };
}

// Función que obtiene una cita de la BD a partir de la key que pasamos por parametro para que luego muestre las propiedades de dicha cita en el formulario
const mostrarCita = key => {
    const objectStore = crearTransaction('readonly');

    // Realizamos la petición para que nos devuelva la cita de la BD
    const peticion = objectStore.get(key);

    // Evento que se activa cuando la petición ha tenido exito
    peticion.onsuccess = e => {
        ui.mostrarCitaEditar(e.target.result);
    };
};

export { crearCita, obtenerCitaEditar, eliminarCita, mostrarCita };