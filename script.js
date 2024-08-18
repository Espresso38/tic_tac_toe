const GameBoard = {
    board: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    player_1: {player_name: "X", player_sign: "X"},
    player_2: {player_name: "O", player_sign: "O"},
    player_turn: null,

    init: function() {
        this.player_turn = this.player_1;
    },

    resetGame: function() {
        this.board = [
            ['','',''],
            ['','',''],
        ['','','']
        ];
        this.player_turn = this.player_1;
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
            if (this.checkWin()) {
                console.log(`Player ${this.player_turn.player_name} wins!`);
                this.resetGame();
            } else if (this.checkDraw()) {
                console.log('Draw!');
                this.resetGame();
            } else {
                this.player_turn = this.player_turn === this.player_1 ? this.player_2 : this.player_1;
            }
        } else {
            console.log('Invalid move');
        }
    }
};

GameBoard.init();

GameBoard.makeMove(0, 0);
GameBoard.makeMove(2, 2);
GameBoard.makeMove(0, 1);
GameBoard.makeMove(2, 1);
GameBoard.makeMove(1, 1);
GameBoard.makeMove(2, 0);