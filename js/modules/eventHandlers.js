/**
 * 游戏事件处理器
 * @module eventHandlers
 */

import { GameState } from './constants.js?v=10';
import { canFlipCard, isAllMatched } from './gameState.js?v=10';
import {
  flipCard,
  unflipCard,
  markMatched,
  markMismatch,
  clearMismatch,
} from './cardRenderer.js?v=10';
import {
  playSound,
  playBGM,
  pauseBGM,
  syncSoundEnabled,
  syncBgmEnabled,
} from './audio.js?v=10';
import { savePreferences } from './storage.js?v=10';
import { renderSkinSelector } from './skinUI.js?v=10';
import { getSelectedSkinId, findSkinById } from './cardSkins.js?v=10';
import { updateScoreBoard } from './ui.js?v=10';
import { getLeaderboard, clearLeaderboard } from './leaderboard.js?v=10';
import { getAchievements } from './achievements.js?v=10';
import { formatTime } from './utils.js?v=10';
import { shareGame } from './share.js?v=10';

/**
 * 创建事件处理器
 * @param {Object} state - 游戏状态
 * @param {Object} dom - DOM 元素
 * @param {Function} transitionTo - 状态转换函数
 * @returns {Object} 事件处理函数集合
 */
export function createEventHandlers(state, dom, transitionTo) {
  /**
   * 卡牌点击处理
   * @param {number} cardId
   */
  function onCardClick(cardId) {
    if (!canFlipCard(state, cardId)) return;

    const card = state.cards[cardId];
    state.flippedCards.push(card);
    flipCard(dom.gameBoard, cardId);
    playSound('flip');

    if (state.flippedCards.length === 2) {
      state.moves += 1;
      state.isAnimating = true;
      checkMatch();
    }
  }

  /**
   * 检查配对
   */
  function checkMatch() {
    const [card1, card2] = state.flippedCards;

    if (card1.src === card2.src) {
      handleMatch(card1, card2);
    } else {
      handleMismatch(card1, card2);
    }
  }

  /**
   * 处理配对成功
   * @param {Object} card1
   * @param {Object} card2
   */
  function handleMatch(card1, card2) {
    state.matchedPairs += 1;
    card1.matched = true;
    card2.matched = true;

    setTimeout(() => {
      markMatched(dom.gameBoard, card1.index);
      markMatched(dom.gameBoard, card2.index);
      playSound('match');
      updateScoreBoard(state, dom);
      state.isAnimating = false;

      if (isAllMatched(state)) {
        transitionTo(GameState.WON);
      }
    }, 300);

    state.flippedCards = [];
  }

  /**
   * 处理配对失败
   * @param {Object} card1
   * @param {Object} card2
   */
  function handleMismatch(card1, card2) {
    state.errors += 1;
    updateScoreBoard(state, dom);

    setTimeout(() => {
      markMismatch(dom.gameBoard, card1.index);
      markMismatch(dom.gameBoard, card2.index);
      playSound('mismatch');
    }, 400);

    setTimeout(() => {
      unflipCard(dom.gameBoard, card1.index);
      unflipCard(dom.gameBoard, card2.index);
      clearMismatch(dom.gameBoard, card1.index);
      clearMismatch(dom.gameBoard, card2.index);
      state.flippedCards = [];
      state.isAnimating = false;
    }, 1000);
  }

  /**
   * 绑定所有事件
   */
  function bindEvents() {
    // 难度选择
    dom.difficultyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.difficulty = btn.dataset.difficulty;
        dom.difficultyBtns.forEach((b) => b.classList.remove('difficulty-btn--active'));
        btn.classList.add('difficulty-btn--active');
        btn.setAttribute('aria-checked', 'true');
        dom.difficultyBtns.forEach((b) => {
          if (b !== btn) b.setAttribute('aria-checked', 'false');
        });
        playSound('click');
      });
    });

    // 限时模式
    dom.timedModeToggle.addEventListener('change', () => {
      state.timedMode = dom.timedModeToggle.checked;
      playSound('click');
    });

    // 主题切换
    dom.themeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', state.theme);
      playSound('click');
    });

    // 音效开关
    if (dom.soundToggle) {
      dom.soundToggle.addEventListener('change', () => {
        state.soundEnabled = dom.soundToggle.checked;
        syncSoundEnabled(state.soundEnabled);
        savePreferences(state);
        playSound('click');
      });
    }

    // BGM 开关
    if (dom.bgmToggle) {
      dom.bgmToggle.addEventListener('change', () => {
        state.bgmEnabled = dom.bgmToggle.checked;
        syncBgmEnabled(state.bgmEnabled);
        savePreferences(state);
        if (state.bgmEnabled) {
          playBGM();
        } else {
          pauseBGM();
        }
      });
    }

    // 卡面选择按钮
    if (dom.skinToggleBtn) {
      dom.skinToggleBtn.addEventListener('click', () => {
        const panel = document.getElementById('skin-panel');
        if (panel) {
          const isHidden = panel.style.display === 'none';
          panel.style.display = isHidden ? 'block' : 'none';
          if (isHidden) {
            panel.innerHTML = '';
            renderSkinSelector(panel, (skinId) => {
              const skin = findSkinById(skinId);
              if (skin) {
                state.cardTheme = skin.seriesId;
                document.body.setAttribute('data-card-theme', skin.seriesId);
                savePreferences(state);
              }
            }, state.cardTheme);
          }
        }
        playSound('click');
      });
    }

    // 开始游戏
    dom.startBtn.addEventListener('click', () => {
      savePreferences(state);
      transitionTo(GameState.PLAYING);
      playSound('click');
    });

    // 暂停
    dom.pauseBtn.addEventListener('click', () => {
      if (state.state === GameState.PLAYING) {
        transitionTo(GameState.PAUSED);
      }
    });

    // 继续
    dom.resumeBtn.addEventListener('click', () => {
      if (state.state === GameState.PAUSED) {
        transitionTo(GameState.PLAYING);
      }
    });

    // 重新开始（游戏内）
    dom.restartBtn.addEventListener('click', () => {
      transitionTo(GameState.PLAYING);
      playSound('click');
    });

    // 重新开始（暂停遮罩）
    if (dom.pauseRestartBtn) {
      dom.pauseRestartBtn.addEventListener('click', () => {
        transitionTo(GameState.PLAYING);
        playSound('click');
      });
    }

    // 返回菜单
    dom.menuBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.IDLE);
    });

    // 胜利后再玩一次
    dom.winReplayBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.PLAYING);
    });

    // 胜利后返回菜单
    dom.winMenuBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.IDLE);
    });

    // 分享成绩
    if (dom.shareBtn) {
      dom.shareBtn.addEventListener('click', () => {
        const score = parseInt(dom.winScore.textContent, 10) || 0;
        const timeText = dom.winTime.textContent || '00:00';
        const errors = parseInt(dom.winErrors.textContent, 10) || 0;
        const timeParts = timeText.split(':');
        const time = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
        shareGame(score, time, errors, state.difficulty);
        playSound('click');
      });
    }

    // 失败后再玩一次
    dom.loseReplayBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.PLAYING);
    });

    // 失败后返回菜单
    dom.loseMenuBtn.addEventListener('click', () => {
      playSound('click');
      transitionTo(GameState.IDLE);
    });

    // 排行榜按钮
    if (dom.leaderboardBtn) {
      dom.leaderboardBtn.addEventListener('click', () => {
        renderLeaderboard('score');
        dom.leaderboardOverlay.classList.remove('overlay--hidden');
        playSound('click');
      });
    }

    // 排行榜排序按钮
    if (dom.leaderboardSortScore) {
      dom.leaderboardSortScore.addEventListener('click', () => {
        renderLeaderboard('score');
        dom.leaderboardSortScore.classList.add('btn--active');
        dom.leaderboardSortTime.classList.remove('btn--active');
        playSound('click');
      });
    }

    if (dom.leaderboardSortTime) {
      dom.leaderboardSortTime.addEventListener('click', () => {
        renderLeaderboard('time');
        dom.leaderboardSortTime.classList.add('btn--active');
        dom.leaderboardSortScore.classList.remove('btn--active');
        playSound('click');
      });
    }

    // 排行榜清空按钮
    if (dom.leaderboardClearBtn) {
      dom.leaderboardClearBtn.addEventListener('click', () => {
        if (confirm('确定要清空所有排行榜记录吗？')) {
          clearLeaderboard();
          renderLeaderboard('score');
          playSound('click');
        }
      });
    }

    // 排行榜关闭按钮
    if (dom.leaderboardCloseBtn) {
      dom.leaderboardCloseBtn.addEventListener('click', () => {
        dom.leaderboardOverlay.classList.add('overlay--hidden');
        playSound('click');
      });
    }

    // 成就按钮
    if (dom.achievementsBtn) {
      dom.achievementsBtn.addEventListener('click', () => {
        renderAchievements();
        dom.achievementsOverlay.classList.remove('overlay--hidden');
        playSound('click');
      });
    }

    // 成就关闭按钮
    if (dom.achievementsCloseBtn) {
      dom.achievementsCloseBtn.addEventListener('click', () => {
        dom.achievementsOverlay.classList.add('overlay--hidden');
        playSound('click');
      });
    }

    // 点击遮罩背景关闭
    if (dom.leaderboardOverlay) {
      dom.leaderboardOverlay.addEventListener('click', (e) => {
        if (e.target === dom.leaderboardOverlay) {
          dom.leaderboardOverlay.classList.add('overlay--hidden');
        }
      });
    }

    if (dom.achievementsOverlay) {
      dom.achievementsOverlay.addEventListener('click', (e) => {
        if (e.target === dom.achievementsOverlay) {
          dom.achievementsOverlay.classList.add('overlay--hidden');
        }
      });
    }
  }

  /**
   * 渲染排行榜列表
   * @param {string} sortBy 排序方式
   */
  function renderLeaderboard(sortBy = 'score') {
    if (!dom.leaderboardBody) return;
    const data = getLeaderboard(sortBy);
    if (data.length === 0) {
      dom.leaderboardBody.innerHTML = '<tr><td colspan="5" class="leaderboard-empty">暂无记录</td></tr>';
      return;
    }
    const difficultyMap = { easy: '简单', medium: '中等', hard: '困难' };
    dom.leaderboardBody.innerHTML = data.map((entry, index) => {
      const rankClass = index < 3 ? `rank-${index + 1}` : '';
      return `<tr>
        <td><span class="leaderboard-rank ${rankClass}">${index + 1}</span></td>
        <td>${escapeHtml(entry.nickname)}</td>
        <td>${entry.score}</td>
        <td>${formatTime(entry.time)}</td>
        <td>${difficultyMap[entry.difficulty] || entry.difficulty}</td>
      </tr>`;
    }).join('');
  }

  /**
   * 渲染成就面板
   */
  function renderAchievements() {
    if (!dom.achievementsGrid) return;
    const achievements = getAchievements();
    dom.achievementsGrid.innerHTML = achievements.map((ach) => {
      const unlockedClass = ach.unlocked ? 'achievement--unlocked' : 'achievement--locked';
      const dateText = ach.unlocked && ach.date
        ? `<span class="achievement-date">${new Date(ach.date).toLocaleDateString('zh-CN')}</span>`
        : '';
      return `<div class="achievement-card ${unlockedClass}">
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-info">
          <div class="achievement-name">${escapeHtml(ach.name)}</div>
          <div class="achievement-desc">${escapeHtml(ach.description)}</div>
          ${dateText}
        </div>
      </div>`;
    }).join('');
  }

  /**
   * HTML 转义防止 XSS
   * @param {string} text
   * @returns {string}
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { onCardClick, bindEvents };
}
