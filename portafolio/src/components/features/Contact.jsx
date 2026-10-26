import { useRef, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mnpppove";
// Formspree — owner endpoint (verified: responds 200 {"ok":true} to JSON POST).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 500;
const FIELD_ORDER = ["nombre", "email", "mensaje"];
const EMPTY_VALUES = { nombre: "", email: "", mensaje: "" };

const validateField = (name, rawValue) => {
  const value = rawValue.trim();
  switch (name) {
    case "nombre":
      if (!value) return "NOMBRE REQUERIDO";
      if (value.length < 2) return "MÍNIMO 2 CARACTERES";
      return "";
    case "email":
      if (!value) return "EMAIL REQUERIDO";
      if (!EMAIL_RE.test(value)) return "EMAIL INVÁLIDO";
      return "";
    case "mensaje":
      if (!value) return "MENSAJE REQUERIDO";
      if (value.length < 10) return "MÍNIMO 10 CARACTERES";
      return "";
    default:
      return "";
  }
};

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
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle");
  const touchedRef = useRef({});
  const nombreRef = useRef(null);
  const emailRef = useRef(null);
  const mensajeRef = useRef(null);
  const fieldRefs = { nombre: nombreRef, email: emailRef, mensaje: mensajeRef };

  const handleChange = (name) => (event) => {
    touchedRef.current[name] = true;
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const handleBlur = (name) => () => {
    if (!touchedRef.current[name]) return;
    const message = validateField(name, values[name]);
    setErrors((prev) =>
      prev[name] === message ? prev : { ...prev, [name]: message },
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "enviando") return;
    const form = event.currentTarget;

    if (form.company.value) {
      form.reset();
      setValues(EMPTY_VALUES);
      setStatus("listo");
      return;
    }

    const nextErrors = {
      nombre: validateField("nombre", values.nombre),
      email: validateField("email", values.email),
      mensaje: validateField("mensaje", values.mensaje),
    };
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    const payload = {
      name: values.nombre.trim(),
      email: values.email.trim(),
      message: values.mensaje.trim(),
      _subject: `Portafolio — mensaje de ${values.nombre.trim()}`,
      _captcha: "false",
    };

    setStatus("enviando");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      let body = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }
      const remoteOk =
        !body ||
        body.ok === true ||
        body.success === undefined ||
        body.success === null ||
        body.success === true ||
        body.success === "true" ||
        Number(body.success) === 1;
      if (!res.ok || !remoteOk) throw new Error("remote rejected");
      form.reset();
      setValues(EMPTY_VALUES);
      setErrors(EMPTY_VALUES);
      touchedRef.current = {};
      setStatus("listo");
      window.dispatchEvent(
        new CustomEvent("buddy:say", {
          detail: { phrase: "¡Listo! Te contesto pronto" },
        }),
      );
    } catch {
      setStatus("error");
    }
  };

  const count = values.mensaje.length;
  const counterTone =
    count >= MAX_MESSAGE
      ? "text-accent"
      : count > 450
        ? "text-ink-2"
        : "text-ink-3";

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

        <ul className="mt-4 grid gap-y-[6px] gap-x-[40px] sm:grid-cols-2">
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
        <form onSubmit={handleSubmit} noValidate className="relative grid gap-5">
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
            <div className={`field-wrap${errors.nombre ? " is-error" : ""}`}>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                minLength={2}
                autoComplete="name"
                className="field"
                value={values.nombre}
                onChange={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                ref={nombreRef}
                aria-invalid={errors.nombre ? "true" : "false"}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
              />
            </div>
            {errors.nombre ? (
              <span id="nombre-error" className="text-accent">
                ↳ {errors.nombre}
              </span>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="email" className="label micro text-ink-3">
              EMAIL
            </label>
            <div className={`field-wrap${errors.email ? " is-error" : ""}`}>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="field"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                ref={emailRef}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email ? (
              <span id="email-error" className="text-accent">
                ↳ {errors.email}
              </span>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="mensaje" className="label micro text-ink-3">
              MENSAJE
            </label>
            <div className={`field-wrap${errors.mensaje ? " is-error" : ""}`}>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                minLength={10}
                rows={5}
                maxLength={MAX_MESSAGE}
                className="field resize-y"
                value={values.mensaje}
                onChange={handleChange("mensaje")}
                onBlur={handleBlur("mensaje")}
                ref={mensajeRef}
                aria-invalid={errors.mensaje ? "true" : "false"}
                aria-describedby={
                  errors.mensaje
                    ? "mensaje-error mensaje-count"
                    : "mensaje-count"
                }
              />
            </div>
            {errors.mensaje ? (
              <span id="mensaje-error" className="text-accent">
                ↳ {errors.mensaje}
              </span>
            ) : null}
            <div className="flex justify-end">
              <span id="mensaje-count" className={`micro ${counterTone}`}>
                {count}/{MAX_MESSAGE}
              </span>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-4">
            <button
              type="submit"
              className="btn-send"
              disabled={status === "enviando"}
            >
              {status === "enviando" ? "ENVIANDO…" : "ENVIAR ↗"}
            </button>
          </div>

          <p
            role="status"
            aria-live="polite"
            className={status === "listo" ? "micro text-ink-2" : "micro text-ink-3"}
          >
            <span key={status} className={status === "listo" ? "status-in" : undefined}>
              {status === "enviando" && <span className="sr-only">ENVIANDO…</span>}
              {status === "listo" && "LISTO ✓ — TE RESPONDO PRONTO"}
              {status === "error" && (
                <>
                  ERROR — escribime a{" "}
                  <a
                    href="mailto:estebanjurado2005@gmail.com"
                    className="text-accent underline underline-offset-2 break-all"
                  >
                    estebanjurado2005@gmail.com
                  </a>
                </>
              )}
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
