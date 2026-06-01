/**
 * 排行榜模块
 * @module leaderboard
 */

import { STORAGE_KEYS } from './constants.js?v=10';
import { safeGetItem, safeSetItem } from './storage.js?v=10';

/**
 * 从 localStorage 读取排行榜数据
 * @returns {Array} 排行榜记录数组
 */
export function loadLeaderboard() {
  return safeGetItem(STORAGE_KEYS.LEADERBOARD, []);
}

/**
 * 保存排行榜数据到 localStorage
 * @param {Array} data 排行榜记录数组
 */
export function saveLeaderboard(data) {
  safeSetItem(STORAGE_KEYS.LEADERBOARD, data);
}

/**
 * 添加新记录到排行榜
 * @param {string} nickname 玩家昵称
 * @param {number} score 得分
 * @param {number} time 用时（秒）
 * @param {string} difficulty 难度
 */
export function addLeaderboardEntry(nickname, score, time, difficulty) {
  const leaderboard = loadLeaderboard();
  const entry = {
    nickname: nickname.trim() || '匿名玩家',
    score: Number(score),
    time: Number(time),
    difficulty,
    date: new Date().toISOString(),
  };
  leaderboard.push(entry);
  // 限制最多保存 50 条记录
  if (leaderboard.length > 50) {
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.length = 50;
  }
  saveLeaderboard(leaderboard);
}

/**
 * 获取排序后的排行榜
 * @param {string} sortBy 排序方式：'score' 按分数降序，'time' 按时间升序
 * @returns {Array} 排序后的排行榜
 */
export function getLeaderboard(sortBy = 'score') {
  const leaderboard = loadLeaderboard();
  const sorted = [...leaderboard];
  if (sortBy === 'score') {
    sorted.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'time') {
    sorted.sort((a, b) => a.time - b.time);
  }
  return sorted;
}

/**
 * 清空排行榜
 */
export function clearLeaderboard() {
  saveLeaderboard([]);
}
