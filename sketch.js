
var gridWidth;
var columns;
var rows;
var board;
var nextBoard;

//create grid for a board i.e cols and rows
function initBoard(board) {
  var result;
  for(var i = 0; i < columns; i++) {
    board[i] = new Array(rows)
  }
  return board
}

// check neighbour state and apply game logic
function checkBoard(x, y, board, next, neighbours) {
  if(board[x][y] == 1 && neighbours < 2) next[x][y] = 0
  else if(board[x][y] == 1 && neighbours > 3) next[x][y] = 0
  else if(board[x][y] == 1 && (neighbours == 2 || neighbours == 3)) next[x][y] = 1
  else if(board[x][y] == 0 && neighbours == 3) next[x][y] = 1
  else next[x][y] = board[x][y]
}

//reset on click
function mousePressed() {
  init();
}

function setup() {
  createCanvas(1000, 1000);
  gridWidth = 20;
  // Calculate columns and rows for grid width
  columns = floor(width/gridWidth);
  rows = floor(height/gridWidth);
  board = new Array(columns)
  nextBoard = new Array(columns)

  initBoard(board)
  initBoard(nextBoard)
  init();
}

function draw() {
  background(255);
  populateBoard();
  for(var i = 0; i < columns; i++) {
    for(var j = 0; j < rows; j++) {
      board[i][j] == 1 ? fill(119, 0, 179) : fill(255)
      stroke(0)
      rect(j*gridWidth, i*gridWidth, gridWidth-1, gridWidth-1)
    }
  }

}

// FInit board with random state
function init() {
  for(var i = 0; i < columns; i++) {
    for(var j = 0; j < rows; j++) {
      // keep tiles around the edges clear
      if(i == 0 || i == columns-1 || j == 0 || j == rows-1) board[i][j] = 0
      else { 
        if(Math.random() < 0.5) {
          board[i][j] = 0
        } else {
          board[i][j] = 1
        }
      }
      // init next board tiles
      nextBoard[i][j] = 0
    }
  }
}

// // The process of creating the new generation
function populateBoard() {
  for(var x = 1; x < columns - 1; x++) {
    for(var y = 1; y < rows - 1; y++) {

      var neighbours = 0
      // loop the surrounding tiles and count state
      for(var i = -1; i <= 1; i++) {
        for(var j = -1; j <= 1; j++) {
          neighbours += board[x+i][y+j]
        }
      }

      // remove self state as its picked up from the loop
      neighbours -= board[x][y]
      checkBoard(x, y, board, nextBoard, neighbours) 
    }
  }
  var swap = board;
  board = nextBoard;
  nextBoard = swap;
}

