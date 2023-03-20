import { Champion } from "./champion.js";

const $finishedDiv = document.querySelector('#gameFinished');
const $finishedIMG = document.querySelector('#gameFinishedIMG');
const $finishedPAR = document.querySelector('#gameFinishedTEXT');
let finish;
const $btnReset = document.querySelector("#btnReset");
const getChampionsAsync = async () => {
  try {
    const { data } = await axios("https://ddragon.leagueoflegends.com/cdn/9.13.1/data/en_US/champion.json");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

 var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  };

  let champion;

  // Select a random champion from the array
  //const randomIndex = Math.floor(Math.random() * champions.length);
  //const randomChampion = champions[randomIndex].toUpperCase();
  let randomChampion;
  let datos = await getChampionsAsync();
  datos = datos.data;
  // Set up the game state
  let remainingGuesses;
  let guessedLetters;
  let wordInProgress;

  

  // Define a function to update the display
  function updateDisplay() {
    // Show the word in progress
    const wordElement = document.getElementById("word");
    wordElement.textContent = wordInProgress.join(" ");
  
    // Show the remaining guesses
    const remainingGuessesElement = document.getElementById("remaining-guesses");
    remainingGuessesElement.textContent = remainingGuesses;
  
    // Show the guessed letters
    const guessedLettersElement = document.getElementById("guessed-letters");
    guessedLettersElement.textContent = guessedLetters.join(", ");
  
    // Check for a win or loss
    if (!wordInProgress.includes("_")) {
      win();
      
      
      //hacer funcion win y lose para tener todo.
    } else if (remainingGuesses === 0) {
      lose(); 
    }
  }
  //probalmetne se puedan combinar las funcione slseo y win porqeu son iguales mtemos un IF pero bueno VEMOS XDDD 
  function win(){
    finish = true;
    alert("You win!");
    //hardcoedaa la version dsp por ahi hay que cambiarlo 
    let imageUrl = `http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${champion.name}.png`;
    let championImage = document.createElement('img');
    let championMensaje = document.createElement('p');
    let text = document.createTextNode(champion.blurb);
    championMensaje.appendChild(text);
    championImage.src = imageUrl;

    $finishedIMG.appendChild(championImage);
    $finishedPAR.appendChild(championMensaje);
  }

  function lose(){
    finish = true;
    alert(`You lose! The champion was ${randomChampion}.`);
    //hardcoedaa la version dsp por ahi hay que cambiarlo 
    let imageUrl = `http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${champion.name}.png`;
    let championImage = document.createElement('img');
    let championMensaje = document.createElement('p');
    let text = document.createTextNode(champion.blurb);
    championMensaje.appendChild(text);
    championImage.src = imageUrl;

    $finishedIMG.appendChild(championImage);
    $finishedPAR.appendChild(championMensaje);
  }


  // Define a function to handle guesses
  function handleGuess(letter) {
    if (guessedLetters.includes(letter)) {
      alert("You already guessed that letter!");
      return;
    }
  
    guessedLetters.push(letter);
  
    if (randomChampion.includes(letter)) {
      for (let i = 0; i < randomChampion.length; i++) {
        if (randomChampion[i] === letter) {
          wordInProgress[i] = letter;
        }
      }
    } else {
      remainingGuesses--;
    }
    
    updateDisplay();
  }
  
  // Set up event listeners
  document.addEventListener("keydown", event => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const letter = event.key.toUpperCase();
      if(!finish){
        handleGuess(letter);
      }
    }
  });
  
  $btnReset.addEventListener("click",()=>{
    initVariables();
    updateDisplay();
  })
  // Initialize the display
  initVariables();
  updateDisplay();

function  initVariables(){
    finish = false;
    // en datos.data estan los champions en forma de objeto 
    //Obtengo todos los key y value del champion.
    let championObj = randomProperty(datos);
    console.log(datos);
    //Creo el champion seleccionado las propiedades que ya definimos en la clase.
    champion = new Champion(championObj.id, championObj.title,championObj.partype,championObj.tags,championObj.blurb);
    randomChampion = champion.name.toUpperCase();
    $finishedIMG.innerHTML = ' ';
    $finishedPAR.innerHTML = ' ';
    
  // Set up the game state
    remainingGuesses = 5;
    guessedLetters = [];
    wordInProgress = Array.from(randomChampion, () => "_");
  }