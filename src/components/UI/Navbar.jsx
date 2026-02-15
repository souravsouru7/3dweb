import React from 'react';
import '../../styles/hero.css';

const Navbar = () => {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            background: 'transparent', // Invisible background
            boxSizing: 'border-box'
        }}>
            {/* Logo area */}
            <div style={{
                color: 'var(--bakery-gold)',
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '-0.02em'
            }}>
                ANNAVEDA
            </div>

            {/* Menu Links */}
            <div style={{
                display: 'flex',
                gap: '40px'
            }}>
                {['Our Story', 'Menu', 'Locations', 'Contact'].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} style={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        position: 'relative',
                        transition: 'color 0.3s'
                    }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--bakery-gold)'}
                        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* CTA Small */}
            <button style={{
                background: 'transparent',
                border: '1px solid rgba(199, 161, 122, 0.4)',
                color: 'var(--bakery-gold)',
                padding: '10px 24px',
                borderRadius: '4px',
                fontFamily: "'Inter Tight', sans-serif",
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                cursor: 'pointer'
            }}>
                Order Online
            </button>
        </nav>
    );
};

export default Navbar;
