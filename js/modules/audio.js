/**
 * 音频管理模块（音效 + BGM）
 * @module audio
 */

import { STORAGE_KEYS } from './constants.js';

/** @type {AudioContext|null} */
let audioContext = null;

/** @type {HTMLAudioElement|null} */
let bgmElement = null;

/** @type {boolean} */
let bgmEnabled = true;

/**
 * 初始化音频上下文（用户首次交互后调用）
 */
export function initAudioContext() {
  if (!audioContext && typeof AudioContext !== 'undefined') {
    audioContext = new AudioContext();
  } else if (!audioContext && typeof webkitAudioContext !== 'undefined') {
    // eslint-disable-next-line new-cap
    audioContext = new webkitAudioContext();
  }
}

/**
 * 初始化 BGM
 * @param {string} src BGM 文件路径
 */
export function initBGM(src) {
  if (bgmElement) return;

  bgmElement = document.createElement('audio');
  bgmElement.src = src;
  bgmElement.loop = true;
  bgmElement.preload = 'auto';
  bgmElement.volume = 0.3;

  // 读取用户偏好
  bgmEnabled = safeGetItem(STORAGE_KEYS.BGM_ENABLED, true);
}

/**
 * 播放 BGM
 */
export function playBGM() {
  if (!bgmElement || !bgmEnabled) return;

  bgmElement.play().catch((err) => {
    console.warn('BGM 播放失败:', err);
  });
}

/**
 * 暂停 BGM
 */
export function pauseBGM() {
  if (!bgmElement) return;
  bgmElement.pause();
}

/**
 * 切换 BGM 开关
 * @returns {boolean} 切换后的状态
 */
export function toggleBGM() {
  bgmEnabled = !bgmEnabled;
  safeSetItem(STORAGE_KEYS.BGM_ENABLED, bgmEnabled);

  if (bgmEnabled) {
    playBGM();
  } else {
    pauseBGM();
  }
  return bgmEnabled;
}

/**
 * 获取 BGM 开关状态
 * @returns {boolean}
 */
export function isBGMEnabled() {
  return bgmEnabled;
}

/**
 * 播放音效
 * @param {string} type 音效类型
 */
export function playSound(type) {
  if (!audioContext) initAudioContext();
  if (!audioContext) return;

  try {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'flip':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;

      case 'match':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, now);
        oscillator.frequency.setValueAtTime(659.25, now + 0.1);
        oscillator.frequency.setValueAtTime(783.99, now + 0.2);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'mismatch':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(392, now);
        oscillator.frequency.exponentialRampToValueAtTime(196, now + 0.25);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        oscillator.start(now);
        oscillator.stop(now + 0.25);
        break;

      case 'victory':
        playVictorySound(now);
        return;

      case 'gameover':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.8);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        oscillator.start(now);
        oscillator.stop(now + 0.8);
        break;

      case 'button':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        oscillator.start(now);
        oscillator.stop(now + 0.08);
        break;

      default:
        break;
    }
  } catch (err) {
    console.warn('播放音效失败:', err);
  }
}

/**
 * 播放胜利旋律
 * @param {number} startTime
 */
function playVictorySound(startTime) {
  if (!audioContext) return;

  const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
  const durations = [0.15, 0.15, 0.15, 0.15, 0.4];

  let currentTime = startTime;

  notes.forEach((freq, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, currentTime);

    gain.gain.setValueAtTime(0.18, currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, currentTime + durations[index]);

    osc.start(currentTime);
    osc.stop(currentTime + durations[index]);

    currentTime += durations[index];
  });
}

/**
 * 从 localStorage 安全读取数据
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function safeGetItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    const parsed = JSON.parse(item);
    return parsed !== null ? parsed : defaultValue;
  } catch (err) {
    console.warn(`读取 localStorage 失败 [${key}]:`, err);
    return defaultValue;
  }
}

/**
 * 向 localStorage 安全写入数据
 * @param {string} key
 * @param {*} value
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`写入 localStorage 失败 [${key}]:`, err);
  }
}
