import React from 'react';
import Icon from '../../../components/ui/Icon';

/**
 * ProjectCard Component
 *
 * Renderiza una tarjeta de proyecto con su información principal,
 * incluyendo descripción, tecnologías utilizadas y enlaces externos.
 *
 * Diseñado para mostrar proyectos del portafolio personal.
 *
 * @param {Object} props
 * @param {import('../data/projects').Project} props.project - Objeto con la información del proyecto.
 * @returns {JSX.Element}
 */
const ProjectCard = ({ project }) => {
    return (
        <article
            className="group relative bg-bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-all duration-500 flex flex-col h-full"
        >

            {/* Encabezado del proyecto */}
            <header className="p-6 pb-2">
                <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest">
                    {project.category}
                </span>

                <h3 className="text-2xl mt-1 group-hover:text-brand-primary transition-colors">
                    {project.title}
                </h3>
            </header>

            {/* Descripción */}
            <div className="px-6 flex-grow">
                <p className="text-text-secondary text-sm leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* Tecnologías */}
            <footer className="p-6 space-y-4">

                <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-[10px] bg-white/5 text-text-secondary rounded font-mono border border-white/5"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Enlace al sitio */}
                <div className="flex items-center gap-4 pt-2">

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-primary hover:text-brand-primary transition-colors flex items-center gap-1 text-sm font-medium"
                            aria-label={`Visitar sitio web de ${project.title}`}
                        >
                            <Icon className="w-4 h-4">
                                {/* icono web */}
                                <path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
                            </Icon>
                            Ver sitio
                        </a>
                    )}

                </div>

            </footer>

        </article>
    );
};

export default ProjectCard;