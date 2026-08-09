import React, { useState } from 'react';
import Icon from '../ui/Icon';
import { FaWhatsapp, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

/**
 * Contact Component
 * 
 * Final section for business inquiries and social presence.
 * Prioritizes high conversion via clear CTAs and accessible links.
 * 
 * @returns {JSX.Element} The rendered Contact section.
 */
const Contact = () => {
    const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const texto = `Hola Esteban! Soy ${form.nombre}. Mi email es ${form.email}.\n\n${form.mensaje}`;
        window.open(`https://wa.me/573105686294?text=${encodeURIComponent(texto)}`, '_blank');
    };

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

                {/* Formulario de contacto */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-left bg-bg-card/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                >
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-text-primary mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre"
                            className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                            className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="mensaje" className="block text-sm font-medium text-text-primary mb-2">
                            Mensaje
                        </label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={form.mensaje}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Contame sobre tu proyecto..."
                            className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30 transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Enviar
                    </button>

                    <p className="text-xs text-text-secondary text-center">
                        Los mensajes llegan directo a mi WhatsApp
                    </p>
                </form>

                <div className="flex flex-wrap justify-center gap-6">

                    <div className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-text-primary rounded-xl">
                        <FaMapMarkerAlt className="w-6 h-6 text-brand-primary" />
                        Putumayo, Colombia
                    </div>

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

                    {/* Email */}
                    <a 
                        href="mailto:estebanjurado2005@gmail.com"
                        className="flex items-center gap-3 px-8 py-4 bg-[#EA4335] text-white rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                        <IoMdMail className="w-6 h-6" />
                        Email
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