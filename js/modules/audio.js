/**
 * 音频管理模块（音效 + BGM）
 * @module audio
 */

import { STORAGE_KEYS } from './constants.js?v=7';
import { getSoundConfig, playVictoryMelody } from './soundEffects.js?v=7';

/** @type {AudioContext|null} */
let audioContext = null;

/** @type {HTMLAudioElement|null} */
let bgmElement = null;

/** @type {boolean} */
let bgmEnabled = true;

/** @type {boolean} */
let soundEnabled = true;

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

  bgmEnabled = safeGetItem(STORAGE_KEYS.BGM_ENABLED, true);
  soundEnabled = safeGetItem(STORAGE_KEYS.SOUND_ENABLED, true);
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
 * @param {boolean} [enabled] 指定状态，不传则切换
 * @returns {boolean} 切换后的状态
 */
export function toggleBGM(enabled) {
  bgmEnabled = enabled !== undefined ? enabled : !bgmEnabled;
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
 * 设置音效开关
 * @param {boolean} enabled
 */
export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  safeSetItem(STORAGE_KEYS.SOUND_ENABLED, soundEnabled);
}

/**
 * 获取音效开关状态
 * @returns {boolean}
 */
export function isSoundEnabled() {
  return soundEnabled;
}

/**
 * 播放音效
 * @param {string} type 音效类型
 */
export function playSound(type) {
  if (!soundEnabled) return;
  if (!audioContext) initAudioContext();
  if (!audioContext) return;

  try {
    const now = audioContext.currentTime;

    if (type === 'victory') {
      playVictoryMelody(audioContext, now);
      return;
    }

    const config = getSoundConfig(audioContext, now);
    const sound = config[type];
    if (!sound) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = sound.oscillator.type;

    const freq = sound.oscillator.frequency;
    if (Array.isArray(freq[0])) {
      oscillator.frequency.setValueAtTime(freq[0][0], freq[0][1]);
      for (let i = 1; i < freq.length; i++) {
        if (freq[i][0] !== undefined) {
          oscillator.frequency.exponentialRampToValueAtTime(freq[i][0], freq[i][1]);
        }
      }
    } else {
      oscillator.frequency.setValueAtTime(freq[0], freq[1]);
    }

    gainNode.gain.setValueAtTime(sound.gain.initial, now);
    gainNode.gain.exponentialRampToValueAtTime(sound.gain.ramp[0], sound.gain.ramp[1]);

    oscillator.start(now);
    oscillator.stop(now + sound.duration);
  } catch (err) {
    console.warn('播放音效失败:', err);
  }
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
