import React from 'react';

/**
 * Hero Component
 * 
 * Serves as the primary landing section of the portfolio. 
 * Implements high-impact typography and subtle entry animations 
 * using Tailwind v4 custom tokens.
 * 
 * @returns {JSX.Element} The rendered Hero section.
 */
const Hero = () => {
    return (
        <section
            id="home"
            className="relative isolate min-h-screen flex items-center justify-center overflow-hidden px-6"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -mt-[250px] -ml-[250px] w-[500px] h-[500px] bg-brand-primary/30 rounded-full blur-3xl -z-10 shadow-[0_0_120px_rgba(59,130,246,0.25)] animate-aura" />
            <div className="absolute top-[15%] right-[5%] w-[320px] h-[320px] bg-brand-secondary/25 rounded-full blur-3xl -z-10 animate-aura [animation-delay:-4s]" />

            <div className="max-w-4xl w-full text-center space-y-8">
                <header className="space-y-4">
                    <span className="inline-flex items-center gap-2 bg-bg-card/80 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-text-primary">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Disponible para proyectos
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl animate-slide-up [animation-fill-mode:both]">
                        Esteban <span className="text-brand-primary">Jurado</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] [animation-fill-mode:both]">
                        Desarrollador Full Stack
                        <span className="block mt-2 text-lg font-mono opacity-80">
                            Desarrollo aplicaciones web modernas usando tecnologías como
                            React, JavaScript y Node.js.
                        </span>
                    </p>
                </header>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:400ms] [animation-fill-mode:both]">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all active:scale-95 shadow-lg shadow-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    >
                        Ver Proyectos
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-brand-primary/20 hover:border-brand-primary/50 rounded-lg transition-all text-text-primary"
                    >
                        Contacto
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;