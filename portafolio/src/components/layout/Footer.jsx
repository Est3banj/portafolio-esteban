import { useEffect, useState } from "react";

const readViewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const NTT_START = new Date(2026, 7, 18);

const dateOnly = (date) =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

const formatTenure = (now) => {
  let months =
    (now.getFullYear() - NTT_START.getFullYear()) * 12 +
    (now.getMonth() - NTT_START.getMonth());
  if (now.getDate() < NTT_START.getDate()) months -= 1;

  const daysBetween = (from, to) =>
    Math.max(0, Math.round((dateOnly(to) - dateOnly(from)) / 86400000));

  if (months < 1) {
    const days = daysBetween(NTT_START, now);
    return `${days} DÍA${days === 1 ? "" : "S"}`;
  }

  const anchor = new Date(
    NTT_START.getFullYear(),
    NTT_START.getMonth() + months,
    NTT_START.getDate(),
  );
  const days = daysBetween(anchor, now);
  const monthsPart = `${months} MES${months === 1 ? "" : "ES"}`;
  if (days === 0) return monthsPart;
  return `${monthsPart} Y ${days} DÍA${days === 1 ? "" : "S"}`;
};

const timeFormatter = new Intl.DateTimeFormat("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Bogota",
});

const Footer = () => {
  const [viewport, setViewport] = useState(readViewport);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const onResize = () => setViewport(readViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const rev = typeof __GIT_REV__ !== "undefined" ? __GIT_REV__ : "dev";

  return (
    <footer className="page mt-14 mb-8 micro text-ink-3">
      <p>
        © 2026 ESTEBAN JURADO · REV {rev.toUpperCase()} · VISOR{" "}
        {viewport.width}×{viewport.height}
      </p>
      <p>
        NTT DATA LATAM · {formatTenure(now)} · {timeFormatter.format(now)} · COT
      </p>
    </footer>
  );
};

export default Footer;
