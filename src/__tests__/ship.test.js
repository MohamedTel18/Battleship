import Ship from "../models/ship.js";

describe('Ship', () => {
  test('should create a ship with correct length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test('should register hits', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('should allow hits beyond length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit(); // This will increase hits beyond length
    expect(ship.hits).toBe(3);
  });

  test('should report if sunk', () => {
    const ship = new Ship(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});