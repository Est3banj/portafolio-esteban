import React from 'react';

/**
 * @typedef {Object} IconProps
 * @property {string} [className] - Optional Tailwind classes for styling (size, color, etc).
 * @property {string} [title] - Accessible title for the icon (A11y).
 * @property {React.ReactNode} children - SVG paths or elements.
 * @property {string} [viewBox] - SVG viewBox, defaults to "0 0 24 24".
 */

/**
 * Base Icon component for custom SVG implementation.
 * Ensures consistent scaling and accessibility across the application.
 * 
 * @param {IconProps} props - Component properties.
 * @returns {JSX.Element} The rendered SVG icon.
 */
const Icon = ({ 
  className = "w-6 h-6", 
  title, 
  children, 
  viewBox = "0 0 24 24" 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden={!title}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

export default Icon;
