import React, { useState } from 'react';
import '../../styles/hero.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo area */}
            <a href="/" className="nav-logo">
                ANNAVEDA
            </a>

            {/* Menu Links */}
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                {['Our Story', 'Menu', 'Locations', 'Contact'].map(item => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="nav-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* CTA Small - Hidden on mobile in CSS */}
            <button className="nav-cta-btn">
                Order Online
            </button>

            {/* Mobile Toggle */}
            <button
                className="mobile-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>
        </nav>
    );
};

export default Navbar;
