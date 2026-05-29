/**
 * 游戏状态机
 * @module stateMachine
 */

import { GameState } from './constants.js?v=8';
import {
  resetGameData,
  getDifficultyConfig,
} from './gameState.js?v=8';
import {
  generateCards,
  renderGameBoard,
  lockAllCards,
} from './cardRenderer.js?v=8';
import {
  playBGM,
  pauseBGM,
} from './audio.js?v=8';
import { savePreferences } from './storage.js?v=8';
import { startTimer, stopAll } from './timer.js?v=8';
import {
  updateScoreBoard,
  updateHistoryDisplay,
  switchScreen,
  toggleOverlay,
  updateWinOverlay,
  updateLoseOverlay,
} from './ui.js?v=8';

/**
 * 创建状态机
 * @param {Object} state - 游戏状态
 * @param {Object} dom - DOM 元素
 * @param {Function} onCardClick - 卡牌点击回调
 * @returns {Object} 状态机接口
 */
export function createStateMachine(state, dom, onCardClick) {
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
      renderGameBoard(state, dom.gameBoard, onCardClick);
      switchScreen('game', dom);
    }

    startTimer(() => {
      state.elapsedSeconds += 1;
      updateScoreBoard(state, dom);
    });

    if (state.timedMode) {
      const { timeLimit } = getDifficultyConfig(state);

      if (timeLimit) {
        import('./timer.js?v=8').then((timer) => {
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

    setTimeout(() => {
      import('./audio.js?v=8').then((audio) => audio.playSound('gameover'));
    }, 200);
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

  return { transitionTo };
}
