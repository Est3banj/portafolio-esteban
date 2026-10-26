import { useEffect, useState } from "react";

const readViewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const Footer = () => {
  const [viewport, setViewport] = useState(readViewport);

  useEffect(() => {
    const onResize = () => setViewport(readViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rev = typeof __GIT_REV__ !== "undefined" ? __GIT_REV__ : "dev";

  return (
    <footer className="page mt-14 mb-8 micro text-ink-3">
      © 2026 ESTEBAN JURADO · REV {rev.toUpperCase()} · VISOR {viewport.width}×{viewport.height}
    </footer>
  );
};

export default Footer;
