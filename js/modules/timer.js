/**
 * 计时器管理模块
 * @module timer
 */

/** @type {number|null} */
let timerId = null;

/** @type {number|null} */
let countdownId = null;

/**
 * 启动计时器
 * @param {Function} callback 每秒回调
 */
export function startTimer(callback) {
  stopTimer();
  timerId = setInterval(() => {
    callback();
  }, 1000);
}

/**
 * 停止计时器
 */
export function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

/**
 * 启动倒计时（限时模式）
 * @param {number} seconds 初始秒数
 * @param {Function} onTick 每秒回调
 * @param {Function} onEnd 倒计时结束回调
 */
export function startCountdown(seconds, onTick, onEnd) {
  stopCountdown();

  let remaining = seconds;
  onTick(remaining);

  countdownId = setInterval(() => {
    remaining--;
    onTick(remaining);

    if (remaining <= 0) {
      stopCountdown();
      onEnd();
    }
  }, 1000);
}

/**
 * 停止倒计时
 */
export function stopCountdown() {
  if (countdownId) {
    clearInterval(countdownId);
    countdownId = null;
  }
}

/**
 * 停止所有计时器
 */
export function stopAll() {
  stopTimer();
  stopCountdown();
}
