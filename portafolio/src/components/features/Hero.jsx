import foto from "../esteban1.png";

const Hero = () => {
  return (
    <section id="inicio" className="pt-6">
      <div className="page flex items-start gap-4">
        <img
          src={foto}
          alt="Esteban Jurado"
          width="80"
          height="80"
          className="h-20 w-20 shrink-0 rounded-[6px] object-cover"
        />
        <div className="min-w-0">
          <p className="micro text-ink-3">● DISPONIBLE</p>
          <p className="mt-2">DESARROLLADOR FULL STACK</p>
          <p className="text-ink-3">PUTUMAYO, COLOMBIA</p>
        </div>
      </div>

      <h1 className="page mt-8 font-sans text-[clamp(40px,12vw,71.73px)] font-light leading-none">
        <span className="hero-word" style={{ animationDelay: "0ms" }}>
          Esteban
        </span>{" "}
        <span className="hero-word" style={{ animationDelay: "90ms" }}>
          Jurado
        </span>
      </h1>

      <p className="page mt-3 text-ink-2">
        NTT DATA LATAM · DESARROLLADOR DE SOFTWARE (PRÁCTICAS) · DESDE 18 DE
        AGOSTO DE 2026 · REMOTO
        <span aria-hidden="true" className="caret">
          ▍
        </span>
      </p>
    </section>
  );
};

export default Hero;
