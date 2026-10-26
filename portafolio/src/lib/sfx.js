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
