import { gameState, pixelCanvas, pixelCtx } from './state.js';
import { DOM_ELEMENTS } from './constants.js';

export function resizeCanvas() {
    const parent = DOM_ELEMENTS.revealCanvas.parentElement;
    const maxSize = Math.min(parent.clientWidth, 800);
    gameState.cellSize = parseInt(DOM_ELEMENTS.gridSizeSelect.value);
    gameState.cols = Math.floor(maxSize / gameState.cellSize);
    gameState.rows = Math.floor(maxSize / gameState.cellSize);
    DOM_ELEMENTS.revealCanvas.width = gameState.cols * gameState.cellSize;
    DOM_ELEMENTS.revealCanvas.height = gameState.rows * gameState.cellSize;
}