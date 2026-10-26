import foto from "../esteban1.png";

const About = () => {
  return (
    <section id="sobre-mi" className="mt-10">
      <div className="page">
        <h2 className="label" data-reveal>
          SOBRE MÍ
        </h2>
        <div
          className="mt-3 flex flex-col gap-4 sm:flex-row sm:gap-6"
          data-reveal
          style={{ "--reveal-delay": "50ms" }}
        >
          <figure className="shrink-0 self-start">
            <img
              src={foto}
              alt="Esteban Jurado"
              width="160"
              height="160"
              decoding="async"
              className="h-40 w-40 rounded-[6px] border border-white/10 object-cover"
            />
            <figcaption className="micro mt-2 text-ink-3">
              FIG. 01
            </figcaption>
          </figure>
          <div className="min-w-0 space-y-3 text-ink-2">
            <p>
Soy desarrollador de software y actualmente realizo mi etapa productiva en NTT DATA LATAM, donde fortalezco mis conocimientos trabajando con tecnologías empresariales como Java, Spring Boot y Angular.
            </p>
            <p>
Fuera del entorno laboral, desarrollo productos propios y soluciones para clientes reales. GIO TECH nació de una necesidad de un negocio de telefonía, mientras que EJ Stream y StreamControl Pro son proyectos propios que he llevado a producción.
            </p>
            <p>
              Integro agentes de IA en mi flujo de trabajo sin delegar el
              criterio técnico — certificaciones de OpenAI de respaldo.
            </p>
          </div>
        </div>

        <h2
          className="label mt-10"
          data-reveal
          style={{ "--reveal-delay": "100ms" }}
        >
          EXPERIENCIA
        </h2>
        <ul className="mt-3 space-y-3">
          <li data-reveal style={{ "--reveal-delay": "150ms" }}>
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
          <li data-reveal style={{ "--reveal-delay": "200ms" }}>
            <p>↳ FORMACIÓN</p>
            <p className="text-ink-3">
              INGENIERÍA EN SISTEMAS — UNAD, EN CURSO, 2026—
            </p>
            <p className="mt-1 micro text-ink-3">
              HOMOLOGA EL TECNÓLOGO ADSO · INICIADO 2026
            </p>
          </li>
          <li data-reveal style={{ "--reveal-delay": "250ms" }}>
            <p>↳ FORMACIÓN</p>
            <p className="text-ink-3">
              TECNÓLOGO EN ANÁLISIS Y DESARROLLO DE SOFTWARE — SENA, 2026
            </p>
          </li>
        </ul>

        <h2
          className="label mt-10"
          data-reveal
          style={{ "--reveal-delay": "300ms" }}
        >
          CERTIFICACIONES
        </h2>
        <ul className="mt-3 space-y-3">
          <li data-reveal style={{ "--reveal-delay": "300ms" }}>
            <p className="text-ink-3">↳ OPENAI — CERTIFICACIONES</p>
          </li>
          <li data-reveal style={{ "--reveal-delay": "300ms" }}>
            <p className="text-ink-3">
              ↳ MONGODB CON NODE.JS — CURSO COMPLEMENTARIO
            </p>
          </li>
        </ul>

        <h2
          className="label mt-10"
          data-reveal
          style={{ "--reveal-delay": "300ms" }}
        >
          STACK
        </h2>
        <p className="mt-3 micro text-ink-3" data-reveal style={{ "--reveal-delay": "300ms" }}>
          REACT · TYPESCRIPT · JAVASCRIPT · JAVA · SPRING BOOT · ANGULAR ·
          TAILWIND · VITE · NODE · FIREBASE · MYSQL · AZURE DEVOPS · GOOGLE
          CLOUD · POSTMAN · GIT · GITHUB · VERCEL · AGENTES DE IA
        </p>
      </div>
    </section>
  );
};

export default About;
