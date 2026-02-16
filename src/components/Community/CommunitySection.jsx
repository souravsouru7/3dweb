import React, { useEffect, useRef } from 'react';

const PHOTOS = [
    {
        url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1280&auto=format&fit=crop',
        alt: 'Baker at work',
        aspect: 'aspect-[3/4]'
    },
    {
        url: 'https://images.unsplash.com/photo-1535141192574-5d4897c1263d?q=80&w=1280&auto=format&fit=crop',
        alt: 'Cake cutting moment',
        aspect: 'aspect-square'
    },
    {
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1280&auto=format&fit=crop',
        alt: 'Local cafe atmosphere',
        aspect: 'aspect-video'
    },
    {
        url: 'https://images.unsplash.com/photo-1544434553-94df6879e96f?q=80&w=1280&auto=format&fit=crop',
        alt: 'Fresh artisanal bread',
        aspect: 'aspect-[4/5]'
    },
    {
        url: 'https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=1280&auto=format&fit=crop',
        alt: 'Premium pastry box',
        aspect: 'aspect-square'
    },
    {
        url: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?q=80&w=1280&auto=format&fit=crop',
        alt: 'Freshly baked cookies',
        aspect: 'aspect-[3/2]'
    }
];

const TESTIMONIALS = [
    {
        quote: "The bread feels homemade and always fresh. It's become our morning ritual.",
        author: "Ananya R.",
        location: "Bandra, Mumbai"
    },
    {
        quote: "Ordered for a birthday and everyone loved it. The detail on the cake was stunning.",
        author: "Rahul M.",
        location: "Indiranagar, Bangalore"
    },
    {
        quote: "Clean, tasty, and delivered warm. The packaging itself feels like a gift.",
        author: "Sneha K.",
        location: "Jubilee Hills, Hyderabad"
    }
];

const CommunitySection = () => {
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
            const items = sectionRef.current.querySelectorAll('.community-fade-item');
            items.forEach((item) => observer.observe(item));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-[#0f0f0f] py-24 md:py-32 px-6 relative">
            <div className="max-w-7xl mx-auto" ref={sectionRef}>
                {/* Header Block */}
                <div className="text-center mb-20 space-y-4 community-fade-item opacity-0 translate-y-12 transition-all duration-[1000ms] cubic-bezier(0.22,1,0.36,1)">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c7a17a]">
                        Real Moments
                    </span>
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#f5f0e1] leading-tight">
                        Loved by Our Community
                    </h2>
                    <p className="max-w-xl mx-auto text-lg md:text-xl text-[#f5f0e1]/60 font-light leading-relaxed">
                        From everyday treats to special celebrations — our customers share the joy of fresh baking.
                    </p>
                </div>

                {/* Photo Gallery Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mb-24 community-fade-item opacity-0 translate-y-12 transition-all duration-[1200ms]">
                    {PHOTOS.map((photo, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-[16px] bg-white/[0.03] group shadow-2xl"
                        >
                            <img
                                src={photo.url}
                                alt={photo.alt}
                                loading="lazy"
                                className={`w-full ${photo.aspect} object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105`}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, index) => (
                        <div
                            key={index}
                            className="bg-white/[0.02] p-8 md:p-10 rounded-[24px] border border-white/5 backdrop-blur-sm space-y-6 community-fade-item opacity-0 translate-y-12 transition-all duration-[800ms] hover:border-[#c7a17a]/30 transition-all duration-300"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Stars */}
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-[#c7a17a]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <blockquote className="text-[17px] md:text-[18px] text-[#f5f0e1]/90 font-light italic leading-relaxed">
                                "{t.quote}"
                            </blockquote>

                            <div className="space-y-1">
                                <p className="text-sm font-medium text-[#f5f0e1] tracking-wide uppercase">{t.author}</p>
                                <p className="text-xs text-[#c7a17a]/60 font-medium tracking-wider uppercase">{t.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
