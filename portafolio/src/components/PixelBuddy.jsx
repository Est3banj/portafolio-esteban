import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import buddySheet from "../assets/pixel-buddy.png";
import { playBloop } from "../lib/sfx";

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
const GREET_KEY = "buddy-greeted";
const GREET_PHRASE = "¡Hola! Tocá y escuchame";

const PHRASES = [
  "Scrolleá, yo te sigo",
  "¿Viste los proyectos?",
  "Tocá y escuchame *bip*",
  "Escríbime, no muerdo",
  "Puro píxel, cero plantilla",
  "¿Hablamos de tu idea?",
];

export default function PixelBuddy() {
  const canvasRef = useRef(null);
  const waveRef = useRef(null);
  const phraseIdx = useRef(-1);
  const bubbleTimer = useRef(0);
  const greetTimer = useRef(0);
  const bubbleRef = useRef(null);
  const [phrase, setPhrase] = useState("");
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
    };

    const img = new Image();
    let raf = 0;

    const layout = () => {
      const cssW = window.innerWidth < 768 ? 64 : 96;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = cssW * dpr;
      canvas.height = cssW * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssW}px`;
      ctx.imageSmoothingEnabled = false;
      const rect = canvas.getBoundingClientRect();
      S.cx = rect.left + rect.width / 2;
      S.nextAt = performance.now() + 1000 / FPS.idle;
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
      S.dirty = false;
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!S.loaded || document.hidden) return;

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
      }

      if (S.dirty) draw();
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
      }
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      S.reduced = mq.matches;
      if (S.reduced) {
        S.state = "idle";
        S.frame = 0;
        S.facing = 1;
      }
      S.dirty = true;
    };
    onMq();

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        S.nextAt = performance.now() + 1000 / FPS[S.state];
        raf = requestAnimationFrame(tick);
      }
    };

    waveRef.current = () => {
      if (S.reduced) return;
      S.state = "wave";
      S.frame = 0;
      S.nextAt = performance.now() + 1000 / FPS.wave;
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
      clearTimeout(greetTimer.current);
    },
    [],
  );

  useEffect(() => {
    let greeted = false;
    try {
      greeted = sessionStorage.getItem(GREET_KEY) === "1";
    } catch {
      /* storage unavailable — greet only this mount */
    }
    if (greeted) return undefined;
    try {
      sessionStorage.setItem(GREET_KEY, "1");
    } catch {
      /* storage unavailable — greet only this mount */
    }
    greetTimer.current = setTimeout(() => {
      setPhrase(GREET_PHRASE);
      clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => setPhrase(""), BUBBLE_MS);
      waveRef.current?.();
    }, GREET_MS);
    return () => clearTimeout(greetTimer.current);
  }, []);

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
  }, [phrase]);

  const handleClick = useCallback(() => {
    clearTimeout(greetTimer.current);
    playBloop();
    phraseIdx.current = (phraseIdx.current + 1) % PHRASES.length;
    setPhrase(PHRASES[phraseIdx.current]);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setPhrase(""), BUBBLE_MS);
    waveRef.current?.();
  }, []);

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
          {phrase}
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
