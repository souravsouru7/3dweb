import React from 'react';

const HeroOverlays = ({ progress }) => {
    // Logic to determine visibility based on progress ranges
    // Total frames: 768. 
    // Seq1 (0-192): Wheat field -> Label + Headline
    // Seq2 (192-384): Bakery Door -> Headline fades out? Or stays?
    // Seq3 (384-576): Kitchen -> Subtext
    // Seq4 (576-768): Oven -> CTA

    // Normalized progress 0 to 1

    // 1. Label + Headline: Fade in 0.05 -> 0.15. Stay until 0.25. Fade out 0.35
    const showHeadline = progress > 0.02 && progress < 0.25;

    // 2. Journey Subtext: Appear 0.40 -> 0.60
    const showSubtext = progress > 0.35 && progress < 0.65;

    // 3. CTA: Appear 0.75 -> 1.0
    const showCTA = progress > 0.75;

    return (
        <div className="overlay-content">
            {/* Introduction Phase */}
            <div className={`text-layer ${showHeadline ? 'visible' : 'hidden'}`}>
                <div className="label-small">From Grain to Flame</div>
                <h1 className="headline-main">Crafted in Warmth.<br />Baked with Time.</h1>
            </div>

            {/* Midway / Kitchen Phase */}
            <div className={`text-layer ${showSubtext ? 'visible' : 'hidden'}`}>
                <p className="subtext" style={{ fontSize: '2rem' }}>
                    Experience the journey of honest bread — <br />
                    from golden fields to the heart of the oven.
                </p>
            </div>

            {/* Finale Phase */}
            <div className={`text-layer ${showCTA ? 'visible' : 'hidden'}`}>
                <h2 className="headline-main" style={{ fontSize: '3rem' }}>Ready to Taste?</h2>
                <button className="cta-button">Explore Our Story</button>
            </div>

            {/* Scroll indicator for start */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                opacity: progress < 0.1 ? 1 : 0,
                transition: 'opacity 0.5s',
                color: 'var(--bakery-gold)'
            }}>
                ↓ Scroll to Begin
            </div>
        </div>
    );
};

export default HeroOverlays;
