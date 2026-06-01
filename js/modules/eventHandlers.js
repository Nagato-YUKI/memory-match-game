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
  syncSoundEnabled,
  syncBgmEnabled,
} from './audio.js?v=8';
import { savePreferences } from './storage.js?v=8';
import { renderSkinSelector } from './skinUI.js?v=8';
import { getSelectedSkinId, findSkinById } from './cardSkins.js?v=8';
import { updateScoreBoard } from './ui.js?v=8';

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
      state.isAnimating = true;
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
    state.matchedPairs += 1;
    card1.matched = true;
    card2.matched = true;

    setTimeout(() => {
      markMatched(dom.gameBoard, card1.index);
      markMatched(dom.gameBoard, card2.index);
      playSound('match');
      updateScoreBoard(state, dom);
      state.isAnimating = false;

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
    state.errors += 1;
    updateScoreBoard(state, dom);

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
      state.isAnimating = false;
    }, 1000);
  }

  /**
   * 绑定所有事件
   */
  function bindEvents() {
    // 难度选择
    dom.difficultyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.difficulty = btn.dataset.difficulty;
        dom.difficultyBtns.forEach((b) => b.classList.remove('difficulty-btn--active'));
        btn.classList.add('difficulty-btn--active');
        btn.setAttribute('aria-checked', 'true');
        dom.difficultyBtns.forEach((b) => {
          if (b !== btn) b.setAttribute('aria-checked', 'false');
        });
        playSound('click');
      });
    });

    // 限时模式
    dom.timedModeToggle.addEventListener('change', () => {
      state.timedMode = dom.timedModeToggle.checked;
      playSound('click');
    });

    // 主题切换
    dom.themeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', state.theme);
      playSound('click');
    });

    // 音效开关
    if (dom.soundToggle) {
      dom.soundToggle.addEventListener('change', () => {
        state.soundEnabled = dom.soundToggle.checked;
        syncSoundEnabled(state.soundEnabled);
        savePreferences(state);
        playSound('click');
      });
    }

    // BGM 开关
    if (dom.bgmToggle) {
      dom.bgmToggle.addEventListener('change', () => {
        state.bgmEnabled = dom.bgmToggle.checked;
        syncBgmEnabled(state.bgmEnabled);
        savePreferences(state);
        if (state.bgmEnabled) {
          playBGM();
        } else {
          pauseBGM();
        }
      });
    }

    // 卡面选择按钮
    if (dom.skinToggleBtn) {
      dom.skinToggleBtn.addEventListener('click', () => {
        const panel = document.getElementById('skin-panel');
        if (panel) {
          const isHidden = panel.style.display === 'none';
          panel.style.display = isHidden ? 'block' : 'none';
          if (isHidden) {
            panel.innerHTML = '';
            renderSkinSelector(panel, (skinId) => {
              const skin = findSkinById(skinId);
              if (skin) {
                state.cardTheme = skin.seriesId;
                document.body.setAttribute('data-card-theme', skin.seriesId);
                savePreferences(state);
              }
            }, state.cardTheme);
          }
        }
        playSound('click');
      });
    }

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

    // 重新开始（游戏内）
    dom.restartBtn.addEventListener('click', () => {
      transitionTo(GameState.PLAYING);
      playSound('click');
    });

    // 重新开始（暂停遮罩）
    if (dom.pauseRestartBtn) {
      dom.pauseRestartBtn.addEventListener('click', () => {
        transitionTo(GameState.PLAYING);
        playSound('click');
      });
    }

    // 返回菜单
    dom.menuBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.IDLE);
    });

    // 胜利后再玩一次
    dom.winReplayBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.PLAYING);
    });

    // 胜利后返回菜单
    dom.winMenuBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.IDLE);
    });

    // 失败后再玩一次
    dom.loseReplayBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.PLAYING);
    });

    // 失败后返回菜单
    dom.loseMenuBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.IDLE);
    });
  }

  return { onCardClick, bindEvents };
}
