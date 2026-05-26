/**
 * Memory Match Game - Vanilla JS
 * Features: state machine, scoring, themes, sound effects, localStorage persistence
 */

// =========================
// Constants & Config
// =========================
const LS_KEYS = {
  highScore: 'mmg_high_score',
  bestTime: 'mmg_best_time',
  theme: 'mmg_last_theme',
  difficulty: 'mmg_last_difficulty',
  cardTheme: 'mmg_last_card_theme',
};

const GAME_STATES = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  WON: 'WON',
  LOST: 'LOST',
};

const THEMES = {
  pets: [
    { type: 'emoji', value: '🐶' },
    { type: 'emoji', value: '🐱' },
    { type: 'emoji', value: '🐰' },
    { type: 'emoji', value: '🦊' },
    { type: 'emoji', value: '🐼' },
    { type: 'emoji', value: '🐨' },
    { type: 'emoji', value: '🐯' },
    { type: 'emoji', value: '🦁' },
    { type: 'emoji', value: '🐷' },
    { type: 'emoji', value: '🐸' },
    { type: 'emoji', value: '🐙' },
    { type: 'emoji', value: '🦄' },
  ],
  geo: [
    { type: 'svg-circle', color: '#ef4444' },
    { type: 'svg-square', color: '#3b82f6' },
    { type: 'svg-triangle', color: '#22c55e' },
    { type: 'svg-diamond', color: '#a855f7' },
    { type: 'svg-star', color: '#f59e0b' },
    { type: 'svg-hexagon', color: '#06b6d4' },
    { type: 'svg-heart', color: '#ec4899' },
    { type: 'svg-moon', color: '#6366f1' },
    { type: 'svg-cross', color: '#14b8a6' },
    { type: 'svg-bolt', color: '#eab308' },
    { type: 'svg-spiral', color: '#f97316' },
    { type: 'svg-ring', color: '#8b5cf6' },
  ],
};

// =========================
// State
// =========================
let state = {
  status: GAME_STATES.IDLE,
  cards: [],
  flipped: [],
  matchedCount: 0,
  errors: 0,
  score: 0,
  startTime: 0,
  elapsed: 0,
  timerId: null,
  timeLimit: 0,
  difficultyMultiplier: 1.0,
  cols: 4,
  rows: 3,
  pairs: 6,
  isAnimating: false,
  soundEnabled: true,
  timerEnabled: true,
  cardTheme: 'pets',
  difficulty: 'easy',
};

let audioCtx = null;
let bgmAudio = null;
let bgmPlaying = false;

// =========================
// DOM refs
// =========================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const els = {
  body: document.body,
  screenMenu: $('#screen-menu'),
  screenGame: $('#screen-game'),
  board: $('#board'),
  floatLayer: $('#float-layer'),
  hudMatches: $('#hud-matches'),
  hudErrors: $('#hud-errors'),
  hudScore: $('#hud-score'),
  hudTimer: $('#hud-timer'),
  overlayPause: $('#overlay-pause'),
  overlayWon: $('#overlay-won'),
  overlayLost: $('#overlay-lost'),
  previewHighScore: $('#preview-high-score'),
  previewBestTime: $('#preview-best-time'),
  btnTheme: $('#btn-theme'),
  btnBgm: $('#btn-bgm'),
  btnPause: $('#btn-pause'),
  btnRestart: $('#btn-restart'),
  btnMenu: $('#btn-menu'),
  btnResume: $('#btn-resume'),
  btnRestartPause: $('#btn-restart-pause'),
  btnMenuPause: $('#btn-menu-pause'),
  btnPlayAgain: $('#btn-play-again'),
  btnMenuWon: $('#btn-menu-won'),
  btnRetry: $('#btn-retry'),
  btnMenuLost: $('#btn-menu-lost'),
  optTimer: $('#opt-timer'),
  optSound: $('#opt-sound'),
};

// =========================
// localStorage helpers
// =========================
function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch (e) {
    console.warn('localStorage read error', key, e);
    return fallback;
  }
}
function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write error', key, e);
  }
}

// =========================
// Audio (Web Audio API + HTML5 BGM)
// =========================
function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch((e) => console.warn('Audio resume failed', e));
  }
}

function playTone({ freq = 440, type = 'sine', duration = 0.15, volume = 0.12 }) {
  if (!state.soundEnabled) return;
  ensureAudioContext();
  const t0 = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + duration);
}

function sfxFlip() {
  playTone({ freq: 520, type: 'sine', duration: 0.1, volume: 0.1 });
}
function sfxMatch() {
  playTone({ freq: 784, type: 'sine', duration: 0.18, volume: 0.12 });
  setTimeout(() => playTone({ freq: 988, type: 'sine', duration: 0.22, volume: 0.12 }), 120);
}
function sfxMismatch() {
  playTone({ freq: 220, type: 'sawtooth', duration: 0.25, volume: 0.08 });
}
function sfxWin() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => setTimeout(() => playTone({ freq: f, type: 'sine', duration: 0.3, volume: 0.12 }), i * 120));
}
function sfxLose() {
  const notes = [440, 370, 311, 247];
  notes.forEach((f, i) => setTimeout(() => playTone({ freq: f, type: 'triangle', duration: 0.35, volume: 0.1 }), i * 180));
}

function toggleBgm() {
  if (!bgmAudio) bgmAudio = $('#audio-bgm');
  if (!bgmAudio) return;
  if (bgmPlaying) {
    bgmAudio.pause();
    bgmPlaying = false;
    els.btnBgm.textContent = '🔇';
  } else {
    bgmAudio.volume = 0.25;
    bgmAudio.play().then(() => {
      bgmPlaying = true;
      els.btnBgm.textContent = '🔊';
    }).catch((e) => {
      console.warn('BGM play failed', e);
      bgmPlaying = false;
      els.btnBgm.textContent = '🔇';
    });
  }
}

// =========================
// Theme
// =========================
function applyTheme(theme) {
  els.body.setAttribute('data-theme', theme);
  lsSet(LS_KEYS.theme, theme);
  els.btnTheme.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  const next = els.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}
function loadTheme() {
  const saved = lsGet(LS_KEYS.theme, 'light');
  applyTheme(saved);
}

// =========================
// Card content builder
// =========================
function buildCardContent(item) {
  if (item.type === 'emoji') {
    return `<div class="card-content"><span class="card-emoji">${item.value}</span></div>`;
  }
  // SVG shapes for geo theme
  const color = item.color || '#6366f1';
  const size = '100%';
  const view = '0 0 100 100';
  let shape = '';
  switch (item.type) {
    case 'svg-circle':
      shape = `<circle cx="50" cy="50" r="36" fill="${color}" />`;
      break;
    case 'svg-square':
      shape = `<rect x="18" y="18" width="64" height="64" rx="10" fill="${color}" />`;
      break;
    case 'svg-triangle':
      shape = `<polygon points="50,14 86,78 14,78" fill="${color}" />`;
      break;
    case 'svg-diamond':
      shape = `<polygon points="50,12 88,50 50,88 12,50" fill="${color}" />`;
      break;
    case 'svg-star':
      shape = `<polygon points="50,10 61,35 88,38 68,57 74,84 50,71 26,84 32,57 12,38 39,35" fill="${color}" />`;
      break;
    case 'svg-hexagon':
      shape = `<polygon points="50,10 85,28 85,72 50,90 15,72 15,28" fill="${color}" />`;
      break;
    case 'svg-heart':
      shape = `<path d="M50 85 C20 60 5 45 5 30 A18 18 0 0 1 32 18 C40 18 46 24 50 30 C54 24 60 18 68 18 A18 18 0 0 1 95 30 C95 45 80 60 50 85Z" fill="${color}" />`;
      break;
    case 'svg-moon':
      shape = `<path d="M65 10 A36 36 0 1 0 65 82 A28 28 0 1 1 65 10Z" fill="${color}" />`;
      break;
    case 'svg-cross':
      shape = `<path d="M38 10 h24 v28 h28 v24 h-28 v28 h-24 v-28 h-28 v-24 h28 z" fill="${color}" />`;
      break;
    case 'svg-bolt':
      shape = `<polygon points="55,10 30,50 48,50 38,90 70,48 52,48" fill="${color}" />`;
      break;
    case 'svg-spiral':
      shape = `<path d="M50 50 m0 -30 a30 30 0 1 1 0 60 a24 24 0 1 0 0 -48 a18 18 0 1 1 0 36 a12 12 0 1 0 0 -24" stroke="${color}" stroke-width="8" fill="none" stroke-linecap="round" />`;
      break;
    case 'svg-ring':
      shape = `<circle cx="50" cy="50" r="30" stroke="${color}" stroke-width="12" fill="none" />`;
      break;
    default:
      shape = `<circle cx="50" cy="50" r="36" fill="${color}" />`;
  }
  return `<div class="card-content"><svg class="card-geo" viewBox="${view}">${shape}</svg></div>`;
}

// =========================
// Game logic
// =========================
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function computeScore() {
  const timeBase = 120;
  const timeCoeff = 2;
  const raw = (state.matchedCount * 100) + Math.max(0, timeBase - state.elapsed) * timeCoeff - (state.errors * 10);
  return Math.max(0, Math.round(raw * state.difficultyMultiplier));
}

function updateHUD() {
  els.hudMatches.textContent = String(state.matchedCount);
  els.hudErrors.textContent = String(state.errors);
  state.score = computeScore();
  els.hudScore.textContent = String(state.score);

  if (state.timerEnabled && state.timeLimit > 0) {
    const remaining = Math.max(0, state.timeLimit - state.elapsed);
    els.hudTimer.textContent = formatTime(remaining);
    if (remaining <= 10) {
      els.hudTimer.classList.add('warn');
    } else {
      els.hudTimer.classList.remove('warn');
    }
  } else {
    els.hudTimer.textContent = formatTime(state.elapsed);
    els.hudTimer.classList.remove('warn');
  }
}

function startTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    if (state.status !== GAME_STATES.PLAYING) return;
    state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    updateHUD();
    if (state.timerEnabled && state.timeLimit > 0 && state.elapsed >= state.timeLimit) {
      endGame(false);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function saveStats() {
  const prevHigh = lsGet(LS_KEYS.highScore, 0);
  if (state.score > prevHigh) lsSet(LS_KEYS.highScore, state.score);

  const prevBest = lsGet(LS_KEYS.bestTime, null);
  if (state.status === GAME_STATES.WON) {
    if (prevBest === null || state.elapsed < prevBest) {
      lsSet(LS_KEYS.bestTime, state.elapsed);
    }
  }
}

function loadMenuStats() {
  const hs = lsGet(LS_KEYS.highScore, 0);
  const bt = lsGet(LS_KEYS.bestTime, null);
  els.previewHighScore.textContent = String(hs);
  els.previewBestTime.textContent = bt === null ? '--' : formatTime(bt);
}

function showFloatScore(text, x, y) {
  const el = document.createElement('div');
  el.className = 'float-text';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  els.floatLayer.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

// =========================
// State machine transitions
// =========================
function switchScreen(name) {
  if (name === 'menu') {
    els.screenMenu.classList.remove('hidden');
    els.screenGame.classList.add('hidden');
  } else if (name === 'game') {
    els.screenMenu.classList.add('hidden');
    els.screenGame.classList.remove('hidden');
  }
}

function openOverlay(name) {
  if (name === 'pause') els.overlayPause.classList.remove('hidden');
  if (name === 'won') els.overlayWon.classList.remove('hidden');
  if (name === 'lost') els.overlayLost.classList.remove('hidden');
}

function closeOverlays() {
  els.overlayPause.classList.add('hidden');
  els.overlayWon.classList.add('hidden');
  els.overlayLost.classList.add('hidden');
}

function setStatus(next) {
  state.status = next;
}

// =========================
// Board builder
// =========================
function buildBoard() {
  const themeItems = THEMES[state.cardTheme];
  const selected = themeItems.slice(0, state.pairs);
  const deck = shuffle([...selected, ...selected]);

  state.cards = deck.map((item, index) => ({ index, item, matched: false }));
  state.flipped = [];
  state.matchedCount = 0;
  state.errors = 0;
  state.score = 0;
  state.elapsed = 0;
  state.isAnimating = false;

  // Responsive: hard mode on mobile uses 4 cols instead of 6
  const isMobile = window.innerWidth <= 640;
  const cols = (state.difficulty === 'hard' && isMobile) ? 4 : state.cols;
  const rows = (state.difficulty === 'hard' && isMobile) ? 6 : state.rows;

  els.board.innerHTML = '';
  els.board.setAttribute('data-cols', String(cols));
  els.board.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  els.board.style.maxWidth = cols === 4 ? '520px' : cols === 6 ? '720px' : '520px';

  state.cards.forEach((card) => {
    const wrap = document.createElement('div');
    wrap.className = 'card-wrap';
    wrap.dataset.index = String(card.index);

    const inner = document.createElement('div');
    inner.className = 'card';
    inner.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front">${buildCardContent(card.item)}</div>
    `;
    wrap.appendChild(inner);
    els.board.appendChild(wrap);
  });

  updateHUD();
}

function startGame(difficultyOpts) {
  closeOverlays();
  state.difficulty = difficultyOpts.diff;
  state.cols = parseInt(difficultyOpts.cols, 10);
  state.rows = parseInt(difficultyOpts.rows, 10);
  state.pairs = parseInt(difficultyOpts.pairs, 10);
  state.timeLimit = state.timerEnabled ? parseInt(difficultyOpts.time, 10) : 0;
  state.difficultyMultiplier = parseFloat(difficultyOpts.mult);

  lsSet(LS_KEYS.difficulty, state.difficulty);
  lsSet(LS_KEYS.cardTheme, state.cardTheme);

  buildBoard();
  switchScreen('game');
  setStatus(GAME_STATES.PLAYING);
  state.startTime = Date.now();
  startTimer();
}

function pauseGame() {
  if (state.status !== GAME_STATES.PLAYING) return;
  setStatus(GAME_STATES.PAUSED);
  stopTimer();
  openOverlay('pause');
}

function resumeGame() {
  if (state.status !== GAME_STATES.PAUSED) return;
  closeOverlays();
  setStatus(GAME_STATES.PLAYING);
  // Adjust start time so elapsed stays consistent
  state.startTime = Date.now() - state.elapsed * 1000;
  startTimer();
}

function restartGame() {
  stopTimer();
  closeOverlays();
  // Reuse current settings
  const diffBtn = $(`.diff-btn[data-diff="${state.difficulty}"]`);
  const opts = diffBtn ? diffBtn.dataset : { diff: 'easy', cols: '4', rows: '3', pairs: '6', time: '0', mult: '1.0' };
  startGame(opts);
}

function returnToMenu() {
  stopTimer();
  closeOverlays();
  setStatus(GAME_STATES.IDLE);
  switchScreen('menu');
  loadMenuStats();
}

function endGame(won) {
  stopTimer();
  setStatus(won ? GAME_STATES.WON : GAME_STATES.LOST);
  saveStats();

  if (won) {
    sfxWin();
    $('#res-score').textContent = String(state.score);
    $('#res-time').textContent = formatTime(state.elapsed);
    $('#res-matches').textContent = String(state.matchedCount);
    $('#res-errors').textContent = String(state.errors);
    $('#res-mult').textContent = `${state.difficultyMultiplier}×`;
    openOverlay('won');
  } else {
    sfxLose();
    $('#res-lost-score').textContent = String(state.score);
    $('#res-lost-matches').textContent = String(state.matchedCount);
    $('#res-lost-errors').textContent = String(state.errors);
    openOverlay('lost');
  }
}

// =========================
// Card interactions
// =========================
function onCardClick(index, el) {
  if (state.status !== GAME_STATES.PLAYING) return;
  if (state.isAnimating) return;
  if (state.cards[index].matched) return;
  if (state.flipped.includes(index)) return;

  // Flip
  state.flipped.push(index);
  el.querySelector('.card').classList.add('flipped');
  sfxFlip();

  if (state.flipped.length < 2) return;

  const [a, b] = state.flipped;
  const cardA = state.cards[a];
  const cardB = state.cards[b];

  state.isAnimating = true;

  if (cardA.item.value === cardB.item.value && cardA.item.type === cardB.item.type) {
    // Match
    setTimeout(() => {
      cardA.matched = true;
      cardB.matched = true;
      state.matchedCount += 1;
      state.flipped = [];

      const wrapA = $(`.card-wrap[data-index="${a}"]`);
      const wrapB = $(`.card-wrap[data-index="${b}"]`);
      if (wrapA) wrapA.querySelector('.card').classList.add('matched');
      if (wrapB) wrapB.querySelector('.card').classList.add('matched');

      sfxMatch();
      updateHUD();

      // Float score near first card
      const rect = wrapA ? wrapA.getBoundingClientRect() : null;
      if (rect) {
        const points = Math.round(100 * state.difficultyMultiplier);
        showFloatScore(`+${points}`, rect.left + rect.width / 2, rect.top);
      }

      state.isAnimating = false;

      if (state.matchedCount >= state.pairs) {
        setTimeout(() => endGame(true), 400);
      }
    }, 400);
  } else {
    // Mismatch
    setTimeout(() => {
      state.errors += 1;
      updateHUD();
      sfxMismatch();

      const wrapA = $(`.card-wrap[data-index="${a}"]`);
      const wrapB = $(`.card-wrap[data-index="${b}"]`);
      if (wrapA) wrapA.querySelector('.card').classList.add('shake');
      if (wrapB) wrapB.querySelector('.card').classList.add('shake');

      // Keep visible briefly, then flip back
      setTimeout(() => {
        if (wrapA) {
          wrapA.querySelector('.card').classList.remove('flipped', 'shake');
        }
        if (wrapB) {
          wrapB.querySelector('.card').classList.remove('flipped', 'shake');
        }
        state.flipped = [];
        state.isAnimating = false;
      }, 800);
    }, 400);
  }
}

// =========================
// Event bindings
// =========================
function bindEvents() {
  // Difficulty buttons
  $$('.diff-btn').forEach((btn) => {
    btn.addEventListener('click', () => startGame(btn.dataset));
  });

  // Theme chips
  $$('.theme-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('.theme-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      state.cardTheme = chip.dataset.theme;
      lsSet(LS_KEYS.cardTheme, state.cardTheme);
    });
  });

  // Toggles
  els.optTimer.addEventListener('change', () => {
    state.timerEnabled = els.optTimer.checked;
  });
  els.optSound.addEventListener('change', () => {
    state.soundEnabled = els.optSound.checked;
  });

  // Top bar
  els.btnTheme.addEventListener('click', toggleTheme);
  els.btnBgm.addEventListener('click', toggleBgm);

  // HUD
  els.btnPause.addEventListener('click', pauseGame);
  els.btnRestart.addEventListener('click', restartGame);
  els.btnMenu.addEventListener('click', returnToMenu);

  // Overlays
  els.btnResume.addEventListener('click', resumeGame);
  els.btnRestartPause.addEventListener('click', restartGame);
  els.btnMenuPause.addEventListener('click', returnToMenu);
  els.btnPlayAgain.addEventListener('click', restartGame);
  els.btnMenuWon.addEventListener('click', returnToMenu);
  els.btnRetry.addEventListener('click', restartGame);
  els.btnMenuLost.addEventListener('click', returnToMenu);

  // Board delegation
  els.board.addEventListener('click', (e) => {
    const wrap = e.target.closest('.card-wrap');
    if (!wrap) return;
    const idx = parseInt(wrap.dataset.index, 10);
    if (Number.isNaN(idx)) return;
    onCardClick(idx, wrap);
  });

  // Touch support: fast tap without double-tap zoom
  els.board.addEventListener('touchend', (e) => {
    const wrap = e.target.closest('.card-wrap');
    if (!wrap) return;
    e.preventDefault();
    const idx = parseInt(wrap.dataset.index, 10);
    if (Number.isNaN(idx)) return;
    onCardClick(idx, wrap);
  }, { passive: false });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.status === GAME_STATES.PLAYING) pauseGame();
      else if (state.status === GAME_STATES.PAUSED) resumeGame();
    }
  });

  // Visibility change: auto-pause
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.status === GAME_STATES.PLAYING) {
      pauseGame();
    }
  });
}

// =========================
// Init
// =========================
function init() {
  loadTheme();
  state.cardTheme = lsGet(LS_KEYS.cardTheme, 'pets');
  state.difficulty = lsGet(LS_KEYS.difficulty, 'easy');

  // Restore UI selections
  $$('.theme-chip').forEach((c) => c.classList.toggle('active', c.dataset.theme === state.cardTheme));

  const savedDiff = lsGet(LS_KEYS.difficulty, null);
  if (savedDiff) {
    // Nothing visual to highlight on menu for now
  }

  loadMenuStats();
  bindEvents();
}

init();
