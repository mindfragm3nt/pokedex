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

  pokemonsList.style.width = '93%';
  pokemonsList.style.maxHeight = '54vh';
  pokemonsList.style.padding = '10px';

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

function dataPresenterProps(pokemonName, pokemonImage, pokemonTypeLabel,
  pokemonListType, featuresLabel, basicExpirience, weight
) {
  pokemonName.style.gridRow = '1 / 7';
  pokemonName.style.gridColumns = '1';
  pokemonName.style.color = 'white';
  pokemonName.style.fontWeight = 'bold';

  pokemonImage.style.gridRow = '2/6';
  pokemonImage.style.gridColumn = '1/9';
  pokemonImage.style.justifySelf = 'center';
  pokemonImage.style.width = '30vw';
  pokemonImage.style.height = '32vh';
  pokemonImage.style.minWidth = '264px';
  pokemonImage.style.maxWidth = '323px';

  pokemonTypeLabel.innerHTML = 'Type';
  pokemonTypeLabel.style.gridRow = '5';
  pokemonTypeLabel.style.gridColumn = '1/5';
  pokemonTypeLabel.style.color = 'white';
  pokemonTypeLabel.style.fontWeight = 'bold';
  pokemonTypeLabel.style.marginLeft = '7%';

  basicExpirience.id = 'basic-exp-label';
  basicExpirience.style.marginTop = '-30px';
  basicExpirience.style.marginLeft = '20px';
  basicExpirience.style.gridRow = '6';
  basicExpirience.style.gridColumn = '5/9';
  basicExpirience.style.fontWeight = 'bold';

  weight.id = 'weight-label';
  weight.style.marginTop = '-6px';
  weight.style.marginLeft = '20px';
  weight.style.gridRow = '6';
  weight.style.gridColumn = '5/9';
  weight.style.fontWeight = 'bold';

  pokemonListType.style.gridRow = '6';
  pokemonListType.style.gridColumn = '1';
  pokemonListType.style.margin = '-30px 0 0 100%';
}

function liElementProps(element) {
  element.style.color = 'white';
  element.style.fontWeight = 'bold';
  element.style.listStyleType = 'circle';
}

export default {
  welcomeTextProps,
  searchInputProps,
  listOfPokemonsProps,
  itemOfPokemonListProps,
  dataPresenterProps,
  liElementProps
};