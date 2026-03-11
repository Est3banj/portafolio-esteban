import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <h1 className="hero-title">
        Hola, soy Esteban Jurado
      </h1>

      <h2 className="hero-role">
        Desarrollador Full Stack
      </h2>

      <p className="hero-description">
        Desarrollo aplicaciones web modernas usando tecnologías como
        React, JavaScript y Node.js.
      </p>

      <div className="hero-buttons">
        <button className="btn-primary">Ver proyectos</button>
        <button className="btn-secondary">Contacto</button>
      </div>

    </section>
  );
};

export default Hero;