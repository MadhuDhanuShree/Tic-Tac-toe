let turn = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Add event listeners to cells
document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

// Add event listener to reset button
document.getElementById('reset-button').addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.dataset.cellIndex;
  if (board[cellIndex] !== '' || gameOver) return;

  board[cellIndex] = turn;
  event.target.textContent = turn;

  if (turn === 'X') {
    event.target.classList.add('x');
  } else {
    event.target.classList.add('o');
  }

  // Check for win
  if (checkWin()) {
    gameOver = true;
    document.getElementById('result').textContent = `Player ${turn} wins!`;
  } else {
    // Switch turn
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = `Turn: ${turn}`;
  }
}

// Check for win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    
      for (const condition of winConditions) {
        if (
          board[condition[0]] !== '' &&
          board[condition[0]] === board[condition[1]] &&
          board[condition[0]] === board[condition[2]]
        ) {
          for (const index of condition) {
            document.querySelector(`[data-cell-index="${index}"]`).classList.add('win');
          }
          return true;
        }
      }
    
      return false;
}

// Reset game
function resetGame() {
  turn = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  document.getElementById('turn').textContent = `Turn: ${turn}`;
  document.getElementById('result').textContent = '';
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
}