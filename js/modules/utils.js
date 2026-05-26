/**
 * 工具函数模块
 * @module utils
 */

/**
 * 格式化秒数为 MM:SS
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Fisher-Yates 洗牌算法
 * @param {Array} array
 * @returns {Array}
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 计算当前得分
 * @param {Object} params
 * @param {number} params.matchedPairs
 * @param {number} params.elapsedSeconds
 * @param {number} params.errors
 * @param {Object} params.config
 * @returns {number}
 */
export function calculateScore({
  matchedPairs, elapsedSeconds, errors, config,
}) {
  const baseScore = matchedPairs * 100;
  const timeBonus = Math.max(0, config.timeBase - elapsedSeconds) * config.timeCoeff;
  const errorPenalty = errors * 10;
  const rawScore = baseScore + timeBonus - errorPenalty;
  const finalScore = Math.max(0, Math.floor(rawScore * config.multiplier));
  return finalScore;
}
