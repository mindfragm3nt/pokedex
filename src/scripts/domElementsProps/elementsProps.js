function welcomeTextProps(welcomeText) {
  welcomeText.innerText = "Hi! :) \n What kind of pokemon are you looking for?";
  welcomeText.style.margin = '10px  '
  welcomeText.style.color = "white";
  welcomeText.style.gridRow = '3 / 5';
  welcomeText.style.gridColumn = '1 / 9';
  welcomeText.style.justifySelf = 'center';
  welcomeText.style.alignSelf = 'end';
  welcomeText.style.fontSize = '1.3em';
}

function searchInputProps(searchInput) {
  searchInput.style.width = '96%';
  searchInput.style.height = '40px';
  searchInput.style.paddingLeft = '5px';
  searchInput.style.alignSelf = 'center';

  searchInput.style.gridArea = '1';
  searchInput.style.color = 'black';
  searchInput.style.border = 'none';
  searchInput.style.outline = 'none';
  searchInput.style.background = 'transparent';
}

function listOfPokemonsProps(pokemonsList) {
  pokemonsList.id = 'pokemons-list-wrapper'
  
  pokemonsList.style.overflowY  = 'scroll';
  pokemonsList.style.gridRow = '2 / span 7';
  pokemonsList.style.gridColumn = '1 / span 8';
  // pokemonsList.style.display = 'grid';
  // pokemonsList.style.gridTemplateRows = 'repeat(auto, 50px)';

  pokemonsList.style.width = '93%';
  pokemonsList.style.maxHeight = '54vh';
  pokemonsList.style.padding = '10px';
  // pokemonsList.style.row = '2';

  pokemonsList.style.color = 'black';
  pokemonsList.style.border = 'none';
  pokemonsList.style.borderRadius = '6px';
  pokemonsList.style.background = 'white';
  pokemonsList.style.justifySelf = 'center';
}

function itemOfPokemonListProps(item, index) {
  item.id = `item-${index}`;
  item.className = 'pokemon-item'

  item.style.width = '100%';
  item.style.height = '50px';
  item.style.padding = '5px';
  item.style.display = 'flex';
  item.style.alignItems = 'center';
  item.style.borderBottom = '1px solid grey';
}

export default { welcomeTextProps, searchInputProps, listOfPokemonsProps, itemOfPokemonListProps };