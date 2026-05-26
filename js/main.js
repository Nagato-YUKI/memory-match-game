/**
 * 记忆翻牌小游戏 - 主入口
 * 模块化重构版本，使用 ES6 Modules
 */

import { GameState } from './modules/constants.js';
import {
  createGameState,
  resetGameData,
  canFlipCard,
  isAllMatched,
  getDifficultyConfig,
} from './modules/gameState.js';
import {
  generateCards,
  renderGameBoard,
  flipCard,
  unflipCard,
  markMatched,
  markMismatch,
  clearMismatch,
  lockAllCards,
  showScoreFloat,
} from './modules/cardRenderer.js';
import {
  initAudioContext,
  playSound,
  initBGM,
  playBGM,
  pauseBGM,
  isBGMEnabled,
} from './modules/audio.js';
import {
  saveHighScore,
  saveBestTime,
  savePreferences,
} from './modules/storage.js';
import { startTimer, stopAll } from './modules/timer.js';
import getDOMElements from './modules/dom.js';
import {
  updateScoreBoard,
  updateHistoryDisplay,
  updateDifficultyUI,
  updateThemeUI,
  updateSoundUI,
  updateBGMUI,
  switchScreen,
  toggleOverlay,
  updateWinOverlay,
  updateLoseOverlay,
} from './modules/ui.js';
import { calculateScore } from './modules/utils.js';

// ============================================
// 全局状态
// ============================================

/** @type {Object} */
const state = createGameState();

/** @type {Object} */
let dom = {};

// ============================================
// 状态机
// ============================================

/**
 * 状态转换核心函数
 * @param {string} newState
 */
function transitionTo(newState) {
  const prevState = state.state;
  state.state = newState;

  switch (newState) {
    case GameState.PLAYING:
      enterPlayingState(prevState);
      break;
    case GameState.PAUSED:
      enterPausedState();
      break;
    case GameState.WON:
      enterWonState();
      break;
    case GameState.LOST:
      enterLostState();
      break;
    case GameState.IDLE:
      enterIdleState();
      break;
    default:
      break;
  }
}

/**
 * 进入 PLAYING 状态
 * @param {string} prevState
 */
function enterPlayingState(prevState) {
  toggleOverlay(dom.pauseOverlay, false);

  if (prevState === GameState.IDLE
    || prevState === GameState.WON
    || prevState === GameState.LOST) {
    resetGameData(state);
    state.cards = generateCards(state);
    renderGameBoard(state, dom.gameBoard, handleCardClick);
    switchScreen('game', dom);
  }

  startTimer(() => {
    state.elapsedSeconds += 1;
    updateScoreBoard(state, dom);
  });

  if (state.timedMode) {
    const { timeLimit } = getDifficultyConfig(state);

    if (timeLimit) {
      import('./modules/timer.js').then((timer) => {
        timer.startCountdown(timeLimit, (remaining) => {
          state.countdownSeconds = remaining;
          updateScoreBoard(state, dom);
        }, () => {
          transitionTo(GameState.LOST);
        });
      });
    }
  }

  playBGM();
  updateScoreBoard(state, dom);
}

/**
 * 进入 PAUSED 状态
 */
function enterPausedState() {
  stopAll();
  pauseBGM();
  lockAllCards(dom.gameBoard, true);
  toggleOverlay(dom.pauseOverlay, true);
}

/**
 * 进入 WON 状态
 */
function enterWonState() {
  stopAll();
  pauseBGM();
  lockAllCards(dom.gameBoard, true);

  const finalScore = calculateScore({
    matchedPairs: state.matchedPairs,
    elapsedSeconds: state.elapsedSeconds,
    errors: state.errors,
    config: getDifficultyConfig(state),
  });

  state.highScore = saveHighScore(finalScore, state.highScore);
  state.bestTime = saveBestTime(state.elapsedSeconds, state.bestTime);
  savePreferences(state);

  setTimeout(() => playSound('victory'), 300);
  setTimeout(() => {
    updateWinOverlay(state, dom);
    toggleOverlay(dom.winOverlay, true);
  }, 1500);
}

/**
 * 进入 LOST 状态
 */
function enterLostState() {
  stopAll();
  pauseBGM();
  lockAllCards(dom.gameBoard, true);
  savePreferences(state);

  setTimeout(() => playSound('gameover'), 200);
  setTimeout(() => {
    updateLoseOverlay(state, dom);
    toggleOverlay(dom.loseOverlay, true);
  }, 1000);
}

/**
 * 进入 IDLE 状态
 */
function enterIdleState() {
  stopAll();
  pauseBGM();
  toggleOverlay(dom.pauseOverlay, false);
  toggleOverlay(dom.winOverlay, false);
  toggleOverlay(dom.loseOverlay, false);
  dom.gameBoard.innerHTML = '';
  switchScreen('start', dom);
  updateHistoryDisplay(state, dom);
}

// ============================================
// 游戏逻辑 - 翻牌与配对
// ============================================

/**
 * 处理卡牌点击
 * @param {number} cardId
 */
function handleCardClick(cardId) {
  if (!canFlipCard(state, cardId)) return;

  playSound('flip');
  flipCard(dom.gameBoard, cardId);
  state.flippedCards.push(cardId);

  if (state.flippedCards.length === 2) {
    checkMatch();
  }
}

/**
 * 检查配对
 */
function checkMatch() {
  const [id1, id2] = state.flippedCards;
  const card1 = state.cards[id1];
  const card2 = state.cards[id2];

  state.isAnimating = true;

  if (card1.symbol === card2.symbol) {
    handleMatchSuccess(id1, id2);
  } else {
    handleMatchFail(id1, id2);
  }
}

/**
 * 配对成功处理
 * @param {number} id1
 * @param {number} id2
 */
function handleMatchSuccess(id1, id2) {
  const card1 = state.cards[id1];
  const card2 = state.cards[id2];
  card1.matched = true;
  card2.matched = true;

  state.matchedPairs += 1;

  setTimeout(() => {
    playSound('match');
    markMatched(dom.gameBoard, id1);
    markMatched(dom.gameBoard, id2);

    const config = getDifficultyConfig(state);
    const timeBonus = Math.max(0, config.timeBase - state.elapsedSeconds) * config.timeCoeff;
    const points = 100 + timeBonus;
    showScoreFloat(dom.gameBoard, id1, points);

    updateScoreBoard(state, dom);
    state.flippedCards = [];
    state.isAnimating = false;

    if (isAllMatched(state)) {
      transitionTo(GameState.WON);
    }
  }, 500);
}

/**
 * 配对失败处理
 * @param {number} id1
 * @param {number} id2
 */
function handleMatchFail(id1, id2) {
  state.errors += 1;
  updateScoreBoard(state, dom);

  markMismatch(dom.gameBoard, id1);
  markMismatch(dom.gameBoard, id2);

  setTimeout(() => {
    playSound('mismatch');
    clearMismatch(dom.gameBoard, id1);
    clearMismatch(dom.gameBoard, id2);

    unflipCard(dom.gameBoard, id1);
    unflipCard(dom.gameBoard, id2);

    state.flippedCards = [];

    setTimeout(() => {
      state.isAnimating = false;
    }, 400);
  }, 1300);
}

// ============================================
// 事件绑定
// ============================================

/**
 * 绑定所有事件监听器
 */
function bindEvents() {
  // 难度选择
  dom.difficultyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('button');
      state.difficulty = btn.dataset.difficulty;
      updateDifficultyUI(state, dom);
      savePreferences(state);
    });
  });

  // 限时模式开关
  dom.timedModeToggle.addEventListener('change', (e) => {
    state.timedMode = e.target.checked;
  });

  // 主题切换
  dom.themeToggle.addEventListener('click', () => {
    playSound('button');
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    updateThemeUI(state, dom);
    savePreferences(state);
  });

  // 音效开关
  if (dom.soundToggle) {
    dom.soundToggle.addEventListener('change', (e) => {
      state.soundEnabled = e.target.checked;
      savePreferences(state);
    });
  }

  // BGM 开关
  if (dom.bgmToggle) {
    dom.bgmToggle.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      if (enabled) {
        playBGM();
      } else {
        pauseBGM();
      }
      state.bgmEnabled = enabled;
      savePreferences(state);
    });
  }

  // 开始游戏
  dom.startBtn.addEventListener('click', () => {
    if (state.isAnimating) return;
    playSound('button');
    initAudioContext();
    transitionTo(GameState.PLAYING);
  });

  // 暂停
  dom.pauseBtn.addEventListener('click', () => {
    if (state.state === GameState.PLAYING) {
      playSound('button');
      transitionTo(GameState.PAUSED);
    }
  });

  // 继续游戏
  dom.resumeBtn.addEventListener('click', () => {
    if (state.state === GameState.PAUSED) {
      playSound('button');
      lockAllCards(dom.gameBoard, false);
      state.cards.forEach((card) => {
        if (card.matched) {
          const el = dom.gameBoard.querySelector(`.card[data-id="${card.id}"]`);
          if (el) el.classList.add('locked');
        }
      });
      transitionTo(GameState.PLAYING);
    }
  });

  // 重新开始（游戏内）
  dom.restartBtn.addEventListener('click', () => {
    if (state.isAnimating) return;
    playSound('button');
    stopAll();
    resetGameData(state);
    state.cards = generateCards(state);
    renderGameBoard(state, dom.gameBoard, handleCardClick);
    transitionTo(GameState.PLAYING);
  });

  // 重新开始（暂停遮罩）
  dom.pauseRestartBtn.addEventListener('click', () => {
    if (state.isAnimating) return;
    playSound('button');
    toggleOverlay(dom.pauseOverlay, false);
    stopAll();
    resetGameData(state);
    state.cards = generateCards(state);
    renderGameBoard(state, dom.gameBoard, handleCardClick);
    transitionTo(GameState.PLAYING);
  });

  // 返回菜单
  dom.menuBtn.addEventListener('click', () => {
    playSound('button');
    transitionTo(GameState.IDLE);
  });

  // 胜利后再玩一次
  dom.winReplayBtn.addEventListener('click', () => {
    if (state.isAnimating) return;
    playSound('button');
    toggleOverlay(dom.winOverlay, false);
    transitionTo(GameState.PLAYING);
  });

  // 胜利后返回菜单
  dom.winMenuBtn.addEventListener('click', () => {
    playSound('button');
    transitionTo(GameState.IDLE);
  });

  // 失败后再玩一次
  dom.loseReplayBtn.addEventListener('click', () => {
    if (state.isAnimating) return;
    playSound('button');
    toggleOverlay(dom.loseOverlay, false);
    transitionTo(GameState.PLAYING);
  });

  // 失败后返回菜单
  dom.loseMenuBtn.addEventListener('click', () => {
    playSound('button');
    transitionTo(GameState.IDLE);
  });
}

// ============================================
// 初始化
// ============================================

/**
 * 游戏初始化
 */
function init() {
  dom = getDOMElements();

  initBGM('bgm.mp3');

  updateDifficultyUI(state, dom);
  updateThemeUI(state, dom);
  updateSoundUI(state, dom);
  updateBGMUI(isBGMEnabled(), dom);
  updateHistoryDisplay(state, dom);
  dom.timedModeToggle.checked = state.timedMode;

  bindEvents();

  console.log('记忆翻牌游戏初始化完成 (模块化版本)');
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
