/**
 * 游戏核心逻辑 - 状态转换与配对检查
 * @module gameLogic
 */

import { GameState } from './constants.js?v=7';
import { getDifficultyConfig, isAllMatched } from './gameState.js?v=7';
import { calculateScore } from './utils.js?v=7';
import { saveHighScore, saveBestTime, savePreferences } from './storage.js?v=7';
import { playSound, isSoundEnabled } from './audio.js?v=7';
import {
  flipCard,
  unflipCard,
  markMatched,
  markMismatch,
  clearMismatch,
  showScoreFloat,
} from './cardRenderer.js?v=7';
import { updateScoreBoard } from './ui.js?v=7';
import { addTotalScore, checkAndUnlockSkins } from './cardSkins.js?v=7';

/**
 * 处理配对成功
 * @param {Object} state
 * @param {Object} dom
 * @param {number} id1
 * @param {number} id2
 * @param {Function} onWin
 */
export function handleMatchSuccess(state, dom, id1, id2, onWin) {
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
      onWin();
    }
  }, 500);
}

/**
 * 处理配对失败
 * @param {Object} state
 * @param {Object} dom
 * @param {number} id1
 * @param {number} id2
 */
export function handleMatchFail(state, dom, id1, id2) {
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

/**
 * 处理胜利状态
 * @param {Object} state
 * @param {Object} dom
 * @param {Function} transitionTo
 */
export function handleWin(state, dom, transitionTo) {
  const finalScore = calculateScore({
    matchedPairs: state.matchedPairs,
    elapsedSeconds: state.elapsedSeconds,
    errors: state.errors,
    config: getDifficultyConfig(state),
  });

  state.highScore = saveHighScore(finalScore, state.highScore);
  state.bestTime = saveBestTime(state.elapsedSeconds, state.bestTime);
  savePreferences(state);

  addTotalScore(finalScore);
  const newUnlocks = checkAndUnlockSkins();
  if (newUnlocks.length > 0 && dom.startScreen) {
    import('./skinUI.js').then((skinUI) => {
      skinUI.showUnlockNotification(newUnlocks, document.body);
    });
  }

  setTimeout(() => playSound('victory'), 300);
  setTimeout(() => {
    transitionTo(GameState.WON);
  }, 1500);
}

/**
 * 处理卡牌点击
 * @param {Object} state
 * @param {Object} dom
 * @param {number} cardId
 * @param {Function} onMatchCheck
 * @returns {boolean} 是否成功翻转
 */
export function handleCardFlip(state, dom, cardId, onMatchCheck) {
  playSound('flip');
  flipCard(dom.gameBoard, cardId);
  state.flippedCards.push(cardId);

  if (state.flippedCards.length === 2) {
    onMatchCheck();
  }

  return true;
}
