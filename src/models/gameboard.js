import Ship from './ship.js';

export default class gameBoard{
    constructor(){
        this.ships = [];
        this.shipPositions = new Map();
        this.attacks = new Set();
        this.misses = new Set();
    }

    PlaceShip(length, x, y, orientation) 
    {
        if(!this.IsValidPosition(x, y, orientation, length)) {
            return false;
        }
        
        const Positions = [];
        const ship = new Ship(length);
        for(let i = 0; i < length; i++) {
            const posX = orientation === 'horizontal' ? x + i : x;
            const posY = orientation === 'vertical' ? y + i : y;
            this.shipPositions.set(`${posX},${posY}`, ship);
            Positions.push(`${posX},${posY}`);
        }

        this.ships.push({
            ship: ship,
            positions: Positions,
            isVertical: orientation,
        });

        return true;
    }

    IsValidPosition(x,y,orientation,length)
    {
        const EndX = orientation === 'horizontal' ? x + length - 1 : x;
        const EndY = orientation === 'vertical' ? y + length - 1 : y;

        if(EndX >= 10 || EndY >= 10) return false;

        for(let i = 0; i < length; i++) {
            const posX = orientation === 'horizontal' ? x + i : x;
            const posY = orientation === 'vertical' ? y + i : y;
            if(this.shipPositions.has(`${posX},${posY}`)) return false;
        }
        return true;
    }
    
    receiveAttack(x, y)
    {
        if(x < 0 || x >= 10 || y < 0 || y >= 10) {
            return { valid : false , hit : false, sunk : false };
        }

        if(this.attacks.has(`${x},${y}`)) {
            return { valid : false, hit : false, sunk : false, reason: 'already_attacked' };
        }

        this.attacks.add(`${x},${y}`);
        if(this.shipPositions.has(`${x},${y}`)) {
            const ship = this.shipPositions.get(`${x},${y}`);
            ship.hit();
            const sunk = ship.isSunk();
            return { valid: true, hit: true, sunk: sunk, ship: ship };
        }
        this.misses.add(`${x},${y}`);
        return { valid: true, hit: false, sunk: false };
    }

    GetMissedAttacks()
    {
        return Array.from(this.misses);
    }

    IsShipSunk()
    {
        return this.ships.every(ship => ship.ship.isSunk());
    }

    getCell(x, y) {
        return this.shipPositions.get(`${x},${y}`) || null;
    }

  isAttacked(x, y) {
    return this.attacks.has(`${x},${y}`);
  }
}