export class DOMController{
    constructor(gameController)
    {
        this.gameController = gameController;
        this.gameController.onUpdate = () => this.render();
        this.init();
    }

    init()
    {
        this.CreateGameBoard();
        this.createControls();
        this.startNewGame();
    }

    CreateGameBoard()
    {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="game-container">
              <h1>Battleship Game</h1>
              <div class="game-status">
                <p id="status">Click on enemy board to attack!</p>
              </div>
              <div class="boards-container">
                <div class="board-section">
                  <h3>Your Board</h3>
                  <div id="player-board" class="board"></div>
                </div>
                <div class="board-section">
                  <h3>Enemy Board</h3>
                  <div id="enemy-board" class="board"></div>
                </div>
              </div>
              <div class="controls">
                <button id="new-game">New Game</button>
                <button id="random-ships">Random Ship Placement</button>
              </div>
            </div>`;

        this.playerBoard = document.getElementById('player-board');
        this.enemyBoard = document.getElementById('enemy-board');
        this.status = document.getElementById('status');

        this.CreateBoardGrid(this.playerBoard, 'player');
        this.CreateBoardGrid(this.enemyBoard, 'computer');
    }

    CreateBoardGrid(boardElement, type) 
    {
        boardElement.innerHTML = '';
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.dataset.x = col;
                cellElement.dataset.y = row;
                cellElement.dataset.board = type;

                if (type === 'computer') {
                    cellElement.classList.add('enemy-cell');
                    cellElement.addEventListener('click', (e) => {
                        this.handleAttack(e);
                    });
                }

                boardElement.appendChild(cellElement);
            }
            
        }
    }

    handleAttack(event) {

        if(this.gameController.isGameOver || this.gameController.currentTurn !== this.gameController.player) {
            return;
        }

        const cell = event.target;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        
        const result = this.gameController.PlayTurn(x, y);
        if(result)
            this.render();
    }

    render()
    {
        this.renderBoard(this.playerBoard, this.gameController.player.gameBoard, true);
        this.renderBoard(this.enemyBoard, this.gameController.computer.gameBoard, false);

        if (this.gameController.gameOver) {
            this.status.textContent = `Game Over! ${this.gameController.winner} wins!`;
        } else if (this.gameController.currentTurn !== this.gameController.player) {
            this.status.textContent = 'Computer is thinking...';
        } else {
            this.status.textContent = 'Your turn! Click on enemy board to attack.';
        }
    }

    renderBoard(boardEl, gameboard, showShips)
    {
        const cells = boardEl.querySelectorAll('.cell');
        cells.forEach(cell => {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
      
            cell.className = 'cell';
            const ship = gameboard.getCell(x, y);
            const isAttacked = gameboard.isAttacked(x, y);

            if (showShips && ship) {
              cell.classList.add('ship');
            }

            if (isAttacked) {
              if (ship) {
                cell.classList.add('hit');
                if (ship.isSunk()) {
                  cell.classList.add('sunk');
                }
              } else {
                cell.classList.add('miss');
              }
            }
        });
    }

    startNewGame() {
        this.gameController.restart();
        this.render();
        this.status.textContent = 'Click on enemy board to attack!';
    }

    createControls() {
        document.getElementById('new-game').addEventListener('click', () => {
            this.startNewGame();
        });

        document.getElementById('random-ships').addEventListener('click', () => {
            this.gameController.player.resetMoves();
            this.gameController.SetupRandomShips(this.gameController.player);
            this.render();
        });
    }
}