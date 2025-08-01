import { gameState, setLoadedImage } from './state.js';
import { DOM_ELEMENTS } from './constants.js';
import { playSound } from './audio.js';
import { resizeCanvas } from './canvas.js';
import { setupGrid, pixelateImage } from './grid.js';
import { startAnimationLoop, updateDisplay } from './animation.js';
import { downloadImage } from './utils.js';

export function togglePause() {
    if (gameState.isComplete || !gameState.imageLoaded) return;
    gameState.isPaused = !gameState.isPaused;
    DOM_ELEMENTS.togglePauseBtn.textContent = gameState.isPaused ? 'Resume' : 'Pause';
    if (!gameState.isPaused) {
        startAnimationLoop();
        playSound('start');
    } else if (gameState.animationFrameId) {
        cancelAnimationFrame(gameState.animationFrameId);
    }
}

export function resetReveal() {
    if (!gameState.imageLoaded) return;
    gameState.isComplete = false;
    gameState.isPaused = false;
    gameState.currentCol = 0;
    gameState.currentRow = 0;
    gameState.direction = 1;
    gameState.startTime = Date.now();
    DOM_ELEMENTS.togglePauseBtn.disabled = false;
    DOM_ELEMENTS.togglePauseBtn.textContent = 'Pause';
    DOM_ELEMENTS.downloadBtn.disabled = true;
    setupGrid();
    pixelateImage();
    updateDisplay();
    startAnimationLoop();
    playSound('start');
}

export function updateAnimationSpeed() {
    gameState.currentAnimationSpeed = parseFloat(DOM_ELEMENTS.animationSpeedSlider.value);
    DOM_ELEMENTS.currentSpeedValue.textContent = gameState.currentAnimationSpeed.toFixed(1);
}

export function updateGridSize() {
    resizeCanvas();
    setupGrid();
    pixelateImage();
    resetReveal();
}

export function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        DOM_ELEMENTS.errorMessage.textContent = 'Please upload a valid image file';
        DOM_ELEMENTS.errorMessage.classList.remove('hidden');
        DOM_ELEMENTS.errorMessage.classList.add('error-message');
        return;
    }

    DOM_ELEMENTS.errorMessage.classList.add('hidden');
    gameState.imageFileName = file.name.replace(/\.[^/.]+$/, '') + '_revealed.png';

    const image = new Image();
    image.onload = () => {
        setLoadedImage(image);
        gameState.imageLoaded = true;
        DOM_ELEMENTS.gameStatus.textContent = 'Image Loaded';
        DOM_ELEMENTS.gameStatus.className = 'text-green-400 font-semibold';
        resetReveal();
    };
    image.onerror = () => {
        DOM_ELEMENTS.errorMessage.textContent = 'Error loading image. Please try another file.';
        DOM_ELEMENTS.errorMessage.classList.remove('hidden');
        DOM_ELEMENTS.errorMessage.classList.add('error-message');
        gameState.imageLoaded = false;
        DOM_ELEMENTS.gameStatus.textContent = 'Error Loading Image';
        DOM_ELEMENTS.gameStatus.className = 'text-red-400 font-semibold';
    };
    image.src = URL.createObjectURL(file);
}

export function setupEventListeners() {
    if (DOM_ELEMENTS.togglePauseBtn) DOM_ELEMENTS.togglePauseBtn.addEventListener('click', togglePause);
    if (DOM_ELEMENTS.resetRevealBtn) DOM_ELEMENTS.resetRevealBtn.addEventListener('click', resetReveal);
    if (DOM_ELEMENTS.downloadBtn) DOM_ELEMENTS.downloadBtn.addEventListener('click', downloadImage);
    if (DOM_ELEMENTS.imageUpload) DOM_ELEMENTS.imageUpload.addEventListener('change', handleImageUpload);
    if (DOM_ELEMENTS.animationSpeedSlider) DOM_ELEMENTS.animationSpeedSlider.addEventListener('input', updateAnimationSpeed);
    if (DOM_ELEMENTS.gridSizeSelect) DOM_ELEMENTS.gridSizeSelect.addEventListener('change', updateGridSize);

    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                togglePause();
                break;
            case 'KeyR':
                event.preventDefault();
                resetReveal();
                break;
            case 'KeyD':
                event.preventDefault();
                if (!DOM_ELEMENTS.downloadBtn.disabled) downloadImage();
                break;
        }
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        setupGrid();
        pixelateImage();
        updateDisplay();
    });
}