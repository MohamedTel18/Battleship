import { Ship } from './ship.js';

export default class gameBoard{
    constructor(){
        this.ships = [];
        this.shipPositions = new Map();
        this.attacks = new Set();
        this.misses = new Set();
    }

    PlaceShip(ship, x, y, orientation) 
    {
        if(!this.IsValidPosition(x, y, orientation, ship)) {
            return false;
        }
        
        const Positions = [];
        for(let i = 0; i < ship.length; i++) {
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

    IsValidPosition(x,y,orientation,ship)
    {
        const EndX = orientation === 'horizontal' ? x + ship.length - 1 : x;
        const EndY = orientation === 'vertical' ? y + ship.length - 1 : y;

        if(EndX >= 10 || EndY >= 10) return false;

        for(let i = 0; i < ship.length; i++) {
            const posX = orientation === 'horizontal' ? x + i : x;
            const posY = orientation === 'vertical' ? y + i : y;
            if(this.shipPositions.has(`${posX},${posY}`)) return false;
        }
        return true;
    }
    
    receiveAttack(x, y)
    {
        if(x >= 0 && x < 10 && y >= 0 && y < 10) {
            return { valid : false , hit : false, sunk : false };
        }

        if(this.attacks.has(`${x},${y}`)) {
            return { valid : false, hit : false, sunk : false, reason: 'already_attacked' };
        }

        this.attacks.add(`${x},${y}`);
        if(this.shipPositions.has(`${x},${y}`)) {
            const ship = this.shipPositions.get(`${x},${y}`);
            Ship.hit();
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
}