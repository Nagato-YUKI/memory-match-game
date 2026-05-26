/**
 * DOM 元素缓存模块
 * @module dom
 */

/**
 * 获取所有 DOM 元素引用
 * @returns {Object}
 */
export default function getDOMElements() {
  return {
    // 屏幕
    startScreen: document.getElementById('start-screen'),
    gameScreen: document.getElementById('game-screen'),

    // 开始界面
    difficultyBtns: document.querySelectorAll('.difficulty-btn'),
    timedModeToggle: document.getElementById('timed-mode-toggle'),
    themeToggle: document.getElementById('theme-toggle'),
    cardThemeBtns: document.querySelectorAll('.card-theme-btn'),
    soundToggle: document.getElementById('sound-toggle'),
    bgmToggle: document.getElementById('bgm-toggle'),
    startBtn: document.getElementById('start-btn'),
    historyHighScore: document.getElementById('history-high-score'),
    historyBestTime: document.getElementById('history-best-time'),

    // 分数板
    scoreMatches: document.getElementById('score-matches'),
    scoreTime: document.getElementById('score-time'),
    scoreErrors: document.getElementById('score-errors'),
    scoreCurrent: document.getElementById('score-current'),
    scoreHigh: document.getElementById('score-high'),
    scoreCountdown: document.getElementById('score-countdown'),

    // 游戏控制
    pauseBtn: document.getElementById('pause-btn'),
    restartBtn: document.getElementById('restart-btn'),
    menuBtn: document.getElementById('menu-btn'),

    // 游戏面板
    gameBoard: document.getElementById('game-board'),

    // 遮罩层
    pauseOverlay: document.getElementById('pause-overlay'),
    winOverlay: document.getElementById('win-overlay'),
    loseOverlay: document.getElementById('lose-overlay'),

    // 暂停遮罩按钮
    resumeBtn: document.getElementById('resume-btn'),
    pauseRestartBtn: document.getElementById('pause-restart-btn'),

    // 胜利遮罩
    winScore: document.getElementById('win-score'),
    winTime: document.getElementById('win-time'),
    winErrors: document.getElementById('win-errors'),
    winMultiplier: document.getElementById('win-multiplier'),
    winReplayBtn: document.getElementById('win-replay-btn'),
    winMenuBtn: document.getElementById('win-menu-btn'),

    // 失败遮罩
    loseMatches: document.getElementById('lose-matches'),
    loseTime: document.getElementById('lose-time'),
    loseErrors: document.getElementById('lose-errors'),
    loseReplayBtn: document.getElementById('lose-replay-btn'),
    loseMenuBtn: document.getElementById('lose-menu-btn'),
  };
}
