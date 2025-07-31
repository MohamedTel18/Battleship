import Player from "../models/player.js";

describe('Player', () => {
  test('should create player with gameboard', () => {
    const player = new Player('Test Player', true);
    expect(player.name).toBe('Test Player');
    expect(player.isPlayer).toBe(true);
    expect(player.gameBoard).toBeDefined();
  });

  test('should create computer player', () => {
    const computer = new Player('Computer', false);
    expect(computer.isPlayer).toBe(false);
  });
});