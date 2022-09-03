"use strict";

const agregar = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
let tweets = [];

const limpiarHTML = () => {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    };
};

const mostrarHTML = () => {
    tweets = JSON.parse(localStorage.getItem('tweets'));

    limpiarHTML();

    if (tweets !== null) {
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            const span = document.createElement('span');

            span.textContent = 'X';
            span.dataset.tweet = tweet.id;
            span.classList.add('borrar-tweet');
            li.textContent = tweet.tweet;

            li.appendChild(span);
            lista.appendChild(li);
        });
    };
};

const mostrarError = () => {
    const errorExiste = document.querySelector('.error');

    if (errorExiste) {
        return;
    };

    const error = document.createElement('div');
    error.textContent = 'No puedes enviar tweets vacios';
    error.classList.add('error');
    agregar.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
};

const agregarTweet = e => {
    e.preventDefault();

    tweets = JSON.parse(localStorage.getItem('tweets'));
    const tweet = document.querySelector('#tweet');
    const arrayTweets = [];

    const objeto = {
        id: Date.now(),
        tweet: tweet.value
    };

    if (tweet.value !== '') {

        tweets !== null ? guardarLocalStorage(tweets, objeto) : guardarLocalStorage(arrayTweets, objeto);

        mostrarHTML();
    } else {
        mostrarError();
    };
};

const guardarLocalStorage = (array, objeto) => {
    array.push(objeto);
    agregar.reset();
    localStorage.setItem('tweets', JSON.stringify(array));
};

const eliminarTweet = e => {
    tweets = JSON.parse(localStorage.getItem('tweets'));

    if (e.target.tagName === 'SPAN') {
        const twe = tweets.filter(tweet => tweet.id !== parseInt(e.target.dataset.tweet));
        localStorage.setItem('tweets', JSON.stringify(twe));
        mostrarHTML();
    };
};

agregar.addEventListener('submit', agregarTweet);
document.addEventListener('DOMContentLoaded', mostrarHTML);
lista.addEventListener('click', eliminarTweet);