// Select elements we are going to interact with from HTML
const grid = document.querySelector('.grid');
const stackButton = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Game Grid - array of arrays
// 0 - empty cell
// 1 - bar-segment

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
