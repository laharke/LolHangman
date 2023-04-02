import { Champion } from "./champion.js";

const $finishedDiv = document.querySelector('#gameFinished');
//el finsiediv no se usa, lo cmaibe por dos div difrentes ne el html para poder centrar
const $finishedIMG = document.querySelector('#gameFinishedIMG');
const $finishedPAR = document.querySelector('#gameFinishedTEXT');
let finish;
const $btnReset = document.querySelector("#btnReset");
//inicio el score chally, la joda es reinciarlo, si se pierde o se reinicia el juego
//y sumarlo si ganas esa ronda.
let score = 0;
//variable local para guardar el highest score a medida que se vaya rompiendo
localStorage.setItem("higest-score", 0);

console.log(localStorage.getItem("higest-score"));

const getChampionsAsync = async () => {
  try {
    const { data } = await axios("https://ddragon.leagueoflegends.com/cdn/9.13.1/data/en_US/champion.json");
    return data;
  } catch (error) {
    //console.error(error.message);
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
  
    let scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score;  


    //esconder el next guess button.


    // Check for a win or loss
    if (!wordInProgress.includes("_")) {
      win();
      
      
      //hacer funcion win y lose para tener todo.
    } else if (remainingGuesses === 0) {
      lose(); 
    }
  }
  //probalmetne se puedan combinar las funciones lose y win porqeu son iguales mtemos un IF pero bueno VEMOS XDDD 
  function win(){
    finish = true;
    score = score + 1;
    //update el score
    //lo puse aca y no en el update display asi se acutaliza el score apenas divinesn
    //aunque tambien lo pongo neel diplsay PARA QUE se vea cuando resetamos.
    let scoreElement = document.getElementById("score");
    //cometno este const porque ya lo llamo arriba por preimra vez cas iseguro.
    scoreElement.textContent = "Score: " + score;  


    alert("You win!");
    //hardcoedaa la version dsp por ahi hay que cambiarlo 
    let imageUrl = `http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${champion.name}.png`;
    let championImage = document.createElement('img');
    let championMensaje = document.createElement('p');
    let text = document.createTextNode(champion.blurb);
    championMensaje.appendChild(text);
    championImage.src = imageUrl;

//apendeo en dos lguar distintos apr apoder hacer center
    $finishedIMG.appendChild(championImage);
    $finishedPAR.appendChild(championMensaje);
// quiero appendar al lado del boton RESET un boton que sea the NEXT GUESS osea lo tocas y te manteine el score y seguis adivaindo uan vez temrianste de ver la fotito del champ
    const resestDiv = document.getElementById("resetNextDiv");
    let btn = document.createElement("button");
    btn.innerHTML = "Next Guess";
    btn.id = "nextGuessButton";
    btn.onclick = function() {
      initVariables();
      updateDisplay();
      btn.remove();
    }
    resestDiv.appendChild(btn);

  }

  function lose(){
    finish = true;
    
    let higestScore = localStorage.getItem("higest-score");
    if (score > higestScore){
      localStorage.setItem("higest-score", score)
      let hsDOM = document.getElementById("higest-score");
      hsDOM.innerHTML = "Highest Score: " + localStorage.getItem("higest-score");
    }

    score = 0;
    alert(`You lose! The champion was ${randomChampion}.`);
    //hardcoedaa la version dsp por ahi hay que cambiarlo 
    let imageUrl = `http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${champion.name}.png`;
    let championImage = document.createElement('img');
    let championMensaje = document.createElement('p');
    let text = document.createTextNode(champion.blurb);
    championMensaje.appendChild(text);
    championImage.src = imageUrl;
//apendeo en dos lguar distintos apr apoder hacer center
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

     //cuando tocas RESET  tmb termino un game, asiqeu hay que updatear el higest score, tmb cuando perdes.
    
     let higestScore = localStorage.getItem("higest-score");
     if (score > higestScore){
       localStorage.setItem("higest-score", score)
       let hsDOM = document.getElementById("higest-score");
       hsDOM.innerHTML = "Highest Score: " + localStorage.getItem("higest-score");
     }

    //pongo el score 0 aca porque franky hizo el init mal.
    score = 0;

    initVariables();
    updateDisplay();
    //si ganaste una el boton de next guess va a estar ahi, si dsp tocas RESET hay que esconderlo

    if (document.getElementById("nextGuessButton")){
      document.getElementById("nextGuessButton").remove();
    }
  })
  // Initialize the display
  initVariables();
  updateDisplay();

function  initVariables(){
    finish = false;
    // en datos.data estan los champions en forma de objeto 
    //Obtengo todos los key y value del champion.
    let championObj = randomProperty(datos);
    //Creo el champion seleccionado las propiedades que ya definimos en la clase.
    champion = new Champion(championObj.id, championObj.title,championObj.partype,championObj.tags,championObj.blurb);
    randomChampion = champion.name.toUpperCase();
    console.log(randomChampion);
    // por ahi podriamos meter esto en un div solo pero nose centrar bien 
    $finishedIMG.innerHTML = ' ';
    $finishedPAR.innerHTML = ' ';
    
  // Set up the game state
    remainingGuesses = 5;
    guessedLetters = [];
    wordInProgress = Array.from(randomChampion, () => "_");
  }