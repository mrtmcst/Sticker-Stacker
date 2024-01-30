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

draw();
