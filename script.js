'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let scores, currentScore, activePlayer, playing;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
};

// Initializing the starting conditions
init();

const switchPlayer = () => {
  // Resetting the current score
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Switching players
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Adding rolled dice number to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the score is >= 150, if yes then finish the game
    if (scores[activePlayer] >= 150) {
      playing = false;

      // Hiding the dice
      diceEl.classList.add('hidden');

      // Declaring the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Removing the active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
