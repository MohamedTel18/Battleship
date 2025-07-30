export default class gameBoard{
    constructor(){
        this.size = 10;
        this.ships = [];
        this.shipPsositions = new Map();
        this.hits = new Set();
        this.misses = new Set();
    }
}