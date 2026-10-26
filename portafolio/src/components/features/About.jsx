const About = () => {
  return (
    <section id="sobre-mi" className="mt-14">
      <div className="page" data-reveal>
        <h2 className="label">SOBRE MÍ</h2>
        <div className="mt-3 space-y-3 text-ink-2">
          <p>
            Soy desarrollador Full Stack y trabajo en NTT DATA LATAM con
            tecnologías empresariales como Java, Spring Boot y Angular,
            participando en migraciones y depuración de sistemas en producción.
            En paralelo, desarrollo productos propios y soluciones para clientes
            reales.
          </p>
          <p>
            GIO TECH nació de una necesidad real de un negocio de telefonía. EJ
            Store y StreamControl Pro son productos propios que he llevado a
            producción. Cada proyecto me permite explorar nuevas soluciones,
            enfrentar desafíos técnicos y convertir ideas en software funcional.
          </p>
          <p>
            Mi enfoque va más allá de escribir código: me interesa comprender
            los problemas, tomar decisiones técnicas fundamentadas y construir
            soluciones que funcionen en escenarios reales. También integro
            herramientas y agentes de inteligencia artificial en mi flujo de
            trabajo para optimizar el desarrollo, sin delegar el criterio
            técnico.
          </p>
          <p>
            Actualmente, sigo ampliando mis conocimientos en arquitectura de
            software, desarrollo backend e inteligencia artificial, con el
            objetivo de construir sistemas cada vez más sólidos y útiles.
          </p>
        </div>

        <h2 className="label mt-10">EXPERIENCIA</h2>
        <ul className="mt-3 space-y-3">
          <li>
            <p>
              ↳ NTT DATA LATAM — DESARROLLADOR DE SOFTWARE (PRÁCTICAS)
            </p>
            <p className="text-ink-3">
              DESDE 18 DE AGOSTO DE 2026 · REMOTO
            </p>
            <p className="mt-1 text-ink-2">
              Apoyo en modernización de sistemas: migraciones, debug y
              desarrollo con Java, Spring Boot y Angular.
            </p>
          </li>
          <li>
            <p>↳ FORMACIÓN</p>
            <p className="text-ink-3">
              INGENIERÍA EN SISTEMAS — UNAD, EN CURSO, 2026—
            </p>
            <p className="mt-1 micro text-ink-3">
              HOMOLOGA EL TECNÓLOGO ADSO · INICIADO 2026
            </p>
          </li>
          <li>
            <p>↳ FORMACIÓN</p>
            <p className="text-ink-3">
              TECNÓLOGO EN ANÁLISIS Y DESARROLLO DE SOFTWARE — SENA, 2026
            </p>
          </li>
        </ul>

        <h2 className="label mt-10">CERTIFICACIONES</h2>
        <ul className="mt-3 space-y-3">
          <li>
            <p className="text-ink-3">↳ OPENAI — CERTIFICACIONES</p>
          </li>
          <li>
            <p className="text-ink-3">
              ↳ MONGODB CON NODE.JS — CURSO COMPLEMENTARIO
            </p>
          </li>
        </ul>

        <h2 className="label mt-10">STACK</h2>
        <p className="mt-3 micro text-ink-3">
          REACT · TYPESCRIPT · JAVASCRIPT · JAVA · SPRING BOOT · ANGULAR ·
          TAILWIND · VITE · NODE · FIREBASE · MYSQL · AZURE DEVOPS · GOOGLE
          CLOUD · POSTMAN · GIT · GITHUB · VERCEL · AGENTES DE IA
        </p>
      </div>
    </section>
  );
};

export default About;
