/**
 * @typedef {Object} Project
 * @property {string} id - Unique identifier for the project.
 * @property {string} title - Display title.
 * @property {string} description - Brief summary of the project goals and impact.
 * @property {string[]} techs - List of technologies used.
 * @property {string} [link] - URL to live site or case study.
 * @property {string} [github] - URL to source code.
 * @property {string} category - Business or technical category.
 * @property {boolean} highlight - Whether to feature this project prominently.
 */

/** @type {Project[]} */
export const projectsData = [
    {
        id: 'giotech',
        title: 'GIO TECH',
        description: 'Plataforma web desarrollada para una tienda tecnológica que permite mostrar productos y servicios digitales, facilitando la navegación de los usuarios y mejorando la presencia digital del negocio.',
        techs: ['React', 'Tailwind CSS', 'JavaScript', 'Firebase'],
        link: 'https://giotechshop.online/',
        github: 'https://github.com/Est3banj/gio-tech',
        category: 'Plataforma Web',
        highlight: true
    },
    {
        id: 'streamcontrol-pro',
        title: 'StreamControl Pro',
        description: 'Dashboard administrativo para el control de inventario de servicios streaming, gestión de clientes y monitoreo de fechas de vencimiento con analíticas en tiempo real. (Demo: demo@test.com | 123456)',
        techs: ['React', 'Tailwind CSS', 'Firebase', 'Recharts'],
        link: 'https://streamcontrol-10837.web.app/',
        github: 'https://github.com/Est3banj/stream-control',
        category: 'Gestión Administrativa',
        highlight: true
    }
];