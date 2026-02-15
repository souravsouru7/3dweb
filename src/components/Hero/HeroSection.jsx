import React, { useRef, useEffect } from 'react';
import '../../styles/hero.css';
import { useImagePreloader, getTotalFrames } from '../../hooks/useImagePreloader';

const HeroSection = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);

    // Mutable state for the animation loop - bypasses React render cycle
    const state = useRef({
        targetProgress: 0,
        currentProgress: 0,
        lastFrameIndex: -1
    });

    const { getFrame, manageCache } = useImagePreloader(); // Index 0 just to init hook

    const totalFrames = getTotalFrames();
    const scrollHeight = totalFrames * 5; // 5px per frame

    useEffect(() => {
        // Passive scroll listener
        const handleScroll = () => {
            if (!containerRef.current) return;

            // Calculate scroll progress relative to the container/window
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const maxScroll = scrollHeight - clientHeight;
            const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
            state.current.targetProgress = progress;

            // Preload & Cleanup based on scroll
            const targetFrameIndex = Math.floor(progress * (totalFrames - 1));
            manageCache(targetFrameIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Resize handler for canvas
        const handleResize = () => {
            if (canvasRef.current) {
                // High DPI support
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Scale back down with CSS
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;

                // Force redraw if needed (loop handles it mostly)
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        // Animation Loop
        let rafId;
        const loop = () => {
            // Lerp - Lower value = smoother/heavier feel
            const diff = state.current.targetProgress - state.current.currentProgress;
            // Changed from 0.08 to 0.05 for "buttery" feel
            state.current.currentProgress += diff * 0.05;

            // Clamp small values to stop micro-jitter
            if (Math.abs(diff) < 0.0001) {
                state.current.currentProgress = state.current.targetProgress;
            }

            const frameIndex = Math.floor(state.current.currentProgress * (totalFrames - 1));

            // Optimize: only draw if index changed
            if (frameIndex !== state.current.lastFrameIndex || true) {
                const img = getFrame(frameIndex);
                const canvas = canvasRef.current;
                if (canvas && img) {
                    const ctx = canvas.getContext('2d');

                    // Clear before draw? Not strictly needed for cover but good practice
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // High DPI aware drawing
                    const dpr = window.devicePixelRatio || 1;
                    const cw = canvas.width;  // Actual pixels
                    const ch = canvas.height; // Actual pixels
                    const iw = img.width;
                    const ih = img.height;

                    const scale = Math.max(cw / iw, ch / ih);
                    const x = (cw - iw * scale) / 2;
                    const y = (ch - ih * scale) / 2;

                    ctx.drawImage(img, x, y, iw * scale, ih * scale);
                }
                state.current.lastFrameIndex = frameIndex;
            }

            // Sync Overlay
            if (overlayRef.current) {
                overlayRef.current.style.setProperty('--scroll-progress', state.current.currentProgress);

                const p = state.current.currentProgress;
                const overlay = overlayRef.current;
                const children = overlay.children;
                if (children.length >= 3) {
                    // ... (keep existing overlay logic relies on CSS classes or direct style)
                    // We can reuse the same logic

                    // 1. Headline
                    const headline = children[0];
                    if (p > 0.02 && p < 0.25) {
                        headline.classList.remove('hidden');
                        headline.classList.add('visible');
                    } else {
                        headline.classList.add('hidden');
                        headline.classList.remove('visible');
                    }

                    // 2. Subtext
                    const subtext = children[1];
                    if (p > 0.35 && p < 0.65) {
                        subtext.classList.remove('hidden');
                        subtext.classList.add('visible');
                    } else {
                        subtext.classList.add('hidden');
                        subtext.classList.remove('visible');
                    }

                    // 3. CTA
                    const cta = children[2];
                    if (p > 0.75) {
                        cta.classList.remove('hidden');
                        cta.classList.add('visible');
                    } else {
                        cta.classList.add('hidden');
                        cta.classList.remove('visible');
                    }
                }
            }

            rafId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafId);
        };
    }, [totalFrames, getFrame, manageCache]);

    return (
        <div className="hero-container" ref={containerRef} style={{ height: `${scrollHeight}px` }}>
            <div className="sticky-wrapper">
                <canvas ref={canvasRef} className="hero-canvas" />
                <div ref={overlayRef} className="overlay-content">
                    {/* Introduction Phase */}
                    <div className="text-layer hidden">
                        <div className="label-small">From Grain to Flame</div>
                        <h1 className="headline-main">Crafted in Warmth.<br />Baked with Time.</h1>
                    </div>

                    {/* Midway / Kitchen Phase */}
                    <div className="text-layer hidden">
                        <p className="subtext">
                            Experience the journey of honest bread — <br />
                            from golden fields to the heart of the oven.
                        </p>
                    </div>

                    {/* Finale Phase */}
                    <div className="text-layer hidden">
                        <div className="label-small">The Result</div>
                        <h2 className="headline-main" style={{ fontSize: '4rem' }}>Ready to Taste?</h2>
                        <button className="cta-button">Explore Our Story</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
