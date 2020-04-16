import apiData from './api/apiData.js';
import { capitalize } from './utilities/utilities.js';


async function loadCards() {
  var allPokemons =  await apiData.getAllPokemonNamesWithImages()
    .then(response => {
      return response;
    });
  
  const screen = document.getElementById('screen-all-pokemons');

  console.log('allPokemons', allPokemons);

  for(let i = 0; i < allPokemons.length; i++) {
    let containerDiv = document.createElement('div');
    containerDiv.className = 'card';
    screen.appendChild(containerDiv);

    let pokemonImg = document.createElement('img');
    pokemonImg.src = allPokemons[i].image;

    let name = document.createElement('p');
    name.innerHTML = capitalize(allPokemons[i].name);

    containerDiv.appendChild(pokemonImg);
    containerDiv.appendChild(name);
  }
}

loadCards();
