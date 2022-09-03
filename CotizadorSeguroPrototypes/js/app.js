"use strict";

// Variables

const year = document.querySelector('#year');
const formulario = document.querySelector('#cotizar-seguro');
const resultado = document.querySelector('#resultado');

// Funciones

function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
};

Seguro.prototype.cotizarSeguro = function () {
    let cantidad = 0;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    };

    const diferencia = new Date().getFullYear() - this.anio;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    this.tipo === 'basico' ? cantidad *= 1.30 : cantidad *= 1.50;

    return Math.round(cantidad);
};

const generarAnios = () => {
    let anioActual = new Date().getFullYear();

    for (let i = 0; i < 22; i++) {
        const option = document.createElement('option');
        option.textContent = anioActual - i;
        option.value = anioActual - i;
        year.appendChild(option);
    };
};

const mostrarMensajeError = () => {
    const resultados = document.querySelector('#resultado p');

    if (resultados === null) {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = 'Todos los campos son obligatorios';
        mensajeError.setAttribute('class', 'error');
        resultado.appendChild(mensajeError);
    };
};

const limpiarHTML = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};

const mostrarResultado = (objeto, totalDinero) => {
    const spinner = document.querySelector('#cargando');
    const div = document.createElement('div');
    const header = document.createElement('p');
    const marca = document.createElement('p');
    const anio = document.createElement('p');
    const tipo = document.createElement('p');
    const total = document.createElement('p');
    let marcaCoche;

    switch (objeto.marca) {
        case '1':
            marcaCoche = 'Americano';
            break;
        case '2':
            marcaCoche = 'Asiatico';
            break;
        case '3':
            marcaCoche = 'Europeo';
            break;
    };

    header.textContent = 'Tu resumen';
    header.setAttribute('class', 'header');
    marca.innerHTML = `<span>Marca: </span> ${marcaCoche}`;
    anio.innerHTML = `<span>Año: </span> ${objeto.anio}`;
    tipo.innerHTML = `<span>Tipo: </span> ${objeto.tipo}`;
    total.innerHTML = `<span>Total: </span> $ ${totalDinero}`;

    div.appendChild(header);
    div.appendChild(marca);
    div.appendChild(anio);
    div.appendChild(tipo);
    div.appendChild(total);

    spinner.style.display = 'block';
    const mensaje = document.createElement('p');
    mensaje.textContent = 'Cotizando...';
    mensaje.setAttribute('class', 'correcto');
    resultado.appendChild(mensaje);

    setTimeout(() => {
        spinner.style.display = 'none';
        resultado.removeChild(mensaje);
        resultado.appendChild(div);
    }, 2000);
};

const recogerValores = e => {
    e.preventDefault();

    limpiarHTML();

    const marca = document.querySelector('#marca').value;
    const anio = year.value;
    const tipoSeguro = document.querySelector('input[name=tipo]:checked').value;
    const resultados = document.querySelector('#resultado p');

    if (marca !== '' && anio !== '' && tipoSeguro !== '') {

        if (resultados !== null) {
            resultados.remove();
        };

        const seguro = new Seguro(marca, anio, tipoSeguro);

        let dinero = seguro.cotizarSeguro();

        mostrarResultado(seguro, dinero);
    } else {
        mostrarMensajeError();
    };
};

document.addEventListener('DOMContentLoaded', generarAnios);
formulario.addEventListener('submit', recogerValores);