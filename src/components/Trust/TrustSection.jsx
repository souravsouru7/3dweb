import React, { useEffect, useRef } from 'react';

const TRUST_POINTS = [
    {
        title: 'Fresh Ingredients',
        description: 'Only carefully selected ingredients go into every bake.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    },
    {
        title: 'Same-Day Baking',
        description: 'Prepared daily to ensure warmth, softness, and freshness.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Hygienic Kitchen',
        description: 'Clean, safe, and professionally maintained baking space.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    },
    {
        title: 'Fast Delivery',
        description: 'Quick service so your treats arrive fresh and on time.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
];

const TrustSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-6');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            const children = sectionRef.current.querySelectorAll('.trust-fade-item');
            children.forEach((child) => observer.observe(child));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-[#0a0a0a] py-24 md:py-32 px-6 relative overflow-hidden">
            {/* Subtle radial glow for visual continuity */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_bottom,rgba(199,161,122,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10" ref={sectionRef}>
                {/* Header Block */}
                <div className="text-center mb-20 space-y-4 trust-fade-item opacity-0 translate-y-6 transition-all duration-[800ms] cubic-bezier(0.22,1,0.36,1)">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c7a17a]">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#f5f0e1] leading-tight">
                        Baked with Care. Served with Trust.
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-[#f5f0e1]/60 font-light leading-[1.6]">
                        Every product is prepared with fresh ingredients, clean processes, and the warmth of true home baking.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-12">
                    {TRUST_POINTS.map((point, index) => (
                        <div
                            key={point.title}
                            className="group space-y-6 text-center trust-fade-item opacity-0 translate-y-6 transition-all duration-700"
                            style={{ transitionDelay: `${index * 80}ms` }}
                        >
                            {/* Icon Container */}
                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-[20px] bg-white/[0.02] text-[#c7a17a] border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:bg-[#c7a17a] group-hover:text-[#0a0a0a] group-hover:border-[#c7a17a]/50">
                                {point.icon}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-medium text-[#f5f0e1] tracking-tight">
                                    {point.title}
                                </h3>
                                <p className="text-[15px] text-[#f5f0e1]/60 font-light leading-snug px-2">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default TrustSection;
