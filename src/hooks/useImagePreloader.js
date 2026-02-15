import { useRef, useEffect, useCallback } from 'react';

const SEQUENCES = [
    { path: '/seq1', count: 192, startFrame: 0 },
    { path: '/seq2', count: 192, startFrame: 192 },
    { path: '/seq3', count: 192, startFrame: 384 },
    { path: '/seq4', count: 192, startFrame: 576 },
];

const TOTAL_FRAMES = 192 * 4;
const BUFFER_SIZE = 60; // Keep 60 frames behind and ahead
const BATCH_SIZE = 10;  // Load 10 frames at a time

export const useImagePreloader = () => {
    // 1. Use Ref instead of State to store images. 
    // This prevents React from re-rendering the component 700+ times as images load.
    const imagesRef = useRef(new Map());
    const loadingRef = useRef(new Set());

    // 2. Load a specific frame
    const loadFrame = useCallback((globalIndex) => {
        return new Promise((resolve) => {
            if (imagesRef.current.has(globalIndex)) {
                resolve(imagesRef.current.get(globalIndex));
                return;
            }
            if (loadingRef.current.has(globalIndex) || globalIndex < 0 || globalIndex >= TOTAL_FRAMES) {
                resolve(null);
                return;
            }

            // Determine path
            let seqIndex = 0;
            let localIndex = globalIndex;
            if (globalIndex >= 576) { seqIndex = 3; localIndex = globalIndex - 576; }
            else if (globalIndex >= 384) { seqIndex = 2; localIndex = globalIndex - 384; }
            else if (globalIndex >= 192) { seqIndex = 1; localIndex = globalIndex - 192; }

            const seqPath = SEQUENCES[seqIndex].path;
            const frameNumber = (localIndex + 1).toString().padStart(5, '0');
            const src = `${seqPath}/${frameNumber}.png`;

            loadingRef.current.add(globalIndex);

            const img = new Image();
            img.src = src;
            img.onload = () => {
                imagesRef.current.set(globalIndex, img);
                loadingRef.current.delete(globalIndex);
                resolve(img);
            };
            img.onerror = () => {
                loadingRef.current.delete(globalIndex);
                resolve(null);
            };
        });
    }, []);

    // Load first sequence (192 frames) for seamless start
    const cancelLoadRef = useRef(false);

    const preloadInitialSequence = useCallback(async (onProgress) => {
        const count = 192; // Load full first sequence
        let loaded = 0;

        // Load in chunks to not freeze UI completely
        const chunkSize = 10;
        for (let i = 0; i < count; i += chunkSize) {
            if (cancelLoadRef.current) break;

            const promises = [];
            for (let j = i; j < Math.min(i + chunkSize, count); j++) {
                promises.push(loadFrame(j));
            }
            await Promise.all(promises);
            loaded += promises.length;
            onProgress(Math.min((loaded / count) * 100, 100));

            // Small breathing room for UI
            await new Promise(r => setTimeout(r, 0));
        }
    }, [loadFrame]);

    // 3. Sliding Window Manager
    // This function should be called by the scroll loop to maintain the cache
    const manageCache = useCallback((currentIndex) => {
        const start = Math.max(0, currentIndex - BUFFER_SIZE);
        const end = Math.min(TOTAL_FRAMES - 1, currentIndex + BUFFER_SIZE);

        // Preload visible range + buffer
        for (let i = start; i <= end; i++) {
            loadFrame(i); // Fire and forget in background
        }

        // Cleanup frames that are far away to free memory
        // RAM usage: 700 frames * ~5MB = 3.5GB. We MUST cleanup.
        for (const key of imagesRef.current.keys()) {
            if (key < start - 20 || key > end + 20) {
                const img = imagesRef.current.get(key);
                if (img) {
                    img.src = ''; // Help GC
                    img.onload = null;
                }
                imagesRef.current.delete(key);
            }
        }
    }, [loadFrame]);

    const getFrame = useCallback((index) => {
        return imagesRef.current.get(index);
    }, []);

    return { getFrame, manageCache, preloadInitialSequence };
};

export const getTotalFrames = () => TOTAL_FRAMES;
