"use strict";

const btn = document.querySelectorAll('.agregar-carrito'),
    tbody = document.querySelector('tbody'),
    vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let carrito = [];

const limpiarCarritoHTML = () => {
    while (tbody.firstChild) { // Esta forma es mejor para borrar elementos del HTML
        tbody.removeChild(tbody.firstChild);
    };
};

const mostrarCarrito = () => {
    limpiarCarritoHTML();

    carrito = JSON.parse(localStorage.getItem('carrito'));

    if (carrito !== null) {
        carrito.forEach(producto => {
            const tr = document.createElement('tr'),
                imagen = document.createElement('td'),
                nombre = document.createElement('td'),
                precio = document.createElement('td'),
                cantidad = document.createElement('td'),
                cruz = document.createElement('td'),
                img = document.createElement('img'),
                span = document.createElement('span');

            span.classList.add('borrar-curso');

            img.src = producto.imagen;
            nombre.textContent = producto.nombre;
            precio.textContent = producto.precio;
            cantidad.textContent = producto.cantidad;
            span.textContent = 'X';

            span.dataset.producto = producto.id;

            imagen.appendChild(img);
            cruz.appendChild(span)
            tr.appendChild(imagen);
            tr.appendChild(nombre);
            tr.appendChild(precio);
            tr.appendChild(cantidad);
            tr.appendChild(cruz);
            tbody.appendChild(tr);
        });
    };
};

const agregarCarrito = e => {
    e.preventDefault();

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const producto = {
        id: e.target.dataset.id,
        imagen: e.target.parentNode.parentNode.children[0].src,
        nombre: e.target.parentNode.children[0].textContent,
        precio: e.target.parentNode.children[3].children[0].textContent,
        cantidad: 1
    };

    let indice = carrito.findIndex(prod => prod.id === producto.id);

    indice >= 0 ? carrito[indice].cantidad++ : carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
};

const eliminarProducto = e => {
    if (e.target.nodeName === 'SPAN') { // Delegation
        let indice = carrito.findIndex(producto => producto.id === e.target.dataset.producto);

        carrito[indice].cantidad > 1 ? carrito[indice].cantidad-- : carrito.splice(indice, 1);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        mostrarCarrito();
    };
};

const vaciarCarrito = () => {
    carrito.splice(0, carrito.length);
    localStorage.clear();
    limpiarCarritoHTML();
};

tbody.addEventListener('click', eliminarProducto);
document.addEventListener('DOMContentLoaded', mostrarCarrito);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
btn.forEach(element => element.addEventListener('click', agregarCarrito));