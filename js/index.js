import App from './App.js';

const elementsWithId = document.querySelectorAll('*[id]');
const els = {};

elementsWithId.forEach(el => {
  els[el.id] = el;
})

new App(els);
