// Abrimos la BD con nombre CRM y versión 1
const DBClients = indexedDB.open('CRM', 1);

// Comprobamos que no haya errores cuando se abra la BD
DBClients.onerror = () => {
    console.log('Ha ocurrido un error');
};

// Cuando la BD se vaya abrir por primera vez o se haya cambiado la versión se activará este evento. Aquí creamos el almacén de objeto y definimos los índices
DBClients.onupgradeneeded = e => {
    const db = e.target.result;

    // Al almacén de objetos le indicamos que su ruta de clave será la id y que además es autoincrementable
    const objetctStore = db.createObjectStore('clients', {
        keyPath: 'id',
        autoIncrement: true
    });

    objetctStore.createIndex('name', 'name', { unique: false });
    objetctStore.createIndex('email', 'email', { unique: true });
    objetctStore.createIndex('phone_number', 'phone_number', { unique: true });
    objetctStore.createIndex('company', 'company', { unique: false });
};

// Función que crea una transacción. Por parametro le pasamos el modo que tendrá la transacción
const createTransaction = mode => {
    const objectStore = DBClients.result.transaction(['clients'], mode).objectStore('clients');
    return objectStore;
};

export default DBClients;
export { createTransaction };