import { crearCita, obtenerCitaEditar, eliminarCita, mostrarCita } from './funciones.js';
import { listaCitas, formulario } from './selectores.js';

// Evento que se activa cuando detecta el submit en el formulario
formulario.addEventListener('submit', e => {
    e.preventDefault();

    const btnPulsado = e.target[6].textContent;
    const idCita = parseInt(e.target[6].dataset.id);

    // Comprobamos que valor tiene el botón del formulario
    switch (btnPulsado) {
        case 'Crear Cita':
            crearCita();
            break;
        case 'Guardar Cambios':
            obtenerCitaEditar(idCita);
            break;
    };
});

// Evento que se activa cuando hacemos un click en la lista de citas
listaCitas.addEventListener('click', e => {
    const btnPulsado = e.target.textContent;
    const citaID = parseInt(e.target.dataset.id);

    // Comprobamos que valor tiene el botón que hemos pulsado
    switch (btnPulsado) {
        case 'ELIMINAR':
            eliminarCita(citaID);
            break;
        case 'EDITAR':
            mostrarCita(citaID);
            break;
    }
});