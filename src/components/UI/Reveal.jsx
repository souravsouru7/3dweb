import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, delay = 0, className = "" }) => {
    const [isActive, setIsActive] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsActive(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal-text ${isActive ? 'reveal-active' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="reveal-mask" style={{ animationDelay: `${delay}ms` }} />
            <div className="reveal-content" style={{ transitionDelay: `${delay + 400}ms` }}>
                {children}
            </div>
        </div>
    );
};

export default Reveal;
