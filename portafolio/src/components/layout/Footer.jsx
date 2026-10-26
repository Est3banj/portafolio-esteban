import { useEffect, useState } from "react";

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
      <p>{timeFormatter.format(now)} · COT</p>
    </footer>
  );
};

export default Footer;
