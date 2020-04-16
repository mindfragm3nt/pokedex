import apiData from './api/apiData.js';
import { capitalize } from './utilities/utilities.js';

const PAGE_ITEMS_CAPACITY = 4;
var currStartIndexPokemon = 1;
var bottomRowIsHidden = false;

export function leftArrowClick() {
  var SHIFT = -4;
  currStartIndexPokemon = currStartIndexPokemon - PAGE_ITEMS_CAPACITY;
  currStartIndexPokemon < 1 ? currStartIndexPokemon = 1 :
    currStartIndexPokemon = currStartIndexPokemon;

  reloadData(currStartIndexPokemon);

  controlVisibilityOfArrows(SHIFT);
}

export function rightArrowClick() {
  const SHIFT = 4;
  currStartIndexPokemon = currStartIndexPokemon + PAGE_ITEMS_CAPACITY;
  reloadData(currStartIndexPokemon);
  
  controlVisibilityOfArrows(SHIFT);
}

async function loadCards(startIndex) {
  var allPokemons =  await apiData.getAllPokemonNamesWithImages(startIndex)
    .then(response => {
      return response;
    });
  
  const screen = document.getElementById('screen-all-pokemons');

  for(let i = 0; i < allPokemons.length; i++) {
    let containerDiv = document.createElement('div');
    containerDiv.id = `all-${i + 1}`
    containerDiv.className = 'card';
    screen.appendChild(containerDiv);

    let pokemonImg = document.createElement('img');
    pokemonImg.id = `list-img-${i + 1}`;
    pokemonImg.src = allPokemons[i].image;
    pokemonImg.style.width = 'auto';
    pokemonImg.style.height = '100%';
    pokemonImg.style.maxHeight = '94px';

    let name = document.createElement('p');
    let pokemonID = allPokemons[i].id;
    name.innerHTML = `${pokemonID}. ${capitalize(allPokemons[i].name)}`;

    containerDiv.appendChild(pokemonImg);
    containerDiv.appendChild(name);
  }
}

async function reloadData(startIndex) {
  const ID_TRESHOLD = 149;

  if(startIndex < ID_TRESHOLD) {
    var allPokemons =  await apiData.getAllPokemonNamesWithImages(startIndex)
      .then(response => {
        return response;
      });

    showBottomRow();
    for(let i = 0; i < 4; i++) {
      contentReplacement(allPokemons, i);
    }
  } else {
    var allPokemons =  await apiData.getAllPokemonNamesWithImages(startIndex)
      .then(response => {
        return response;
      });

    for(let i = 0; i < 2; i++) {
      contentReplacement(allPokemons, i);
      hideBottomRow();
    }
  }
}

function contentReplacement(allPokemons, index) {
  let card = document.getElementById(`all-${index + 1}`);

  let img = card.querySelector('img');
  img.src = allPokemons[index].image;
  
  let pokemonID = allPokemons[index].id;
  let name = card.querySelector('p');
  name.innerHTML = `${pokemonID}. ${capitalize(allPokemons[index].name)}`;
}

function hideBottomRow() {
  document.getElementById('all-3').style.visibility = 'hidden';
  document.getElementById('all-4').style.visibility = 'hidden';
  bottomRowIsHidden = true;
}

function showBottomRow() {
  if(bottomRowIsHidden === true) {
    document.getElementById('all-3').style.visibility = 'visible';
    document.getElementById('all-4').style.visibility = 'visible';
    bottomRowIsHidden === false;
  }
}

function controlVisibilityOfArrows(shift) {
  const ID_TRESHOLD = 148;
  const FIRST_POKEMON_ON_PAGE = 1;
  const PENULTIMATE_POKEMON_API_DB = 146;

  let firstPokemonFromList = document.getElementById('all-1').querySelector('p').innerText;
  let lastPokemonFromList = document.getElementById('all-4').querySelector('p').innerText;

  firstPokemonFromList = firstPokemonFromList.substr(0, firstPokemonFromList.indexOf('.'));

  if(currStartIndexPokemon < ID_TRESHOLD) {
    lastPokemonFromList = lastPokemonFromList.substr(0, lastPokemonFromList.indexOf('.'));
  } else {
    lastPokemonFromList = document.getElementById('all-2').querySelector('p').innerText;
    lastPokemonFromList = lastPokemonFromList.substr(0, lastPokemonFromList.indexOf('.'));
  }

  if(Number(firstPokemonFromList) + shift === FIRST_POKEMON_ON_PAGE) {
    document.getElementById('left-arrow').style.visibility = 'hidden';
  } else {
    document.getElementById('left-arrow').style.visibility = 'visible';
  }

  if(lastPokemonFromList == PENULTIMATE_POKEMON_API_DB) {
    document.getElementById('right-arrow').style.visibility = 'hidden';
  } else {
    document.getElementById('right-arrow').style.visibility = 'visible';
  }
}

loadCards(currStartIndexPokemon);
