"use strict";

const presupuestoHTML = document.querySelector('#total'),
    restante = document.querySelector('#restante'),
    agregarValoresGastos = document.querySelector('#agregar-gasto'),
    listaGastos = document.querySelector('.list-group'),
    gastos = [];

class Gasto {
    constructor(id, nombre, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    };
};

class UI {
    introducirPresupuesto = () => {
        let presupuesto;

        do {
            presupuesto = Number(prompt('¿Cuál es tu presupuesto?'));
        } while (presupuesto <= 0 || Number.isNaN(presupuesto));

        this.colocarPresupuestoHTML(presupuesto);
    };

    colocarPresupuestoHTML = presupuesto => {
        presupuestoHTML.textContent = presupuesto;
        restante.textContent = presupuesto;
    };

    limpiarHTML = () => {
        while (listaGastos.firstChild) {
            listaGastos.removeChild(listaGastos.firstChild);
        };
    };

    mostrarMensaje = (mensaje, tipo) => {
        const mensajeDiv = document.createElement('div');
        const existeMensajeDiv = document.querySelector('.primario .alert-danger');

        mensajeDiv.textContent = mensaje;

        tipo === 'error' ? mensajeDiv.classList.add('alert', 'alert-danger') : mensajeDiv.classList.add('alert', 'alert-success');

        if (existeMensajeDiv === null) {
            agregarValoresGastos.parentNode.insertBefore(mensajeDiv, agregarValoresGastos);

            setTimeout(() => {
                mensajeDiv.remove();
            }, 2000);
        };
    };

    mostrarGastosHTML = gastos => {
        this.limpiarHTML();

        gastos.forEach(gasto => {

            const { nombre, cantidad, id } = gasto;

            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-between', 'border', 'align-items-center', 'p-3');
            li.innerHTML = `<span class="font-weight-bold">${nombre}</span>
                            <span class="border rounded-circle p-1 bg-primary text-light">$ <span>${cantidad}</span></span>
                            <span class="btn btn-danger" data-id=${id}>Borrar x</span>`;
            listaGastos.appendChild(li);
        });
    };

    comprobarRestante = () => {
        const restanteBorder = document.querySelector('.restante');

        if (Number(restante.textContent) < (25 * Number(presupuestoHTML.textContent)) / 100) {
            restanteBorder.classList.remove('alert-warning', 'alert-success');

            restanteBorder.classList.add('alert-danger');
        } else if (Number(restante.textContent) < Number(presupuestoHTML.textContent) / 2) {
            restanteBorder.classList.remove('alert-danger', 'alert-success');

            restanteBorder.classList.add('alert-warning');
        } else {
            restanteBorder.classList.remove('alert-danger', 'alert-warning');

            restanteBorder.classList.add('alert-success');
        };
    };

    comprobarCampos = (nombre, cantidad) => {
        if (nombre === '' || cantidad === '') {
            this.mostrarMensaje('Todos los campos son obligatorios', 'error');

            return false;
        } else if (Number.isNaN(Number(cantidad)) || Number(cantidad) <= 0) {
            this.mostrarMensaje('El campo cantidad debe ser un número entero valido', 'error');

            return false;
        } else if (cantidad > Number(restante.textContent)) {
            this.mostrarMensaje('La cantidad supera a tu presupuesto', 'error');

            return false;
        };

        restante.textContent = Number(restante.textContent - cantidad);

        return true;
    };

    activarDesactivarBTNAgregar = () => {
        Number(restante.textContent) === 0 ? document.querySelector('button').disabled = true : document.querySelector('button').disabled = false;
    };

    quitarGastoHTML = gasto => {
        const elemento = gasto.target.parentNode;
        const cantidad = gasto.target.parentNode.children[1].lastChild.textContent;

        restante.textContent = Number(cantidad) + Number(restante.textContent);

        elemento.remove();
    };
};

const ui = new UI();

const agregarGastos = e => {
    e.preventDefault();

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if (ui.comprobarCampos(nombreGasto, cantidad)) {

        ui.activarDesactivarBTNAgregar();

        const gasto = new Gasto(Date.now(), nombreGasto, cantidad);

        gastos.push(gasto);

        agregarValoresGastos.reset();

        ui.mostrarGastosHTML(gastos);

        ui.mostrarMensaje('Gasto agregado Correctamente', 'correcto');

        ui.comprobarRestante();
    };
};

const borrarElemento = e => {
    if (e.target.textContent === 'Borrar x') {
        const indice = gastos.findIndex(gasto => gasto.id === parseInt(e.target.dataset.id));

        gastos.splice(indice, 1);

        ui.quitarGastoHTML(e);

        ui.activarDesactivarBTNAgregar();

        ui.comprobarRestante();
    };
};

ui.introducirPresupuesto();

agregarValoresGastos.addEventListener('submit', agregarGastos);
listaGastos.addEventListener('click', borrarElemento);
