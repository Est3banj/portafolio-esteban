🚀 Visión General

Este proyecto es mi portafolio personal como desarrollador web, creado para mostrar algunos de los proyectos en los que he trabajado y las tecnologías que utilizo.

Fue desarrollado con React y Vite para tener una aplicación rápida, moderna y fácil de mantener. En el proceso también utilicé herramientas de inteligencia artificial para mejorar algunos aspectos del diseño y la organización del código.

El objetivo principal del proyecto es presentar mi trabajo de forma clara y profesional mientras continúo aprendiendo y mejorando como desarrollador.

⸻

🛠️ Stack Tecnológico

Las principales tecnologías utilizadas en el proyecto son:
	•	React – Librería para construir interfaces de usuario.
	•	Vite – Herramienta de desarrollo rápida para proyectos modernos de frontend.
	•	Tailwind CSS – Framework de estilos para construir interfaces de forma ágil.
	•	SVG Icons – Sistema de iconos simple usando SVG.
	•	ESLint – Para mantener buenas prácticas y consistencia en el código.

⸻

📁 Estructura de Directorios

El proyecto utiliza una estructura modular para mantener el código organizado y facilitar futuras mejoras.
src/
├── assets/          # Imágenes e iconos.
├── components/
│   ├── layout/      # Componentes globales (Navbar, Footer).
│   ├── features/    # Componentes de secciones del sitio (Hero, About, etc).
│   └── ui/          # Componentes reutilizables (Icon, Button).
├── features/
│   └── projects/    # Sección de proyectos del portafolio.
│       ├── components/  # Componentes visuales de los proyectos.
│       └── data/        # Información de los proyectos.
├── styles/          # Configuración global de estilos.
└── App.jsx          # Componente principal de la aplicación.

🎨 Estilos y Diseño

El diseño del sitio utiliza Tailwind CSS para mantener los estilos simples y consistentes.

Algunos aspectos importantes:
	•	Uso de colores personalizados definidos en los estilos globales.
	•	Tipografías modernas para mejorar la legibilidad.
	•	Animaciones suaves para mejorar la experiencia visual.

El objetivo es mantener un diseño limpio, moderno y fácil de navegar.

⸻

📜 Buenas Prácticas de Código

Durante el desarrollo se aplicaron algunas prácticas para mantener el proyecto organizado:

Documentación con JSDoc

Algunos componentes incluyen comentarios para explicar su función dentro del proyecto.

/**
 * Componente que renderiza una tarjeta de proyecto.
 * @param {Object} props
 * @returns {JSX.Element}
 */

 Esto ayuda a entender mejor el código cuando el proyecto crece o se vuelve a revisar después.

Accesibilidad

Se aplicaron algunas prácticas básicas de accesibilidad:
	•	Uso de etiquetas HTML semánticas (header, section, article).
	•	aria-label en algunos enlaces e iconos.
	•	Navegación clara para los usuarios.

⸻

🔧 Mantenimiento

Actualizar proyectos

Para agregar o modificar proyectos del portafolio, se debe editar el archivo:
src/features/projects/data/projects.js

Allí se define la información de cada proyecto mostrado en el sitio.

Comandos útiles
npm run dev

Inicia el servidor de desarrollo.
npm run build

Genera la versión optimizada para producción.
npm run lint

📌 Nota
Este portafolio es un proyecto en constante mejora.
A medida que adquiera más experiencia y desarrolle nuevos proyectos, se irán agregando nuevas funcionalidades y mejoras en la arquitectura del código