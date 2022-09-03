import UI from "./classes/UI.js";

// Función que comprueba si los campos del formulario cumplen con las condiciones antes de realizar algún proceso. Devuelve true en caso de que cumple con todas las condiciones y false en caso contrario
const checkFields = (clientName, email, phoneNumber, company) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneNumberRegex = /^[9|6|7][0-9]{8}$/;

    // Se comprueba que no haya campos vacíos
    if (clientName === '' || email === '' || phoneNumber === '' || company === '') {
        UI.showMessage('Todos los campos son obligatorios', 'error');

        return false;
    } else if (!emailRegex.test(email)) { // Se comprueba que el correo sea valido
        UI.showMessage('El correo no es correcto', 'error');

        return false;
    } else if (!phoneNumberRegex.test(phoneNumber)) { // Se comprueba que el teléfono sea valido
        UI.showMessage('El teléfono no es correcto', 'error');

        return false;
    };

    return true;
};

export { checkFields };