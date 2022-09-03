// Abrimos la BD con el método open. Por argumento pasamos el nombre que tendrá la BD y la versión
const BDVeterinaria = indexedDB.open('veterinaria', 1);

// Evento que se activa cuando ocurre algún error a la hora de abrir la BD
BDVeterinaria.onerror = () => {
    console.log('Error');
};

// Evento que solo se activa cuando abrimos por primera vez la BD o le cambiamos la versión. Aquí es donde se crea el almacén de objetos y los diferentes índices
BDVeterinaria.onupgradeneeded = e => {
    const DB = e.target.result;

    // Con el método createObjectStore creamos el almacén de objetos y por argumento le pasamos el nombre del almacén y la clave que usará dicho almacén para identificar cada objeto
    const objectStore = DB.createObjectStore('citas', {
        keyPath: 'id' // Usaremos como clave la id
    });

    // Con el método createIndex creamos los diferentes campos/columnas. Por argumento pasamos el nombre del índice, la ruta de acceso clave para dicho índice y opcionalmente un objeto donde podemos indicar si el índice debe ser único o no
    objectStore.createIndex('paciente', 'paciente', { unique: false });
    objectStore.createIndex('propietario', 'propietario', { unique: false });
    objectStore.createIndex('telefono', 'telefono', { unique: false });
    objectStore.createIndex('fecha', 'fecha', { unique: false });
    objectStore.createIndex('hora', 'hora', { unique: false });
    objectStore.createIndex('sintomas', 'sintomas', { unique: false });
};

// Función que crea y devuelve una transacción. Por parametro pasamos el modo que tendrá la transacción
const crearTransaction = modo => {
    const DB = BDVeterinaria.result;
    // Especificamos que almacén y que modo vamos a usar para la transacción
    const transaccion = DB.transaction(['citas'], modo);
    // Realizamos la transacción
    const objectStore = transaccion.objectStore('citas');

    return objectStore;
};

export default BDVeterinaria;
export { crearTransaction };