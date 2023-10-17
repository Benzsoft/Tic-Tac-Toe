let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let player1Score = 0;
let player2Score = 0;

function startGame() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    if (player1 && player2) {
        document.getElementById('turnDisplay').textContent = `${player1}'s turn`;
    } else {
        alert('Please enter aliases for both players.');
    }
}

function makeMove(index) {
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    const cellElements = document.querySelectorAll('.cell');
    cellElements[index].textContent = currentPlayer;
    if (checkWinner()) {
        const winnerAlias = currentPlayer === 'X' ? document.getElementById('player1').value : document.getElementById('player2').value;
        alert(`${winnerAlias} wins!`);
        document.getElementById('turnDisplay').textContent = '';
        gameActive = false;
        return;
    }
    if (board.every(cell => cell)) { // Check if all cells are filled
        alert('No winner !! It\'s a draw!');
        document.getElementById('turnDisplay').textContent = '';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const nextPlayerAlias = currentPlayer === 'X' ? document.getElementById('player1').value : document.getElementById('player2').value;
    document.getElementById('turnDisplay').textContent = `${nextPlayerAlias}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    const cellElements = document.querySelectorAll('.cell');
    cellElements.forEach(cell => {
        cell.textContent = '';
    });
    const player1Alias = document.getElementById('player1').value;
    document.getElementById('turnDisplay').textContent = `${player1Alias}'s turn`;
}

function updateScore() {
    if (currentPlayer === 'X') {
        player1Score++;
        document.getElementById('player1-score').textContent = `Player 1: ${player1Score}`;
    } else {
        player2Score++;
        document.getElementById('player2-score').textContent = `Player 2: ${player2Score}`;
    }
}

function animateWinningLine(combination) {
    const cells = document.querySelectorAll('.cell');
    gsap.to([cells[combination[0]], cells[combination[1]], cells[combination[2]]], {
        backgroundColor: "#FFD700",
        duration: 1,
        repeat: 1,
        yoyo: true
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]  // diagonals
    ];
    for (let combination of winningCombinations) {
        if (board[combination[0]] && board[combination[0]] === board[combination[1]] && board[combination[0]] === board[combination[2]]) {
            updateScore();
            animateWinningLine(combination);
            gameActive = false;
            return true;
        }
    }
    return false;
}
