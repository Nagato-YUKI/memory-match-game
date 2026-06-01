/**
 * 游戏状态管理模块
 * @module gameState
 */

import { GameState, DIFFICULTY_CONFIG, CARD_THEMES } from './constants.js?v=8';
import { loadSaveData } from './storage.js?v=8';

/**
 * 创建初始游戏状态
 * @returns {Object}
 */
export function createGameState() {
  const saved = loadSaveData();

  const validCardTheme = CARD_THEMES[saved.cardTheme] ? saved.cardTheme : 'guofeng';

  return {
    state: GameState.IDLE,
    difficulty: saved.difficulty,
    timedMode: false,
    theme: saved.theme,
    cardTheme: validCardTheme,
    soundEnabled: saved.soundEnabled,
    bgmEnabled: saved.bgmEnabled,

    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    errors: 0,
    moves: 0,
    elapsedSeconds: 0,
    countdownSeconds: 0,

    isAnimating: false,

    highScore: saved.highScore,
    bestTime: saved.bestTime,
  };
}

/**
 * 重置游戏数据（保留用户偏好）
 * @param {Object} state
 */
export function resetGameData(state) {
  state.cards = [];
  state.flippedCards = [];
  state.matchedPairs = 0;
  state.errors = 0;
  state.moves = 0;
  state.elapsedSeconds = 0;
  state.countdownSeconds = 0;
  state.isAnimating = false;
}

/**
 * 获取当前难度配置
 * @param {Object} state
 * @returns {Object}
 */
export function getDifficultyConfig(state) {
  return DIFFICULTY_CONFIG[state.difficulty];
}

/**
 * 获取当前卡牌主题配置
 * @param {Object} state
 * @returns {Object}
 */
export function getCardThemeConfig(state) {
  return CARD_THEMES[state.cardTheme] || CARD_THEMES.guofeng;
}

/**
 * 获取当前主题的卡牌数据
 * @param {Object} state
 * @returns {Array}
 */
export function getCurrentThemeCards(state) {
  const theme = CARD_THEMES[state.cardTheme];
  return theme ? theme.cards : [];
}

/**
 * 检查是否可以点击卡牌
 * @param {Object} state
 * @param {number} cardId
 * @returns {boolean}
 */
export function canFlipCard(state, cardId) {
  if (state.state !== GameState.PLAYING) return false;
  if (state.isAnimating) return false;

  const card = state.cards[cardId];
  if (!card || card.matched) return false;
  if (state.flippedCards.some((c) => c.index === cardId)) return false;
  if (state.flippedCards.length >= 2) return false;

  return true;
}

/**
 * 检查是否全部配对完成
 * @param {Object} state
 * @returns {boolean}
 */
export function isAllMatched(state) {
  const config = getDifficultyConfig(state);
  return state.matchedPairs >= config.pairs;
}
