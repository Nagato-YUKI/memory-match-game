/**
 * 记忆翻牌游戏 - 主入口
 * @module main
 */

import { createGameState } from './modules/gameState.js?v=8';
import { initAudioContext, initBGM, syncSoundEnabled, syncBgmEnabled } from './modules/audio.js?v=8';
import getDOMElements from './modules/dom.js?v=8';
import {
  updateScoreBoard,
  updateHistoryDisplay,
  updateDifficultyUI,
  updateThemeUI,
  updateCardThemeUI,
  updateSoundUI,
  updateBGMUI,
} from './modules/ui.js?v=8';
import { createStateMachine } from './modules/stateMachine.js?v=8';
import { createEventHandlers } from './modules/eventHandlers.js?v=8';

// 全局状态
let state = null;
let dom = null;
let transitionTo = null;

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

  // 全局点击初始化音频上下文
  document.addEventListener('click', () => {
    initAudioContext();
  }, { once: true });
}

// 启动游戏
init();
