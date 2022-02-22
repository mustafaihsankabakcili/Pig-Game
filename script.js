'use strict';

// Selecting elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

// Starting Condition
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

// Switch Player
const switchPlayer = function() {
    // Current score text content and current score = 0
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    //switch to next player, toggle class to change background
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


init();
// Rolling Dice Functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        // Genereting a Random Dice Roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${dice}.png`;

        // Check for rolled 1
        if (dice !== 1) {
            // Add dice to curren score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function() {
    if (playing) {
        // Add current score to player score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player score >= 100 
        if (scores[activePlayer] >= 100) {
            // Finish the Game .player--winner
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);