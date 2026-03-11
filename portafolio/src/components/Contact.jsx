import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact">

      <h2>Contacto</h2>

      <p>
        Si deseas trabajar conmigo o conocer más sobre mis proyectos,
        puedes contactarme a través de los siguientes medios.
      </p>

      <div className="contact-links">

        <a href="mailto:estebanjurado2005@gmail.com">
          Email
        </a>

        <a href="https://github.com/Est3banj" target="_blank">
          GitHub
        </a>

        <a href="https://www.linkedin.com/in/esteban-jurado-5453543ab/" target="_blank">
          LinkedIn
        </a>

      </div>

    </section>
  );
};

export default Contact;