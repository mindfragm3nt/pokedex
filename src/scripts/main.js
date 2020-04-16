import apiData from './api/apiData.js';
import elementsProps from './domElementsProps/elementsProps.js';
import { leftArrowClick, rightArrowClick } from './pokemonCardPicker.js';
import { ALL_POKEMONS } from './api/allPokemonsArray.js';

const LOUPE_ELEMENT = document.getElementById('loupe-image');
const LEFT_ARROW = document.getElementById('left-arrow');
const RIGHT_ARROW = document.getElementById('right-arrow');

var clickedPokemonItem = null;
var isLoupeClicked = false;

LOUPE_ELEMENT.addEventListener('click', () => {
  if(isLoupeClicked === false) {
    clearAlreadyDisplayedPokemon();
    creatingSearchInput();
  }
});

document.body.addEventListener('click', (event) => {
  unfocusSearchInput(event);
  allPokemonListComponent(event);
});

LEFT_ARROW.addEventListener('click', () => {
  leftArrowClick();
});

RIGHT_ARROW.addEventListener('click', () => {
  rightArrowClick();
});

function welcomeText() {
  const SCREEN_ELEMENT = document.getElementById('screen');
  let welcomeText = document.createElement('p');
  welcomeText.id = 'welcome-text';

  elementsProps.welcomeTextProps(welcomeText);
  SCREEN_ELEMENT.appendChild(welcomeText);
}

welcomeText();

function allPokemonListComponent() {
  var target = event.target;

  var pokemonName;
  if(target.id.substring(0,4) === 'all-') {
    pokemonName = target.querySelector('p').innerHTML;
    pokemonName = pokemonName.substring(pokemonName.indexOf(' ') + 1);

    clearAlreadyDisplayedPokemon();
    loadPokemonSelectedFromList(target, pokemonName);

  } else if(target.parentNode.id.substring(0,4) === 'all-') {
    target = target.parentNode;
    pokemonName = target.querySelector('p').innerHTML;
    pokemonName = pokemonName.substring(pokemonName.indexOf(' ') + 1);

    clearAlreadyDisplayedPokemon();
    loadPokemonSelectedFromList(target, pokemonName);
  }
}

async function loadPokemonSelectedFromList(target, pokemonName) {
  removeWelcomeText(target);

  let pokemon = await apiData.getPokemon(pokemonName).then(result => {
    return result;
  });

  pokemonDataPresenter(pokemon);
}

function hideNotMatchingItems() {
  const SEARCH_INPUT = document.querySelector('input');
  var pokemonsList = document.getElementById('pokemons-list-wrapper');
  var childrenNumber = pokemonsList.childNodes.length;

  SEARCH_INPUT.addEventListener('input', () => {
    let inputValue = document.querySelector('input').value;
    for(let i = 0; i < childrenNumber; i++) {
      let item = pokemonsList.children[i];
      let itemTextParagraph = item.querySelector('p');

      if(!itemTextParagraph.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
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
  const CUSTOM_INPUT = document.getElementById('custom-input');
  const POKEMON_NAME = document.querySelector('#custom-input h3');
  const SCREEN = document.getElementById('screen');

  const IMAGE = document.querySelector('#screen img');
  const TYPE_LABEL = document.querySelector('#screen h5');
  const TYPE_LIST = document.querySelector('#screen ul');
  
  const WEIGHT = document.querySelector('#screen #weight-label');
  const BASIC_EXPIRIENCE = document.querySelector('#screen #basic-exp-label');

  if(IMAGE !== null &&
    TYPE_LABEL !== null &&
    TYPE_LIST !== null &&
    WEIGHT !== null &&
    BASIC_EXPIRIENCE !== null
  ) {
    SCREEN.removeChild(IMAGE);
    SCREEN.removeChild(TYPE_LABEL);
    SCREEN.removeChild(TYPE_LIST);
    SCREEN.removeChild(WEIGHT);
    SCREEN.removeChild(BASIC_EXPIRIENCE);
  }

  if(POKEMON_NAME !== null && POKEMON_NAME.innerHTML !== '') {
    CUSTOM_INPUT.removeChild(POKEMON_NAME);
  }
}

function creatingSearchInput() {
  const INPUT_HOLDER = document.getElementById('custom-input');
  const CUSTOM_INPUT = document.getElementById('custom-input').style; 
  const SEARCH_INPUT = document.createElement('input');
  elementsProps.searchInputProps(SEARCH_INPUT);

  LOUPE_ELEMENT.style.background = 'url("src/assets/images/loupe-dark.svg") no-repeat center center'
  CUSTOM_INPUT.background = 'white';
  CUSTOM_INPUT.padding = '5px';
  CUSTOM_INPUT.borderRadius = '6px 0 0 6px';
  
  document.getElementById('loupe-image-background').style.background = 'white';
  INPUT_HOLDER.appendChild(SEARCH_INPUT);
  SEARCH_INPUT.focus();

  listOfPokemons();
  isLoupeClicked = true;
}

function listOfPokemons() {
  if(isLoupeClicked === false) {
    const SCREEN = document.getElementById('screen');
    const WRAPPER = document.createElement('div');
    elementsProps.listOfPokemonsProps(WRAPPER);
    SCREEN.appendChild(WRAPPER);

    const LIST_WRAPPER = document.getElementById('pokemons-list-wrapper');
    const POKEMONS_COUNT = ALL_POKEMONS.length;

    for(let i = 0; i < POKEMONS_COUNT; i++) {
      let item = document.createElement('div');
      
      elementsProps.itemOfPokemonListProps(item, i);
      item.innerHTML = `
        <p id="pokemon-item-paragraph-${i}"
          style="padding-left: 10px; margin: 0">${ALL_POKEMONS[i].name}</p>
      `;
      LIST_WRAPPER.appendChild(item);
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
    let pokemonName;
    if(clickedPokemonItem.children[0] !== undefined) {
      pokemonName = clickedPokemonItem.children[0].innerText;
    } else {
      pokemonName = clickedPokemonItem.innerText;
    }

    let pokemon = await apiData.getPokemon(pokemonName).then(result => {
      return result;
    });

    pokemonDataPresenter(pokemon);
  }

  if(isLoupeClicked === true &&
    event.target !== LOUPE_ELEMENT && 
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
      target.id.substring(0,23) === 'pokemon-item-paragraph-' ||
      target.id.substring(0,4) === 'all-' ||
      target.id.substring(0,9) === 'list-img-'
    )
  ) {
    const SCREEN = document.getElementById('screen');
    const WELCOME_TEXT = document.getElementById('welcome-text');
    
    SCREEN.removeChild(WELCOME_TEXT);
  }
}

function pokemonDataPresenter(pokemonData) {
  const CUSTOM_INPUT = document.getElementById('custom-input');
  const SCREEN = document.getElementById('screen');
  const POKEMON_NAME = document.createElement('h3');

  const POKEMON_IMAGE = document.createElement('img');
  const POKEMON_TYPE_LABEL = document.createElement('h5');
  const POKEMON_TYPE_LIST = document.createElement('ul');

  const FEATURES_LABEL = document.createElement('h5');
  const BASIC_EXPIRIENCE = document.createElement('p');
  const WEIGHT = document.createElement('p');

  POKEMON_NAME.innerHTML = pokemonData.name;
  POKEMON_IMAGE.src = pokemonData.front_default;
  BASIC_EXPIRIENCE.innerHTML = `Basic exp: ${pokemonData.baseExperience}`;
  WEIGHT.innerHTML = `Weight: ${pokemonData.weight} lbs`;

  elementsProps.dataPresenterProps(POKEMON_NAME, POKEMON_IMAGE,
    POKEMON_TYPE_LABEL, POKEMON_TYPE_LIST, FEATURES_LABEL,
    BASIC_EXPIRIENCE, WEIGHT
  );

  pokemonData.types.forEach((element) => {
    let type = document.createElement('li');
    type.innerHTML = element.type.name;

    elementsProps.liElementProps(type);
    POKEMON_TYPE_LIST.appendChild(type);
  });

  CUSTOM_INPUT.appendChild(POKEMON_NAME);
  SCREEN.appendChild(POKEMON_IMAGE);
  SCREEN.appendChild(POKEMON_TYPE_LABEL);
  SCREEN.appendChild(POKEMON_TYPE_LIST);

  // SCREEN.appendChild(FEATURES_LABEL);
  SCREEN.appendChild(BASIC_EXPIRIENCE);
  SCREEN.appendChild(WEIGHT);
}

function hidePokemonList() {
  const SCREEN = document.getElementById('screen');
  const CUSTOM_INPUT = document.getElementById('custom-input');
  const INPUT = document.querySelector('input');
  const LIST_WRAPPER = document.getElementById('pokemons-list-wrapper');

  LOUPE_ELEMENT.style.background = 'url("src/assets/images/loupe-light.svg") no-repeat center center'
  CUSTOM_INPUT.style.background = 'transparent';
  document.getElementById('loupe-image-background').style.background = 'transparent';

  CUSTOM_INPUT.removeChild(INPUT);
  SCREEN.removeChild(LIST_WRAPPER);

  isLoupeClicked = false;
}
