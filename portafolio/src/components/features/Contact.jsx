import React from 'react';
import Icon from '../ui/Icon';
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";

/**
 * Contact Component
 * 
 * Final section for business inquiries and social presence.
 * Prioritizes high conversion via clear CTAs and accessible links.
 * 
 * @returns {JSX.Element} The rendered Contact section.
 */
const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-3xl mx-auto text-center space-y-12">
                
                <header className="space-y-4">
                    <h2 className="text-4xl md:text-5xl">
                        Trabajemos <span className="text-brand-primary">Juntos</span>
                    </h2>

                    <p className="text-text-secondary text-lg">
                        ¿Tienes un proyecto o una idea digital? Estoy abierto a colaborar en 
                        desarrollo web, creación de interfaces modernas y proyectos tecnológicos 
                        donde pueda aportar soluciones y seguir creciendo como desarrollador.
                    </p>
                </header>

                <div className="flex flex-wrap justify-center gap-6">

                    {/* WhatsApp */}
                    <a 
                        href="https://wa.me/573105686294?text=Hola%20Esteban,%20vi%20tu%20portafolio" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                        <FaWhatsapp className="w-6 h-6" />
                        WhatsApp
                    </a>

                    {/* GitHub */}
                    <a 
                        href="https://github.com/Est3banj" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-text-primary rounded-xl font-bold hover:bg-white/10 transition-colors"
                    >
                        <Icon className="w-6 h-6">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                        </Icon>
                        GitHub
                    </a>

                    {/* LinkedIn */}
                    <a 
                        href="https://www.linkedin.com/in/esteban-jurado-5453543ab/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-[#0A66C2] text-white rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                        <FaLinkedin className="w-6 h-6" />
                        LinkedIn
                    </a>

                </div>

                <footer className="pt-12 border-t border-white/5 text-sm text-text-secondary font-mono">
                    © {new Date().getFullYear()} Esteban Jurado | Full Stack Developer
                </footer>

            </div>
        </section>
    );
};

export default Contact;