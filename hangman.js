import { Champion } from "./champion.js";
let finish;
const $btnReset = document.querySelector("#btnReset");
const getChampionsAsync = async () => {
  try {
    const { data } = await axios("https://ddragon.leagueoflegends.com/cdn/9.13.1/data/en_US/champion.json");
    return data;
  } catch (error) {
    console.error(error.message);
  }
  finally {
  }
};
/*const champions = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    // Add more champions here...
  ];*/
  var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  };

  let champion;

  // Select a random champion from the array
  //const randomIndex = Math.floor(Math.random() * champions.length);
  //const randomChampion = champions[randomIndex].toUpperCase();
  let randomChampion;
  let datos;
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
      finish = true;
      alert("You win!");
    } else if (remainingGuesses === 0) {
      finish = true;
      alert(`You lose! The champion was ${randomChampion}.`);
    }
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
      console.log(letter);
      if(!finish)
        handleGuess(letter);
    }
  });
  
  $btnReset.addEventListener("click",()=>{
    initVariables();
    updateDisplay();
  })
  // Initialize the display
  await initVariables();
  updateDisplay();

async function  initVariables(){
    finish = false;
    datos = await getChampionsAsync();
    datos = datos.data;
    console.log(datos);
    //Obtengo todos los key y value del champion.
    let championObj = randomProperty(datos);
    //Creo el champion seleccionado las propiedades que ya definimos en la clase.
    champion = new Champion(championObj.id, championObj.title,championObj.partype,championObj.tags,championObj.blurb);
    randomChampion = champion.name.toUpperCase();
  
  // Set up the game state
    remainingGuesses = 6;
    guessedLetters = [];
    wordInProgress = Array.from(randomChampion, () => "_");
  }