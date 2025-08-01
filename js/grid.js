import { gameState, pixelCanvas, pixelCtx, loadedImage, setPixelCanvas, setPixelCtx } from './state.js';
import { GAME_CONSTANTS } from './constants.js';

export function setupGrid() {
    gameState.pixelGrid = [];
    for (let col = 0; col < gameState.cols; col++) {
        gameState.pixelGrid[col] = [];
        for (let row = 0; row < gameState.rows; row++) {
            gameState.pixelGrid[col][row] = {
                color: GAME_CONSTANTS.COLORS.BACKGROUND,
                revealed: false
            };
        }
    }
}

export function pixelateImage() {
    if (!loadedImage) return;

    if (!pixelCanvas) {
        setPixelCanvas(document.createElement('canvas'));
        setPixelCtx(pixelCanvas.getContext('2d'));
    }
    pixelCanvas.width = gameState.cols;
    pixelCanvas.height = gameState.rows;

    pixelCtx.drawImage(
        loadedImage,
        0, 0, loadedImage.width, loadedImage.height,
        0, 0, gameState.cols, gameState.rows
    );

    const imageData = pixelCtx.getImageData(0, 0, gameState.cols, gameState.rows);
    for (let col = 0; col < gameState.cols; col++) {
        for (let row = 0; row < gameState.rows; row++) {
            const index = (row * gameState.cols + col) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            gameState.pixelGrid[col][row].color = `rgb(${r}, ${g}, ${b})`;
        }
    }
}