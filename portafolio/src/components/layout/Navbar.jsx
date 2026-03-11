import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

/**
 * Navbar Component
 * 
 * Implements a sticky, glassmorphism-style navigation bar.
 * Handles scroll events for dynamic background opacity and mobile menu state.
 * 
 * @returns {JSX.Element} The rendered Navbar.
 */
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#home' },
        { name: 'Sobre mí', href: '#about' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Contacto', href: '#contact' },
    ];

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
                isScrolled ? 'bg-bg-dark/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Custom SVG Logo */}
<a href="#home" className="flex items-center gap-2 group" aria-label="Esteban Dev Home">
    <img 
        src="/logoej.png" 
        alt="Logo Esteban.dev" 
        className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
    />
    <span className="text-xl font-display font-bold tracking-tighter">
        Esteban<span className="text-brand-primary">.dev</span>
    </span>
</a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a 
                                href={link.href}
                                className="text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle (Accessible) */}
                <button 
                    className="md:hidden text-text-primary p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <Icon className="w-6 h-6">
                        {isMobileMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </Icon>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[72px] bg-bg-dark z-40 animate-fade-in flex flex-col p-6 space-y-6">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-display font-medium border-b border-white/5 pb-2 hover:text-brand-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;