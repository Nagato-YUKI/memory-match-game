/**
 * 卡面皮肤选择 UI 渲染
 * @module skinUI
 */

import {
  CARD_SKINS,
  getAllSkins,
  isSkinUnlocked,
  getSkinProgress,
  getSelectedSkinId,
  setSelectedSkin,
} from './cardSkins.js?v=7';

/**
 * 渲染卡面选择面板
 * @param {HTMLElement} container
 * @param {Function} onSelect
 * @returns {HTMLElement}
 */
export function renderSkinSelector(container, onSelect) {
  const panel = document.createElement('div');
  panel.className = 'skin-selector';
  panel.id = 'skin-selector';

  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = '选择卡面';
  panel.appendChild(title);

  Object.values(CARD_SKINS).forEach((series) => {
    const seriesEl = createSeriesElement(series, onSelect);
    panel.appendChild(seriesEl);
  });

  container.appendChild(panel);
  return panel;
}

/**
 * 创建系列元素
 * @param {Object} series
 * @param {Function} onSelect
 * @returns {HTMLElement}
 */
function createSeriesElement(series, onSelect) {
  const section = document.createElement('div');
  section.className = 'skin-series';

  const label = document.createElement('h3');
  label.className = 'skin-series-label';
  label.textContent = series.name;
  section.appendChild(label);

  const grid = document.createElement('div');
  grid.className = 'skin-grid';

  series.series.forEach((skin) => {
    const card = createSkinCard(skin, onSelect);
    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}

/**
 * 创建单个皮肤卡片
 * @param {Object} skin
 * @param {Function} onSelect
 * @returns {HTMLElement}
 */
function createSkinCard(skin, onSelect) {
  const unlocked = isSkinUnlocked(skin.id);
  const progress = getSkinProgress(skin.id);
  const selected = getSelectedSkinId() === skin.id;

  const card = document.createElement('div');
  card.className = 'skin-card';
  if (!unlocked) card.classList.add('skin-card--locked');
  if (selected) card.classList.add('skin-card--selected');
  card.dataset.skinId = skin.id;

  const preview = document.createElement('div');
  preview.className = 'skin-preview';

  if (unlocked) {
    const img = document.createElement('img');
    img.src = skin.backImage;
    img.alt = skin.name;
    img.loading = 'lazy';
    img.onerror = () => {
      img.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.className = 'skin-fallback';
      fallback.textContent = skin.name;
      preview.appendChild(fallback);
    };
    preview.appendChild(img);
  } else {
    const lockIcon = document.createElement('div');
    lockIcon.className = 'skin-lock-icon';
    lockIcon.textContent = '🔒';
    preview.appendChild(lockIcon);

    const progressBar = document.createElement('div');
    progressBar.className = 'skin-progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className = 'skin-progress-fill';
    progressFill.style.width = `${progress.percentage}%`;
    progressBar.appendChild(progressFill);
    preview.appendChild(progressBar);
  }

  const info = document.createElement('div');
  info.className = 'skin-info';

  const name = document.createElement('div');
  name.className = 'skin-name';
  name.textContent = skin.name;

  const desc = document.createElement('div');
  desc.className = 'skin-desc';
  desc.textContent = skin.description;

  const status = document.createElement('div');
  status.className = 'skin-status';
  if (unlocked) {
    status.textContent = selected ? '已装备' : '已解锁';
    status.classList.add('skin-status--unlocked');
  } else {
    status.textContent = `需 ${skin.unlockScore} 分解锁`;
    status.classList.add('skin-status--locked');
  }

  info.appendChild(name);
  info.appendChild(desc);
  info.appendChild(status);

  card.appendChild(preview);
  card.appendChild(info);

  if (unlocked) {
    card.addEventListener('click', () => {
      setSelectedSkin(skin.id);
      onSelect(skin.id);
      updateSkinSelectionUI();
    });
  }

  return card;
}

/**
 * 更新皮肤选择 UI 的选中状态
 */
export function updateSkinSelectionUI() {
  const selectedId = getSelectedSkinId();
  document.querySelectorAll('.skin-card').forEach((card) => {
    const isSelected = card.dataset.skinId === selectedId;
    card.classList.toggle('skin-card--selected', isSelected);
    const status = card.querySelector('.skin-status');
    if (status && isSkinUnlocked(card.dataset.skinId)) {
      status.textContent = isSelected ? '已装备' : '已解锁';
    }
  });
}

/**
 * 显示新解锁提示
 * @param {Array} newSkins
 * @param {HTMLElement} container
 */
export function showUnlockNotification(newSkins, container) {
  if (!newSkins.length) return;

  newSkins.forEach((skin, index) => {
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = 'unlock-toast';
      toast.innerHTML = `
        <div class="unlock-toast-icon">🎉</div>
        <div class="unlock-toast-content">
          <div class="unlock-toast-title">解锁新卡面</div>
          <div class="unlock-toast-name">${skin.seriesName}·${skin.name}</div>
        </div>
      `;
      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.add('unlock-toast--show');
      });

      setTimeout(() => {
        toast.classList.remove('unlock-toast--show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }, index * 400);
  });
}
