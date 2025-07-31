import gameBoard from './gameboard.js';

export default class Player{
    constructor(name,isPlayer=false){
        this.name = name;
        this.isPlayer = isPlayer;
        this.gameBoard = new gameBoard();
        this.attempts = new Set();
    }

    RandomAttack(enemyBoard)
    {
        if(this.isPlayer) {
            throw new Error('Player cannot perform random attack');
        }

        const availableMoves = [];
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                if(!this.attempts.has(`${x},${y}`)) {
                    availableMoves.push({x, y});
                }
            }
        }
        if (availableMoves.length === 0) {
            return null; // No moves left        
        }
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[randomIndex];
        this.attempts.add(`${move.x},${move.y}`);
        
        return enemyBoard.receiveAttack(move.x, move.y);
    }

    Attack(x,y, enemyBoard) {
        const key = `${x},${y}`;
        if(this.attempts.has(key)) {
            return { valid: false, hit: false, sunk: false, reason: 'already_attacked' };
        }

        this.attempts.add(key);
        return enemyBoard.receiveAttack(x, y);
    }

    resetMoves() {
        this.attempts.clear();
        this.gameBoard.shipPositions.clear();
        this.gameBoard.ships = [];
        this.gameBoard.attacks.clear();
        this.gameBoard.misses.clear();
    }

}