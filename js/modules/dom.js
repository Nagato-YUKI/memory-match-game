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
    skinToggleBtn: document.getElementById('skin-toggle-btn'),
    soundToggle: document.getElementById('sound-toggle'),
    bgmToggle: document.getElementById('bgm-toggle'),
    startBtn: document.getElementById('start-btn'),
    helpBtn: document.getElementById('help-btn'),
    leaderboardBtn: document.getElementById('leaderboard-btn'),
    achievementsBtn: document.getElementById('achievements-btn'),
    historyHighScore: document.getElementById('history-high-score'),
    historyBestTime: document.getElementById('history-best-time'),

    // 加载画面
    loadingScreen: document.getElementById('loading-screen'),

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
    shareBtn: document.getElementById('share-btn'),

    // 失败遮罩
    loseMatches: document.getElementById('lose-matches'),
    loseTime: document.getElementById('lose-time'),
    loseErrors: document.getElementById('lose-errors'),
    loseReplayBtn: document.getElementById('lose-replay-btn'),
    loseMenuBtn: document.getElementById('lose-menu-btn'),

    // 排行榜遮罩
    leaderboardOverlay: document.getElementById('leaderboard-overlay'),
    leaderboardBody: document.getElementById('leaderboard-body'),
    leaderboardSortScore: document.getElementById('leaderboard-sort-score'),
    leaderboardSortTime: document.getElementById('leaderboard-sort-time'),
    leaderboardClearBtn: document.getElementById('leaderboard-clear-btn'),
    leaderboardCloseBtn: document.getElementById('leaderboard-close-btn'),

    // 成就遮罩
    achievementsOverlay: document.getElementById('achievements-overlay'),
    achievementsGrid: document.getElementById('achievements-grid'),
    achievementsCloseBtn: document.getElementById('achievements-close-btn'),

    // 引导弹窗
    tutorialOverlay: document.getElementById('tutorial-overlay'),
    tutorialCloseBtn: document.getElementById('tutorial-close-btn'),
    tutorialDontShow: document.getElementById('tutorial-dont-show'),

    // Toast 容器
    toastContainer: document.getElementById('toast-container'),

    // 过场动画遮罩
    transitionOverlay: document.getElementById('transition-overlay'),
    transitionTitle: document.getElementById('transition-title'),
    transitionSubtitle: document.getElementById('transition-subtitle'),
  };
}
