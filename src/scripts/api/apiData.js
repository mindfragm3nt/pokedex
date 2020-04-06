import axios from 'axios';

export default { getPokemon };

async function getPokemon(pokemonName) {
  await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then( response => {
      console.log('response', response);
    })
}