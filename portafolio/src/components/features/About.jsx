const About = () => {
  return (
    <section id="sobre-mi" className="mt-14">
      <div className="page" data-reveal>
        <h2 className="label">SOBRE MÍ</h2>
        <div className="mt-3 space-y-3 text-ink-2">
          <p>
            Desarrollador Full Stack radicado en Putumayo, Colombia. Construyo
            plataformas web para negocios reales: e-commerce multi-tenant,
            dashboards administrativos y tiendas que ya operan en producción.
          </p>
          <p>
            Diseño la arquitectura de cada solución y dirijo agentes de IA como
            parte del flujo de implementación: aceleran la ejecución, las
            decisiones siguen siendo mías.
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
              Apoyo en modernización de sistemas y tareas de desarrollo
              transversales.
            </p>
          </li>
          <li>
            <p>↳ FORMACIÓN</p>
            <p className="text-ink-3">
              TECNÓLOGO EN ANÁLISIS Y DESARROLLO DE SOFTWARE — SENA, 2026
            </p>
          </li>
        </ul>

        <h2 className="label mt-10">STACK</h2>
        <p className="mt-3 micro text-ink-3">
          REACT · TYPESCRIPT · JAVASCRIPT · TAILWIND · VITE · NODE · FIREBASE ·
          MYSQL · GIT · GITHUB · VERCEL · AGENTES DE IA
        </p>
      </div>
    </section>
  );
};

export default About;
