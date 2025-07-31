import GameController from './controller/gameController.js';
import { DOMController } from './UI/DOM.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const gameController = new GameController();
  const domController = new DOMController(gameController);
});