"use strict";

const resultado = document.querySelector('#resultado'),
    selects = document.querySelectorAll('#buscador select');

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

const mostrarHTML = arrayObjeto => {
    arrayObjeto.forEach(objeto => {
        const parrafo = document.createElement('p');

        parrafo.textContent = `${objeto.marca} ${objeto.modelo} - ${objeto.year} - ${objeto.puertas} puertas - transmisión: ${objeto.transmision} - precio: ${objeto.precio} - color: ${objeto.color}`;

        resultado.appendChild(parrafo);
    });
};

const limpiarHTML = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};

const almacenarValorSelect = e => {
    switch (e.target.id) {
        case 'marca':
            datosBusqueda.marca = e.target.value;
            break;

        case 'year':
            datosBusqueda.year = e.target.value;
            break;

        case 'minimo':
            datosBusqueda.minimo = parseInt(e.target.value);
            break;

        case 'maximo':
            datosBusqueda.maximo = parseInt(e.target.value);
            break;

        case 'puertas':
            datosBusqueda.puertas = parseInt(e.target.value);
            break;

        case 'transmision':
            datosBusqueda.transmision = e.target.value;
            break;

        case 'color':
            datosBusqueda.color = e.target.value;
            break;
    };

    filtrar();
};

const comprobarResultado = () => {
    const mensaje = document.createElement('p');

    mensaje.textContent = 'No hay resultado';
    mensaje.style.color = 'red';

    resultado.appendChild(mensaje);
}

const filtrar = () => {
    const nuevoArray = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if (nuevoArray.length > 0) {
        limpiarHTML();
        mostrarHTML(nuevoArray);
    } else {
        limpiarHTML();
        comprobarResultado();
    };
};

const filtrarMarca = auto => {
    return datosBusqueda.marca ? auto.marca === datosBusqueda.marca : auto;
};

const filtrarYear = auto => {
    return datosBusqueda.year ? auto.year === parseInt(datosBusqueda.year) : auto;
};

const filtrarMinimo = auto => {
    return datosBusqueda.minimo ? auto.precio >= parseInt(datosBusqueda.minimo) : auto;
};

const filtrarMaximo = auto => {
    return datosBusqueda.maximo ? auto.precio <= parseInt(datosBusqueda.maximo) : auto;
};

const filtrarPuertas = auto => {
    return datosBusqueda.puertas ? auto.puertas === parseInt(datosBusqueda.puertas) : auto;
};

const filtrarTransmision = auto => {
    return datosBusqueda.transmision ? auto.transmision === datosBusqueda.transmision : auto;
};

const filtrarColor = auto => {
    return datosBusqueda.color ? auto.color === datosBusqueda.color : auto;
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarHTML(autos);
});

selects.forEach(select => {
    select.addEventListener('change', almacenarValorSelect);
});