import foto from "../esteban1.png";

const Hero = () => {
  return (
    <section id="inicio" className="pt-6">
      <div className="page flex items-start gap-4">
        <img
          src={foto}
          alt="Esteban Jurado"
          width="128"
          height="128"
          className="h-32 w-32 shrink-0 rounded-[6px] border border-white/10 object-cover"
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
        NTT DATA LATAM · PRÁCTICAS EN DESARROLLO · DESDE AGO 2026
        <span aria-hidden="true" className="caret">
          ▍
        </span>
      </p>
    </section>
  );
};

export default Hero;
