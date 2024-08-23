let gameBoard = [];
let currentPlayer = "X";
let gameOver = false;

// Initialize game board
for (let i = 0; i < 3; i++) {
  gameBoard[i] = [];
  for (let j = 0; j < 3; j++) {
    gameBoard[i][j] = "";
  }
}

// Function to handle cell click
function cellClick(row, col) {
  if (gameOver) return;
  if (gameBoard[row][col] === "") {
    gameBoard[row][col] = currentPlayer;
    document.getElementById(`cell-${row}-${col}`).innerText = currentPlayer;
    checkWin();
    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      computerMove();
    }
  }
}

// Function to handle computer move
function computerMove() {
  let row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (gameBoard[row][col] !== "");
  gameBoard[row][col] = currentPlayer;
  document.getElementById(`cell-${row}-${col}`).innerText = currentPlayer;
  checkWin();
}

// Function to check for win
function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== "") {
      gameOver = true;
      document.getElementById("game-status").innerText = `Player ${gameBoard[i][0]} wins!`;
      return;
    }
    if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== "") {
      gameOver = true;
      document.getElementById("game-status").innerText = `Player ${gameBoard[0][i]} wins!`;
      return;
    }
  }
  if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== "") {
    gameOver = true;
    document.getElementById("game-status").innerText = `Player ${gameBoard[0][0]} wins!`;
    return;
  }
  if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== "") {
    gameOver = true;
    document.getElementById("game-status").innerText = `Player ${gameBoard[0][2]} wins!`;
    return;
  }
  if (!gameBoard.some(row => row.some(cell => cell === ""))) {
    gameOver = true;
    document.getElementById("game-status").innerText = "It's a draw!";
  }
}

// Function to reset game
function resetGame() {
  gameBoard = [];
  for (let i = 0; i < 3; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = "";
    }
  }
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("game-status").innerText = ""; // Clear game status text
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document.getElementById(`cell-${i}-${j}`).innerText = "";
    }
  }
}

// Add event listeners to cells
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    document.getElementById(`cell-${i}-${j}`).addEventListener("click", () => cellClick(i, j));
  }
}

// Add event listener to reset button
document.getElementById("reset-button").addEventListener("click", resetGame);
