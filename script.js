'use strict';

//sorting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //we use # to select for IDs and . for classes
const score1El = document.getElementById('score--1'); // getElementById does the same as the top but is faster
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//deletes current score of the current player
function delCurrentScore() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

function swithPlayer() {
  currentScore = 0;
  delCurrentScore();
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggles the player--active class for both players
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check if player rolled a 1: if true, wipe board and switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      delCurrentScore();
    } else {
      //switches player function
      swithPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
      //Finish game
      playing = false;
      diceEl.classList.add('hidden'); //hides dice
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active');
    } else {
      //Switch to the next player
      swithPlayer();
    }
  }
});
//resetting the game
btnNew.addEventListener('click', function () {
  //resets scores of both players in the UI and variables
  scores = [0, 0];
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //turns background to original of the winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  activePlayer = 0;
  //Hides dice if player wants to restart without anyone winning
  diceEl.classList.add('hidden');
  //lets the event listeners know the game is over
  playing = true;
});
