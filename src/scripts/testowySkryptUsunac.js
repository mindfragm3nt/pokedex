var element = document.getElementById('screen');

function welcomeText() {
  let welcomeText = document.createElement('p');

  welcomeText.innerText = "Hi! \n What do you need to know? :)";
  welcomeText.style.color = "white";
  welcomeText.style.gridRow = '3 / 5';
  welcomeText.style.gridColumn = '1 / 9';
  welcomeText.style.justifySelf = 'center';
  welcomeText.style.alignSelf = 'end';
  welcomeText.style.fontSize = '1.3em';

  element.appendChild(welcomeText);
}

welcomeText();

document.getElementById('loupe-image').addEventListener('click', () => {
  document.createElement('input')
  console.log('lupa klik');
});