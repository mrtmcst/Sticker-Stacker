// Select elements we are going to interact with from HTML
const grid = document.querySelector('.grid');
const stackButton = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Game Grid -> 0s  are the empty cells & 1s are the bar-segments
const gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0]  // Starting row
];

// Variables that will change with the course of the game
let currentRowIndex = gridMatrix.length - 1
let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;

// Draw the grid and the bar
function draw() {
  // Reset the display when this function is called
  grid.innerHTML = '';

  // instead of -> for (let i = 0; i < gridMatrix.length; i++) {}
  gridMatrix.forEach(function(rowContent) {
    rowContent.forEach(function(cellContent) {
      // Create cell
      const cell = document.createElement('div');
      cell.classList.add('cell')

      if (cellContent === 1) {
        cell.classList.add('bar');
      }

      grid.appendChild(cell);
    })
  })
}

// Game logic and controls
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON!';
    endGameScreen.classList.add('win');
  }

  endGameScreen.classList.remove('hidden');
}

function checkWin() {
  // Check if we reached the top of the grid
  if (currentRowIndex === 0) {
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const previousRow= gridMatrix[currentRowIndex + 1];

  if (!previousRow) return;

  // Check if there's at least one accumulated stack element under each bar
  for (i = 0; i < currentRow.length; i++) {
    // If there is no accumulated stack below a bar element, remove the bar pieces from the current
    // stack and from the new bar in the next loop
    if (currentRow[i] === 1 && previousRow[i] === 0) {
      currentRow[i] = 0;
      barSize--;
    }
    if (barSize === 0) {
      isGameOver = true;
      clearInterval(gameInterval);
      endGame(false);
    }
  }
}

function updateScore() {
  score += barSize;

  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkWin();
  checkLost();
  updateScore();

  if (isGameOver) return;

  currentRowIndex--;
  barDirection = 'right';
  // Make the previous element of the array to have the moving bar
  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }

  draw();
}

function moveRight(currentRow) {
  // Remove last element of the array
  currentRow.pop();
  // Insert new element at the beggining of the array
  currentRow.unshift(0);
}

function moveLeft(currentRow) {
  // Remove first element of the array
  currentRow.shift();
  // Insert new element at the end of the array
  currentRow.push(0);
}

// Make the bar move
function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === 'right') {
    moveRight(currentRow);

    const rightEdgeOfRow = currentRow[currentRow.length -1];
    if (rightEdgeOfRow === 1) {
      barDirection = 'left';
    }

  } else if (barDirection === 'left') {
    moveLeft(currentRow);

    const leftEdgeOfRow = currentRow[0];

    if (leftEdgeOfRow === 1) {
      barDirection = 'right';
    }
  }
}

// Bar moving function call
function main() {
  draw();
  moveBar();
}

function onPlayAgain() {
  window.location.reload();
}

// Events
stackButton.addEventListener('click', onStack);
playAgainButton.addEventListener('click', onPlayAgain);

// Automation for the bar movement
const gameInterval = setInterval(main, 600);
