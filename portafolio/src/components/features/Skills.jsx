import React from 'react';
import { 
    FaReact,
    FaJs,
    FaHtml5,
    FaCss3Alt,
    FaNodeJs,
    FaGitAlt,
    FaGithub
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiFirebase,
    SiMysql
} from "react-icons/si";

/**
 * Skills Component
 *
 * Displays technical skills categorized by area of development.
 * Uses a responsive grid layout with subtle hover effects.
 *
 * @returns {JSX.Element}
 */
const Skills = () => {

    const skillSet = [
        {
            category: 'Frontend Development',
            items: [
                { name: 'React', icon: <FaReact /> },
                { name: 'JavaScript', icon: <FaJs /> },
                { name: 'HTML5', icon: <FaHtml5 /> },
                { name: 'CSS3', icon: <FaCss3Alt /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss /> }
            ]
        },
        {
            category: 'Backend & Tools',
            items: [
                { name: 'Node.js', icon: <FaNodeJs /> },
                { name: 'Firebase', icon: <SiFirebase /> },
                { name: 'MySQL', icon: <SiMysql /> },
                { name: 'Git', icon: <FaGitAlt /> },
                { name: 'GitHub', icon: <FaGithub /> }
            ]
        },
        {
            category: 'Development Practices',
            items: [
                { name: 'Responsive Design', icon: "•" },
                { name: 'Component Architecture', icon: "•" },
                { name: 'REST APIs', icon: "•" },
                { name: 'Agile Basics', icon: "•" }
            ]
        }
    ];

    return (
        <section id="skills" className="py-20 px-6 bg-bg-card/20 border-y border-white/5">
            <div className="max-w-7xl mx-auto space-y-12">

                <header className="text-center space-y-2">
                    <h2 className="text-3xl font-display font-bold">
                        Tecnologías y Habilidades
                    </h2>

                    <p className="text-text-secondary max-w-xl mx-auto">
                        Tecnologías y herramientas que utilizo para desarrollar
                        aplicaciones web modernas y seguir fortaleciendo mis
                        habilidades como desarrollador.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8">

                    {skillSet.map((group) => (
                        <div
                            key={group.category}
                            className="p-6 bg-bg-dark border border-white/5 rounded-xl hover:border-brand-primary/20 transition-colors"
                        >

                            <h3 className="text-lg font-mono text-brand-primary mb-4">
                                {group.category}
                            </h3>

                            <ul className="space-y-3">

                                {group.items.map((skill) => (
                                    <li
                                        key={skill.name}
                                        className="flex items-center gap-3 text-text-secondary text-sm"
                                    >

                                        <span className="text-lg text-brand-secondary">
                                            {skill.icon}
                                        </span>

                                        {skill.name}

                                    </li>
                                ))}

                            </ul>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Skills;