import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress.
 * @returns {number} Scroll progress from 0 to 1
 */
export const useScrollProgress = (scrollContainerRef) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let requestId;

        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            // Calculate max scroll distance
            const maxScroll = scrollHeight - clientHeight;
            if (maxScroll <= 0) {
                setProgress(0);
                return;
            }

            // Calculate progress
            const currentProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

            setProgress(currentProgress);
        };

        const onScroll = () => {
            if (!requestId) {
                requestId = requestAnimationFrame(() => {
                    handleScroll();
                    requestId = null;
                });
            }
        };

        window.addEventListener('scroll', onScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (requestId) cancelAnimationFrame(requestId);
        };
    }, [scrollContainerRef]);

    return progress;
};
