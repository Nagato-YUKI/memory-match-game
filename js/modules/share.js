/**
 * 分享功能模块
 * @module share
 */

/**
 * 生成分享文本
 * @param {number} score - 最终得分
 * @param {number} time - 总用时（秒）
 * @param {number} errors - 错误次数
 * @param {string} difficulty - 难度名称
 * @returns {string} 分享文本
 */
export function generateShareText(score, time, errors, difficulty) {
  const difficultyMap = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  };

  const difficultyLabel = difficultyMap[difficulty] || difficulty;
  const timeStr = formatTimeForShare(time);

  return `🎮 我在《记忆翻牌》游戏中取得了好成绩！\n最终得分：${score}\n总用时：${timeStr}\n错误次数：${errors}\n难度：${difficultyLabel}\n快来挑战我吧！👉 https://nagato-yuki.github.io/memory-match-game/`;
}

/**
 * 将秒数格式化为 mm:ss
 * @param {number} seconds - 秒数
 * @returns {string} 格式化时间
 */
function formatTimeForShare(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否复制成功
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // 降级方案：使用 execCommand
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
  } catch (err) {
    console.error('复制到剪贴板失败:', err);
    return false;
  }
}

/**
 * 显示分享结果提示（toast）
 * @param {boolean} success - 是否成功
 */
export function showShareResult(success) {
  const existingToast = document.getElementById('share-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'share-toast';
  toast.className = 'share-toast';
  toast.textContent = success ? '成绩已复制到剪贴板！' : '复制失败，请手动复制';
  toast.style.backgroundColor = success ? 'var(--color-accent-success)' : 'var(--color-accent-error)';

  document.body.appendChild(toast);

  // 触发动画
  requestAnimationFrame(() => {
    toast.classList.add('share-toast--show');
  });

  // 2秒后自动移除
  setTimeout(() => {
    toast.classList.remove('share-toast--show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });

    // 兜底移除
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 500);
  }, 2000);
}

/**
 * 分享游戏主函数
 * @param {number} score - 最终得分
 * @param {number} time - 总用时（秒）
 * @param {number} errors - 错误次数
 * @param {string} difficulty - 难度名称
 */
export async function shareGame(score, time, errors, difficulty) {
  const text = generateShareText(score, time, errors, difficulty);
  const success = await copyToClipboard(text);
  showShareResult(success);
}
