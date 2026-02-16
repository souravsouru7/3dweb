import React, { useEffect, useRef } from 'react';

const CTASection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            const items = sectionRef.current.querySelectorAll('.cta-fade-item');
            items.forEach((item) => observer.observe(item));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full py-24 md:py-40 px-6 bg-[#0a0a0a] overflow-hidden">
            {/* Oven Warmth Radial Glow - Muted for dark mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(199,161,122,0.08)_0%,transparent_75%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10" ref={sectionRef}>
                {/* Text Content */}
                <div className="space-y-6 mb-12 cta-fade-item opacity-0 translate-y-12 transition-all duration-[1000ms] cubic-bezier(0.22,1,0.36,1)">
                    <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#c7a17a]">
                        Fresh From Our Oven
                    </span>
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-[#f5f0e1] leading-[1.05]">
                        Ready to Taste <br /> Something Warm?
                    </h2>
                    <p className="max-w-xl mx-auto text-lg md:text-xl text-[#f5f0e1]/60 font-light leading-relaxed">
                        Order your favorite breads, cakes, and cookies today — freshly baked and delivered with care.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 cta-fade-item opacity-0 translate-y-12 transition-all duration-[1000ms] delay-200">
                    <button className="w-full sm:w-auto px-10 py-5 bg-[#c7a17a] text-[#0a0a0a] text-base font-semibold tracking-wide rounded-full shadow-lg shadow-[#c7a17a]/15 hover:bg-[#d4af37] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.121.554 4.191 1.605 6.05L0 24l6.095-1.599a11.776 11.776 0 005.95 1.59h.005c6.635 0 12.044-5.407 12.048-12.045a11.83 11.83 0 00-3.585-8.452z" />
                        </svg>
                        WhatsApp Order
                    </button>

                    <button className="w-full sm:w-auto px-10 py-5 bg-white/5 text-[#f5f0e1] text-base font-medium tracking-wide rounded-full hover:bg-white/10 transition-all duration-300">
                        Call Now
                    </button>

                    <button className="w-full sm:w-auto px-10 py-5 border border-white/10 text-[#f5f0e1]/60 text-base font-medium tracking-wide rounded-full hover:border-[#c7a17a] hover:text-[#c7a17a] transition-all duration-300">
                        View Full Menu
                    </button>
                </div>
            </div>
        </section>
    );
};


export default CTASection;
