import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

async function getPokemon(pokemonName) {
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then( response => response.data);
}

async function getAllPokemonNames() {
  var allPokemons = [];
  await axios.get(`https://pokeapi.co/api/v2/pokemon`)
    .then( response => {
      response.data.results.forEach( (element, index) => {
        allPokemons.push(
          {
            id: index,
            name: element.name
          }
        );
      });
    });

  return allPokemons;
}

export default { getPokemon, getAllPokemonNames };
