import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>Mis proyectos</h2>

      <div className="projects-container">
        {/* Proyecto 1: GIO TECH */}
        <div className="project-card">
          <h3>GIO TECH - E-commerce & Management</h3>
          <p>
            Plataforma integral de comercio electrónico para tecnología, con gestión 
            de inventario en tiempo real, catálogo dinámico y sistema de suscripción 
            de datos mediante Firebase. Optimizado para alto rendimiento (Core Web Vitals) 
            con React, Vite y Tailwind CSS.
          </p>
          <div className="project-tags">
            <span>React</span>
            <span>Firebase</span>
            <span>Tailwind CSS</span>
            <span>Web Performance</span>
          </div>
        </div>

      </div> 

    </section> 
  );
};

export default Projects;