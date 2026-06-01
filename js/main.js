/**
 * 记忆翻牌游戏 - 主入口
 * @module main
 */

import { createGameState } from './modules/gameState.js?v=10';
import { initAudioContext, initBGM, syncSoundEnabled, syncBgmEnabled } from './modules/audio.js?v=10';
import getDOMElements from './modules/dom.js?v=10';
import {
  updateScoreBoard,
  updateHistoryDisplay,
  updateDifficultyUI,
  updateThemeUI,
  updateCardThemeUI,
  updateSoundUI,
  updateBGMUI,
} from './modules/ui.js?v=10';
import { createStateMachine } from './modules/stateMachine.js?v=10';
import { createEventHandlers } from './modules/eventHandlers.js?v=10';
import { STORAGE_KEYS } from './modules/constants.js?v=10';

// 全局状态
let state = null;
let dom = null;
let transitionTo = null;

/**
 * 显示引导弹窗
 */
function showTutorial() {
  if (dom.tutorialOverlay) {
    dom.tutorialOverlay.classList.remove('overlay--hidden');
  }
}

/**
 * 关闭引导弹窗
 */
function hideTutorial() {
  if (dom.tutorialOverlay) {
    dom.tutorialOverlay.classList.add('overlay--hidden');
  }
}

/**
 * 检查是否需要显示引导弹窗
 */
function checkAndShowTutorial() {
  try {
    const hasShown = localStorage.getItem(STORAGE_KEYS.TUTORIAL_SHOWN);
    if (!hasShown) {
      showTutorial();
    }
  } catch (error) {
    // localStorage 不可用时默认显示引导
    console.warn('无法读取本地存储，显示引导弹窗:', error);
    showTutorial();
  }
}

/**
 * 绑定引导弹窗事件
 */
function bindTutorialEvents() {
  if (!dom.tutorialCloseBtn) return;

  // 点击"我知道了"关闭引导
  dom.tutorialCloseBtn.addEventListener('click', () => {
    const dontShow = dom.tutorialDontShow?.checked ?? false;
    if (dontShow) {
      try {
        localStorage.setItem(STORAGE_KEYS.TUTORIAL_SHOWN, 'true');
      } catch (error) {
        console.warn('无法写入本地存储:', error);
      }
    }
    hideTutorial();
  });

  // 帮助按钮重新打开引导
  if (dom.helpBtn) {
    dom.helpBtn.addEventListener('click', () => {
      if (dom.tutorialDontShow) {
        dom.tutorialDontShow.checked = false;
      }
      showTutorial();
    });
  }
}

/**
 * 隐藏加载画面并显示主菜单
 */
function hideLoadingScreen() {
  if (!dom.loadingScreen) return;

  dom.loadingScreen.classList.add('loading-screen--hidden');

  // 过渡动画结束后显示开始界面
  setTimeout(() => {
    if (dom.startScreen) {
      dom.startScreen.classList.add('screen--active');
    }
    // 检查是否需要显示引导
    checkAndShowTutorial();
  }, 600);
}

/**
 * 初始化游戏
 */
function init() {
  state = createGameState();
  dom = getDOMElements();

  document.body.setAttribute('data-card-theme', state.cardTheme);
  document.body.setAttribute('data-theme', state.theme);

  // 创建事件处理器（需要先定义 onCardClick）
  const handlers = createEventHandlers(state, dom, (newState) => {
    transitionTo(newState);
  });

  // 创建状态机（传入 onCardClick 用于渲染卡牌）
  const machine = createStateMachine(state, dom, handlers.onCardClick);
  transitionTo = machine.transitionTo;

  // 覆盖事件处理器中的 transitionTo 为实际的状态机方法
  const finalHandlers = createEventHandlers(state, dom, transitionTo);

  // 更新 UI
  updateDifficultyUI(state, dom);
  updateThemeUI(state, dom);
  updateCardThemeUI(state, dom);
  updateSoundUI(state, dom);
  updateBGMUI(state, dom);
  updateScoreBoard(state, dom);
  updateHistoryDisplay(state, dom);

  // 同步音频开关状态到 audio 模块
  syncSoundEnabled(state.soundEnabled);
  syncBgmEnabled(state.bgmEnabled);

  // 初始化音频
  initAudioContext();
  initBGM('bgm.mp3');

  // 绑定事件
  finalHandlers.bindEvents();

  // 绑定引导弹窗事件
  bindTutorialEvents();

  // 全局点击初始化音频上下文
  document.addEventListener('click', () => {
    initAudioContext();
  }, { once: true });
}

// 页面加载完成后初始化游戏并处理加载画面
window.addEventListener('load', () => {
  init();

  // 模拟 1.5 秒加载时间后淡出加载画面
  setTimeout(() => {
    hideLoadingScreen();
  }, 1500);
});
