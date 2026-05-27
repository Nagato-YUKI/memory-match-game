/**
 * 卡牌渲染模块
 * @module cardRenderer
 */

import { getCurrentThemeCards, getDifficultyConfig, getCardThemeConfig } from './gameState.js?v=5';
import { shuffleArray } from './utils.js?v=5';

/**
 * 生成卡牌数据
 * @param {Object} state
 * @returns {Array<Object>}
 */
export function generateCards(state) {
  const config = getDifficultyConfig(state);
  const { pairs } = config;
  const themeCards = getCurrentThemeCards(state);
  const selectedCards = themeCards.slice(0, pairs);
  const cardPairs = [...selectedCards, ...selectedCards];
  const shuffled = shuffleArray(cardPairs);

  return shuffled.map((card, index) => ({
    ...card,
    index,
    matched: false,
    backImg: card.backImg || './assets/card-back.png',
  }));
}

/**
 * 渲染游戏面板
 * @param {Object} state
 * @param {HTMLElement} gameBoard
 * @param {Function} onCardClick
 */
export function renderGameBoard(state, gameBoard, onCardClick) {
  const config = getDifficultyConfig(state);
  const themeConfig = getCardThemeConfig(state);

  gameBoard.className = `game-board ${config.gridClass} ${themeConfig.boardClass}`;
  gameBoard.innerHTML = '';

  state.cards.forEach((card) => {
    const cardEl = createCardElement(card, onCardClick);
    gameBoard.appendChild(cardEl);
  });
}

/**
 * 创建单个卡牌元素
 * @param {Object} card
 * @param {Function} onCardClick
 * @returns {HTMLElement}
 */
function createCardElement(card, onCardClick) {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.dataset.id = card.index;
  cardEl.setAttribute('role', 'button');
  cardEl.setAttribute('aria-label', `卡牌 ${card.name}`);

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const back = document.createElement('div');
  back.className = 'card-face card-face--back';

  const backImg = document.createElement('img');
  backImg.src = card.backImg;
  backImg.alt = '卡牌背面';
  backImg.className = 'card-back-image';
  backImg.setAttribute('aria-hidden', 'true');
  backImg.loading = 'eager';

  back.appendChild(backImg);

  const front = document.createElement('div');
  front.className = 'card-face card-face--front';

  const img = document.createElement('img');
  img.src = card.src;
  img.alt = card.name;
  img.className = 'card-image';
  img.setAttribute('aria-hidden', 'true');
  img.loading = 'lazy';

  front.appendChild(img);
  inner.appendChild(back);
  inner.appendChild(front);
  cardEl.appendChild(inner);

  // 点击事件
  cardEl.addEventListener('click', () => onCardClick(card.index));
  // 触屏事件（消除 300ms 延迟）
  cardEl.addEventListener('touchstart', (e) => {
    e.preventDefault();
    onCardClick(card.index);
  }, { passive: false });

  return cardEl;
}

/**
 * 获取卡牌 DOM 元素
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 * @returns {HTMLElement|null}
 */
export function getCardElement(gameBoard, cardId) {
  return gameBoard.querySelector(`.card[data-id="${cardId}"]`);
}

/**
 * 翻牌动画
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 */
export function flipCard(gameBoard, cardId) {
  const cardEl = getCardElement(gameBoard, cardId);
  if (cardEl) {
    cardEl.classList.add('flipped');
  }
}

/**
 * 翻回卡牌
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 */
export function unflipCard(gameBoard, cardId) {
  const cardEl = getCardElement(gameBoard, cardId);
  if (cardEl) {
    cardEl.classList.remove('flipped');
  }
}

/**
 * 添加配对成功样式
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 */
export function markMatched(gameBoard, cardId) {
  const cardEl = getCardElement(gameBoard, cardId);
  if (cardEl) {
    cardEl.classList.add('matched');
  }
}

/**
 * 添加配对失败样式
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 */
export function markMismatch(gameBoard, cardId) {
  const cardEl = getCardElement(gameBoard, cardId);
  if (cardEl) {
    cardEl.classList.add('mismatch');
  }
}

/**
 * 移除配对失败样式
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 */
export function clearMismatch(gameBoard, cardId) {
  const cardEl = getCardElement(gameBoard, cardId);
  if (cardEl) {
    cardEl.classList.remove('mismatch');
  }
}

/**
 * 锁定/解锁所有卡牌
 * @param {HTMLElement} gameBoard
 * @param {boolean} lock
 */
export function lockAllCards(gameBoard, lock) {
  const cards = gameBoard.querySelectorAll('.card');
  cards.forEach((cardEl) => {
    cardEl.classList.toggle('locked', lock);
  });
}

/**
 * 显示得分飘字
 * @param {HTMLElement} gameBoard
 * @param {number} cardId
 * @param {number} points
 */
export function showScoreFloat(gameBoard, cardId, points) {
  const cardEl = getCardElement(gameBoard, cardId);
  if (!cardEl) return;

  const floatEl = document.createElement('div');
  floatEl.className = 'score-float';
  floatEl.textContent = `+${points}`;
  cardEl.appendChild(floatEl);

  setTimeout(() => {
    floatEl.remove();
  }, 1000);
}
