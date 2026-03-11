import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Esteban.dev</h2>

      <ul className="nav-links">
        <li>Inicio</li>
        <li>Sobre mi</li>
        <li>Skills</li>
        <li>Proyectos</li>
        <li>Contacto</li>
      </ul>
    </nav>
  );
};

export default Navbar;