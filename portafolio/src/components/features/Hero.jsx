const Hero = () => {
  return (
    <section id="inicio" className="pt-6">
      <div className="page">
        <div className="hero-anim">
          <p className="micro text-ink-3">● DISPONIBLE</p>
          <p className="mt-2">DESARROLLADOR DE SOFTWARE</p>
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

      <p className="page mt-3 text-ink-2 hero-anim-delay">
        NTT DATA Europe & Latam · PRÁCTICAS EN DESARROLLO · DESDE AGO 2026
        <span aria-hidden="true" className="caret">
          ▍
        </span>
      </p>
    </section>
  );
};

export default Hero;
