import { useState } from "react";

// TODO(connect): Formspree endpoint — owner will provide
const FORM_ENDPOINT = "";

const CONTACT_LINKS = [
  {
    label: "EMAIL",
    href: "mailto:estebanjurado2005@gmail.com",
    display: "estebanjurado2005@gmail.com",
    external: false,
  },
  {
    label: "WHATSAPP",
    href: "https://wa.me/573247349128",
    display: "+57 324 734 9128",
    external: true,
  },
  {
    label: "GITHUB",
    href: "https://github.com/Est3banj",
    display: "github.com/Est3banj",
    external: true,
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/esteban-jurado-5453543ab/",
    display: "linkedin.com/in/esteban-jurado",
    external: true,
  },
];

const Contact = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.company.value) return;

    const data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      mensaje: form.mensaje.value.trim(),
    };

    if (!FORM_ENDPOINT) {
      const subject = `Mensaje desde tu portafolio — ${data.nombre}`;
      const body = `${data.mensaje}\n\n— ${data.nombre} (${data.email})`;
      window.location.href = `mailto:estebanjurado2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("listo");
      return;
    }

    setStatus("enviando");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("listo");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="mt-14">
      <div className="page">
        <h2 className="label" data-reveal>
          CONTACTO
        </h2>
        <p
          className="mt-2 text-ink-2"
          data-reveal
          style={{ "--reveal-delay": "50ms" }}
        >
          Escribime directo, o déjame un mensaje abajo.
        </p>

        <ul className="mt-4 grid gap-y-[6px] gap-x-[40px] sm:grid-cols-[280px_280px]">
          {CONTACT_LINKS.map((item, index) => (
            <li
              key={item.label}
              data-reveal
              style={{ "--reveal-delay": `${100 + index * 50}ms` }}
            >
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-accent underline underline-offset-2 break-all"
              >
                ↳ {item.label}{" "}
                <span aria-hidden="true" className="arrow">
                  ↗
                </span>
              </a>
              <p className="micro text-ink-3 break-all">{item.display}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="page-wide mt-8"
        data-reveal
        style={{ "--reveal-delay": "300ms" }}
      >
        <form onSubmit={handleSubmit} className="relative grid gap-5">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hp-field"
          />

          <div className="grid gap-1.5">
            <label htmlFor="nombre" className="label micro text-ink-3">
              NOMBRE
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              className="field"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="email" className="label micro text-ink-3">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="mensaje" className="label micro text-ink-3">
              MENSAJE
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              minLength={10}
              rows={5}
              className="field resize-y"
            />
          </div>

          <div className="mt-1 flex items-center gap-4">
            <button type="submit" className="btn-send">
              ENVIAR ↗
            </button>
          </div>

          <p role="status" aria-live="polite" className="micro text-ink-3">
            {status === "enviando" && "ENVIANDO…"}
            {status === "listo" && "LISTO ✓ — ABRE TU APP DE EMAIL"}
            {status === "error" && (
              <>
                ERROR — escribime a{" "}
                <a
                  href="mailto:estebanjurado2005@gmail.com"
                  className="text-accent underline underline-offset-2"
                >
                  estebanjurado2005@gmail.com
                </a>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
