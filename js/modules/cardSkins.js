/**
 * 卡面皮肤系统 - 解锁与管理
 * 使用纯风景画面作为卡面背景
 * @module cardSkins
 */

import { STORAGE_KEYS } from './constants.js?v=6';
import { safeGetItem, safeSetItem } from './storage.js?v=6';

/** 卡面皮肤定义 - 纯风景画面 */
export const CARD_SKINS = {
  guofeng: {
    id: 'guofeng',
    name: '国风',
    series: [
      {
        id: 'guofeng_mountain',
        name: '山水',
        description: '水墨山水，云雾缭绕',
        backImage: 'assets/images/skins/guofeng_mountain.png',
        unlockScore: 0,
      },
      {
        id: 'guofeng_garden',
        name: '园林',
        description: '苏州园林，亭台楼阁',
        backImage: 'assets/images/skins/guofeng_garden.png',
        unlockScore: 500,
      },
      {
        id: 'guofeng_palace',
        name: '宫殿',
        description: '紫禁城，金碧辉煌',
        backImage: 'assets/images/skins/guofeng_palace.png',
        unlockScore: 1500,
      },
    ],
  },
  japanese: {
    id: 'japanese',
    name: '和风',
    series: [
      {
        id: 'japanese_temple',
        name: '古寺',
        description: '京都古寺，枫叶满地',
        backImage: 'assets/images/skins/japanese_temple.png',
        unlockScore: 0,
      },
      {
        id: 'japanese_bamboo',
        name: '竹林',
        description: '嵯峨野，竹林小径',
        backImage: 'assets/images/skins/japanese_bamboo.png',
        unlockScore: 500,
      },
      {
        id: 'japanese_fuji',
        name: '富士',
        description: '富士山，樱花盛开',
        backImage: 'assets/images/skins/japanese_fuji.png',
        unlockScore: 1500,
      },
    ],
  },
};

/** 存储键名 */
const SKIN_STORAGE_KEY = 'mmg_unlocked_skins';
const SELECTED_SKIN_KEY = 'mmg_selected_skin';

/**
 * 获取累计总分（用于解锁判断）
 * @returns {number}
 */
export function getTotalScore() {
  return safeGetItem('mmg_total_score', 0);
}

/**
 * 添加分数到累计总分
 * @param {number} score
 */
export function addTotalScore(score) {
  const current = getTotalScore();
  safeSetItem('mmg_total_score', current + score);
}

/**
 * 检查皮肤是否已解锁
 * @param {string} skinId
 * @returns {boolean}
 */
export function isSkinUnlocked(skinId) {
  const skin = findSkinById(skinId);
  if (!skin) return false;
  if (skin.unlockScore === 0) return true;

  const unlocked = safeGetItem(SKIN_STORAGE_KEY, []);
  if (unlocked.includes(skinId)) return false;

  return getTotalScore() >= skin.unlockScore;
}

/**
 * 解锁皮肤
 * @param {string} skinId
 * @returns {boolean} 是否成功解锁
 */
export function unlockSkin(skinId) {
  if (isSkinUnlocked(skinId)) return false;

  const skin = findSkinById(skinId);
  if (!skin) return false;
  if (getTotalScore() < skin.unlockScore) return false;

  const unlocked = safeGetItem(SKIN_STORAGE_KEY, []);
  unlocked.push(skinId);
  safeSetItem(SKIN_STORAGE_KEY, unlocked);
  return true;
}

/**
 * 获取已解锁的皮肤列表
 * @returns {string[]}
 */
export function getUnlockedSkins() {
  const allSkins = getAllSkins();
  return allSkins.filter((skin) => isSkinUnlocked(skin.id));
}

/**
 * 获取所有皮肤定义
 * @returns {Array}
 */
export function getAllSkins() {
  const skins = [];
  Object.values(CARD_SKINS).forEach((series) => {
    series.series.forEach((skin) => {
      skins.push({
        ...skin,
        seriesName: series.name,
        seriesId: series.id,
      });
    });
  });
  return skins;
}

/**
 * 根据ID查找皮肤
 * @param {string} skinId
 * @returns {Object|null}
 */
export function findSkinById(skinId) {
  return getAllSkins().find((skin) => skin.id === skinId) || null;
}

/**
 * 获取当前选中的皮肤ID
 * @returns {string}
 */
export function getSelectedSkinId() {
  const saved = safeGetItem(SELECTED_SKIN_KEY, null);
  if (saved && isSkinUnlocked(saved)) return saved;

  const theme = safeGetItem(STORAGE_KEYS.LAST_CARD_THEME, 'guofeng');
  if (theme === 'japanese') return 'japanese_temple';
  return 'guofeng_mountain';
}

/**
 * 设置当前选中的皮肤
 * @param {string} skinId
 * @returns {boolean}
 */
export function setSelectedSkin(skinId) {
  if (!isSkinUnlocked(skinId)) return false;
  safeSetItem(SELECTED_SKIN_KEY, skinId);
  return true;
}

/**
 * 获取当前皮肤的背面图片URL
 * @returns {string}
 */
export function getCurrentBackImage() {
  const skinId = getSelectedSkinId();
  const skin = findSkinById(skinId);
  return skin ? skin.backImage : CARD_SKINS.guofeng.series[0].backImage;
}

/**
 * 检查并自动解锁满足条件的皮肤
 * @returns {Array} 新解锁的皮肤列表
 */
export function checkAndUnlockSkins() {
  const newUnlocks = [];
  const allSkins = getAllSkins();

  allSkins.forEach((skin) => {
    if (unlockSkin(skin.id)) {
      newUnlocks.push(skin);
    }
  });

  return newUnlocks;
}

/**
 * 获取皮肤解锁进度
 * @param {string} skinId
 * @returns {Object} { current, required, percentage, isUnlocked }
 */
export function getSkinProgress(skinId) {
  const skin = findSkinById(skinId);
  if (!skin) return { current: 0, required: 0, percentage: 0, isUnlocked: false };

  const total = getTotalScore();
  const isUnlocked = isSkinUnlocked(skinId);

  return {
    current: total,
    required: skin.unlockScore,
    percentage: Math.min(100, Math.round((total / skin.unlockScore) * 100)),
    isUnlocked,
  };
}
