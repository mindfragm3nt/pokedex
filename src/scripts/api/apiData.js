import axios from 'axios';
import { capitalize } from '../utilities/utilities.js';
import regeneratorRuntime from "regenerator-runtime";

async function getPokemon(pokemonName) {
  var obj = {};
  
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then( response => {
      obj.id = response.data.id;
      obj.name = capitalize(response.data.name);
      obj.baseExperience = response.data.base_experience;
      obj.height = response.data.height;
      obj.types = response.data.types;
      obj.weight = response.data.weight;
      obj.front_default = response.data.sprites.front_default;

      return obj;
    });
}

async function getAllPokemonNames() {
  var allPokemons = [];
  await axios.get(`https://pokeapi.co/api/v2/pokemon`)
    .then( response => {
      response.data.results.forEach( (element, index) => {
        allPokemons.push(
          {
            id: index,
            name: capitalize(element.name)
          }
        );
      });
    });

  return allPokemons;
}

async function getAllPokemonNamesWithImages() {
  var allPokemons = [];
  const NUMBER_TO_LOAD = 4;

  for(let i = 0; i < NUMBER_TO_LOAD; i++) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
    .then( response => {
      allPokemons.push(
        {
          id: i + 1,
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
  getAllPokemonNames,
  getAllPokemonNamesWithImages
};
