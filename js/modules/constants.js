/**
 * 常量定义模块
 * @module constants
 */

/** 游戏状态枚举 */
export const GameState = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  WON: 'WON',
  LOST: 'LOST',
};

/** localStorage 键名常量 */
export const STORAGE_KEYS = {
  HIGH_SCORE: 'mmg_high_score',
  BEST_TIME: 'mmg_best_time',
  LAST_THEME: 'mmg_last_theme',
  LAST_DIFFICULTY: 'mmg_last_difficulty',
  LAST_CARD_THEME: 'mmg_last_card_theme',
  SOUND_ENABLED: 'mmg_sound_enabled',
  BGM_ENABLED: 'mmg_bgm_enabled',
};

/** 难度配置 */
export const DIFFICULTY_CONFIG = {
  easy: {
    name: '简单',
    gridClass: 'game-board--4x3',
    cols: 4,
    rows: 3,
    pairs: 6,
    timeLimit: null,
    timeBase: 60,
    timeCoeff: 1,
    multiplier: 1.0,
  },
  medium: {
    name: '中等',
    gridClass: 'game-board--4x4',
    cols: 4,
    rows: 4,
    pairs: 8,
    timeLimit: 60,
    timeBase: 120,
    timeCoeff: 2,
    multiplier: 1.5,
  },
  hard: {
    name: '困难',
    gridClass: 'game-board--6x4',
    cols: 6,
    rows: 4,
    pairs: 12,
    timeLimit: 90,
    timeBase: 180,
    timeCoeff: 3,
    multiplier: 2.0,
  },
};

/** 萌宠主题卡牌数据 */
export const PETS_CARDS = [
  { emoji: '\uD83D\uDC31', name: '橘猫', colorClass: 'card-pattern-pets-0' },
  { emoji: '\uD83D\uDC36', name: '柴犬', colorClass: 'card-pattern-pets-1' },
  { emoji: '\uD83D\uDC30', name: '垂耳兔', colorClass: 'card-pattern-pets-2' },
  { emoji: '\uD83D\uDC3C', name: '熊猫', colorClass: 'card-pattern-pets-3' },
  { emoji: '\uD83D\uDC39', name: '仓鼠', colorClass: 'card-pattern-pets-4' },
  { emoji: '\uD83D\uDC27', name: '企鹅', colorClass: 'card-pattern-pets-5' },
  { emoji: '\uD83E\uDD8A', name: '狐狸', colorClass: 'card-pattern-pets-6' },
  { emoji: '\uD83E\uDD89', name: '猫头鹰', colorClass: 'card-pattern-pets-7' },
  { emoji: '\uD83D\uDC2C', name: '海豚', colorClass: 'card-pattern-pets-8' },
  { emoji: '\uD83E\uDDA5', name: '树懒', colorClass: 'card-pattern-pets-9' },
  { emoji: '\uD83E\uDD84', name: '独角兽猫', colorClass: 'card-pattern-pets-10' },
  { emoji: '\uD83C\uDF1F', name: '星星', colorClass: 'card-pattern-pets-11' },
];

/** 几何主题卡牌数据 */
export const GEOMETRIC_CARDS = [
  { emoji: '\uD83D\uDD34', name: '圆形', colorClass: 'card-pattern-geometric-0' },
  { emoji: '\uD83D\uDD3A', name: '三角形', colorClass: 'card-pattern-geometric-1' },
  { emoji: '\u2B50', name: '星形', colorClass: 'card-pattern-geometric-2' },
  { emoji: '\u2B21', name: '六边形', colorClass: 'card-pattern-geometric-3' },
  { emoji: '\uD83D\uDD37', name: '菱形', colorClass: 'card-pattern-geometric-4' },
  { emoji: '\uD83C\uDF00', name: '螺旋', colorClass: 'card-pattern-geometric-5' },
  { emoji: '\uD83E\uDDCA', name: '立方体', colorClass: 'card-pattern-geometric-6' },
  { emoji: '\u3030\uFE0F', name: '波浪', colorClass: 'card-pattern-geometric-7' },
  { emoji: '\u271A', name: '十字', colorClass: 'card-pattern-geometric-8' },
  { emoji: '\u2665\uFE0F', name: '心形', colorClass: 'card-pattern-geometric-9' },
  { emoji: '\u26A1', name: '闪电', colorClass: 'card-pattern-geometric-10' },
  { emoji: '\u221E', name: '无限', colorClass: 'card-pattern-geometric-11' },
];

/** 主题配置 */
export const CARD_THEMES = {
  pets: {
    name: '萌宠乐园',
    cards: PETS_CARDS,
    boardClass: 'card-theme-pets',
  },
  geometric: {
    name: '几何幻想',
    cards: GEOMETRIC_CARDS,
    boardClass: 'card-theme-geometric',
  },
};
