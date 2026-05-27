/**
 * 音效数据与播放配置
 * @module soundEffects
 */

/**
 * 获取音效配置
 * @param {AudioContext} audioContext
 * @param {number} now
 * @returns {Object} 音效配置对象
 */
export function getSoundConfig(audioContext, now) {
  return {
    flip: {
      oscillator: { type: 'sine', frequency: [[800, now], [400, now + 0.15]] },
      gain: { initial: 0.15, ramp: [0.01, now + 0.15] },
      duration: 0.15,
    },
    match: {
      oscillator: { type: 'sine', frequency: [[523.25, now], [659.25, now + 0.1], [783.99, now + 0.2]] },
      gain: { initial: 0.2, ramp: [0.01, now + 0.3] },
      duration: 0.3,
    },
    mismatch: {
      oscillator: { type: 'triangle', frequency: [[392, now], [196, now + 0.25]] },
      gain: { initial: 0.1, ramp: [0.01, now + 0.25] },
      duration: 0.25,
    },
    gameover: {
      oscillator: { type: 'sawtooth', frequency: [[300, now], [150, now + 0.8]] },
      gain: { initial: 0.12, ramp: [0.01, now + 0.8] },
      duration: 0.8,
    },
    button: {
      oscillator: { type: 'sine', frequency: [[600, now]] },
      gain: { initial: 0.08, ramp: [0.01, now + 0.08] },
      duration: 0.08,
    },
  };
}

/**
 * 播放胜利旋律
 * @param {AudioContext} audioContext
 * @param {number} startTime
 */
export function playVictoryMelody(audioContext, startTime) {
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
