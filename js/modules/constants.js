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

/** 国风主题卡牌图片（40张） */
export const GUOFENG_CARDS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1548625361-e88c60eb76a0?w=400&h=400&fit=crop', name: '红灯笼' },
  { id: 2, src: 'https://images.unsplash.com/photo-1515549832467-8783363e19b6?w=400&h=400&fit=crop', name: '青花瓷' },
  { id: 3, src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=400&fit=crop', name: '折扇' },
  { id: 4, src: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=400&h=400&fit=crop', name: '梅花' },
  { id: 5, src: 'https://images.unsplash.com/photo-1490750967868-88aa4f44db5b?w=400&h=400&fit=crop', name: '牡丹' },
  { id: 6, src: 'https://images.unsplash.com/photo-1516205651411-a23336a5a4e2?w=400&h=400&fit=crop', name: '荷花' },
  { id: 7, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop', name: '竹子' },
  { id: 8, src: 'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400&h=400&fit=crop', name: '菊花' },
  { id: 9, src: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=400&h=400&fit=crop', name: '茶叶' },
  { id: 10, src: 'https://images.unsplash.com/photo-1547986164-81d93de7929c?w=400&h=400&fit=crop', name: '毛笔' },
  { id: 11, src: 'https://images.unsplash.com/photo-1582739501019-5c4aa6e949d9?w=400&h=400&fit=crop', name: '古琴' },
  { id: 12, src: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=400&h=400&fit=crop', name: '京剧脸谱' },
  { id: 13, src: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=400&h=400&fit=crop', name: '剪纸' },
  { id: 14, src: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=400&fit=crop', name: '中国结' },
  { id: 15, src: 'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?w=400&h=400&fit=crop', name: '龙舟' },
  { id: 16, src: 'https://images.unsplash.com/photo-1545167496-31b3d3e27358?w=400&h=400&fit=crop', name: '石狮' },
  { id: 17, src: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=400&h=400&fit=crop', name: '丝绸' },
  { id: 18, src: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=400&fit=crop', name: '玉佩' },
  { id: 19, src: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=400&h=400&fit=crop', name: '锦鲤' },
  { id: 20, src: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=400&h=400&fit=crop', name: '仙鹤' },
  { id: 21, src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop', name: '长城' },
  { id: 22, src: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400&h=400&fit=crop', name: '故宫' },
  { id: 23, src: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&h=400&fit=crop', name: '园林' },
  { id: 24, src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop', name: '宝塔' },
  { id: 25, src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop', name: '山水' },
  { id: 26, src: 'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=400&h=400&fit=crop', name: '瀑布' },
  { id: 27, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop', name: '云雾' },
  { id: 28, src: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&fit=crop', name: '日出' },
  { id: 29, src: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=400&h=400&fit=crop', name: '月亮' },
  { id: 30, src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=400&fit=crop', name: '樱花' },
  { id: 31, src: 'https://images.unsplash.com/photo-1558618047-f4b511a9688f?w=400&h=400&fit=crop', name: '风筝' },
  { id: 32, src: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400&h=400&fit=crop', name: '油纸伞' },
  { id: 33, src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&h=400&fit=crop', name: '香炉' },
  { id: 34, src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop', name: '铜镜' },
  { id: 35, src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop', name: '陶瓷' },
  { id: 36, src: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&h=400&fit=crop', name: '印章' },
  { id: 37, src: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=400&h=400&fit=crop', name: '水墨' },
  { id: 38, src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop', name: '春联' },
  { id: 39, src: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&h=400&fit=crop', name: '鞭炮' },
  { id: 40, src: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=400&fit=crop', name: '饺子' },
];

/** 日系主题卡牌图片（40张） */
export const JAPANESE_CARDS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=400&fit=crop', name: '鸟居' },
  { id: 2, src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop', name: '富士山' },
  { id: 3, src: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=400&fit=crop', name: '樱花' },
  { id: 4, src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop', name: '神社' },
  { id: 5, src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=400&fit=crop', name: '东京塔' },
  { id: 6, src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=400&fit=crop', name: '和服' },
  { id: 7, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop', name: '竹林' },
  { id: 8, src: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=400&fit=crop', name: '鲤鱼旗' },
  { id: 9, src: 'https://images.unsplash.com/photo-1548625361-e88c60eb76a0?w=400&h=400&fit=crop', name: '灯笼' },
  { id: 10, src: 'https://images.unsplash.com/photo-1547986164-81d93de7929c?w=400&h=400&fit=crop', name: '招财猫' },
  { id: 11, src: 'https://images.unsplash.com/photo-1582739501019-5c4aa6e949d9?w=400&h=400&fit=crop', name: '抹茶' },
  { id: 12, src: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=400&h=400&fit=crop', name: '浮世绘' },
  { id: 13, src: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=400&h=400&fit=crop', name: '折纸' },
  { id: 14, src: 'https://images.unsplash.com/photo-1516205651411-a23336a5a4e2?w=400&h=400&fit=crop', name: '紫藤' },
  { id: 15, src: 'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?w=400&h=400&fit=crop', name: '红叶' },
  { id: 16, src: 'https://images.unsplash.com/photo-1545167496-31b3d3e27358?w=400&h=400&fit=crop', name: '石灯' },
  { id: 17, src: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=400&h=400&fit=crop', name: '风铃' },
  { id: 18, src: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=400&fit=crop', name: '团扇' },
  { id: 19, src: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=400&h=400&fit=crop', name: '金鱼' },
  { id: 20, src: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=400&h=400&fit=crop', name: '白鹤' },
  { id: 21, src: 'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=400&h=400&fit=crop', name: '温泉' },
  { id: 22, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop', name: '庭院' },
  { id: 23, src: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&fit=crop', name: '日出' },
  { id: 24, src: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=400&h=400&fit=crop', name: '满月' },
  { id: 25, src: 'https://images.unsplash.com/photo-1490750967868-88aa4f44db5b?w=400&h=400&fit=crop', name: '菊花' },
  { id: 26, src: 'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400&h=400&fit=crop', name: '梅花' },
  { id: 27, src: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=400&h=400&fit=crop', name: '茶道' },
  { id: 28, src: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=400&h=400&fit=crop', name: '花道' },
  { id: 29, src: 'https://images.unsplash.com/photo-1515549832467-8783363e19b6?w=400&h=400&fit=crop', name: '寿司' },
  { id: 30, src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&h=400&fit=crop', name: '天妇罗' },
  { id: 31, src: 'https://images.unsplash.com/photo-1558618047-f4b511a9688f?w=400&h=400&fit=crop', name: '拉面' },
  { id: 32, src: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=400&h=400&fit=crop', name: '便当' },
  { id: 33, src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&h=400&fit=crop', name: '御守' },
  { id: 34, src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop', name: '面具' },
  { id: 35, src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop', name: '陶器' },
  { id: 36, src: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&h=400&fit=crop', name: '扇子' },
  { id: 37, src: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?w=400&h=400&fit=crop', name: '水墨' },
  { id: 38, src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=400&fit=crop', name: '烟火' },
  { id: 39, src: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400&h=400&fit=crop', name: '祭典' },
  { id: 40, src: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=400&h=400&fit=crop', name: '达摩' },
];

/** 主题配置 */
export const CARD_THEMES = {
  guofeng: {
    name: '国风',
    cards: GUOFENG_CARDS,
    boardClass: 'card-theme-guofeng',
  },
  japanese: {
    name: '和风',
    cards: JAPANESE_CARDS,
    boardClass: 'card-theme-japanese',
  },
};
