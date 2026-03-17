import React from "react";

/**
 * About Component
 *
 * Sección que presenta información profesional y académica del desarrollador.
 * Utiliza un grid responsive para separar contenido textual y elementos visuales.
 *
 * @returns {JSX.Element}
 */
const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-bg-card/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Texto principal */}
        <div className="space-y-6 animate-slide-up">
          <header className="space-y-2">
            <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">
              Desarrollo de Software
            </span>

            <h2 className="text-4xl md:text-5xl">Sobre mí</h2>
          </header>

          <div className="text-text-secondary text-lg leading-relaxed space-y-4">
            <p>
              Soy Esteban Jurado, estudiante de Análisis y Desarrollo de
              Software. Me enfoco en el desarrollo de aplicaciones web modernas
              utilizando tecnologías como JavaScript, React y arquitecturas de
              software organizadas y escalables.
            </p>

            <p>
              Durante mi proceso de formación he trabajado en el desarrollo de
              aplicaciones web, plataformas de servicios digitales y proyectos
              académicos enfocados en buenas prácticas de desarrollo, diseño de
              interfaces y organización del código. Mi objetivo es seguir
              fortaleciendo mis habilidades como desarrollador y participar en
              proyectos que generen soluciones tecnológicas útiles.
            </p>
          </div>

          {/* Métricas realistas */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 border border-white/5 bg-bg-card rounded-lg">
              <span className="block text-brand-primary text-2xl font-bold">
                3+
              </span>
              <span className="text-sm text-text-secondary">
                Proyectos desarrollados
              </span>
            </div>

            <div className="p-4 border border-white/5 bg-bg-card rounded-lg">
              <span className="block text-brand-primary text-2xl font-bold">
                SENA
              </span>
              <span className="text-sm text-text-secondary">
                Formación en ADSO
              </span>
            </div>
          </div>
        </div>

        {/* Área visual / foto */}
        <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden border border-white/5 group">
          
          {/* Foto */}
          <img
            src="https://raw.githubusercontent.com/Est3banj/portafolio-esteban/main/portafolio/src/components/foto1.png"
            alt="Foto de Esteban Jurado"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-bg-dark/40 group-hover:bg-transparent transition-colors duration-500" />

          {/* Texto decorativo */}
          <div className="absolute inset-0 flex items-center justify-center text-brand-primary/40 font-mono text-xs p-8 break-all overflow-hidden opacity-50 pointer-events-none">
            {`ESTEBAN JURADO SOFTWARE DEVELOPMENT REACT JAVASCRIPT WEB APPLICATIONS FRONTEND DEVELOPMENT PROJECTS LEARNING BUILDING SOFTWARE`.repeat(20)}
          </div>

          {/* Tarjeta inferior */}
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-bg-dark/80 backdrop-blur-sm rounded-lg border border-white/10">
            <span className="text-xs font-mono text-brand-secondary uppercase tracking-tight">
              Especialización Actual
            </span>
            <p className="text-sm font-medium">Desarrollo Web y Aplicaciones Full Stack</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;