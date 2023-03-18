
const getAnunciosAsync = async () => {
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

let datos = await getAnunciosAsync();
datos = datos.data;
let championName = randomProperty(datos).name;
console.log(championName);





  // Select a random champion from the array
  //const randomIndex = Math.floor(Math.random() * champions.length);
  //const randomChampion = champions[randomIndex].toUpperCase();
  const randomChampion = championName.toUpperCase();
  
  // Set up the game state
  let remainingGuesses = 6;
  let guessedLetters = [];
  let wordInProgress = Array.from(randomChampion, () => "_");
  
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
      alert("You win!");
    } else if (remainingGuesses === 0) {
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
      handleGuess(letter);
    }
  });
  
  // Initialize the display
  updateDisplay();