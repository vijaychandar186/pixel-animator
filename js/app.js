import { resizeCanvas } from './canvas.js';
import { setupGrid, pixelateImage } from './grid.js';
import { startAnimationLoop, updateDisplay } from './animation.js';
import { setupEventListeners } from './events.js';
import { gameState } from './state.js';

function initializeGame() {
    resizeCanvas();
    setupGrid();
    if (gameState.imageLoaded) {
        pixelateImage();
    }
    updateDisplay();
    startAnimationLoop();
    setupEventListeners();
}

initializeGame();