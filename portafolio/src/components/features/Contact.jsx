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
  return (
    <section id="contacto" className="mt-14">
      <div className="page">
        <h2 className="label">CONTACTO</h2>
        <p className="mt-2 text-ink-2">Escribime directo. Sin formularios.</p>

        <ul className="mt-4 grid gap-y-[6px] gap-x-[40px] sm:grid-cols-[280px_280px]">
          {CONTACT_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-accent underline underline-offset-2 break-all"
              >
                ↳ {item.label} ↗
              </a>
              <p className="micro text-ink-3 break-all">{item.display}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
