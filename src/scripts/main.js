import apiData from './api/apiData.js';
import elementsProps from './domElementsProps/elementsProps.js';

var isLoupeClicked = false;
var element = document.getElementById('screen');
var loupeElement = document.getElementById('loupe-image');
var clickedPokemonItem = null;

loupeElement.addEventListener('click', () => {
  if(isLoupeClicked === false) {
    clearAlreadyDisplayedPokemon();
    creatingSearchInput();
  }
});

document.body.addEventListener('click', (event) => {
  unfocusSearchInput(event);  
});

function welcomeText() {
  let welcomeText = document.createElement('p');
  welcomeText.id = 'welcome-text';

  elementsProps.welcomeTextProps(welcomeText);
  element.appendChild(welcomeText);
}
welcomeText();

function hideNotMatchingItems() {
  const searchInput = document.querySelector('input');
  var pokemonsList = document.getElementById('pokemons-list-wrapper');
  var childrenNumber = pokemonsList.childNodes.length;

  searchInput.addEventListener('input', () => {
    let inputValue = document.querySelector('input').value;
    for(let i = 0; i < childrenNumber; i++) {
      let item = pokemonsList.children[i];
      let itemTextParagraph = item.querySelector('p');

      if(!itemTextParagraph.innerText.includes(inputValue)) {
        item.style.display = 'none';
        itemTextParagraph.style.display = 'none';
      } else {
        item.style.display = 'flex';
        itemTextParagraph.style.display = 'flex';
      }
    }
  });
}

function clearAlreadyDisplayedPokemon() {
  const customInput = document.getElementById('custom-input');
  const pokemonName = document.querySelector('#custom-input h3');
  const screen = document.getElementById('screen');

  const image = document.querySelector('#screen img');
  const typeLabel = document.querySelector('#screen h5');
  const typeList = document.querySelector('#screen ul');

  if(image !== null &&
      typeLabel !== null &&
      typeList !== null
  ) {
    screen.removeChild(image);
    screen.removeChild(typeLabel);
    screen.removeChild(typeList);
  }

  if(pokemonName !== null && pokemonName.innerHTML !== '') {
    customInput.removeChild(pokemonName);
  }
}

function creatingSearchInput() {
  const inputHolder = document.getElementById('custom-input');
  const customInput = document.getElementById('custom-input').style; 
  const searchInput = document.createElement('input');
  elementsProps.searchInputProps(searchInput);

  loupeElement.style.background = 'url("src/assets/images/loupe-dark.svg") no-repeat center center'
  customInput.background = 'white';
  customInput.padding = '5px';
  customInput.borderRadius = '6px 0 0 6px';
  
  document.getElementById('loupe-image-background').style.background = 'white';
  inputHolder.appendChild(searchInput);
  searchInput.focus();

  listOfPokemons();
  isLoupeClicked = true;
}

async function listOfPokemons() {
  if(isLoupeClicked === false) {
    let pokemonsArray = await apiData.getAllPokemonNames()
      .then( result => { return result; });
    
    const screen = document.getElementById('screen');
    let wrapper = document.createElement('div');
    elementsProps.listOfPokemonsProps(wrapper);
    screen.appendChild(wrapper);

    const listWrapper = document.getElementById('pokemons-list-wrapper');
    const pokemonsCount = pokemonsArray.length;

    for(let i = 0; i < pokemonsCount; i++) {
      let item = document.createElement('div');
      
      elementsProps.itemOfPokemonListProps(item, i);
      item.innerHTML = `
        <p id="pokemon-item-paragraph-${i}"
          style="padding-left: 10px; margin: 0">${pokemonsArray[i].name}</p>
      `;
      listWrapper.appendChild(item);
    }
    hideNotMatchingItems();
  }
}

async function unfocusSearchInput(event) {
  clickedPokemonItem = event.target;
  removeWelcomeText(clickedPokemonItem);
  
  if(clickedPokemonItem.id.substring(0,5) === 'item-' ||
    clickedPokemonItem.id.substring(0,23) === 'pokemon-item-paragraph-'
  ) {
    var pokemonName;
    if(clickedPokemonItem.children[0] !== undefined) {
      pokemonName = clickedPokemonItem.children[0].innerText
    } else {
      pokemonName = clickedPokemonItem.innerText;
    }

    let pokemon = await apiData.getPokemon(pokemonName).then(result => {
      return result;
    });

    pokemonDataPresenter(pokemon);
  }

  if(isLoupeClicked === true &&
    event.target !== loupeElement && 
    event.target !== document.getElementById('custom-input') &&
    event.target !== document.getElementById('loupe-image-background') &&
    event.target !== document.getElementById('pokemons-list-wrapper') &&
    event.target !== document.querySelector('input')
  ) {
    hidePokemonList();
  }
}

function removeWelcomeText(target) {
  if(document.getElementById('welcome-text') !== null &&
    (target.id.substring(0,5) === 'item-' ||
      target.id.substring(0,23) === 'pokemon-item-paragraph-'
    )
  ) {
    const screen = document.getElementById('screen');
    const welcomeText = document.getElementById('welcome-text');
    
    screen.removeChild(welcomeText);
  }
}

function pokemonDataPresenter(pokemonData) {
  const customInput = document.getElementById('custom-input');
  const screen = document.getElementById('screen');
  const pokemonName = document.createElement('h3');

  const pokemonImage = document.createElement('img');
  const pokemonTypeLabel = document.createElement('h5');
  const pokemonTypeList = document.createElement('ul');

  pokemonName.innerHTML = pokemonData.name;
  pokemonImage.src = pokemonData.sprites.front_default;
  elementsProps.dataPresenterProps(pokemonName, pokemonImage, pokemonTypeLabel, pokemonTypeList)

  pokemonData.types.forEach((element) => {
    let type = document.createElement('li');
    type.innerHTML = element.type.name;

    elementsProps.liElementProps(type);
    pokemonTypeList.appendChild(type);
  });

  customInput.appendChild(pokemonName);
  screen.appendChild(pokemonImage);
  screen.appendChild(pokemonTypeLabel);
  screen.appendChild(pokemonTypeList);
}

function hidePokemonList() {
  const screen = document.getElementById('screen');
  const customInput = document.getElementById('custom-input');
  const input = document.querySelector('input');
  const listWrapper = document.getElementById('pokemons-list-wrapper');

  loupeElement.style.background = 'url("src/assets/images/loupe-light.svg") no-repeat center center'
  customInput.style.background = 'transparent';
  document.getElementById('loupe-image-background').style.background = 'transparent';

  customInput.removeChild(input);
  screen.removeChild(listWrapper);

  isLoupeClicked = false;
}
