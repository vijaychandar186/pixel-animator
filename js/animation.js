import { gameState } from './state.js';
import { DOM_ELEMENTS, GAME_CONSTANTS } from './constants.js';
import { playSound } from './audio.js';

export function renderGrid() {
    DOM_ELEMENTS.ctx.fillStyle = GAME_CONSTANTS.COLORS.BACKGROUND;
    DOM_ELEMENTS.ctx.fillRect(0, 0, DOM_ELEMENTS.revealCanvas.width, DOM_ELEMENTS.revealCanvas.height);

    for (let col = 0; col < gameState.cols; col++) {
        for (let row = 0; row < gameState.rows; row++) {
            if (gameState.pixelGrid[col][row].revealed) {
                DOM_ELEMENTS.ctx.fillStyle = gameState.pixelGrid[col][row].color;
                DOM_ELEMENTS.ctx.fillRect(
                    col * gameState.cellSize,
                    row * gameState.cellSize,
                    gameState.cellSize,
                    gameState.cellSize
                );
            }
        }
    }

    if (!gameState.isComplete) {
        DOM_ELEMENTS.ctx.fillStyle = GAME_CONSTANTS.COLORS.CURSOR_HIGHLIGHT;
        DOM_ELEMENTS.ctx.fillRect(
            gameState.currentCol * gameState.cellSize,
            gameState.currentRow * gameState.cellSize,
            gameState.cellSize,
            gameState.cellSize
        );

        DOM_ELEMENTS.ctx.strokeStyle = GAME_CONSTANTS.COLORS.CURSOR;
        DOM_ELEMENTS.ctx.lineWidth = 2;
        DOM_ELEMENTS.ctx.strokeRect(
            gameState.currentCol * gameState.cellSize,
            gameState.currentRow * gameState.cellSize,
            gameState.cellSize,
            gameState.cellSize
        );
    }
}

export function updateZigzag() {
    if (gameState.isComplete) return;

    if (
        gameState.currentCol >= 0 &&
        gameState.currentCol < gameState.cols &&
        gameState.currentRow >= 0 &&
        gameState.currentRow < gameState.rows
    ) {
        gameState.pixelGrid[gameState.currentCol][gameState.currentRow].revealed = true;
    }

    gameState.currentCol += gameState.direction;
    playSound('move');

    if (gameState.currentCol >= gameState.cols || gameState.currentCol < 0) {
        gameState.currentCol = gameState.direction > 0 ? gameState.cols - 1 : 0;
        gameState.currentRow++;
        gameState.direction *= -1;
    }

    if (gameState.currentRow >= gameState.rows) {
        gameState.isComplete = true;
        gameState.isPaused = true;
        DOM_ELEMENTS.togglePauseBtn.textContent = 'Complete';
        DOM_ELEMENTS.togglePauseBtn.disabled = true;
        DOM_ELEMENTS.downloadBtn.disabled = false;
        DOM_ELEMENTS.gameStatus.textContent = 'Image Fully Revealed!';
        DOM_ELEMENTS.gameStatus.className = 'text-cyan-400 font-semibold';
        cancelAnimationFrame(gameState.animationFrameId);
    }
}

export function updateTimer() {
    if (!gameState.startTime) return;
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    DOM_ELEMENTS.revealTimerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function updateDisplay() {
    updateTimer();
    const totalCells = gameState.cols * gameState.rows;
    let revealedCells = 0;
    for (let col = 0; col < gameState.cols; col++) {
        for (let row = 0; row < gameState.rows; row++) {
            if (gameState.pixelGrid[col][row].revealed) {
                revealedCells++;
            }
        }
    }
    const progress = Math.min(100, Math.round((revealedCells / totalCells) * 100));
    DOM_ELEMENTS.revealProgressDisplay.textContent = `${progress}%`;
}

export function animationLoop() {
    if (gameState.isPaused || gameState.isComplete || !gameState.imageLoaded) return;

    const framesPerUpdate = Math.max(1, Math.floor(10 / gameState.currentAnimationSpeed));
    if (Math.floor(performance.now() / 16) % framesPerUpdate === 0) {
        updateZigzag();
    }

    renderGrid();
    updateDisplay();
    gameState.animationFrameId = requestAnimationFrame(animationLoop);
}

export function startAnimationLoop() {
    if (!gameState.isPaused && !gameState.isComplete && gameState.imageLoaded) {
        gameState.startTime = Date.now();
        animationLoop();
    }
}