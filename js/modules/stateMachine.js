/**
 * 游戏状态机
 * @module stateMachine
 */

import { GameState } from './constants.js?v=10';
import {
  resetGameData,
  getDifficultyConfig,
} from './gameState.js?v=10';
import {
  generateCards,
  renderGameBoard,
  lockAllCards,
} from './cardRenderer.js?v=10';
import {
  playBGM,
  pauseBGM,
  playSound,
} from './audio.js?v=10';
import { savePreferences, saveHighScore, saveBestTime } from './storage.js?v=10';
import { startTimer, stopAll } from './timer.js?v=10';
import {
  updateScoreBoard,
  updateHistoryDisplay,
  switchScreen,
  toggleOverlay,
  updateWinOverlay,
  updateLoseOverlay,
  showStartTransition,
  showWinTransition,
} from './ui.js?v=10';
import { calculateScore } from './utils.js?v=10';
import { addTotalScore, checkAndUnlockSkins } from './cardSkins.js?v=10';
import { addLeaderboardEntry } from './leaderboard.js?v=10';
import { checkAchievements } from './achievements.js?v=10';

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

      // 显示开始过渡动画，动画结束后切换屏幕并启动计时
      showStartTransition(dom, () => {
        switchScreen('game', dom);

        startTimer(() => {
          state.elapsedSeconds += 1;
          updateScoreBoard(state, dom);
        });

        if (state.timedMode) {
          const { timeLimit } = getDifficultyConfig(state);

          if (timeLimit) {
            import('./timer.js?v=10').then((timer) => {
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
      });
      return;
    }

    startTimer(() => {
      state.elapsedSeconds += 1;
      updateScoreBoard(state, dom);
    });

    if (state.timedMode) {
      const { timeLimit } = getDifficultyConfig(state);

      if (timeLimit) {
        import('./timer.js?v=10').then((timer) => {
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
   * 显示 Toast 通知
   * @param {string} message
   */
  function showToast(message) {
    const container = dom.toastContainer || document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast--show';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('toast--show');
      toast.classList.add('toast--hide');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * 进入 WON 状态
   */
  function enterWonState() {
    stopAll();
    pauseBGM();
    lockAllCards(dom.gameBoard, true);

    // 计算最终得分并保存
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
      import('./skinUI.js?v=10').then((skinUI) => {
        skinUI.showUnlockNotification(newUnlocks, document.body);
      });
    }

    // 检查并解锁成就
    const config = getDifficultyConfig(state);
    const newlyUnlockedAchievements = checkAchievements(state, config);
    if (newlyUnlockedAchievements.length > 0) {
      import('./constants.js?v=10').then((constants) => {
        const list = constants.ACHIEVEMENTS_LIST;
        newlyUnlockedAchievements.forEach((id) => {
          const ach = list.find((a) => a.id === id);
          if (ach) {
            setTimeout(() => showToast(`解锁新成就：${ach.name}`), 2000);
          }
        });
      });
    }

    // 弹出昵称输入框并记录排行榜
    setTimeout(() => {
      const nickname = prompt('恭喜通关！请输入你的昵称（留空则为匿名玩家）：');
      if (nickname !== null) {
        addLeaderboardEntry(nickname, finalScore, state.elapsedSeconds, state.difficulty);
      }
    }, 1800);

    setTimeout(() => playSound('victory'), 300);

    // 显示胜利过渡动画，动画结束后显示胜利界面
    showWinTransition(dom, () => {
      updateWinOverlay(state, dom);
      toggleOverlay(dom.winOverlay, true);
    });
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
      import('./audio.js?v=10').then((audio) => audio.playSound('gameover'));
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
