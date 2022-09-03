"use strict";

const carrito = [],
    btn = document.querySelectorAll('.agregar-carrito'),
    tbody = document.querySelector('#hola'),
    vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const limpiarCarritoHTML = () => {
    while (tbody.firstChild) { // Esta forma es mejor para borrar elementos del HTML
        tbody.removeChild(tbody.firstChild);
    };
};

const mostrarCarrito = () => {

    limpiarCarritoHTML();

    carrito.forEach(producto => {
        const tr = document.createElement('tr'),
            imagen = document.createElement('td'),
            nombre = document.createElement('td'),
            precio = document.createElement('td'),
            cantidad = document.createElement('td'),
            cruz = document.createElement('td'),
            img = document.createElement('img'),
            span = document.createElement('span');

        span.classList.add('cruz');

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

btn.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();

        const producto = {
            id: element.dataset.id,
            imagen: element.parentNode.parentNode.children[0].src,
            nombre: element.parentNode.children[0].textContent,
            precio: element.parentNode.children[3].children[0].textContent,
            cantidad: 1
        };

        let indice = carrito.findIndex(prod => prod.id === producto.id);

        if (indice >= 0) {
            carrito[indice].cantidad++;
        } else {
            carrito.push(producto);
        }

        mostrarCarrito();
    });
});

const eliminarProducto = e => {
    if (e.target.nodeName === 'SPAN') { // Delegation
        let indice = carrito.findIndex(producto => producto.id === e.target.dataset.producto);

        if (carrito[indice].cantidad > 1) {
            carrito[indice].cantidad--;
        } else {
            carrito.splice(indice, 1);
        };

        mostrarCarrito();
    };
};

const vaciarCarrito = () => {
    carrito.splice(0, carrito.length);
    limpiarCarritoHTML();
};

tbody.addEventListener('click', eliminarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);