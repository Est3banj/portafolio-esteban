import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import buddySheet from "../assets/pixel-buddy.png";
import { ensureAudioRunning, playBloop, playKeystroke } from "../lib/sfx";

const FRAME = 32;
const FPS = { idle: 6, walk: 10, wave: 8 };
const MOVE_MS = 100;
const SCROLL_MS = 150;
const SCROLL_IDLE_MS = 400;
const BURST_MS = 260;
const BURST_DIST = 120;
const BUBBLE_MS = 2800;
const BUBBLE_EDGE_GAP = 8;
const BUBBLE_TOP_GAP = 14;
const BUBBLE_TOP_MIN = 8;
const GREET_MS = 1400;
const GREET_DEADLINE_MS = 3000;
const AUDIO_WAIT_MS = 50;
const GREETING = "¡Hola! Bienvenido a mi espacio";
const TYPE_MS = 35;
const SECTION_DELAY_MS = 600;
const EMBER_MAX = 14;
const EMBER_COLORS = ["#ff4d4d", "#ff8a3d", "#ffd24a", "#dc2626"];
const EMBER_WEIGHTS = [0.25, 0.35, 0.25, 0.15];
const EMBER_IDLE_LO = 450;
const EMBER_IDLE_HI = 750;
const EMBER_IDLE_MAX = 7;
const EMBER_WALK_LO = 110;
const EMBER_WALK_HI = 180;
const EMBER_WALK_MAX = 14;
const EMBER_WALK_BURST = 3;

const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);

const SECTION_IDS = ["inicio", "sobre-mi", "proyectos", "contacto"];

const SECTION_MESSAGES = {
  inicio: {
    auto: "Hola, haz clic para hablar",
    clicks: [
      "Desarrollo a medida",
      "Frontend y backend limpio",
      "Arquitectura bien pensada",
    ],
  },
  "sobre-mi": {
    auto: "Mi trayectoria técnica",
    clicks: [
      "Formación SENA y UNAD",
      "Certificado en OpenAI",
      "Especializado en agentes IA",
    ],
  },
  proyectos: {
    auto: "Sistemas en producción",
    clicks: [
      "Caso real GIO TECH",
      "Despliegues en vivo",
      "Código propio escalable",
    ],
  },
  contacto: {
    auto: "Iniciemos un proyecto",
    clicks: [
      "Respuesta rápida por WhatsApp",
      "Mensajes directo a mi email",
      "Disponible para proyectos",
    ],
  },
};

const FALLBACK_PHRASES = ["Puro píxel, cero plantilla", "¿Hablamos de tu idea?"];

const sectionFlag = (id) => `buddy-sec-${id}`;

const sectionShown = (id) => {
  try {
    return sessionStorage.getItem(sectionFlag(id)) === "1";
  } catch {
    return false;
  }
};

const markSectionShown = (id) => {
  try {
    sessionStorage.setItem(sectionFlag(id), "1");
  } catch {
    /* storage unavailable — auto message only lasts this mount */
  }
};

export default function PixelBuddy() {
  const canvasRef = useRef(null);
  const waveRef = useRef(null);
  const clickIdx = useRef({});
  const bubbleTimer = useRef(0);
  const greetTimer = useRef(0);
  const greetDeadline = useRef(0);
  const greetArm = useRef(null);
  const greetPhase = useRef("idle");
  const autoTimer = useRef(0);
  const typeTimer = useRef(0);
  const activeSectionId = useRef("inicio");
  const bubbleRef = useRef(null);
  const [phrase, setPhrase] = useState("");
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [beside, setBeside] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const S = {
      state: "idle",
      frame: 0,
      facing: 1,
      nextAt: 0,
      walkUntil: -Infinity,
      scrollAt: -Infinity,
      cx: 0,
      reduced: false,
      loaded: false,
      dirty: true,
      cssW: 96,
      dpr: 1,
      aliveCount: 0,
      nextEmit: 0,
      prevNow: 0,
    };

    const pool = Array.from({ length: EMBER_MAX }, () => ({
      alive: false,
      baseX: 0,
      y: 0,
      amp: 0,
      phase: 0,
      freq: 0,
      vy: 0,
      age: 0,
      maxAge: 1,
      size: 3,
      color: EMBER_COLORS[0],
    }));

    const clearPool = () => {
      for (const p of pool) p.alive = false;
      S.aliveCount = 0;
    };

    const pickEmberColor = () => {
      let r = Math.random();
      for (let i = 0; i < EMBER_COLORS.length; i += 1) {
        r -= EMBER_WEIGHTS[i];
        if (r <= 0) return EMBER_COLORS[i];
      }
      return EMBER_COLORS[0];
    };

    const spawnEmbers = (count) => {
      if (S.reduced || !S.loaded) return;
      const cssW = S.cssW;
      for (let n = 0; n < count; n += 1) {
        let p = null;
        for (let i = 0; i < EMBER_MAX; i += 1) {
          if (!pool[i].alive) {
            p = pool[i];
            break;
          }
        }
        if (!p) return;
        p.alive = true;
        p.baseX = (0.2 + Math.random() * 0.6) * cssW;
        p.y = (0.45 + Math.random() * 0.3) * cssW;
        p.amp = 2 + Math.random() * 2;
        p.phase = Math.random() * Math.PI * 2;
        p.freq = 2 + Math.random() * 2;
        p.vy = -(12 + Math.random() * 8);
        p.age = 0;
        p.maxAge = 0.7 + Math.random() * 0.4;
        p.size = cssW < 768 ? 2 + Math.random() : 2 + Math.random() * 2;
        p.color = pickEmberColor();
      }
    };

    const scheduleEmit = (now) => {
      const walking = S.state === "walk";
      const lo = walking ? EMBER_WALK_LO : EMBER_IDLE_LO;
      const hi = walking ? EMBER_WALK_HI : EMBER_IDLE_HI;
      S.nextEmit = now + lo + Math.random() * (hi - lo);
    };

    const updateEmbers = (dt) => {
      for (const p of pool) {
        if (!p.alive) continue;
        p.age += dt;
        if (p.age >= p.maxAge) {
          p.alive = false;
          continue;
        }
        p.y += p.vy * dt;
      }
    };

    const countAlive = () => {
      let n = 0;
      for (const p of pool) if (p.alive) n += 1;
      return n;
    };

    const img = new Image();
    let raf = 0;

    const layout = () => {
      const cssW = window.innerWidth < 768 ? 64 : 96;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      S.cssW = cssW;
      S.dpr = dpr;
      canvas.width = cssW * dpr;
      canvas.height = cssW * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssW}px`;
      ctx.imageSmoothingEnabled = false;
      const rect = canvas.getBoundingClientRect();
      S.cx = rect.left + rect.width / 2;
      S.nextAt = performance.now() + 1000 / FPS.idle;
      clearPool();
      S.nextEmit = performance.now() + EMBER_IDLE_LO;
      S.dirty = true;
    };

    const draw = () => {
      const size = canvas.width;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const row = S.state === "walk" ? 1 : S.state === "wave" ? 2 : 0;
      if (S.facing === -1) {
        ctx.translate(size, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        img,
        S.frame * FRAME,
        row * FRAME,
        FRAME,
        FRAME,
        0,
        0,
        size,
        size,
      );
      if (S.aliveCount > 0) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const dpr = S.dpr;
        for (const p of pool) {
          if (!p.alive) continue;
          const t = p.age / p.maxAge;
          const alpha = 0.9 * Math.sin(Math.PI * t);
          if (alpha <= 0) continue;
          const x = Math.round(
            (p.baseX + Math.sin(p.age * p.freq + p.phase) * p.amp) * dpr,
          );
          const y = Math.round(p.y * dpr);
          const cssSize = t > 0.65 ? Math.max(1, p.size - 1) : p.size;
          const px = Math.max(1, Math.round(cssSize * dpr));
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(x, y, px, px);
        }
        ctx.globalAlpha = 1;
      }
      S.dirty = false;
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!S.loaded || document.hidden) return;

      const hadParticles = S.aliveCount > 0;

      if (!S.reduced) {
        if (
          S.state === "walk" &&
          now >= S.walkUntil &&
          now - S.scrollAt > SCROLL_IDLE_MS
        ) {
          S.state = "idle";
          S.dirty = true;
        }
        if (now >= S.nextAt) {
          S.nextAt = now + 1000 / FPS[S.state];
          if (S.state === "wave") {
            S.frame += 1;
            if (S.frame > 3) {
              S.frame = 0;
              S.state =
                now < S.walkUntil || now - S.scrollAt <= SCROLL_IDLE_MS
                  ? "walk"
                  : "idle";
            }
          } else {
            S.frame = (S.frame + 1) & 3;
          }
          S.dirty = true;
        }

        const dt = S.prevNow
          ? Math.min((now - S.prevNow) / 1000, 0.05)
          : 0;
        S.prevNow = now;
        if (hadParticles) updateEmbers(dt);

        const walking = S.state === "walk";
        const cap = walking ? EMBER_WALK_MAX : EMBER_IDLE_MAX;
        if (now >= S.nextEmit && countAlive() < cap) {
          spawnEmbers(1);
          scheduleEmit(now);
        }
        S.aliveCount = countAlive();
      }

      if (S.dirty || hadParticles || S.aliveCount > 0) draw();
    };

    img.onload = () => {
      S.loaded = true;
      S.dirty = true;
    };
    img.src = buddySheet;

    let lastMoveAt = 0;
    let lastMx = -1;
    let lastMy = -1;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastMoveAt < MOVE_MS) return;
      lastMoveAt = now;
      const dx = lastMx < 0 ? 0 : e.clientX - lastMx;
      const dy = lastMy < 0 ? 0 : e.clientY - lastMy;
      lastMx = e.clientX;
      lastMy = e.clientY;
      if (S.reduced) return;
      const facing = e.clientX < S.cx ? -1 : 1;
      if (facing !== S.facing) {
        S.facing = facing;
        S.dirty = true;
      }
      if (Math.hypot(dx, dy) > BURST_DIST) {
        S.walkUntil = Math.max(S.walkUntil, now + BURST_MS);
        if (S.state === "idle") {
          S.state = "walk";
          S.dirty = true;
          spawnEmbers(EMBER_WALK_BURST);
          scheduleEmit(now);
        }
      }
    };

    let lastScrollAt = 0;
    const onScroll = () => {
      const now = performance.now();
      if (now - lastScrollAt < SCROLL_MS) return;
      lastScrollAt = now;
      if (S.reduced) return;
      S.scrollAt = now;
      if (S.state === "idle") {
        S.state = "walk";
        S.dirty = true;
        spawnEmbers(EMBER_WALK_BURST);
        scheduleEmit(now);
      }
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      S.reduced = mq.matches;
      if (S.reduced) {
        S.state = "idle";
        S.frame = 0;
        S.facing = 1;
        clearPool();
      }
      S.dirty = true;
    };
    onMq();

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        clearPool();
      } else if (!raf) {
        S.prevNow = 0;
        S.nextAt = performance.now() + 1000 / FPS[S.state];
        S.nextEmit = performance.now() + EMBER_IDLE_LO;
        raf = requestAnimationFrame(tick);
      }
    };

    waveRef.current = () => {
      if (S.reduced) return;
      const now = performance.now();
      S.state = "wave";
      S.frame = 0;
      S.nextAt = now + 1000 / FPS.wave;
      spawnEmbers(4 + Math.floor(Math.random() * 2));
      scheduleEmit(now);
      S.dirty = true;
    };

    layout();
    window.addEventListener("resize", layout);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    mq.addEventListener("change", onMq);
    if (!document.hidden) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      clearPool();
      waveRef.current = null;
      window.removeEventListener("resize", layout);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  useEffect(
    () => () => {
      clearTimeout(bubbleTimer.current);
      clearTimeout(autoTimer.current);
      clearInterval(typeTimer.current);
    },
    [],
  );

  const cancelGreeting = useCallback(() => {
    clearTimeout(greetTimer.current);
    greetTimer.current = 0;
    greetArm.current?.();
    greetArm.current = null;
    greetPhase.current = "done";
  }, []);

  const stopTyping = useCallback(() => {
    clearInterval(typeTimer.current);
    typeTimer.current = 0;
  }, []);

  const showMessage = useCallback(
    (text, { keystrokes = false } = {}) => {
      stopTyping();
      clearTimeout(bubbleTimer.current);
      setPhrase(text);
      const startHide = () => {
        bubbleTimer.current = setTimeout(() => {
          setPhrase("");
          setTyped("");
          setTyping(false);
        }, BUBBLE_MS);
      };
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!text || reduced) {
        setTyped(text);
        setTyping(false);
        if (text) startHide();
        return;
      }
      setTyped("");
      setTyping(true);
      let i = 0;
      typeTimer.current = setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (keystrokes) playKeystroke();
        if (i >= text.length) {
          stopTyping();
          setTyping(false);
          startHide();
        }
      }, TYPE_MS);
    },
    [stopTyping],
  );

  useEffect(() => {
    markSectionShown("inicio");

    const greet = (withSound) => {
      greetPhase.current = "done";
      waveRef.current?.();
      showMessage(GREETING, { keystrokes: withSound });
    };

    const armGestureWait = () => {
      if (greetPhase.current !== "settle") return;
      greetPhase.current = "waiting";
      const disarm = () => {
        clearTimeout(greetDeadline.current);
        greetDeadline.current = 0;
        document.removeEventListener("pointerdown", onGesture, true);
        document.removeEventListener("keydown", onGesture, true);
        if (greetArm.current === disarm) greetArm.current = null;
      };
      const onGesture = () => {
        disarm();
        /* resume may hang if the browser refuses — 50ms fallback, greet anyway */
        void withTimeout(ensureAudioRunning(), AUDIO_WAIT_MS).then(() => {
          if (greetPhase.current !== "waiting") return;
          greet(true);
        });
      };
      greetArm.current = disarm;
      greetDeadline.current = setTimeout(() => {
        disarm();
        if (greetPhase.current !== "waiting") return;
        greet(false);
      }, GREET_DEADLINE_MS - GREET_MS);
      document.addEventListener("pointerdown", onGesture, {
        capture: true,
        passive: true,
      });
      document.addEventListener("keydown", onGesture, {
        capture: true,
        passive: true,
      });
    };

    greetPhase.current = "settle";
    greetTimer.current = setTimeout(() => {
      greetTimer.current = 0;
      if (greetPhase.current !== "settle") return;
      void withTimeout(ensureAudioRunning(), AUDIO_WAIT_MS).then((running) => {
        if (greetPhase.current !== "settle") return;
        if (running) greet(true);
        else armGestureWait();
      });
    }, GREET_MS);

    return cancelGreeting;
  }, [showMessage, cancelGreeting]);

  useEffect(() => {
    const onSay = (event) => {
      const text = event?.detail?.phrase;
      if (!text) return;
      cancelGreeting();
      clearTimeout(autoTimer.current);
      waveRef.current?.();
      showMessage(text);
    };
    window.addEventListener("buddy:say", onSay);
    return () => window.removeEventListener("buddy:say", onSay);
  }, [showMessage, cancelGreeting]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    if (!sections.some(Boolean)) return undefined;
    let prev = activeSectionId.current;
    const io = new IntersectionObserver(
      (entries) => {
        let next = prev;
        for (const entry of entries) {
          if (entry.isIntersecting) next = entry.target.id;
        }
        if (next === prev) return;
        prev = next;
        activeSectionId.current = next;
        clearTimeout(autoTimer.current);
        const sec = SECTION_MESSAGES[next];
        if (!sec || sectionShown(next)) return;
        autoTimer.current = setTimeout(() => {
          markSectionShown(next);
          cancelGreeting();
          showMessage(sec.auto);
        }, SECTION_DELAY_MS);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((el) => el && io.observe(el));
    return () => {
      io.disconnect();
      clearTimeout(autoTimer.current);
    };
  }, [showMessage, cancelGreeting]);

  useLayoutEffect(() => {
    if (!phrase) return undefined;
    const el = bubbleRef.current;
    if (!el) return undefined;
    const measure = () => {
      const dock = el.parentElement;
      if (!dock) return;
      const dockRect = dock.getBoundingClientRect();
      const top = dockRect.top - BUBBLE_TOP_GAP - el.offsetHeight;
      setBeside(top < BUBBLE_TOP_MIN);
      const centeredRight =
        dockRect.left + dockRect.width / 2 + el.offsetWidth / 2;
      setFlipped(centeredRight > window.innerWidth - BUBBLE_EDGE_GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [phrase, typed]);

  const handleClick = useCallback(() => {
    cancelGreeting();
    clearTimeout(autoTimer.current);
    playBloop();
    const id = activeSectionId.current;
    const sec = id ? SECTION_MESSAGES[id] : undefined;
    const pool = sec ? sec.clicks : FALLBACK_PHRASES;
    const key = sec ? id : "__fallback";
    clickIdx.current[key] = ((clickIdx.current[key] ?? -1) + 1) % pool.length;
    showMessage(pool[clickIdx.current[key]]);
    waveRef.current?.();
  }, [showMessage, cancelGreeting]);

  return (
    <div className="buddy-dock">
      {phrase ? (
        <div
          ref={bubbleRef}
          role="status"
          aria-live="polite"
          className={
            beside
              ? "buddy-bubble is-beside"
              : flipped
                ? "buddy-bubble is-flipped"
                : "buddy-bubble"
          }
        >
          <span className="sr-only">{phrase}</span>
          <span aria-hidden="true">
            {typed}
            {typing ? <span className="caret">▍</span> : null}
          </span>
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Personaje pixel: click para interactuar"
        className="buddy-btn"
        onClick={handleClick}
      >
        <canvas ref={canvasRef} className="buddy-canvas" aria-hidden="true" />
      </button>
    </div>
  );
}
