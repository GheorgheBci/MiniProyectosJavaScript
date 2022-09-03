import { form } from "../selectors.js";
import { checkFields } from "../functions.js";
import { createTransaction } from "../DB/db.js";
import UI from "../classes/UI.js";
import showClients from "./showClients.js";

// Función que añade un nuevo cliente a la BD
const addClient = e => {
    e.preventDefault();

    // Obtenemos los valores de los inputs en formato clave-valor
    const clientData = Object.fromEntries(new FormData(e.currentTarget));

    const { name, email, phone_number, company } = clientData;

    const canContinue = checkFields(name, email, phone_number, company);

    // Si la variable tiene el valor true, entonces podemos añadir el nuevo cliente a la BD
    if (canContinue) {
        const objectStore = createTransaction('readwrite');
        const request = objectStore.add(clientData);

        request.onsuccess = () => {
            UI.showMessage('Cliente agregado correctamente', 'exito');

            form.reset();

            showClients();

            // Una vez ya insertado el nuevo cliente, redirigimos al usuario a la página que contiene la tabla de clientes
            setTimeout(() => {
                location.href = 'index.html';
            }, 2000);
        };

        // Comprobamos de que si el usuario indica un email o teléfono que existe en la BD muestre un error
        request.onerror = e => {
            // Guardamos el mensaje de error en una variable
            const errorMessage = e.target.error.toString();

            // Si en ese mensaje existe la palabra email, entonces mostramos el error
            if (errorMessage.includes('email')) {
                UI.showMessage('El correo ya existe', 'error');
            } else if (errorMessage.includes('phone_number')) { // Hacemos lo mismo pero con la palabra teléfono
                UI.showMessage('El teléfono ya existe', 'error');
            } else { // Si ocurre otro error diferente muestramos un mensaje en la consola
                console.log('Otro error');
            };
        };
    };
};

form.addEventListener('submit', addClient);