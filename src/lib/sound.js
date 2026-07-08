let ctx = null;
let lastPlayed = 0;
const COOLDOWN_MS = 40;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return ctx;
}

export function primeClackAudio() {
  const audioCtx = getCtx();
  if (audioCtx.state === "running") return;
  audioCtx.resume().catch(() => {
    // Browser may reject if no user gesture yet — that's ok, playClack will retry
  });
}

export async function playClack() {
  const now = Date.now();
  if (now - lastPlayed < COOLDOWN_MS) return;
  lastPlayed = now;

  const audioCtx = getCtx();
  if (audioCtx.state !== "running") {
    try {
      await audioCtx.resume();
    } catch {
      return;
    }
  }

  const t = audioCtx.currentTime;

  // --- High click transient: filtered noise burst ---
  const clickDuration = 0.025;
  const sampleRate = audioCtx.sampleRate;
  const clickBuffer = audioCtx.createBuffer(1, Math.floor(sampleRate * clickDuration), sampleRate);
  const clickData = clickBuffer.getChannelData(0);
  for (let i = 0; i < clickData.length; i++) {
    const decay = Math.exp((-i / clickData.length) * 24);
    clickData[i] = (Math.random() * 2 - 1) * decay;
  }

  const clickSource = audioCtx.createBufferSource();
  clickSource.buffer = clickBuffer;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 4200;
  bandpass.Q.value = 1.2;

  const clickGain = audioCtx.createGain();
  clickGain.gain.setValueAtTime(0.0875, t);
  clickGain.gain.exponentialRampToValueAtTime(0.001, t + clickDuration);

  clickSource.connect(bandpass);
  bandpass.connect(clickGain);
  clickGain.connect(audioCtx.destination);
  clickSource.start(t);

  // --- Low thump: brief pitched oscillator ---
  const osc = audioCtx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.04);

  const thumpGain = audioCtx.createGain();
  thumpGain.gain.setValueAtTime(0.03, t);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

  osc.connect(thumpGain);
  thumpGain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.06);
}