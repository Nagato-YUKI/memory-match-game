/**
 * 游戏事件处理器
 * @module eventHandlers
 */

import { GameState } from './constants.js?v=8';
import { canFlipCard, isAllMatched } from './gameState.js?v=8';
import {
  flipCard,
  unflipCard,
  markMatched,
  markMismatch,
  clearMismatch,
} from './cardRenderer.js?v=8';
import {
  playSound,
  playBGM,
  pauseBGM,
} from './audio.js?v=8';
import { savePreferences } from './storage.js?v=8';

/**
 * 创建事件处理器
 * @param {Object} state - 游戏状态
 * @param {Object} dom - DOM 元素
 * @param {Function} transitionTo - 状态转换函数
 * @returns {Object} 事件处理函数集合
 */
export function createEventHandlers(state, dom, transitionTo) {
  /**
   * 卡牌点击处理
   * @param {number} cardId
   */
  function onCardClick(cardId) {
    if (!canFlipCard(state, cardId)) return;

    const card = state.cards[cardId];
    state.flippedCards.push(card);
    flipCard(dom.gameBoard, cardId);
    playSound('flip');

    if (state.flippedCards.length === 2) {
      state.moves += 1;
      checkMatch();
    }
  }

  /**
   * 检查配对
   */
  function checkMatch() {
    const [card1, card2] = state.flippedCards;

    if (card1.src === card2.src) {
      handleMatch(card1, card2);
    } else {
      handleMismatch(card1, card2);
    }
  }

  /**
   * 处理配对成功
   * @param {Object} card1
   * @param {Object} card2
   */
  function handleMatch(card1, card2) {
    state.matches += 1;
    card1.matched = true;
    card2.matched = true;

    setTimeout(() => {
      markMatched(dom.gameBoard, card1.index);
      markMatched(dom.gameBoard, card2.index);
      playSound('match');

      if (isAllMatched(state)) {
        transitionTo(GameState.WON);
      }
    }, 300);

    state.flippedCards = [];
  }

  /**
   * 处理配对失败
   * @param {Object} card1
   * @param {Object} card2
   */
  function handleMismatch(card1, card2) {
    setTimeout(() => {
      markMismatch(dom.gameBoard, card1.index);
      markMismatch(dom.gameBoard, card2.index);
      playSound('mismatch');
    }, 400);

    setTimeout(() => {
      unflipCard(dom.gameBoard, card1.index);
      unflipCard(dom.gameBoard, card2.index);
      clearMismatch(dom.gameBoard, card1.index);
      clearMismatch(dom.gameBoard, card2.index);
      state.flippedCards = [];
    }, 1000);
  }

  /**
   * 绑定所有事件
   */
  function bindEvents() {
    // 难度选择
    dom.difficultyOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        state.difficulty = opt.dataset.value;
        dom.difficultyOptions.forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        playSound('click');
      });
    });

    // 限时模式
    dom.timedModeToggle.addEventListener('change', () => {
      state.timedMode = dom.timedModeToggle.checked;
      playSound('click');
    });

    // 卡牌主题
    dom.cardThemeOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        state.cardTheme = opt.dataset.value;
        dom.cardThemeOptions.forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        document.body.setAttribute('data-card-theme', state.cardTheme);
        playSound('click');
      });
    });

    // 主题切换
    dom.themeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', state.theme);
      playSound('click');
    });

    // 音效开关
    dom.soundToggle.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      dom.soundToggle.classList.toggle('active', state.soundEnabled);
      playSound('click');
    });

    // BGM 开关
    dom.bgmToggle.addEventListener('click', () => {
      state.bgmEnabled = !state.bgmEnabled;
      dom.bgmToggle.classList.toggle('active', state.bgmEnabled);
      if (state.bgmEnabled) {
        playBGM();
      } else {
        pauseBGM();
      }
    });

    // 开始游戏
    dom.startBtn.addEventListener('click', () => {
      savePreferences(state);
      transitionTo(GameState.PLAYING);
      playSound('click');
    });

    // 暂停
    dom.pauseBtn.addEventListener('click', () => {
      if (state.state === GameState.PLAYING) {
        transitionTo(GameState.PAUSED);
      }
    });

    // 继续
    dom.resumeBtn.addEventListener('click', () => {
      if (state.state === GameState.PAUSED) {
        transitionTo(GameState.PLAYING);
      }
    });

    // 重新开始
    dom.restartBtn.addEventListener('click', () => {
      transitionTo(GameState.PLAYING);
      playSound('click');
    });

    // 返回菜单
    dom.backToMenuBtn.addEventListener('click', () => {
      transitionTo(GameState.IDLE);
    });

    dom.loseBackToMenuBtn.addEventListener('click', () => {
      transitionTo(GameState.IDLE);
    });

    // 再玩一次
    dom.playAgainBtn.addEventListener('click', () => {
      transitionTo(GameState.PLAYING);
      playSound('click');
    });
  }

  return { onCardClick, bindEvents };
}
