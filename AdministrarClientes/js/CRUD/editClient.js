import DBClients, { createTransaction } from "../DB/db.js";
import UI from "../classes/UI.js";
import { form } from "../selectors.js";

// Instanciamos un objeto URLSearchParam y por argumento le pasamos la url a partir del simbolo ?
const params = new URLSearchParams(location.search);
const id = parseInt(params.get('id')); // Obtenemos el valor de la id que hay en la url con el método get

// Cuando la BD se haya abierto llamamos a la función  
DBClients.onsuccess = () => {
    getClientEdit(id);
};

// Función que obtiene un cliente de la BD a partir de la id que le pasamos por paramatro
const getClientEdit = key => {
    const objectStore = createTransaction('readonly');
    const request = objectStore.get(key);

    // Si la petición ha sido exitosa llamamos al método putClientDateForm del la clase UI
    request.onsuccess = e => {
        UI.putClientDateForm(e.target.result);
    };
};

// Función que guarda las nuevas propiedades de un cliente en la BD
const saveClient = e => {
    e.preventDefault();

    // COMPROBAR CAMPOS CON CHECK

    // Obtenemos todos los valores de los inputs en formato clave-valor
    const clientData = Object.fromEntries(new FormData(e.currentTarget));

    // Al objeto le añadimos la id correspondiente
    clientData.id = id;

    const objectStore = createTransaction('readwrite');
    const request = objectStore.put(clientData);

    request.onsuccess = () => {
        UI.showMessage('Cliente editado correctamente', 'success');

        // Una vez pasado 2 segundos redirigimos al usuario a la página que contiene la tabla de clientes
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

form.addEventListener('submit', saveClient);