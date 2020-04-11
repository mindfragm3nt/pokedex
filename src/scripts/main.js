import apiData from './api/apiData.js';
import elementsProps from './domElementsProps/elementsProps.js';

var isLoupeClicked = false;
var element = document.getElementById('screen');
var loupeElement = document.getElementById('loupe-image');
var clickedPokemonItem = null;

loupeElement.addEventListener('click', () => {
  if(isLoupeClicked === false) {
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

  searchInput.addEventListener('input', (event) => {
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
    let pokemonsArray = await apiData.getAllPokemonNames().then(result => {
      
      return result;
    });
    
    const screenElement = document.getElementById('screen');
    let wrapper = document.createElement('div');

    elementsProps.listOfPokemonsProps(wrapper);
    screenElement.appendChild(wrapper);

    const listWrapper = document.getElementById('pokemons-list-wrapper');
    const pokemonsCount = pokemonsArray.length;

    for(let i = 0; i < pokemonsCount; i++) {
      let item = document.createElement('div');
      
      elementsProps.itemOfPokemonListProps(item, i);
      item.innerHTML = `
        <p class="pokemon-item-paragraph"
          style="padding-left: 10px; margin: 0">${pokemonsArray[i].name}</p>
      `;

      listWrapper.appendChild(item);
    }

    hideNotMatchingItems();
  }
}

async function unfocusSearchInput(event) {
  clickedPokemonItem = event.target;
  try {
    let pokemonName = clickedPokemonItem.children[0].innerText;
    let pokemon = await apiData.getPokemon(pokemonName).then(result => {
      return result;
    });



  } catch {
    console.log('Info: this element has no text value inside.');
  }
  
  if(isLoupeClicked === true &&
    event.target !== loupeElement && 
    event.target !== document.getElementById('custom-input') &&
    event.target !== document.getElementById('loupe-image-background') &&
    event.target !== document.getElementById('pokemons-list-wrapper') &&
    event.target !== document.querySelector('input')
  ) {
    const customInput = document.getElementById('custom-input');
    const screen = document.getElementById('screen');
    const input = document.querySelector('input');
    const listWrapper = document.getElementById('pokemons-list-wrapper');
    const welcomeText = document.getElementById('welcome-text');

    loupeElement.style.background = 'url("src/assets/images/loupe-light.svg") no-repeat center center'
    customInput.style.background = 'transparent';
    document.getElementById('loupe-image-background').style.background = 'transparent';
    customInput.removeChild(input);
    screen.removeChild(listWrapper);
    screen.removeChild(welcomeText);

    isLoupeClicked = false;
    // welcomeText();
  }
}

function pokemonDataPresenter() {
  
}
