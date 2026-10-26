import { useEffect, useRef, useState } from "react";
import foto from "../esteban1.png";
import { isMuted, playBloop, toggleMuted } from "../../lib/sfx";

const MOBILE_BP = 768;
const DESKTOP_BP = 1024;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

const charWidthFor = (w) =>
  w >= DESKTOP_BP ? 168 : w >= MOBILE_BP ? 136 : 108;

const WAVE = Object.freeze({
  ampFactor: 0.015,
  levelBaseDesktop: 0.22,
  levelBaseMobile: 0.4,
  levelMax: 0.92,
  lerpDesktop: 0.28,
  lerpMobile: 0.2,
  stepsDesktop: 52,
  stepsMobile: 20,
  kickDecay: 0.965,
  kickLimit: 60,
});

const BUBBLES = Object.freeze([
  { x: 0.16, r: 2.2, speed: 0.045, phase: 0.12, op: 0.14 },
  { x: 0.29, r: 1.4, speed: 0.06, phase: 0.61, op: 0.1 },
  { x: 0.44, r: 2.8, speed: 0.035, phase: 0.35, op: 0.15 },
  { x: 0.57, r: 1.8, speed: 0.055, phase: 0.82, op: 0.11 },
  { x: 0.68, r: 2.4, speed: 0.04, phase: 0.07, op: 0.13 },
  { x: 0.81, r: 1.5, speed: 0.065, phase: 0.48, op: 0.09 },
  { x: 0.92, r: 2.1, speed: 0.05, phase: 0.25, op: 0.12 },
]);

const waveOffset = (xn, t, amp, mobile) => {
  if (mobile) return Math.sin(xn * 1.57 + t * 0.9) * amp;
  return (
    (Math.sin(t * 2.55) * 0.55 +
      Math.sin(xn * 1.55 + t * 1.42) * 0.42 +
      Math.cos(xn * 0.5 + t * 1.05) * 0.28) *
    amp
  );
};

const readViewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const timeFormatter = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Bogota",
});

const FooterContent = ({ now, viewport, rev, muted, wet, onToggleMute }) => (
  <div
    className={
      wet
        ? "page pt-14 pb-8 micro text-ink-3 wet"
        : "page pt-14 pb-8 micro text-ink-3"
    }
  >
    <p>
      © 2026 ESTEBAN JURADO · REV {rev.toUpperCase()} · VISOR{" "}
      {viewport.width}×{viewport.height}
    </p>
    <p className="mt-1">
      {timeFormatter.format(now)} · COT ·{" "}
      <button
        type="button"
        onClick={wet ? undefined : onToggleMute}
        aria-pressed={!muted}
        aria-label={muted ? "Activar sonido" : "Desactivar sonido"}
        tabIndex={wet ? -1 : undefined}
        className="sfx-toggle"
      >
        {muted ? "♪̸" : "♪"}
      </button>
    </p>
  </div>
);

const Footer = () => {
  const [viewport, setViewport] = useState(readViewport);
  const [now, setNow] = useState(() => new Date());
  const [muted, setMutedState] = useState(isMuted);

  const footerRef = useRef(null);
  const svgRef = useRef(null);
  const fillRef = useRef(null);
  const sheenRef = useRef(null);
  const clipRef = useRef(null);
  const charRef = useRef(null);
  const bubbleRefs = useRef([]);
  const bobRef = useRef(0);
  const reducedRef = useRef(false);

  const onToggleMute = () => setMutedState(toggleMuted());

  const onCharacterClick = () => {
    playBloop();
    bobRef.current = -10;
  };

  useEffect(() => {
    const onResize = () => setViewport(readViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    const svg = svgRef.current;
    if (!footer || !svg) return undefined;

    const size = { w: 0, h: 0 };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;

    const applySize = () => {
      const rect = footer.getBoundingClientRect();
      size.w = Math.round(rect.width);
      size.h = Math.round(rect.height);
      svg.setAttribute("viewBox", `0 0 ${size.w} ${size.h}`);
      if (charRef.current) {
        charRef.current.style.width = `${charWidthFor(size.w)}px`;
      }
    };
    applySize();

    const paint = (t, lvl, k) => {
      const { w, h } = size;
      if (!w || !h) return;
      const mobile = window.innerWidth < MOBILE_BP;
      const reduced = reducedRef.current;
      const steps = mobile ? WAVE.stepsMobile : WAVE.stepsDesktop;
      const base = mobile ? WAVE.levelBaseMobile : WAVE.levelBaseDesktop;
      const levelNow = base + (WAVE.levelMax - base) * lvl;
      const surfaceY = (1 - levelNow) * h;
      const amp = WAVE.ampFactor * h + k;

      let surface = "";
      for (let i = 0; i <= steps; i++) {
        const xn = i / steps;
        const x = (xn * w).toFixed(2);
        const y = (surfaceY + waveOffset(xn, t, amp, mobile)).toFixed(2);
        surface += `${i === 0 ? "M" : "L"}${x},${y}`;
      }
      const fill = `${surface}L${w},${h}L0,${h}Z`;

      fillRef.current?.setAttribute("d", fill);
      sheenRef.current?.setAttribute("d", surface);
      clipRef.current?.setAttribute("d", fill);

      const showBubbles = !mobile && !reduced;
      for (let i = 0; i < BUBBLES.length; i++) {
        const el = bubbleRefs.current[i];
        if (!el) continue;
        if (!showBubbles) {
          el.setAttribute("opacity", "0");
          continue;
        }
        const b = BUBBLES[i];
        const progress = (t * b.speed + b.phase) % 1;
        const cy = h - progress * (h - surfaceY - 8);
        const fade = clamp((cy - surfaceY) / 28, 0, 1);
        el.setAttribute("cx", (b.x * w).toFixed(1));
        el.setAttribute("cy", cy.toFixed(1));
        el.setAttribute("opacity", (b.op * fade).toFixed(3));
      }

      if (charRef.current) {
        const cw = charWidthFor(w);
        const xf = mobile ? 0.9 : 0.09;
        const yWave = surfaceY + waveOffset(xf, t, amp, mobile);
        const bob = bobRef.current;
        bobRef.current = bob * 0.82;
        const x = xf * w - cw / 2;
        const y = yWave - cw + cw * 0.06 + bob;
        charRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
    };

    let raf = 0;
    let frame = 0;
    let level = 0;
    let kick = 0;
    let footRect = footer.getBoundingClientRect();
    let visible = true;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      kick = clamp(kick + (y - lastScrollY) * 0.15, -WAVE.kickLimit, WAVE.kickLimit);
      lastScrollY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = (nowMs) => {
      raf = requestAnimationFrame(loop);
      frame += 1;
      const mobile = window.innerWidth < MOBILE_BP;

      if (frame <= 2 || frame % (mobile ? 8 : 5) === 0) {
        footRect = footer.getBoundingClientRect();
        visible = footRect.bottom > 0 && footRect.top < window.innerHeight;
      }
      if (!visible) return;

      kick *= WAVE.kickDecay;
      const ih = window.innerHeight;
      const target = clamp(
        (ih - footRect.top) / (ih * 0.75 + footRect.height * 0.55),
        0,
        1,
      );
      level += (target - level) * (mobile ? WAVE.lerpMobile : WAVE.lerpDesktop);

      if (mobile && frame % 2 !== 0) return;
      paint(nowMs / (mobile ? 2000 : 1000), level, kick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    paint(0, 0, 0);
    if (!mq.matches) start();

    const onMotionChange = (e) => {
      reducedRef.current = e.matches;
      if (e.matches) {
        stop();
        paint(0, 0, 0);
      } else {
        start();
      }
    };
    mq.addEventListener("change", onMotionChange);

    const ro = new ResizeObserver(() => {
      applySize();
      if (reducedRef.current) paint(0, 0, 0);
    });
    ro.observe(footer);

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMotionChange);
      ro.disconnect();
    };
  }, []);

  const rev = typeof __GIT_REV__ !== "undefined" ? __GIT_REV__ : "dev";

  return (
    <footer
      ref={footerRef}
      className="footer-wave relative mt-14 mb-8 overflow-hidden"
    >
      <div className="relative z-0">
        <FooterContent
          now={now}
          viewport={viewport}
          rev={rev}
          muted={muted}
          wet={false}
          onToggleMute={onToggleMute}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      >
        <svg ref={svgRef} className="block h-full w-full" preserveAspectRatio="none">
          <defs>
            <clipPath id="water-clip">
              <path ref={clipRef} d="" />
            </clipPath>
          </defs>
          <path ref={fillRef} d="" fill="rgb(255 255 255 / 0.05)" />
          <path
            ref={sheenRef}
            d=""
            fill="none"
            stroke="rgb(255 255 255 / 0.35)"
            strokeWidth="1"
          />
          {BUBBLES.map((b, i) => (
            <ellipse
              key={b.x}
              ref={(el) => {
                bubbleRefs.current[i] = el;
              }}
              rx={b.r}
              ry={b.r}
              fill="#fff"
              opacity="0"
            />
          ))}
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={{ clipPath: "url(#water-clip)" }}
      >
        <FooterContent
          now={now}
          viewport={viewport}
          rev={rev}
          muted={muted}
          wet
          onToggleMute={onToggleMute}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <button
          ref={charRef}
          type="button"
          onClick={onCharacterClick}
          aria-label="Saludar a Esteban — reproduce un sonido"
          className="char-btn absolute top-0 left-0 pointer-events-auto"
        >
          <img
            src={foto}
            alt=""
            width="168"
            height="168"
            draggable={false}
            className="block h-auto w-full select-none"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
