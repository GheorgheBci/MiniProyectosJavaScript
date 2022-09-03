import { form, clientsList, nameInput, emailInput, phoneNumberInput, companyInput } from '../selectors.js';

class UI {
    // Método que limpia todo el contenido de la tabla para que en caso de añadir, editar o eliminar un cliente no muestre datos duplicados en el DOM
    static cleanClientListDom = () => {
        while (clientsList.lastChild) {
            clientsList.removeChild(clientsList.lastChild);
        };
    };

    // Método que muestra un mensaje que puede ser tanto de error como de exito. Por parametro pasamos el mensaje y el tipo de mensaje que será mostrado
    static showMessage = (message, type) => {
        const messageDiv = document.createElement('div');
        const messageErrorExists = document.querySelector('.error');
        const messageSuccessExists = document.querySelector('.success');

        // Solo se podrá mostrar el mensaje en caso de que no haya ya algún mensaje mostrado
        if (messageErrorExists === null || messageSuccessExists === null) {
            messageDiv.classList.add('border', 'rounded', 'relative', 'px-2', 'py-3', 'text-center', 'mt-3');
            messageDiv.setAttribute('role', 'alert');

            type === 'error' ? messageDiv.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'error') : messageDiv.classList.add('bg-green-100', 'border-green-400', 'text-green-700', 'success');

            messageDiv.textContent = message;

            form.appendChild(messageDiv);

            setTimeout(() => {
                messageDiv.remove();
            }, 2000);
        };
    };

    // Método que muestra todos los clientes en la tabla del DOM
    static showClientsDOM = clients => {
        UI.cleanClientListDom();

        clients.forEach(client => {
            const { name, email, phone_number, company, id } = client;

            const tr = document.createElement('tr');
            const spanEmail = document.createElement('spanEmail');
            const nameTD = document.createElement('td');
            const phoneNumberTD = document.createElement('td');
            const companyTD = document.createElement('td');
            const buttonsTD = document.createElement('td');
            const BTNEdit = document.createElement('a');
            const BTNDelete = document.createElement('a');

            tr.classList.add('border-b', 'border-gray-200', 'text-left', 'text-sm');

            nameTD.classList.add('px-6', 'py-3', 'font-semibold', 'text-lg');
            phoneNumberTD.classList.add('px-6', 'py-3');
            companyTD.classList.add('px-6', 'py-3');
            buttonsTD.classList.add('px-6', 'py-3');
            spanEmail.classList.add('block', 'pt-2', 'font-normal', 'text-sm')

            nameTD.textContent = name;
            phoneNumberTD.textContent = phone_number;
            companyTD.textContent = company;
            spanEmail.textContent = email;

            nameTD.appendChild(spanEmail)

            BTNEdit.classList.add('text-green-500', 'pr-5', 'edit');
            BTNEdit.setAttribute('href', '#');
            BTNEdit.textContent = 'Editar';
            BTNEdit.dataset.id = id;

            BTNDelete.classList.add('text-red-500', 'delete');
            BTNDelete.setAttribute('href', '#');
            BTNDelete.textContent = 'Eliminar';
            BTNDelete.dataset.id = id;

            buttonsTD.appendChild(BTNEdit);
            buttonsTD.appendChild(BTNDelete);

            tr.appendChild(nameTD);
            tr.appendChild(phoneNumberTD);
            tr.appendChild(companyTD);
            tr.appendChild(buttonsTD);

            clientsList.appendChild(tr);
        });
    };

    // Método que recibe por parametro un objeto con todos los datos de un cliente y los coloca en los campos de un formulario para poder ser editados
    static putClientDateForm = client => {
        const { name, email, phone_number, company } = client;

        nameInput.value = name;
        emailInput.value = email;
        phoneNumberInput.value = phone_number;
        companyInput.value = company;
    };
};

export default UI;