import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mb-24">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-medium tracking-tight text-[#f5f0e1]">
                            Bakery Collection
                        </h2>
                        <p className="text-base text-[#f5f0e1]/50 font-light leading-relaxed max-w-xs">
                            Freshly baked every day with care, warmth, and honest ingredients. Est. Venice 2026.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-[#c7a17a]/40">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {['Home', 'Products', 'About', 'Contact'].map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase()}`} className="text-[#f5f0e1]/60 hover:text-[#c7a17a] transition-colors duration-300 font-light">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-[#c7a17a]/40">
                            Contact Us
                        </h3>
                        <div className="space-y-4 text-[#f5f0e1]/60 font-light">
                            <p>+91 98765 43210</p>
                            <p>order@bakeryscrolly.com</p>
                            <p>123 Artisanal Way, <br /> Gourmet District, Venice</p>
                            <div className="pt-2">
                                <p className="text-sm font-medium text-[#c7a17a]/60">Mon – Sun: 8am – 10pm</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-[#f5f0e1]/30 font-light tracking-wide italic">
                        © 2026 Bakery Collection — Made with warmth.
                    </p>

                    <div className="flex items-center space-x-6">
                        {['Instagram', 'Facebook', 'Twitter'].map(social => (
                            <a key={social} href="#" className="text-[#f5f0e1]/30 hover:text-[#c7a17a] transition-colors duration-300">
                                <span className="text-xs font-medium tracking-widest uppercase">{social}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
