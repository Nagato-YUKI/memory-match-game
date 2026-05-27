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

/** 国风主题卡牌图片（20张本地路径） */
export const GUOFENG_CARDS = [
  { id: 1, src: 'assets/images/cards/guofeng/lantern.png', name: '红灯笼' },
  { id: 2, src: 'assets/images/cards/guofeng/fan.png', name: '折扇' },
  { id: 3, src: 'assets/images/cards/guofeng/plum.png', name: '梅花' },
  { id: 4, src: 'assets/images/cards/guofeng/peony.png', name: '牡丹' },
  { id: 5, src: 'assets/images/cards/guofeng/lotus.png', name: '荷花' },
  { id: 6, src: 'assets/images/cards/guofeng/bamboo.png', name: '竹子' },
  { id: 7, src: 'assets/images/cards/guofeng/chrysanthemum.png', name: '菊花' },
  { id: 8, src: 'assets/images/cards/guofeng/tea.png', name: '茶叶' },
  { id: 9, src: 'assets/images/cards/guofeng/brush.png', name: '毛笔' },
  { id: 10, src: 'assets/images/cards/guofeng/guzheng.png', name: '古琴' },
  { id: 11, src: 'assets/images/cards/guofeng/mask.png', name: '京剧脸谱' },
  { id: 12, src: 'assets/images/cards/guofeng/knot.png', name: '中国结' },
  { id: 13, src: 'assets/images/cards/guofeng/dragon.png', name: '龙舟' },
  { id: 14, src: 'assets/images/cards/guofeng/lion.png', name: '石狮' },
  { id: 15, src: 'assets/images/cards/guofeng/silk.png', name: '丝绸' },
  { id: 16, src: 'assets/images/cards/guofeng/jade.png', name: '玉佩' },
  { id: 17, src: 'assets/images/cards/guofeng/koi.png', name: '锦鲤' },
  { id: 18, src: 'assets/images/cards/guofeng/crane.png', name: '仙鹤' },
  { id: 19, src: 'assets/images/cards/guofeng/pagoda.png', name: '宝塔' },
  { id: 20, src: 'assets/images/cards/guofeng/mountain.png', name: '山水' },
];

/** 和风主题卡牌图片（20张本地路径） */
export const JAPANESE_CARDS = [
  { id: 1, src: 'assets/images/cards/japanese/torii.png', name: '鸟居' },
  { id: 2, src: 'assets/images/cards/japanese/fuji.png', name: '富士山' },
  { id: 3, src: 'assets/images/cards/japanese/sakura.png', name: '樱花' },
  { id: 4, src: 'assets/images/cards/japanese/shrine.png', name: '神社' },
  { id: 5, src: 'assets/images/cards/japanese/tokyo.png', name: '东京塔' },
  { id: 6, src: 'assets/images/cards/japanese/kimono.png', name: '和服' },
  { id: 7, src: 'assets/images/cards/japanese/bamboo_jp.png', name: '竹林' },
  { id: 8, src: 'assets/images/cards/japanese/koinobori.png', name: '鲤鱼旗' },
  { id: 9, src: 'assets/images/cards/japanese/lantern_jp.png', name: '灯笼' },
  { id: 10, src: 'assets/images/cards/japanese/maneki.png', name: '招财猫' },
  { id: 11, src: 'assets/images/cards/japanese/matcha.png', name: '抹茶' },
  { id: 12, src: 'assets/images/cards/japanese/ukiyo.png', name: '浮世绘' },
  { id: 13, src: 'assets/images/cards/japanese/origami.png', name: '折纸' },
  { id: 14, src: 'assets/images/cards/japanese/wisteria.png', name: '紫藤' },
  { id: 15, src: 'assets/images/cards/japanese/autumn.png', name: '红叶' },
  { id: 16, src: 'assets/images/cards/japanese/stone_lantern.png', name: '石灯' },
  { id: 17, src: 'assets/images/cards/japanese/wind_chime.png', name: '风铃' },
  { id: 18, src: 'assets/images/cards/japanese/uchiwa.png', name: '团扇' },
  { id: 19, src: 'assets/images/cards/japanese/goldfish.png', name: '金鱼' },
  { id: 20, src: 'assets/images/cards/japanese/daruma.png', name: '达摩' },
];

/** 背景图片配置 */
export const BG_IMAGES = {
  guofeng: 'assets/images/bg/guofeng_bg.png',
  japanese: 'assets/images/bg/japanese_bg.png',
};

/** 主题配置 */
export const CARD_THEMES = {
  guofeng: {
    name: '国风',
    cards: GUOFENG_CARDS,
    boardClass: 'card-theme-guofeng',
    bgImage: BG_IMAGES.guofeng,
  },
  japanese: {
    name: '和风',
    cards: JAPANESE_CARDS,
    boardClass: 'card-theme-japanese',
    bgImage: BG_IMAGES.japanese,
  },
};
