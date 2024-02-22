const Gameboard = {
    board: [["_","_","_"],
            ["_","_","_"],
            ["_","_","_"]],
    rows: 3,
    columns: 3,
};

const players = {
    player1: {
        name: "Player1",
        marker: "X",
    },

    player2: {
        name: "Player2",
        marker: "O",
    },
}

const game = {
    currentPlayer: players.player1,
    
    printBoard() {
        console.log(Gameboard.board)
        console.log(`It's ${this.currentPlayer.name}'s turn.`)},
    
    changeTurn() {
        this.currentPlayer == players.player1 ? this.currentPlayer = players.player2 : this.currentPlayer = players.player1;
        return game.currentPlayer.marker
    },
    
    checkAvailability(row,column) {
            if (Gameboard.board[row][column] !== 'X' && Gameboard.board[column][row] !== 'O') return true
        },

    placeMarker(row,column) {
        if (this.checkAvailability(row, column)) {
        Gameboard.board[row].splice(column,1, this.currentPlayer.marker);
        game.changeTurn();
        game.printBoard();
        } else {
        return "Please place your Marker in a free field.";  
        }
    }
}

game.printBoard(); // könnte ins iffe rein, aber dann kann ich die objects nicht mehr erreichen



    // so isses auch ne method, d.h. das was vor dem Punkt steht wird getargeted/ verändert
    //wie bekommt die func das token?
    // wie das board array?
    // col und row muss man ja geben, aber token muss er bekommen können
    // => function/method bekommt zwei Koordinaten: row/column. Genau da soll das token plaziert werden
    // => Es beginnt mit initiierung des Spiels
    //      -> Spielfeld leer soll schon da sein
    //      -> Dann wird neues Board geprinted mit gesetztem Token
    //      -> Ansage: "Player0 is next with Token "0""

