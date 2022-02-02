"use strict";
console.log("------PIG GAME STARTED developing at 7:45pm 1feb-22------");

let name0 = document.querySelector("#name--0");
let name1 = document.querySelector("#name--1");
let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");

//current scores of both the players.
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let btnNew = document.querySelector(".btn--new");

let dice = document.querySelector(".dice");

let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");

let scores;
let currentScore;
let activePlayer;
let playing;
const init = () => {
  dice.style.display = "none";

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.style.display = "none";
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
//Rolling dice funtionality
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", () => {
  if (playing) {
    //Generating a random number on the dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    dice.style.display = "block";
    dice.src = `dice-${diceNumber}.png`;
    //Check for rolled number 1
    if (diceNumber != 1) {
      //Add dice num to current score
      currentScore += diceNumber;
      //   console.log(currentScore, diceNumber, typeof current0El);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to another player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      dice.style.display = "none";

      dice.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
    if (!playing) {
      console.log("Player won and game stopped");
    }
  }
  //switch player
});

//resetting the game
btnNew.addEventListener("click", init);
