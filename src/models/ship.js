export default class Ship {
    constructor(length) {
        if (length < 1) {
            throw new Error('Ship length must be at least 1');
        }
        this.length = length;
        this.hits = 0;
    }

    hit() {
        this.hits += 1;
    }

    isSunk() {
        return this.hits >= this.length;
    }

    getLength() {
        return this.length;
    }

    getHits() {
        return this.hits;
    }
}