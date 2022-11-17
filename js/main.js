/*
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle;

Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/
//========================================================================
const selectDifficulty = document.getElementById("select_difficulty");
const squaresContainer = document.querySelector(".container");
const startGame = document.getElementById("play");
let clicks = 0;

//========================================================================
startGame.addEventListener("click", function () {

  squaresContainer.innerHTML = "";

  const difficulty = selectDifficulty.value;

  const totalSquares = numSquares(difficulty);

  //========================================================================
  const myArrNumEasy = genArrNumUniciRandomMinMax(16, 1, 100);
  console.log(myArrNumEasy);
  const myArrNumMid = genArrNumUniciRandomMinMax(16, 1, 81);
  const myArrNumHard = genArrNumUniciRandomMinMax(16, 1, 49);

  //========================================================================
  function randomInteger(min, max) {
    return (Math.floor(Math.random() * ((max + 1) - min) + min));
  }

  //========================================================================
  function genArrNumUniciRandomMinMax(howMany, minNum, maxNum) {
    const newArr = [];

    while (newArr.length < howMany) {
      let newNumber = randomInteger(minNum, maxNum);

      if (!newArr.includes(newNumber)) {
        newArr.push(newNumber);
      }
    }

    return newArr;
  };

  //========================================================================
  for (let i = 1; i <= totalSquares; i++) {

    let newElement = createBox("div", "box");
    let newContent = addContent("span", i);

    squaresContainer.append(newElement);
    newElement.append(newContent);

    newElement.addEventListener("click", function () {
      this.classList.add("clicked");
      console.log(i);

      if (myArrNumEasy.includes(i) && parseInt(difficulty) === 1) {
        this.classList.add("lose");
        alert("Hai perso")
      } else if (myArrNumMid.includes(i) && parseInt(difficulty) === 2) {
        this.classList.add("lose");
      } else if (myArrNumHard.includes(i) && parseInt(difficulty) === 3) {
        this.classList.add("lose");
      } else {
        scoreCount();
      }
    });
  };
});

//========================================================================
function createBox(elementType, myClass) {

  const square = document.createElement(elementType);
  square.classList.add(myClass);

  return square;
}

//========================================================================
function addContent(elementType, content) {

  const squareNumber = document.createElement(elementType);
  squareNumber.textContent = (content);

  return squareNumber;
}

//========================================================================
function numSquares(difficulty) {

  if (parseInt(difficulty) === 1) {
    let numSquares = 100;
    squaresContainer.classList.add("container-easy");
    squaresContainer.classList.remove("container-mid");
    squaresContainer.classList.remove("container");
    squaresContainer.classList.remove("container-hard");
    return numSquares;
  }
  if (parseInt(difficulty) === 2) {
    let numSquares = 81;
    squaresContainer.classList.add("container-mid");
    squaresContainer.classList.remove("container-easy");
    squaresContainer.classList.remove("container");
    squaresContainer.classList.remove("container-hard");
    return numSquares;
  }
  if (parseInt(difficulty) === 3) {
    let numSquares = 49;
    squaresContainer.classList.add("container-hard");
    squaresContainer.classList.remove("container-mid");
    squaresContainer.classList.remove("container");
    squaresContainer.classList.remove("container-easy");
    return numSquares;
  }
};

//========================================================================
function scoreCount() {
  clicks++;
  document.querySelector(".points").innerHTML = clicks;
}

//========================================================================

