import Player from '../model/player.js';
export default class GameController {
    constructor()
    {
        this.player= new Player('Player',true);
        this.computer= new Player('Computer');
        this.currentTurn = this.player;
        this.gameOver = false;
        this.winner = null;
        this.gameStarted = false;
        this.shipsPlaced = false;
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === this.player ? this.computer : this.player;
    }

    SetupRandomShips(player) 
    {
        const shipLengths = [5, 4, 3, 3, 2];

        for (const length of shipLengths) 
        {
            let placed = false;
            let attempts = 0;
            while (!placed && attempts < 100) 
            {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const ship = new Ship(length);

                placed = player.gameBoard.PlaceShip(ship, x, y, orientation);
                attempts++;
            }
        }
    }


    PlayTurn(x, y)
    {
        if(this.gameOver)
            return null;

        
        if(this.currentTurn === this.player) {
            let result;
            result = this.computer.gameBoard.receiveAttack(x, y);

            if(!result.valid) return null;

            if(this.computer.gameBoard.IsShipSunk()) {
                this.winner = this.player.name;
                this.gameOver = true;
                return result;
            }

            this.switchTurn();

            setTimeout(() => {
                this.computer.randomAttack(this.player.gameBoard);
                if(this.player.gameBoard.IsShipSunk()) {
                    this.winner = this.computer.name;
                    this.gameOver = true;
                }
                this.switchTurn();
                this.updateDisplay();
            }, 1000);
        }
    }

    updateDisplay() {
        // This will be called by the DOM module
        if (this.onUpdate) {
          this.onUpdate();
        }
    }

    restart() {
        this.player1 = new Player('Player', false);
        this.player2 = new Player('Computer', true);
        this.currentPlayer = this.player1;
        this.gameOver = false;
        this.winner = null;
        
        this.setupRandomShips(this.player1);
        this.setupRandomShips(this.player2);
    }

}