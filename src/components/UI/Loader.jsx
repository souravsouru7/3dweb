import React, { useEffect, useState } from 'react';

const Loader = ({ progress, onComplete }) => {
    const [visible, setVisible] = useState(true);
    const [displayProgress, setDisplayProgress] = useState(0);

    // Smooth progress animation
    useEffect(() => {
        if (progress > displayProgress) {
            const diff = progress - displayProgress;
            const inc = Math.max(1, diff * 0.1);
            const timer = setTimeout(() => {
                setDisplayProgress(prev => Math.min(progress, prev + inc));
            }, 16);
            return () => clearTimeout(timer);
        }
    }, [progress, displayProgress]);

    useEffect(() => {
        if (displayProgress >= 100) {
            const timer = setTimeout(() => {
                setVisible(false);
                onComplete && onComplete();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [displayProgress, onComplete]);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#1a1a1a',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.8s ease-out',
            opacity: displayProgress >= 100 ? 0 : 1,
            pointerEvents: displayProgress >= 100 ? 'none' : 'auto'
        }}>
            <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                color: '#c7a17a',
                marginBottom: '20px',
                letterSpacing: '0.05em'
            }}>
                ANNAVEDA
            </div>

            {/* Progress Bar Container */}
            <div style={{
                width: '300px',
                height: '2px',
                background: 'rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Fill */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#c7a17a',
                    transform: `scaleX(${displayProgress / 100})`,
                    transformOrigin: 'left',
                    transition: 'transform 0.1s linear'
                }} />
            </div>

            <div style={{
                marginTop: '10px',
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.2em'
            }}>
                {Math.round(displayProgress)}%
            </div>
        </div>
    );
};

export default Loader;
