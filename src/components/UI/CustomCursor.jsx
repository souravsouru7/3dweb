import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Detect mobile to disable custom cursor
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
                ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0));
        };
        checkMobile();

        if (isMobile) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Target checks for magnetic/expand effect
            const target = e.target;
            const isInteractive = target.closest('button, a, .interactive-card');
            setIsHovering(!!isInteractive);
        };

        const animate = () => {
            // Smooth interpolation for the outer ring
            const lerpAmount = 0.15;
            ringX += (mouseX - ringX) * lerpAmount;
            ringY += (mouseY - ringY) * lerpAmount;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        const animationFrame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#c7a17a] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
            />
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 w-8 h-8 border border-[#c7a17a]/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${isHovering ? 'scale-[2] border-[#c7a17a]/60 bg-[#c7a17a]/5' : 'scale-100'
                    }`}
            />
        </>
    );
};

export default CustomCursor;
