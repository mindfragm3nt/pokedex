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

export { welcomeTextProps, searchInputProps };