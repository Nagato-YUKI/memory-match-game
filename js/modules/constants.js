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
    gridClass: 'game-board--6x6',
    cols: 6,
    rows: 6,
    pairs: 18,
    timeLimit: 120,
    timeBase: 200,
    timeCoeff: 4,
    multiplier: 2.5,
  },
};

/** 卡牌图片配置（40张，使用 dicebear 头像API） */
export const CARD_IMAGES = [
  { id: 1, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat1&backgroundColor=b6e3f4', name: '橘猫' },
  { id: 2, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat2&backgroundColor=c0aede', name: '黑猫' },
  { id: 3, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat3&backgroundColor=d1d4f9', name: '白猫' },
  { id: 4, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat4&backgroundColor=ffd5dc', name: '三花猫' },
  { id: 5, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat5&backgroundColor=ffdfbf', name: '蓝猫' },
  { id: 6, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dog1&backgroundColor=b6e3f4', name: '柴犬' },
  { id: 7, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dog2&backgroundColor=c0aede', name: '柯基' },
  { id: 8, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dog3&backgroundColor=d1d4f9', name: '哈士奇' },
  { id: 9, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dog4&backgroundColor=ffd5dc', name: '金毛' },
  { id: 10, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dog5&backgroundColor=ffdfbf', name: '泰迪' },
  { id: 11, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=panda&backgroundColor=b6e3f4', name: '熊猫' },
  { id: 12, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fox&backgroundColor=c0aede', name: '狐狸' },
  { id: 13, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rabbit&backgroundColor=d1d4f9', name: '兔子' },
  { id: 14, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=squirrel&backgroundColor=ffd5dc', name: '松鼠' },
  { id: 15, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deer&backgroundColor=ffdfbf', name: '鹿' },
  { id: 16, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dolphin&backgroundColor=b6e3f4', name: '海豚' },
  { id: 17, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=whale&backgroundColor=c0aede', name: '鲸鱼' },
  { id: 18, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=turtle&backgroundColor=d1d4f9', name: '海龟' },
  { id: 19, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=octopus&backgroundColor=ffd5dc', name: '章鱼' },
  { id: 20, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seahorse&backgroundColor=ffdfbf', name: '海马' },
  { id: 21, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=owl&backgroundColor=b6e3f4', name: '猫头鹰' },
  { id: 22, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=penguin&backgroundColor=c0aede', name: '企鹅' },
  { id: 23, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parrot&backgroundColor=d1d4f9', name: '鹦鹉' },
  { id: 24, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=swan&backgroundColor=ffd5dc', name: '天鹅' },
  { id: 25, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=peacock&backgroundColor=ffdfbf', name: '孔雀' },
  { id: 26, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=apple&backgroundColor=b6e3f4', name: '苹果' },
  { id: 27, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=banana&backgroundColor=c0aede', name: '香蕉' },
  { id: 28, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=strawberry&backgroundColor=d1d4f9', name: '草莓' },
  { id: 29, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watermelon&backgroundColor=ffd5dc', name: '西瓜' },
  { id: 30, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grape&backgroundColor=ffdfbf', name: '葡萄' },
  { id: 31, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cake&backgroundColor=b6e3f4', name: '蛋糕' },
  { id: 32, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=icecream&backgroundColor=c0aede', name: '冰淇淋' },
  { id: 33, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=donut&backgroundColor=d1d4f9', name: '甜甜圈' },
  { id: 34, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=macaron&backgroundColor=ffd5dc', name: '马卡龙' },
  { id: 35, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pudding&backgroundColor=ffdfbf', name: '布丁' },
  { id: 36, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=astronaut&backgroundColor=b6e3f4', name: '宇航员' },
  { id: 37, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rocket&backgroundColor=c0aede', name: '火箭' },
  { id: 38, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=planet&backgroundColor=d1d4f9', name: '星球' },
  { id: 39, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alien&backgroundColor=ffd5dc', name: '外星人' },
  { id: 40, src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ufo&backgroundColor=ffdfbf', name: '飞碟' },
];

/** 背景图片配置（使用渐变背景代替图片） */
export const BG_IMAGES = {
  start: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  game: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  overlay: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
};

/** 主题配置 */
export const CARD_THEMES = {
  default: {
    name: '默认主题',
    cards: CARD_IMAGES,
    boardClass: 'card-theme-default',
  },
};
