/**
 * 成就系统模块
 * @module achievements
 */

import { STORAGE_KEYS, ACHIEVEMENTS_LIST } from './constants.js?v=10';
import { safeGetItem, safeSetItem } from './storage.js?v=10';

/**
 * 从 localStorage 读取成就状态
 * @returns {Object} 成就解锁状态对象
 */
export function loadAchievements() {
  return safeGetItem(STORAGE_KEYS.ACHIEVEMENTS, {});
}

/**
 * 保存成就状态到 localStorage
 * @param {Object} data 成就解锁状态对象
 */
export function saveAchievements(data) {
  safeSetItem(STORAGE_KEYS.ACHIEVEMENTS, data);
}

/**
 * 检查并解锁成就
 * @param {Object} state 游戏状态
 * @param {Object} config 难度配置
 * @returns {Array} 新解锁的成就列表
 */
export function checkAchievements(state, config) {
  const achievements = loadAchievements();
  const newlyUnlocked = [];

  // 首次通关：任意胜利
  if (!achievements.first_win) {
    achievements.first_win = { unlocked: true, date: new Date().toISOString() };
    newlyUnlocked.push('first_win');
  }

  // 满分挑战：零错误完成游戏
  if (!achievements.perfect_game && state.errors === 0) {
    achievements.perfect_game = { unlocked: true, date: new Date().toISOString() };
    newlyUnlocked.push('perfect_game');
  }

  // 速度之王：30秒内完成简单难度
  if (!achievements.speed_king && state.difficulty === 'easy' && state.elapsedSeconds <= 30) {
    achievements.speed_king = { unlocked: true, date: new Date().toISOString() };
    newlyUnlocked.push('speed_king');
  }

  if (newlyUnlocked.length > 0) {
    saveAchievements(achievements);
  }

  return newlyUnlocked;
}

/**
 * 获取所有成就及解锁状态
 * @returns {Array} 成就列表（包含解锁状态）
 */
export function getAchievements() {
  const achievements = loadAchievements();
  return ACHIEVEMENTS_LIST.map((achievement) => ({
    ...achievement,
    unlocked: !!achievements[achievement.id]?.unlocked,
    date: achievements[achievement.id]?.date || null,
  }));
}

/**
 * 检查单个成就是否已解锁
 * @param {string} id 成就ID
 * @returns {boolean}
 */
export function isAchievementUnlocked(id) {
  const achievements = loadAchievements();
  return !!achievements[id]?.unlocked;
}
