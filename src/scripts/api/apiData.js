import axios from 'axios';
import { capitalize } from '../utilities/utilities.js';
import regeneratorRuntime from "regenerator-runtime";

async function getPokemon(pokemonName) {
  pokemonName = pokemonName.toLowerCase();
  var obj = {};
  
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then( response => {
      obj.id = response.data.id;
      obj.name = capitalize(response.data.name);
      obj.baseExperience = response.data.base_experience;
      obj.types = response.data.types;
      obj.weight = response.data.weight;
      obj.front_default = response.data.sprites.front_default;

      return obj;
    });
}

async function getAllPokemonNamesWithImages(startIndex) {
  var allPokemons = [];
  var numberToLoad;

  if(startIndex < 149) {
    numberToLoad = 4;
  } else {
    numberToLoad = 2;
  }

  var lastIndex = startIndex + numberToLoad;
  for(let i = startIndex; i < lastIndex; i++) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then( response => {
      allPokemons.push(
        {
          id: response.data.id,
          name: capitalize(response.data.name),
          image: response.data.sprites.front_default
        }
      );
    });
  }
  
  return allPokemons;
}

export default {
  getPokemon,
  getAllPokemonNamesWithImages
};
