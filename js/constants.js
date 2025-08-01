export const GAME_CONSTANTS = {
    COLORS: {
        BACKGROUND: '#111827',
        CURSOR: '#3b82f6',
        CURSOR_HIGHLIGHT: 'rgba(59, 130, 246, 0.5)'
    },
    DEFAULT_CELL_SIZE: 25,
    DEFAULT_ANIMATION_SPEED: 1,
    MAX_ANIMATION_SPEED: 5,
    MIN_ANIMATION_SPEED: 0.5
};

export const DOM_ELEMENTS = {
    revealCanvas: document.getElementById('revealCanvas'),
    ctx: document.getElementById('revealCanvas')?.getContext('2d'),
    revealTimerDisplay: document.getElementById('revealTimer'),
    revealProgressDisplay: document.getElementById('revealProgress'),
    togglePauseBtn: document.getElementById('togglePauseBtn'),
    resetRevealBtn: document.getElementById('resetRevealBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    imageUpload: document.getElementById('imageUpload'),
    animationSpeedSlider: document.getElementById('animationSpeedSlider'),
    currentSpeedValue: document.getElementById('currentSpeedValue'),
    gameStatus: document.getElementById('gameStatus'),
    gridSizeSelect: document.getElementById('gridSizeSelect'),
    errorMessage: document.getElementById('errorMessage')
};