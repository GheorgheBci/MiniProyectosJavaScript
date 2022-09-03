import { createTransaction } from "../DB/db.js";
import UI from "../classes/UI.js";

// Función que obtiene todos los clientes que haya almacenado en la BD
const showClients = () => {
    const objectStore = createTransaction('readonly');
    const request = objectStore.getAll();

    request.onsuccess = e => {
        const clientsList = e.target.result;
        UI.showClientsDOM(clientsList); // Mostramos el contenido del array en el DOM
    };
};

export default showClients;