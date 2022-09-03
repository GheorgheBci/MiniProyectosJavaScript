import citas, { crearCita, guardarCita, eliminarCita, mostrarCita } from './funciones.js';
import { listaCitas, formulario } from './selectores.js';

// Evento que se activa al hacer un submit del formulario
formulario.addEventListener('submit', e => {
    e.preventDefault();

    const btnPulsado = e.target[6].textContent; // Recogemos el valor del bóton

    // Dependiendo el valor que tenga el botón entrara en el case correspondiente
    switch (btnPulsado) {
        case 'Crear Cita':
            crearCita(); // Crea una nueva cita
            break;
        case 'Guardar Cambios':
            const idCita = parseInt(e.target[6].dataset.id); // Obtenemos la id de la cita que se encuentra almacenado en el botón
            const cita = citas.find(cita => cita.id === idCita); // Obtenemos el objeto a partir de su id
            guardarCita(cita); // Guardamos los nuevos datos de la cita
            break;
    }
});

// Evento que se activa cuando hacemos click tanto en el botón de ELIMINAR como de EDITAR
listaCitas.addEventListener('click', e => {
    const btnPulsado = e.target.textContent; // Obtenemos el valor del botón
    const citaDiv = e.target.parentElement.parentElement; // Obtenemos el elemento completo que contiene todos los datos de una cita
    const citaID = parseInt(e.target.dataset.id); // Obtenemos la id

    // Dependiendo el valor que tenga el botón entrara en el case correspondiente
    switch (btnPulsado) {
        case 'ELIMINAR':
            const indice = citas.findIndex(cita => cita.id === citaID); // Obtenemos el indice de la cita que vamos a eliminar
            eliminarCita(citaDiv, indice);
            break;
        case 'EDITAR':
            const objetoCita = citas.find(cita => cita.id === citaID); // Obtenemos el objeto cita que vamos a editar
            mostrarCita(objetoCita);
            break;
    }
});