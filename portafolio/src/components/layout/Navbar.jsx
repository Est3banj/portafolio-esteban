const NAV_LINKS = [
  { label: "SOBRE MÍ", href: "#sobre-mi" },
  { label: "PROYECTOS", href: "#proyectos" },
  { label: "CONTACTO", href: "#contacto" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-canvas">
      <div className="page flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
        <a href="#inicio" className="link-draw">
          ESTEBAN.DEV
        </a>
        <ul className="flex flex-wrap items-center gap-x-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-draw">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
