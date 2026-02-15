import { useRef, useEffect } from 'react';

const HeroCanvas = ({ currentImage }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !currentImage) return;

        const ctx = canvas.getContext('2d');

        // Resize canvas to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw image maintaining aspect ratio (cover)
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = currentImage.width;
        const ih = currentImage.height;

        const scale = Math.max(cw / iw, ch / ih);
        const x = (cw - iw * scale) / 2;
        const y = (ch - ih * scale) / 2;

        ctx.drawImage(currentImage, x, y, iw * scale, ih * scale);

    }, [currentImage]); // Re-draw when image changes

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                // Trigger redraw? The next frame update will handle it, or we could force it.
                // For now, simpler is better.
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="hero-canvas" />;
};

export default HeroCanvas;
