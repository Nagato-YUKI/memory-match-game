/**
 * UI 更新模块
 * @module ui
 */

import { formatTime, calculateScore } from './utils.js?v=10';
import { getDifficultyConfig } from './gameState.js?v=10';

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
  if (!dom.cardThemeBtns) return;
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
 * @param {Object} state
 * @param {Object} dom
 */
export function updateBGMUI(state, dom) {
  if (dom.bgmToggle) {
    dom.bgmToggle.checked = state.bgmEnabled;
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

/**
 * 创建粒子元素
 * @param {HTMLElement} container
 * @param {number} count
 */
function createParticles(container, count) {
  container.querySelectorAll('.transition-particle').forEach((p) => p.remove());
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'transition-particle';
    const angle = (Math.PI * 2 * i) / count;
    const distance = 100 + Math.random() * 200;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.marginLeft = '-3px';
    particle.style.marginTop = '-3px';
    container.appendChild(particle);
  }
}

/**
 * 显示开始过渡动画
 * @param {Object} dom
 * @param {Function} callback
 */
export function showStartTransition(dom, callback) {
  if (!dom.transitionOverlay) {
    if (callback) callback();
    return;
  }

  dom.transitionTitle.textContent = '游戏开始';
  dom.transitionSubtitle.textContent = '愿君好运';

  const overlay = dom.transitionOverlay;
  overlay.className = 'transition-overlay transition-overlay--active transition-overlay--start';

  setTimeout(() => {
    overlay.classList.remove('transition-overlay--active', 'transition-overlay--start');
    if (callback) callback();
  }, 1200);
}

/**
 * 显示胜利过渡动画
 * @param {Object} dom
 * @param {Function} callback
 */
export function showWinTransition(dom, callback) {
  if (!dom.transitionOverlay) {
    if (callback) callback();
    return;
  }

  dom.transitionTitle.textContent = '胜利';
  dom.transitionSubtitle.textContent = '恭喜通关';

  const overlay = dom.transitionOverlay;
  const glowContainer = overlay.querySelector('.transition-overlay__glow');

  // 创建粒子效果
  if (glowContainer) {
    createParticles(glowContainer, 24);
  }

  overlay.className = 'transition-overlay transition-overlay--active transition-overlay--win';

  // 触发动画后给粒子添加动画类
  setTimeout(() => {
    overlay.querySelectorAll('.transition-particle').forEach((p, i) => {
      setTimeout(() => {
        p.classList.add('transition-particle--animate');
      }, i * 30);
    });
  }, 50);

  setTimeout(() => {
    overlay.classList.remove('transition-overlay--active', 'transition-overlay--win');
    if (glowContainer) {
      glowContainer.querySelectorAll('.transition-particle').forEach((p) => p.remove());
    }
    if (callback) callback();
  }, 1500);
}
