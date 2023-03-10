const formulario = document.querySelector('#formulario');
const textAreaTweet = formulario.querySelector('#tweet');
const btnForm = formulario.querySelector('#btnForm');
const listaTweets = document.querySelector('#lista-tweets');

let arrayTweets = [];

const MENSAJES = {
  ERROR: 'Introduce un tweet'
}

eventListeners();

function eventListeners () {
  document.addEventListener('DOMContentLoaded', () => {
    arrayTweets = JSON.parse(localStorage.getItem('tweet')) || [];
    crearHTML();
  });

  btnForm.addEventListener('click', agregarTweet);
}

/**
 * Agrega el tweet al array
 * Controla que no se ponga un mensaje vacio
 * @param {Event} e Evento del click
 */
function agregarTweet (e) {
  e.preventDefault();
  const tweet = textAreaTweet.value;
  if (tweet === '') {
    mostrarError();
  } else {
    borrarError();
    const tweetObjeto = {
      id: Date.now(),
      mensaje: tweet
    }
    arrayTweets = [...arrayTweets, tweetObjeto];
    if (arrayTweets.length > 0) {
      crearHTML();
    }
  }
}

/**
 * Crea en el DOM los datos de arrayTweets
 */
const crearHTML = () => {
  limpiarHTML();
  arrayTweets.forEach(tweet => {
    const tweetHTML = document.createElement('li');
    tweetHTML.innerText = tweet.mensaje;
    listaTweets.appendChild(tweetHTML);

    const botonBorrar = document.createElement('a');
    botonBorrar.classList.add('borrar-tweet');
    botonBorrar.innerText = 'X';
    tweetHTML.appendChild(botonBorrar);

    botonBorrar.onclick = () => {
      borrarTwet(tweet.id);
    }
  });
  localStorage.setItem('tweet', JSON.stringify(arrayTweets));
  textAreaTweet.value = '';
}

/**
 * Borra el tweet seleccionado a partir del ID
 * @param {ID} id Id del tweet generado con Date.now()
 */
const borrarTwet = (id) => {
  arrayTweets = arrayTweets.filter(arrayTweets => arrayTweets.id !== id);
  crearHTML();
}

/**
 * Limpia el HTML para que no se generen duplicados
 */
const limpiarHTML = () => {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

/**
 * Muestra mensaje de error al dejar el textArea vacio y dar al boton de agregar
 */
const mostrarError = () => {
  const mensaje = document.createElement('p');
  const mensajeAlerta = document.querySelector('.mensajeAlerta');
  mensaje.textContent = MENSAJES.ERROR;
  mensaje.classList.add('error', 'alerta', 'mensajeAlerta');
  if (!mensajeAlerta) {
    formulario.appendChild(mensaje);
  }
}

/**
 * Borra el mensaje de error si ya existe, para que no se duplique
 */
const borrarError = () => {
  const mensajeAlerta = document.querySelector('.mensajeAlerta');
  if (mensajeAlerta) {
    mensajeAlerta.remove();
  }
}
