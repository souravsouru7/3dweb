import React, { useEffect, useRef } from 'react';

const CATEGORIES = [
    {
        title: 'Cakes',
        description: 'Signature designs for your most cherished moments.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1280&auto=format&fit=crop',
        cta: 'View Items'
    },
    {
        title: 'Breads',
        description: 'Artisanal loaves baked daily with ancient grains.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1280&auto=format&fit=crop',
        cta: 'View Items'
    },
    {
        title: 'Cookies',
        description: 'Batch-made treats using the finest chocolate.',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1280&auto=format&fit=crop',
        cta: 'View Items'
    },
    {
        title: 'Custom Orders',
        description: 'Personalized creations tailored to your vision.',
        image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=1280&auto=format&fit=crop',
        cta: 'View Items'
    }
];

const ProductShowcase = () => {
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
            const children = sectionRef.current.querySelectorAll('.fade-up-item');
            children.forEach((child) => observer.observe(child));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a] overflow-hidden"
            id="products"
            style={{ fontFamily: "'Inter Tight', 'Inter', sans-serif" }}
        >
            {/* Ambient glow for cinematic depth - refined for deeper blacks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(199,161,122,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10" ref={sectionRef}>
                {/* Intro Text */}
                <div className="text-center mb-16 md:mb-24 space-y-4 fade-up-item opacity-0 translate-y-12 transition-all duration-[1000ms] cubic-bezier(0.22,1,0.36,1)">
                    <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#c7a17a]">
                        Fresh Every Morning
                    </span>
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#f5f0e1] leading-[1.1]">
                        Baked for Every Craving
                    </h2>
                    <p className="max-w-xl mx-auto text-lg md:text-xl text-[#f5f0e1]/60 font-light leading-relaxed">
                        From soft breads to celebration cakes — crafted daily in our kitchen.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
                    {CATEGORIES.map((cat, index) => (
                        <div
                            key={cat.title}
                            className={`group relative bg-white/[0.02] p-4 rounded-[20px] backdrop-blur-sm border border-white/5 hover:border-[#c7a17a]/40 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-500 fade-up-item opacity-0 translate-y-12 shadow-[0_0_40px_rgba(0,0,0,0.5)]`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="aspect-[4/5] overflow-hidden rounded-[16px] mb-6 shadow-2xl">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                            </div>

                            <div className="space-y-2 px-2 pb-2">
                                <h3 className="text-2xl font-medium text-[#f5f0e1] tracking-tight">
                                    {cat.title}
                                </h3>
                                <p className="text-sm text-[#f5f0e1]/60 font-light leading-snug min-h-[40px]">
                                    {cat.description}
                                </p>
                                <button className="mt-4 w-full py-3 px-6 bg-[#c7a17a]/10 text-[#c7a17a] border border-[#c7a17a]/30 text-sm font-medium tracking-wide uppercase rounded-lg hover:bg-[#c7a17a] hover:text-[#0a0a0a] transition-all duration-300">
                                    View Items
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
