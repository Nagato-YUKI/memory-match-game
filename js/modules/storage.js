/**
 * 本地存储管理模块
 * @module storage
 */

import { STORAGE_KEYS } from './constants.js';

/**
 * 从 localStorage 安全读取数据
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export function safeGetItem(key, defaultValue) {
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
export function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`写入 localStorage 失败 [${key}]:`, err);
  }
}

/**
 * 加载存档数据
 * @returns {Object}
 */
export function loadSaveData() {
  return {
    highScore: safeGetItem(STORAGE_KEYS.HIGH_SCORE, 0),
    bestTime: safeGetItem(STORAGE_KEYS.BEST_TIME, Infinity),
    theme: safeGetItem(STORAGE_KEYS.LAST_THEME, 'light'),
    difficulty: safeGetItem(STORAGE_KEYS.LAST_DIFFICULTY, 'medium'),
    cardTheme: safeGetItem(STORAGE_KEYS.LAST_CARD_THEME, 'pets'),
    soundEnabled: safeGetItem(STORAGE_KEYS.SOUND_ENABLED, true),
    bgmEnabled: safeGetItem(STORAGE_KEYS.BGM_ENABLED, true),
  };
}

/**
 * 保存最高分
 * @param {number} score
 * @param {number} currentHigh
 */
export function saveHighScore(score, currentHigh) {
  if (score > currentHigh) {
    safeSetItem(STORAGE_KEYS.HIGH_SCORE, score);
    return score;
  }
  return currentHigh;
}

/**
 * 保存最佳用时
 * @param {number} time
 * @param {number} currentBest
 */
export function saveBestTime(time, currentBest) {
  if (time > 0 && time < currentBest) {
    safeSetItem(STORAGE_KEYS.BEST_TIME, time);
    return time;
  }
  return currentBest;
}

/**
 * 保存用户偏好设置
 * @param {Object} preferences
 */
export function savePreferences(preferences) {
  safeSetItem(STORAGE_KEYS.LAST_THEME, preferences.theme);
  safeSetItem(STORAGE_KEYS.LAST_DIFFICULTY, preferences.difficulty);
  safeSetItem(STORAGE_KEYS.LAST_CARD_THEME, preferences.cardTheme);
  safeSetItem(STORAGE_KEYS.SOUND_ENABLED, preferences.soundEnabled);
  safeSetItem(STORAGE_KEYS.BGM_ENABLED, preferences.bgmEnabled);
}
