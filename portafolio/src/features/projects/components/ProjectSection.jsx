import { projectsData } from "../data/projects";

const Projects = () => {
  return (
    <section id="proyectos" className="mt-14">
      <div className="page">
        <h2 className="label">PROYECTOS</h2>
        <p className="mt-2 text-ink-2">
          Tres productos en producción. Sitio y código abiertos.
        </p>

        <div className="mt-6 space-y-8">
          {projectsData.map((project) => (
            <article key={project.id}>
              <p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  ↳ {project.title} ↗
                </a>
                <span className="text-ink-3">
                  {" "}
                  · {project.category.toUpperCase()}
                </span>
              </p>
              <p className="mt-1 text-ink-2">{project.description}</p>
              <p className="mt-1 micro text-ink-3 uppercase">
                {project.techs.join(" · ")}
              </p>
              {project.demoCredentials && (
                <p className="mt-1 micro text-ink-3">
                  DEMO: {project.demoCredentials}
                </p>
              )}
              <p className="mt-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  CÓDIGO ↗
                </a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
