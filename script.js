const Gameboard = {
    board: [],
    /* rows: 3,
    columns: 3, */
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
        console.log(`It's ${this.currentPlayer.name}'s turn.`)
    },

    
    changeTurn() {
        this.currentPlayer == players.player1 ? this.currentPlayer = players.player2 : this.currentPlayer = players.player1;
        return game.currentPlayer.marker
    },
    
    checkAvailability(attr) {
            if (attr !== 'X' && attr !== 'O') return true
    },
    
    checkWin() {

        for(let i = 0; i < Gameboard.board.length; i++) {
            if(Gameboard.board[i][0].getAttribute('data-index') === Gameboard.board[i][1].getAttribute('data-index')
            && Gameboard.board[i][0].getAttribute('data-index') === Gameboard.board[i][2].getAttribute('data-index') 
            && Gameboard.board[i][2].getAttribute('data-index') !== "_")
            return "win"
        }

        for(let i = 0; i < Gameboard.board.length; i++) {
            for(let j = 0; j < Gameboard.board[i].length; j++) {
                if (Gameboard.board[0][j].getAttribute('data-index') === Gameboard.board[1][j].getAttribute('data-index') 
                    && Gameboard.board[0][j].getAttribute('data-index') === Gameboard.board[2][j].getAttribute('data-index') 
                    && Gameboard.board[2][j].getAttribute('data-index') !== "_")
                return "win"
            }
        }

        if(Gameboard.board[0][0].getAttribute('data-index') === Gameboard.board[1][1].getAttribute('data-index') 
            && Gameboard.board[0][0].getAttribute('data-index') === Gameboard.board[2][2].getAttribute('data-index') 
            && Gameboard.board[2][2].getAttribute('data-index') !== "_")
        return "win"

        if(Gameboard.board[2][0].getAttribute('data-index') === Gameboard.board[1][1].getAttribute('data-index') 
        && Gameboard.board[2][0].getAttribute('data-index') === Gameboard.board[0][2].getAttribute('data-index') 
        && Gameboard.board[2][0].getAttribute('data-index') !== "_")
        return "win"
        
        if(Gameboard.board[0].every(item => item.getAttribute('data-index') !== "_") 
            && Gameboard.board[1].every(item => item.getAttribute('data-index') !== "_") 
            && Gameboard.board[2].every(item => item.getAttribute('data-index') !== "_")) 
        return "draw" 
        
    },

    clearBoard() {
        Gameboard.board = []
    },

    //for console game:
    placeMarker(row,column) {
        if (this.checkAvailability(row, column)) {
        Gameboard.board[row].splice(column,1, this.currentPlayer.marker);
            switch(this.checkWin()) {
                case("win"): this.clearBoard();
                             return `The winner is ${this.currentPlayer.name}`

                case("draw"): this.clearBoard();
                              return "It's a draw"
    
                default: this.changeTurn();
                };
        this.printBoard()
        } else {
        return "Please place your marker in a free field.";  
        }
    },

}

const uiGame = {

    boardUI: document.querySelector('.gameboard'),
    winAlert: document.querySelector('.win'),
    turnAlert: document.querySelector('.turn'),

    clearDiv() {
        while (this.boardUI.firstChild) {
            this.boardUI.removeChild(this.boardUI.firstChild);
          }
    },

    createFields() {

        for(let i=0; i < 3; i++) {
            Gameboard.board.push([]);

            for(let j = 0; j < 3; j++) {

                let div = document.createElement('div');
                div.setAttribute('data-index', '_');
                this.turnAlert.textContent = `It's ${game.currentPlayer.name}'s turn.`;

                div.addEventListener('click', (marker) => {
                    marker = game.currentPlayer.marker;

                    if (game.checkAvailability(div.getAttribute('data-index'))) {
                        div.textContent = marker;
                        div.setAttribute('data-index', marker);

                            switch(game.checkWin()) {
                                case("win"): game.clearBoard();
                                             this.clearDiv();
                                             this.createFields();
                                             this.winAlert.textContent = `The winner is ${game.currentPlayer.name}`;
                                    break
                                case("draw"): game.clearBoard();
                                              this.clearDiv();
                                              this.createFields();
                                              this.winAlert.textContent = "It's a draw";
                                    break
                                default: game.changeTurn();
                                };
                        this.turnAlert.textContent = `It's ${game.currentPlayer.name}'s turn.`
                        } else {
                        return alert("Please place your marker in a free field.");
                        }
                });

                Gameboard.board[i].push(div);
                this.boardUI.appendChild(div);

            }
        }
    },
}

game.printBoard();
uiGame.createFields();
