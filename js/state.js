export const gameState = {
    isPaused: true,
    isComplete: false,
    startTime: null,
    animationFrameId: null,
    currentAnimationSpeed: 1,
    cellSize: 25,
    cols: 0,
    rows: 0,
    currentCol: 0,
    currentRow: 0,
    direction: 1,
    pixelGrid: [],
    imageLoaded: false,
    imageFileName: 'revealed_image.png'
};

export let pixelCanvas = null;
export let pixelCtx = null;
export let loadedImage = null;
export let audioContext = null;

try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.warn('AudioContext not supported:', e);
}

export function setPixelCanvas(canvas) {
    pixelCanvas = canvas;
}

export function setPixelCtx(ctx) {
    pixelCtx = ctx;
}

export function setLoadedImage(image) {
    loadedImage = image;
}