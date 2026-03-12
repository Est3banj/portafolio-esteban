import React from "react";
import { projectsData } from "../data/projects";
import ProjectCard from "./ProjectCard";

/**
 * Projects Section Component
 *
 * Orchestrates the display of the professional portfolio work.
 * Filters and maps project data to ProjectCard components.
 *
 * @returns {JSX.Element} The rendered Projects section.
 */
const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <header className="space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl tracking-tight">
            Proyectos <span className="text-brand-primary">Destacados</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Proyectos desarrollados para negocios reales, enfocados en la
            creación de plataformas web modernas que integran soluciones de
            gestión, exhibición de servicios y optimización de ventas,
            ofreciendo siempre una experiencia clara y profesional para los
            usuarios.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
