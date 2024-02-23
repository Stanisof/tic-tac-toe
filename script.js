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



/* function Players() {

    let player1 =  {
        name: "Player1",
        marker: "X",
    }
    let player2 = {
        name: "Player2",
        marker:"0",
    }
    return {player1, player2}
}
 */

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
            if (Gameboard.board[row][column] !== 'X' && Gameboard.board[row][column] !== 'O') return true
        },

    placeMarker(row,column) {
        if (this.checkAvailability(row, column)) {
        Gameboard.board[row].splice(column,1, this.currentPlayer.marker);
            switch(this.checkWin()) {
                case("win"): this.clearBoard();
                             return `The winner is ${this.currentPlayer.name}`
                case("draw"): this.clearBoard
                              return "It's a draw"
                default: this.changeTurn();
                };
        this.printBoard()
        } else {
        return "Please place your Marker in a free field.";  
        }
    },
    
    checkWin() {

        for(let i = 0; i < Gameboard.board.length; i++) {
            if(Gameboard.board[i][0] === Gameboard.board[i][1] && Gameboard.board[i][0] === Gameboard.board[i][2] && Gameboard.board[i][2] !== "_")
            return "win"
        }

        for(let i = 0; i < Gameboard.board.length; i++) {
            for(let j = 0; j < Gameboard.board[i].length; j++) {
                if (Gameboard.board[0][j] === Gameboard.board[1][j] && Gameboard.board[0][j] === Gameboard.board[2][j] && Gameboard.board[2][j] !== "_")
                return "win"
            }
        }

        if(Gameboard.board[0][0] === Gameboard.board[1][1] && Gameboard.board[0][0] === Gameboard.board[2][2] && Gameboard.board[2][2] !== "_")
        return "win"

        if(Gameboard.board[2][0] === Gameboard.board[1][1] && Gameboard.board[2][0] === Gameboard.board[0][2] && Gameboard.board[2][0] !== "_")
        return "win"

        
        if(Gameboard.board[0].every(item => item !== "_") && Gameboard.board[1].every(item => item !== "_") && Gameboard.board[2].every(item => item !== "_")) 
        return "draw" 
        
    },

    clearBoard() {
        Gameboard.board = [["_","_","_"],
                           ["_","_","_"],
                           ["_","_","_"]]
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

