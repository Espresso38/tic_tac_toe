const navbar = document.getElementById('nav');
const container = document.getElementById('container');
const winner = document.getElementById('winner');
const change_1 = document.getElementById('change_1');
const change_2 = document.getElementById('change_2');
const reset = document.getElementById('reset');

const GameBoard = {
    board: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    player_1: {player_name: "X", player_sign: "X"},
    player_2: {player_name: "O", player_sign: "O"},
    player_turn: null,

    createGameBoard: function() {
        container.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.classList.add('field');
            div.innerText = this.board[Math.floor(i / 3)][i % 3];
            div.setAttribute('data-index', i);
            container.appendChild(div);
        
            div.addEventListener('click', () => {
                let index = div.getAttribute('data-index');
                this.makeMove(Math.floor(index / 3), index % 3);
            });
        }
    },

    init: function() {
        this.player_turn = this.player_1;
        this.createGameBoard();
    },

    resetGame: function() {
        this.board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        this.player_turn = this.player_1;
        this.createGameBoard();
    },

    changePlayerName_1: function(name) {
        this.player_1.player_name = name;
    },

    changePlayerName_2: function(name) {
        this.player_2.player_name = name;
    },

    checkWin: function() {
        const winningCombinations = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]]
        ];

        return winningCombinations.some((combination) => {
            return combination.every(([row, col]) => {
                return this.board[row][col] === this.player_turn.player_sign;
            });
        });
    },

    checkDraw: function() {
        return this.board.every(row => row.every(cell => cell !== ''));
    },

    makeMove: function(row, col) {
        if (this.board[row][col] === '') {
            this.board[row][col] = this.player_turn.player_sign;
            this.createGameBoard();

            if (this.checkWin()) {
                winner.innerText = `
                Player ${this.player_turn.player_name} wins!
                `;
                winner.style.visibility = 'visible';
                setTimeout(() => {
                    winner.style.visibility = 'hidden';
                    winner.innerText = '';
                    this.resetGame();
                }, 3000);
            } else if (this.checkDraw()) {
                winner.innerText = 'Draw!';
                winner.style.visibility = 'visible';
                setTimeout(() => {
                    winner.style.visibility = 'hidden';
                    winner.innerText = '';
                    this.resetGame();
                }, 3000);
            } else {
                this.player_turn = this.player_turn === this.player_1 ? this.player_2 : this.player_1;
            }
        } else {
            console.log('Invalid move');
        }
    }
};

change_1.addEventListener('click', () => {
    let name = prompt('Change Player 1 Name');
    GameBoard.changePlayerName_1(name);
});

change_2.addEventListener('click', () => {
    let name = prompt('Change Player 2 Name');
    GameBoard.changePlayerName_2(name);
});

reset.addEventListener('click', () => {
    GameBoard.resetGame();
});

GameBoard.init();