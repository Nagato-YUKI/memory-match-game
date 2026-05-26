/**
 * 记忆翻牌小游戏 - 核心逻辑
 * 包含：状态机、计分存档、难度选择、翻牌配对、胜负判定、主题系统、音效系统
 */

// ============================================
// 1. 常量定义
// ============================================

/** 游戏状态枚举 */
const GameState = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  WON: 'WON',
  LOST: 'LOST'
};

/** localStorage 键名常量 */
const STORAGE_KEYS = {
  HIGH_SCORE: 'mmg_high_score',
  BEST_TIME: 'mmg_best_time',
  LAST_THEME: 'mmg_last_theme',
  LAST_DIFFICULTY: 'mmg_last_difficulty',
  LAST_CARD_THEME: 'mmg_last_card_theme',
  SOUND_ENABLED: 'mmg_sound_enabled'
};

/** 难度配置 */
const DIFFICULTY_CONFIG = {
  easy: {
    name: '简单',
    gridClass: 'game-board--4x3',
    cols: 4,
    rows: 3,
    pairs: 6,
    timeLimit: null,
    timeBase: 60,
    timeCoeff: 1,
    multiplier: 1.0
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
    multiplier: 1.5
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
    multiplier: 2.0
  }
};

/** 萌宠主题卡牌数据 */
const PETS_CARDS = [
  { emoji: '🐱', name: '橘猫', colorClass: 'card-pattern-pets-0' },
  { emoji: '🐶', name: '柴犬', colorClass: 'card-pattern-pets-1' },
  { emoji: '🐰', name: '垂耳兔', colorClass: 'card-pattern-pets-2' },
  { emoji: '🐼', name: '熊猫', colorClass: 'card-pattern-pets-3' },
  { emoji: '🐹', name: '仓鼠', colorClass: 'card-pattern-pets-4' },
  { emoji: '🐧', name: '企鹅', colorClass: 'card-pattern-pets-5' },
  { emoji: '🦊', name: '狐狸', colorClass: 'card-pattern-pets-6' },
  { emoji: '🦉', name: '猫头鹰', colorClass: 'card-pattern-pets-7' },
  { emoji: '🐬', name: '海豚', colorClass: 'card-pattern-pets-8' },
  { emoji: '🦥', name: '树懒', colorClass: 'card-pattern-pets-9' },
  { emoji: '🦄', name: '独角兽猫', colorClass: 'card-pattern-pets-10' },
  { emoji: '🌟', name: '星星', colorClass: 'card-pattern-pets-11' }
];

/** 几何主题卡牌数据 */
const GEOMETRIC_CARDS = [
  { emoji: '🔴', name: '圆形', colorClass: 'card-pattern-geometric-0' },
  { emoji: '🔺', name: '三角形', colorClass: 'card-pattern-geometric-1' },
  { emoji: '⭐', name: '星形', colorClass: 'card-pattern-geometric-2' },
  { emoji: '⬡', name: '六边形', colorClass: 'card-pattern-geometric-3' },
  { emoji: '🔷', name: '菱形', colorClass: 'card-pattern-geometric-4' },
  { emoji: '🌀', name: '螺旋', colorClass: 'card-pattern-geometric-5' },
  { emoji: '🧊', name: '立方体', colorClass: 'card-pattern-geometric-6' },
  { emoji: '〰️', name: '波浪', colorClass: 'card-pattern-geometric-7' },
  { emoji: '✚', name: '十字', colorClass: 'card-pattern-geometric-8' },
  { emoji: '♥️', name: '心形', colorClass: 'card-pattern-geometric-9' },
  { emoji: '⚡', name: '闪电', colorClass: 'card-pattern-geometric-10' },
  { emoji: '∞', name: '无限', colorClass: 'card-pattern-geometric-11' }
];

/** 主题配置 */
const CARD_THEMES = {
  pets: {
    name: '萌宠乐园',
    cards: PETS_CARDS,
    boardClass: 'card-theme-pets'
  },
  geometric: {
    name: '几何幻想',
    cards: GEOMETRIC_CARDS,
    boardClass: 'card-theme-geometric'
  }
};

// ============================================
// 2. 游戏状态对象
// ============================================

const gameState = {
  state: GameState.IDLE,
  difficulty: 'medium',
  timedMode: true,
  theme: 'light',
  cardTheme: 'pets',
  soundEnabled: true,

  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  errors: 0,
  elapsedSeconds: 0,
  countdownSeconds: 0,

  timerId: null,
  countdownId: null,
  isAnimating: false,

  highScore: 0,
  bestTime: Infinity
};

// ============================================
// 3. DOM 元素缓存
// ============================================

const dom = {
  // 屏幕
  startScreen: document.getElementById('start-screen'),
  gameScreen: document.getElementById('game-screen'),

  // 开始界面
  difficultyBtns: document.querySelectorAll('.difficulty-btn'),
  timedModeToggle: document.getElementById('timed-mode-toggle'),
  themeToggle: document.getElementById('theme-toggle'),
  cardThemeBtns: document.querySelectorAll('.card-theme-btn'),
  soundToggle: document.getElementById('sound-toggle'),
  startBtn: document.getElementById('start-btn'),
  historyHighScore: document.getElementById('history-high-score'),
  historyBestTime: document.getElementById('history-best-time'),

  // 分数板
  scoreMatches: document.getElementById('score-matches'),
  scoreTime: document.getElementById('score-time'),
  scoreErrors: document.getElementById('score-errors'),
  scoreCurrent: document.getElementById('score-current'),
  scoreHigh: document.getElementById('score-high'),
  scoreCountdown: document.getElementById('score-countdown'),

  // 游戏控制
  pauseBtn: document.getElementById('pause-btn'),
  restartBtn: document.getElementById('restart-btn'),
  menuBtn: document.getElementById('menu-btn'),

  // 游戏面板
  gameBoard: document.getElementById('game-board'),

  // 遮罩层
  pauseOverlay: document.getElementById('pause-overlay'),
  winOverlay: document.getElementById('win-overlay'),
  loseOverlay: document.getElementById('lose-overlay'),

  // 暂停遮罩按钮
  resumeBtn: document.getElementById('resume-btn'),
  pauseRestartBtn: document.getElementById('pause-restart-btn'),

  // 胜利遮罩
  winScore: document.getElementById('win-score'),
  winTime: document.getElementById('win-time'),
  winErrors: document.getElementById('win-errors'),
  winMultiplier: document.getElementById('win-multiplier'),
  winReplayBtn: document.getElementById('win-replay-btn'),
  winMenuBtn: document.getElementById('win-menu-btn'),

  // 失败遮罩
  loseMatches: document.getElementById('lose-matches'),
  loseTime: document.getElementById('lose-time'),
  loseErrors: document.getElementById('lose-errors'),
  loseReplayBtn: document.getElementById('lose-replay-btn'),
  loseMenuBtn: document.getElementById('lose-menu-btn')
};

// ============================================
// 4. 音效系统
// ============================================

/** 音频上下文 */
let audioContext = null;

/**
 * 初始化音频上下文（用户首次交互后调用）
 */
function initAudioContext() {
  if (!audioContext && typeof AudioContext !== 'undefined') {
    audioContext = new AudioContext();
  } else if (!audioContext && typeof webkitAudioContext !== 'undefined') {
    audioContext = new webkitAudioContext();
  }
}

/**
 * 播放音效
 * @param {string} type 音效类型
 */
function playSound(type) {
  if (!gameState.soundEnabled) return;
  if (!audioContext) initAudioContext();
  if (!audioContext) return;

  try {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'flip':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.15);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;

      case 'match':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, now);
        oscillator.frequency.setValueAtTime(659.25, now + 0.1);
        oscillator.frequency.setValueAtTime(783.99, now + 0.2);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'mismatch':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(392, now);
        oscillator.frequency.exponentialRampToValueAtTime(196, now + 0.25);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        oscillator.start(now);
        oscillator.stop(now + 0.25);
        break;

      case 'victory':
        playVictorySound(now);
        return;

      case 'gameover':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.8);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        oscillator.start(now);
        oscillator.stop(now + 0.8);
        break;

      case 'button':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        oscillator.start(now);
        oscillator.stop(now + 0.08);
        break;
    }
  } catch (err) {
    console.warn('播放音效失败:', err);
  }
}

/**
 * 播放胜利旋律
 * @param {number} startTime
 */
function playVictorySound(startTime) {
  if (!audioContext) return;

  const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
  const durations = [0.15, 0.15, 0.15, 0.15, 0.4];

  let currentTime = startTime;

  notes.forEach((freq, index) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, currentTime);

    gain.gain.setValueAtTime(0.18, currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, currentTime + durations[index]);

    osc.start(currentTime);
    osc.stop(currentTime + durations[index]);

    currentTime += durations[index];
  });
}

// ============================================
// 5. 工具函数
// ============================================

/**
 * 格式化秒数为 MM:SS
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Fisher-Yates 洗牌算法
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 计算当前得分
 * @returns {number}
 */
function calculateScore() {
  const config = DIFFICULTY_CONFIG[gameState.difficulty];
  const baseScore = gameState.matchedPairs * 100;
  const timeBonus = Math.max(0, config.timeBase - gameState.elapsedSeconds) * config.timeCoeff;
  const errorPenalty = gameState.errors * 10;
  const rawScore = baseScore + timeBonus - errorPenalty;
  const finalScore = Math.max(0, Math.floor(rawScore * config.multiplier));
  return finalScore;
}

// ============================================
// 6. 本地存储操作
// ============================================

/**
 * 从 localStorage 安全读取数据
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function safeGetItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    const parsed = JSON.parse(item);
    return parsed !== null ? parsed : defaultValue;
  } catch (err) {
    console.warn(`读取 localStorage 失败 [${key}]:`, err);
    return defaultValue;
  }
}

/**
 * 向 localStorage 安全写入数据
 * @param {string} key
 * @param {*} value
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`写入 localStorage 失败 [${key}]:`, err);
  }
}

/**
 * 加载存档数据
 */
function loadSaveData() {
  gameState.highScore = safeGetItem(STORAGE_KEYS.HIGH_SCORE, 0);
  gameState.bestTime = safeGetItem(STORAGE_KEYS.BEST_TIME, Infinity);
  gameState.theme = safeGetItem(STORAGE_KEYS.LAST_THEME, 'light');
  gameState.difficulty = safeGetItem(STORAGE_KEYS.LAST_DIFFICULTY, 'medium');
  gameState.cardTheme = safeGetItem(STORAGE_KEYS.LAST_CARD_THEME, 'pets');
  gameState.soundEnabled = safeGetItem(STORAGE_KEYS.SOUND_ENABLED, true);
}

/**
 * 保存最高分
 * @param {number} score
 */
function saveHighScore(score) {
  if (score > gameState.highScore) {
    gameState.highScore = score;
    safeSetItem(STORAGE_KEYS.HIGH_SCORE, score);
  }
}

/**
 * 保存最佳用时
 * @param {number} time
 */
function saveBestTime(time) {
  if (time > 0 && time < gameState.bestTime) {
    gameState.bestTime = time;
    safeSetItem(STORAGE_KEYS.BEST_TIME, time);
  }
}

/**
 * 保存用户偏好设置
 */
function savePreferences() {
  safeSetItem(STORAGE_KEYS.LAST_THEME, gameState.theme);
  safeSetItem(STORAGE_KEYS.LAST_DIFFICULTY, gameState.difficulty);
  safeSetItem(STORAGE_KEYS.LAST_CARD_THEME, gameState.cardTheme);
  safeSetItem(STORAGE_KEYS.SOUND_ENABLED, gameState.soundEnabled);
}

// ============================================
// 7. UI 更新函数
// ============================================

/**
 * 更新分数板显示
 */
function updateScoreBoard() {
  dom.scoreMatches.textContent = gameState.matchedPairs;
  dom.scoreTime.textContent = formatTime(gameState.elapsedSeconds);
  dom.scoreErrors.textContent = gameState.errors;
  dom.scoreCurrent.textContent = calculateScore();
  dom.scoreHigh.textContent = gameState.highScore;

  if (gameState.timedMode && gameState.countdownSeconds > 0) {
    dom.scoreCountdown.textContent = formatTime(gameState.countdownSeconds);
    dom.scoreCountdown.classList.toggle('countdown--warning', gameState.countdownSeconds <= 10);
  } else if (gameState.timedMode && gameState.countdownSeconds <= 0) {
    dom.scoreCountdown.textContent = '00:00';
    dom.scoreCountdown.classList.add('countdown--warning');
  } else {
    dom.scoreCountdown.textContent = '--:--';
    dom.scoreCountdown.classList.remove('countdown--warning');
  }
}

/**
 * 更新开始界面历史记录显示
 */
function updateHistoryDisplay() {
  dom.historyHighScore.textContent = gameState.highScore;
  dom.historyBestTime.textContent =
    gameState.bestTime === Infinity ? '--' : formatTime(gameState.bestTime);
}

/**
 * 更新难度按钮选中状态
 */
function updateDifficultyUI() {
  dom.difficultyBtns.forEach((btn) => {
    const isActive = btn.dataset.difficulty === gameState.difficulty;
    btn.classList.toggle('difficulty-btn--active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });
}

/**
 * 更新主题按钮显示
 */
function updateThemeUI() {
  const isDark = gameState.theme === 'dark';
  dom.themeToggle.querySelector('.theme-icon').textContent = isDark ? '🌙' : '☀️';
  dom.themeToggle.querySelector('.theme-text').textContent = isDark ? '深色主题' : '浅色主题';
  document.documentElement.setAttribute('data-theme', gameState.theme);
}

/**
 * 更新卡牌主题 UI
 */
function updateCardThemeUI() {
  dom.cardThemeBtns.forEach((btn) => {
    const isActive = btn.dataset.cardTheme === gameState.cardTheme;
    btn.classList.toggle('card-theme-btn--active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });
}

/**
 * 更新音效开关 UI
 */
function updateSoundUI() {
  if (dom.soundToggle) {
    dom.soundToggle.checked = gameState.soundEnabled;
  }
}

/**
 * 切换屏幕显示
 * @param {'start'|'game'} screenName
 */
function switchScreen(screenName) {
  if (screenName === 'start') {
    dom.startScreen.classList.add('screen--active');
    dom.gameScreen.classList.remove('screen--active');
  } else {
    dom.startScreen.classList.remove('screen--active');
    dom.gameScreen.classList.add('screen--active');
  }
}

/**
 * 显示/隐藏遮罩层
 * @param {HTMLElement} overlay
 * @param {boolean} show
 */
function toggleOverlay(overlay, show) {
  overlay.classList.toggle('overlay--hidden', !show);
}

// ============================================
// 8. 卡牌生成与渲染
// ============================================

/**
 * 获取当前主题的卡牌数据
 * @returns {Array<{emoji: string, name: string, colorClass: string}>}
 */
function getCurrentThemeCards() {
  const theme = CARD_THEMES[gameState.cardTheme];
  return theme ? theme.cards : PETS_CARDS;
}

/**
 * 生成卡牌数据
 * @returns {Array<{id: number, symbol: string, name: string, colorClass: string, matched: boolean}>}
 */
function generateCards() {
  const config = DIFFICULTY_CONFIG[gameState.difficulty];
  const pairs = config.pairs;
  const themeCards = getCurrentThemeCards();
  const selectedCards = themeCards.slice(0, pairs);
  const cardPairs = [...selectedCards, ...selectedCards];
  const shuffled = shuffleArray(cardPairs);

  return shuffled.map((card, index) => ({
    id: index,
    symbol: card.emoji,
    name: card.name,
    colorClass: card.colorClass,
    matched: false
  }));
}

/**
 * 渲染游戏面板
 */
function renderGameBoard() {
  const config = DIFFICULTY_CONFIG[gameState.difficulty];
  const themeConfig = CARD_THEMES[gameState.cardTheme];

  dom.gameBoard.className = `game-board ${config.gridClass} ${themeConfig.boardClass}`;
  dom.gameBoard.innerHTML = '';

  gameState.cards.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.id = card.id;
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('aria-label', `卡牌 ${card.name}`);

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const back = document.createElement('div');
    back.className = 'card-face card-face--back';

    const front = document.createElement('div');
    front.className = 'card-face card-face--front';

    const pattern = document.createElement('div');
    pattern.className = `card-pattern ${card.colorClass}`;
    pattern.textContent = card.symbol;
    pattern.setAttribute('aria-hidden', 'true');

    front.appendChild(pattern);
    inner.appendChild(back);
    inner.appendChild(front);
    cardEl.appendChild(inner);

    // 点击事件
    cardEl.addEventListener('click', () => handleCardClick(card.id));
    // 触屏事件（消除 300ms 延迟）
    cardEl.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleCardClick(card.id);
    }, { passive: false });

    dom.gameBoard.appendChild(cardEl);
  });
}

/**
 * 获取卡牌 DOM 元素
 * @param {number} cardId
 * @returns {HTMLElement|null}
 */
function getCardElement(cardId) {
  return dom.gameBoard.querySelector(`.card[data-id="${cardId}"]`);
}

// ============================================
// 9. 计时器管理
// ============================================

/**
 * 启动计时器
 */
function startTimer() {
  stopTimer();
  gameState.timerId = setInterval(() => {
    gameState.elapsedSeconds++;
    updateScoreBoard();
  }, 1000);
}

/**
 * 停止计时器
 */
function stopTimer() {
  if (gameState.timerId) {
    clearInterval(gameState.timerId);
    gameState.timerId = null;
  }
}

/**
 * 启动倒计时（限时模式）
 */
function startCountdown() {
  stopCountdown();
  const config = DIFFICULTY_CONFIG[gameState.difficulty];
  if (!config.timeLimit || !gameState.timedMode) return;

  gameState.countdownSeconds = config.timeLimit;
  updateScoreBoard();

  gameState.countdownId = setInterval(() => {
    gameState.countdownSeconds--;
    updateScoreBoard();

    if (gameState.countdownSeconds <= 0) {
      stopCountdown();
      transitionTo(GameState.LOST);
    }
  }, 1000);
}

/**
 * 停止倒计时
 */
function stopCountdown() {
  if (gameState.countdownId) {
    clearInterval(gameState.countdownId);
    gameState.countdownId = null;
  }
}

// ============================================
// 10. 游戏逻辑 - 翻牌与配对
// ============================================

/**
 * 处理卡牌点击
 * @param {number} cardId
 */
function handleCardClick(cardId) {
  // 状态检查
  if (gameState.state !== GameState.PLAYING) return;
  if (gameState.isAnimating) return;

  const card = gameState.cards[cardId];
  if (!card || card.matched) return;

  // 检查是否已翻开
  if (gameState.flippedCards.includes(cardId)) return;

  // 最多翻开两张
  if (gameState.flippedCards.length >= 2) return;

  // 执行翻牌
  playSound('flip');
  flipCard(cardId);
  gameState.flippedCards.push(cardId);

  // 检查是否翻开了两张
  if (gameState.flippedCards.length === 2) {
    checkMatch();
  }
}

/**
 * 翻牌动画
 * @param {number} cardId
 */
function flipCard(cardId) {
  const cardEl = getCardElement(cardId);
  if (cardEl) {
    cardEl.classList.add('flipped');
  }
}

/**
 * 翻回卡牌
 * @param {number} cardId
 */
function unflipCard(cardId) {
  const cardEl = getCardElement(cardId);
  if (cardEl) {
    cardEl.classList.remove('flipped');
  }
}

/**
 * 检查配对
 */
function checkMatch() {
  const [id1, id2] = gameState.flippedCards;
  const card1 = gameState.cards[id1];
  const card2 = gameState.cards[id2];

  gameState.isAnimating = true;

  if (card1.symbol === card2.symbol) {
    // 配对成功
    handleMatchSuccess(id1, id2);
  } else {
    // 配对失败
    handleMatchFail(id1, id2);
  }
}

/**
 * 配对成功处理
 * @param {number} id1
 * @param {number} id2
 */
function handleMatchSuccess(id1, id2) {
  const card1 = gameState.cards[id1];
  const card2 = gameState.cards[id2];
  card1.matched = true;
  card2.matched = true;

  gameState.matchedPairs++;

  // 延迟添加成功动画
  setTimeout(() => {
    playSound('match');
    const el1 = getCardElement(id1);
    const el2 = getCardElement(id2);
    if (el1) el1.classList.add('matched');
    if (el2) el2.classList.add('matched');

    // 得分飘字
    showScoreFloat(id1);

    updateScoreBoard();
    gameState.flippedCards = [];
    gameState.isAnimating = false;

    // 检查是否全部配对完成
    const config = DIFFICULTY_CONFIG[gameState.difficulty];
    if (gameState.matchedPairs >= config.pairs) {
      transitionTo(GameState.WON);
    }
  }, 500);
}

/**
 * 配对失败处理
 * @param {number} id1
 * @param {number} id2
 */
function handleMatchFail(id1, id2) {
  gameState.errors++;
  updateScoreBoard();

  const el1 = getCardElement(id1);
  const el2 = getCardElement(id2);
  if (el1) el1.classList.add('mismatch');
  if (el2) el2.classList.add('mismatch');

  // 抖动后保持显示 800ms，然后翻回
  setTimeout(() => {
    playSound('mismatch');
    if (el1) el1.classList.remove('mismatch');
    if (el2) el2.classList.remove('mismatch');

    unflipCard(id1);
    unflipCard(id2);

    gameState.flippedCards = [];

    // 翻回动画 400ms 后解除锁定
    setTimeout(() => {
      gameState.isAnimating = false;
    }, 400);
  }, 1300);
}

/**
 * 显示得分飘字
 * @param {number} cardId
 */
function showScoreFloat(cardId) {
  const cardEl = getCardElement(cardId);
  if (!cardEl) return;

  const config = DIFFICULTY_CONFIG[gameState.difficulty];
  const timeBonus = Math.max(0, config.timeBase - gameState.elapsedSeconds) * config.timeCoeff;
  const points = 100 + timeBonus;

  const floatEl = document.createElement('div');
  floatEl.className = 'score-float';
  floatEl.textContent = `+${points}`;
  cardEl.appendChild(floatEl);

  setTimeout(() => {
    floatEl.remove();
  }, 1000);
}

// ============================================
// 11. 状态机转换
// ============================================

/**
 * 状态转换核心函数
 * @param {string} newState
 */
function transitionTo(newState) {
  const prevState = gameState.state;
  gameState.state = newState;

  switch (newState) {
    case GameState.PLAYING:
      enterPlayingState(prevState);
      break;
    case GameState.PAUSED:
      enterPausedState();
      break;
    case GameState.WON:
      enterWonState();
      break;
    case GameState.LOST:
      enterLostState();
      break;
    case GameState.IDLE:
      enterIdleState();
      break;
  }
}

/**
 * 进入 PLAYING 状态
 * @param {string} prevState
 */
function enterPlayingState(prevState) {
  toggleOverlay(dom.pauseOverlay, false);

  if (prevState === GameState.IDLE || prevState === GameState.WON || prevState === GameState.LOST) {
    // 新游戏：生成卡牌、重置数据
    resetGameData();
    gameState.cards = generateCards();
    renderGameBoard();
    switchScreen('game');
  }

  // 暂停恢复或新游戏都启动计时器
  startTimer();
  if (gameState.timedMode) {
    startCountdown();
  }

  updateScoreBoard();
}

/**
 * 进入 PAUSED 状态
 */
function enterPausedState() {
  stopTimer();
  stopCountdown();
  lockAllCards(true);
  toggleOverlay(dom.pauseOverlay, true);
}

/**
 * 进入 WON 状态
 */
function enterWonState() {
  stopTimer();
  stopCountdown();
  lockAllCards(true);

  const finalScore = calculateScore();
  saveHighScore(finalScore);
  saveBestTime(gameState.elapsedSeconds);
  savePreferences();

  // 延迟播放胜利音效和显示胜利遮罩
  setTimeout(() => {
    playSound('victory');
  }, 300);

  setTimeout(() => {
    dom.winScore.textContent = finalScore;
    dom.winTime.textContent = formatTime(gameState.elapsedSeconds);
    dom.winErrors.textContent = gameState.errors;
    dom.winMultiplier.textContent = `${DIFFICULTY_CONFIG[gameState.difficulty].multiplier}x`;
    toggleOverlay(dom.winOverlay, true);
  }, 1500);
}

/**
 * 进入 LOST 状态
 */
function enterLostState() {
  stopTimer();
  stopCountdown();
  lockAllCards(true);

  savePreferences();

  // 延迟播放失败音效和显示失败遮罩
  setTimeout(() => {
    playSound('gameover');
  }, 200);

  setTimeout(() => {
    dom.loseMatches.textContent = gameState.matchedPairs;
    dom.loseTime.textContent = formatTime(gameState.elapsedSeconds);
    dom.loseErrors.textContent = gameState.errors;
    toggleOverlay(dom.loseOverlay, true);
  }, 1000);
}

/**
 * 进入 IDLE 状态
 */
function enterIdleState() {
  stopTimer();
  stopCountdown();
  toggleOverlay(dom.pauseOverlay, false);
  toggleOverlay(dom.winOverlay, false);
  toggleOverlay(dom.loseOverlay, false);
  dom.gameBoard.innerHTML = '';
  switchScreen('start');
  updateHistoryDisplay();
}

/**
 * 重置游戏数据
 */
function resetGameData() {
  gameState.cards = [];
  gameState.flippedCards = [];
  gameState.matchedPairs = 0;
  gameState.errors = 0;
  gameState.elapsedSeconds = 0;
  gameState.countdownSeconds = 0;
  gameState.isAnimating = false;
}

/**
 * 锁定/解锁所有卡牌
 * @param {boolean} lock
 */
function lockAllCards(lock) {
  const cards = dom.gameBoard.querySelectorAll('.card');
  cards.forEach((cardEl) => {
    cardEl.classList.toggle('locked', lock);
  });
}

// ============================================
// 12. 事件绑定
// ============================================

/**
 * 绑定所有事件监听器
 */
function bindEvents() {
  // 难度选择
  dom.difficultyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('button');
      gameState.difficulty = btn.dataset.difficulty;
      updateDifficultyUI();
      savePreferences();
    });
  });

  // 限时模式开关
  dom.timedModeToggle.addEventListener('change', (e) => {
    gameState.timedMode = e.target.checked;
  });

  // 主题切换
  dom.themeToggle.addEventListener('click', () => {
    playSound('button');
    gameState.theme = gameState.theme === 'light' ? 'dark' : 'light';
    updateThemeUI();
    savePreferences();
  });

  // 卡牌主题选择
  dom.cardThemeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('button');
      gameState.cardTheme = btn.dataset.cardTheme;
      updateCardThemeUI();
      savePreferences();
    });
  });

  // 音效开关
  if (dom.soundToggle) {
    dom.soundToggle.addEventListener('change', (e) => {
      gameState.soundEnabled = e.target.checked;
      savePreferences();
    });
  }

  // 开始游戏
  dom.startBtn.addEventListener('click', () => {
    if (gameState.isAnimating) return;
    playSound('button');
    initAudioContext();
    transitionTo(GameState.PLAYING);
  });

  // 暂停
  dom.pauseBtn.addEventListener('click', () => {
    if (gameState.state === GameState.PLAYING) {
      playSound('button');
      transitionTo(GameState.PAUSED);
    }
  });

  // 继续游戏
  dom.resumeBtn.addEventListener('click', () => {
    if (gameState.state === GameState.PAUSED) {
      playSound('button');
      lockAllCards(false);
      // 恢复已匹配卡牌的锁定
      gameState.cards.forEach((card) => {
        if (card.matched) {
          const el = getCardElement(card.id);
          if (el) el.classList.add('locked');
        }
      });
      transitionTo(GameState.PLAYING);
    }
  });

  // 重新开始（游戏内）
  dom.restartBtn.addEventListener('click', () => {
    if (gameState.isAnimating) return;
    playSound('button');
    stopTimer();
    stopCountdown();
    resetGameData();
    gameState.cards = generateCards();
    renderGameBoard();
    transitionTo(GameState.PLAYING);
  });

  // 重新开始（暂停遮罩）
  dom.pauseRestartBtn.addEventListener('click', () => {
    if (gameState.isAnimating) return;
    playSound('button');
    toggleOverlay(dom.pauseOverlay, false);
    stopTimer();
    stopCountdown();
    resetGameData();
    gameState.cards = generateCards();
    renderGameBoard();
    transitionTo(GameState.PLAYING);
  });

  // 返回菜单
  dom.menuBtn.addEventListener('click', () => {
    playSound('button');
    transitionTo(GameState.IDLE);
  });

  // 胜利后再玩一次
  dom.winReplayBtn.addEventListener('click', () => {
    if (gameState.isAnimating) return;
    playSound('button');
    toggleOverlay(dom.winOverlay, false);
    transitionTo(GameState.PLAYING);
  });

  // 胜利后返回菜单
  dom.winMenuBtn.addEventListener('click', () => {
    playSound('button');
    transitionTo(GameState.IDLE);
  });

  // 失败后再玩一次
  dom.loseReplayBtn.addEventListener('click', () => {
    if (gameState.isAnimating) return;
    playSound('button');
    toggleOverlay(dom.loseOverlay, false);
    transitionTo(GameState.PLAYING);
  });

  // 失败后返回菜单
  dom.loseMenuBtn.addEventListener('click', () => {
    playSound('button');
    transitionTo(GameState.IDLE);
  });
}

// ============================================
// 13. 初始化
// ============================================

/**
 * 游戏初始化
 */
function init() {
  loadSaveData();
  updateDifficultyUI();
  updateThemeUI();
  updateCardThemeUI();
  updateSoundUI();
  updateHistoryDisplay();
  dom.timedModeToggle.checked = gameState.timedMode;
  bindEvents();

  console.log('记忆翻牌游戏初始化完成');
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
