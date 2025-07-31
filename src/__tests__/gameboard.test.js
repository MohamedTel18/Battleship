import gameBoard from "../models/gameboard.js";

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new gameBoard();
  });

  test('should place ship horizontally', () => {
    expect(gameboard.PlaceShip(3, 0, 0, 'horizontal')).toBe(true);
    expect(gameboard.getCell(0, 0)).toBeTruthy();
    expect(gameboard.getCell(1, 0)).toBeTruthy();
    expect(gameboard.getCell(2, 0)).toBeTruthy();
  });

  test('should place ship vertically', () => {
    expect(gameboard.PlaceShip(3, 0, 0, 'vertical')).toBe(true);
    expect(gameboard.getCell(0, 0)).toBeTruthy();
    expect(gameboard.getCell(0, 1)).toBeTruthy();
    expect(gameboard.getCell(0, 2)).toBeTruthy();
  });

  test('should not place ship out of bounds', () => {
    expect(gameboard.PlaceShip(3, 8, 0, 'horizontal')).toBe(false); // Would go to (10,0) which is out of bounds
    expect(gameboard.PlaceShip(3, 0, 8, 'vertical')).toBe(false);   // Would go to (0,10) which is out of bounds
  });

  test('should receive attacks correctly', () => {
    gameboard.PlaceShip(2, 0, 0, 'horizontal');
    
    const hitResult = gameboard.receiveAttack(0, 0);
    expect(hitResult.valid).toBe(true);
    expect(hitResult.hit).toBe(true);
    
    const missResult = gameboard.receiveAttack(1, 1);
    expect(missResult.valid).toBe(true);
    expect(missResult.hit).toBe(false);
    
    const alreadyAttackedResult = gameboard.receiveAttack(0, 0);
    expect(alreadyAttackedResult.valid).toBe(false);
  });

  test('should track all ships sunk', () => {
    gameboard.PlaceShip(1, 0, 0, 'horizontal');
    expect(gameboard.IsShipSunk()).toBe(false);
    
    gameboard.receiveAttack(0, 0);
    expect(gameboard.IsShipSunk()).toBe(true);
  });
});