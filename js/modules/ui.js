/**
 * UI 更新模块
 * @module ui
 */

import { formatTime, calculateScore } from './utils.js?v=7';
import { getDifficultyConfig } from './gameState.js?v=7';

/**
 * 更新分数板显示
 * @param {Object} state
 * @param {Object} dom
 */
export function updateScoreBoard(state, dom) {
  dom.scoreMatches.textContent = state.matchedPairs;
  dom.scoreTime.textContent = formatTime(state.elapsedSeconds);
  dom.scoreErrors.textContent = state.errors;
  dom.scoreCurrent.textContent = calculateScore({
    matchedPairs: state.matchedPairs,
    elapsedSeconds: state.elapsedSeconds,
    errors: state.errors,
    config: getDifficultyConfig(state),
  });
  dom.scoreHigh.textContent = state.highScore;

  if (state.timedMode && state.countdownSeconds > 0) {
    dom.scoreCountdown.textContent = formatTime(state.countdownSeconds);
    dom.scoreCountdown.classList.toggle('countdown--warning', state.countdownSeconds <= 10);
  } else if (state.timedMode && state.countdownSeconds <= 0) {
    dom.scoreCountdown.textContent = '00:00';
    dom.scoreCountdown.classList.add('countdown--warning');
  } else {
    dom.scoreCountdown.textContent = '--:--';
    dom.scoreCountdown.classList.remove('countdown--warning');
  }
}

/**
 * 更新开始界面历史记录显示
 * @param {Object} state
 * @param {Object} dom
 */
export function updateHistoryDisplay(state, dom) {
  dom.historyHighScore.textContent = state.highScore;
  dom.historyBestTime.textContent = state.bestTime === Infinity ? '--' : formatTime(state.bestTime);
}

/**
 * 更新难度按钮选中状态
 * @param {Object} state
 * @param {Object} dom
 */
export function updateDifficultyUI(state, dom) {
  dom.difficultyBtns.forEach((btn) => {
    const isActive = btn.dataset.difficulty === state.difficulty;
    btn.classList.toggle('difficulty-btn--active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });
}

/**
 * 更新主题按钮显示
 * @param {Object} state
 * @param {Object} dom
 */
export function updateThemeUI(state, dom) {
  const isDark = state.theme === 'dark';
  dom.themeToggle.querySelector('.theme-icon').textContent = isDark ? '\uD83C\uDF19' : '\u2600\uFE0F';
  dom.themeToggle.querySelector('.theme-text').textContent = isDark ? '深色主题' : '浅色主题';
  document.body.setAttribute('data-theme', state.theme);
}

/**
 * 更新卡牌主题 UI
 * @param {Object} state
 * @param {Object} dom
 */
export function updateCardThemeUI(state, dom) {
  dom.cardThemeBtns.forEach((btn) => {
    const isActive = btn.dataset.cardTheme === state.cardTheme;
    btn.classList.toggle('card-theme-btn--active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });
}

/**
 * 更新音效开关 UI
 * @param {Object} state
 * @param {Object} dom
 */
export function updateSoundUI(state, dom) {
  if (dom.soundToggle) {
    dom.soundToggle.checked = state.soundEnabled;
  }
}

/**
 * 更新 BGM 开关 UI
 * @param {boolean} enabled
 * @param {Object} dom
 */
export function updateBGMUI(enabled, dom) {
  if (dom.bgmToggle) {
    dom.bgmToggle.checked = enabled;
  }
}

/**
 * 切换屏幕显示
 * @param {'start'|'game'} screenName
 * @param {Object} dom
 */
export function switchScreen(screenName, dom) {
  if (screenName === 'start') {
    dom.startScreen.classList.add('screen--active');
    dom.gameScreen.classList.remove('screen--active');
  } else {
    dom.startScreen.classList.remove('screen--active');
    dom.gameScreen.classList.add('screen--active');
  }
}

/**
 * 显示/隐藏遮罩层
 * @param {HTMLElement} overlay
 * @param {boolean} show
 */
export function toggleOverlay(overlay, show) {
  overlay.classList.toggle('overlay--hidden', !show);
}

/**
 * 更新胜利遮罩数据
 * @param {Object} state
 * @param {Object} dom
 */
export function updateWinOverlay(state, dom) {
  const finalScore = calculateScore({
    matchedPairs: state.matchedPairs,
    elapsedSeconds: state.elapsedSeconds,
    errors: state.errors,
    config: getDifficultyConfig(state),
  });

  dom.winScore.textContent = finalScore;
  dom.winTime.textContent = formatTime(state.elapsedSeconds);
  dom.winErrors.textContent = state.errors;
  dom.winMultiplier.textContent = `${getDifficultyConfig(state).multiplier}x`;
}

/**
 * 更新失败遮罩数据
 * @param {Object} state
 * @param {Object} dom
 */
export function updateLoseOverlay(state, dom) {
  dom.loseMatches.textContent = state.matchedPairs;
  dom.loseTime.textContent = formatTime(state.elapsedSeconds);
  dom.loseErrors.textContent = state.errors;
}
