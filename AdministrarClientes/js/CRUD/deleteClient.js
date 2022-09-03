import showClients from "./showClients.js";
import { createTransaction } from "../DB/db.js";

// Función que elimina un cliente a partir de la id que le pasemos por parametro
const deleteClient = key => {
    const confirmDelete = confirm('¿Estas seguro de eliminar este cliente?');

    // Si el usuario pulsa en confirmar, encontes se elimina el cliente
    if (confirmDelete) {
        const objectStore = createTransaction('readwrite');
        const request = objectStore.delete(key);

        request.onsuccess = () => {
            showClients();
        };
    };
};

export default deleteClient;