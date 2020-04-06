import apiData from './api/apiData.js';

document.addEventListener('click', () => {
  apiData.getPokemon('venusaur');
})