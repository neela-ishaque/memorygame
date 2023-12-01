// we are collecting player name from local storage
const player1Name = localStorage.getItem("player1") || "Player 1";
const player2Name = localStorage.getItem("player2") || "Player 2";

// selecting score paragraphs from game page
const player1ScoreDisplay = document.getElementById("player1Score");
const player2ScoreDisplay = document.getElementById("player2Score");
const highScoreDisplay = document.getElementById("highScore");

// selecting game board/ main container where we will be adding our card by javascript
const gameBoard = document.getElementById("gameBoard");

// selecting restart button from game page
const restartButton = document.querySelector("button");

// declaring variable
let currentPlayer = 1;
let selectedCards = [];
let player1Score = 0;
let player2Score = 0;
let flippedCards = 0;

const images = [
  "images/Avocado.png",
  "images/Banana.png",
  "images/Capsicum.png",
  "images/cherry.png",
  "images/Nashpati.png",
  "images/orange.png",
  "images/Papaya.png",
  "images/Pomegranate.png",
  "images/Ripe.png",
  "images/strawberry.png",
  "images/watermelon.png",
  "images/pineapple.png",
];

// Duplicate to create pairs
const cards = [...images, ...images];

// When game page will load this function will be called
function startGame() {
  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  createGameBoard();
  player1Score = 0;
  player2Score = 0;
  player1ScoreDisplay.textContent = `${player1Name} Score: 0`;
  player2ScoreDisplay.textContent = `${player2Name} Score: 0`;
}

// Will create card in game board
function createGameBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    //assigning image value/location
    card.dataset.value = cards[i];
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  }
}

// when we will flip the card this function will be called
function flipCard() {
  if (flippedCards < 2 && !this.classList.contains("flip")) {
    const selectedCard = this;
    selectedCard.classList.add("flip");
    selectedCard.style.backgroundImage = `url(${selectedCard.dataset.value})`;

    selectedCards.push(selectedCard);
    flippedCards++;

    if (flippedCards === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// when we will click two card this will get called
function checkMatch() {
  const [card1, card2] = selectedCards;

  const value1 = card1.dataset.value;
  const value2 = card2.dataset.value;

  if (value1 === value2) {
    // Match
    if (currentPlayer === 1) {
      player1Score++;
      // updating the score in ui
      player1ScoreDisplay.textContent = `${player1Name} Score: ${player1Score}`;
    } else {
      player2Score++;
      player2ScoreDisplay.textContent = `${player2Name} Score: ${player2Score}`;
    }

    flippedCards = 0;
  } else {
    // No match
    selectedCards.forEach((card) => {
      card.classList.remove("flip");
      card.style.backgroundImage = "none";
    });
    flippedCards = 0;

    // player change / turn change
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  //removing current player selected card
  selectedCards = [];

  // Check if all cards are flipped
  if (player1Score + player2Score === cards.length / 2) {
    endGame();
  }
  updatePlayerTurn();
}

function endGame() {
  const winner = player1Score > player2Score ? player1Name : player2Name;
  alert(`${winner} wins the game!`);

  // Store high score in localStorage
  const currentHighScore = Math.max(player1Score, player2Score);
  localStorage.setItem("highScore", currentHighScore);
  highScoreDisplay.textContent = `High Score: ${currentHighScore}`;
  restartGame();
}

function updatePlayerTurn() {
  const playerTurnDisplay = document.getElementById("playerTurn");

  playerTurnDisplay.textContent =
    currentPlayer === 1 ? `${player1Name}'s turn` : `${player2Name}'s turn`;
  if (currentPlayer === 1) {
    playerTurnDisplay.style.color = "red";
  } else {
    playerTurnDisplay.style.color = "blue";
  }
}

function restartGame() {
  player1Score = 0;
  player2Score = 0;
  player1ScoreDisplay.textContent = `${player1Name} Score: 0`;
  player2ScoreDisplay.textContent = `${player2Name} Score: 0`;
  flippedCards = 0;
  currentPlayer = 1;
  startGame();
}

//fist two functions will be called
startGame();
updatePlayerTurn();
