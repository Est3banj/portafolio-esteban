const STORAGE_KEY = "sfx-muted";

let ctx = null;
let muted = readStored();

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export const isMuted = () => muted;

export const setMuted = (value) => {
  muted = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    /* storage unavailable — mute only lasts this session */
  }
};

export const toggleMuted = () => {
  setMuted(!muted);
  return muted;
};

const ensureCtx = () => {
  if (!ctx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

/* call inside a user gesture: resume + report whether keystrokes can play.
   may stay pending if the browser refuses to resume — race it with a timeout */
export const ensureAudioRunning = async () => {
  try {
    const ac = ensureCtx();
    if (!ac) return false;
    if (ac.state !== "running") await ac.resume();
    return ac.state === "running";
  } catch {
    return false;
  }
};

const voice = (ac, t0, { type, from, to, peak, dur }) => {
  const osc = ac.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t0);
  osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
};

export const playBloop = () => {
  if (muted) return;
  try {
    const ac = ensureCtx();
    if (!ac) return;
    const t0 = ac.currentTime;
    voice(ac, t0, { type: "sine", from: 500, to: 300, peak: 0.12, dur: 0.18 });
    voice(ac, t0, { type: "triangle", from: 1000, to: 600, peak: 0.06, dur: 0.16 });
  } catch {
    /* audio is decorative — never break the UI */
  }
};

export const playKeystroke = () => {
  if (muted) return;
  try {
    const ac = ensureCtx();
    /* suspended (no gesture yet) — skip silently, never block the UI */
    if (!ac || ac.state !== "running") return;
    const t0 = ac.currentTime;
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(3400, t0);
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(0.07, t0 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.035);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + 0.05);
  } catch {
    /* audio is decorative — never break the UI */
  }
};

/* autoplay-policy unlock: one-time gesture listener, kept for document lifetime */
const unlockAudio = () => {
  document.removeEventListener("pointerdown", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
  try {
    ensureCtx();
  } catch {
    /* audio is decorative — never break the UI */
  }
};

document.addEventListener("pointerdown", unlockAudio, { passive: true });
document.addEventListener("keydown", unlockAudio, { passive: true });
