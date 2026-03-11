import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {

    if (theme === "dark") {
      document.body.classList.add("light-theme");
      setTheme("light");
    } else {
      document.body.classList.remove("light-theme");
      setTheme("dark");
    }

  };

  return (
    <nav className="navbar">

      <h2 className="logo">Esteban.dev</h2>

      <ul className="nav-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#about">Sobre mi</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Proyectos</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>

      <button className="theme-button" onClick={toggleTheme}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

    </nav>
  );
};

export default Navbar;