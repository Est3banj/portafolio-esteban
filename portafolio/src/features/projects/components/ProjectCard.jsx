import React from 'react';
import Icon from '../../../components/ui/Icon';
// 1. Importamos los iconos de las librerías
import { SiReact, SiTailwindcss, SiFirebase, SiJavascript, SiGithub } from 'react-icons/si';
import { AiOutlineLineChart } from 'react-icons/ai';

/**
 * Mapeo de tecnologías a iconos.
 * Esto asocia el string en tus datos con el componente visual.
 */
const techIcons = {
    'React': <SiReact />,
    'Tailwind CSS': <SiTailwindcss />,
    'Firebase': <SiFirebase />,
    'JavaScript': <SiJavascript />,
    'Recharts': <AiOutlineLineChart />
};

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
                            className="px-2 py-1 text-[10px] bg-white/5 text-text-secondary rounded font-mono border border-white/5 flex items-center gap-1.5"
                        >
                            {/* 2. Aquí insertamos el icono si existe en nuestro mapa */}
                            <span className="text-sm">
                                {techIcons[tech] || null}
                            </span>
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Enlaces: Sitio Web y GitHub */}
                <div className="flex items-center gap-6 pt-2">

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-primary hover:text-brand-primary transition-colors flex items-center gap-2 text-sm font-medium"
                            aria-label={`Visitar sitio web de ${project.title}`}
                        >
                            <Icon className="w-4 h-4">
                                <path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M12 3c-3.5 3.8-3.5 13.2 0 18M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
                            </Icon>
                            Ver sitio
                        </a>
                    )}

                    {/* 3. Agregamos el enlace de GitHub */}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                            aria-label={`Ver código fuente de ${project.title}`}
                        >
                            <SiGithub className="text-lg" />
                            Código
                        </a>
                    )}

                </div>

            </footer>

        </article>
    );
};

export default ProjectCard;