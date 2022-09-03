import DBClients from "./DB/db.js";
import showClients from './CRUD/showClients.js';
import deleteClient from "./CRUD/deleteClient.js";
import { clientsList } from './selectors.js';

// Cuando la BD se haya abierto que muestre todos los registros
DBClients.onsuccess = () => {
    showClients();
};

// Función que comprueba que botón se ha pulsado
const checkBTNPressed = e => {
    let id;

    // Si el botón es de eliminar, entonces llamamos a la función de eliminar
    if (e.target.classList.contains('delete')) {
        id = parseInt(e.target.dataset.id);
        deleteClient(id);
    } else if (e.target.classList.contains('edit')) { // Si el botón es de editar llamamos a la función de editar
        id = parseInt(e.target.dataset.id);

        // Cuando se pulse en editar algún cliente, el usuario será dirigio a una página con un formulario que contendrá los datos del cliente a editar. A la url le pasamos la id del cliente a editar
        window.location.href = `edit-client.html?id=${id}`; // Mirar esto
    };
};

clientsList.addEventListener('click', checkBTNPressed);