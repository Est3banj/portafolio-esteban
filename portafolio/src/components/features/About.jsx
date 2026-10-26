const About = () => {
  return (
    <section id="sobre-mi" className="mt-14">
      <div className="page" data-reveal>
        <h2 className="label">SOBRE MÍ</h2>
        <div className="mt-3 space-y-3 text-ink-2">
          <p>
            Desarrollador Full Stack en Putumayo, Colombia. En NTT DATA LATAM
            trabajo con stacks empresariales — Java, Spring Boot, Angular —
            participando en migraciones y debug de sistemas en producción. Fuera
            de ahí construyo productos propios y para clientes.
          </p>
          <p>
            GIO TECH fue desarrollado para un cliente real — un negocio de
            telefonía —; EJ Store y StreamControl Pro son míos y viven en
            producción. Donde entra la IA, entra con criterio: dirijo agentes de
            IA en mi flujo de trabajo —las decisiones de arquitectura siguen
            siendo mías— con certificaciones de OpenAI y manejo profesional de
            herramientas internas de la empresa.
          </p>
          <p>
            Empecé por curiosidad: quería entender cómo funcionan las
            aplicaciones por dentro. La misma curiosidad me llevó al backend, y
            ahora a la IA.
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
