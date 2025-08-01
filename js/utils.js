import { gameState } from './state.js';
import { DOM_ELEMENTS } from './constants.js';

export function downloadImage() {
    if (!gameState.isComplete) return;

    const link = document.createElement('a');
    link.download = gameState.imageFileName;
    link.href = DOM_ELEMENTS.revealCanvas.toDataURL('image/png');
    link.click();
}