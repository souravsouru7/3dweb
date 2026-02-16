import { useRef, useEffect, useCallback } from 'react';

const CLOUDINARY_BASE = "https://res.cloudinary.com/dpqgwmctl/image/upload/f_auto,q_auto,w_1280/bakery";

const SEQUENCES = [
    { path: 'seq1', count: 192, startFrame: 0 },
    { path: 'seq2', count: 192, startFrame: 192 },
    { path: 'seq3', count: 192, startFrame: 384 },
    { path: 'seq4', count: 192, startFrame: 576 },
];

const TOTAL_FRAMES = 192 * 4;
const BUFFER_SIZE = 60; // Keep 60 frames behind and ahead

// Static cache shared across all instances of the hook
const globalImagesMap = new Map();
const globalLoadingSet = new Set();

export const useImagePreloader = () => {
    // 2. Load a specific frame
    const loadFrame = useCallback((globalIndex) => {
        return new Promise((resolve) => {
            if (globalImagesMap.has(globalIndex)) {
                resolve(globalImagesMap.get(globalIndex));
                return;
            }
            if (globalLoadingSet.has(globalIndex) || globalIndex < 0 || globalIndex >= TOTAL_FRAMES) {
                resolve(null);
                return;
            }

            // Determine path
            let seqIndex = 0;
            if (globalIndex >= 576) { seqIndex = 3; }
            else if (globalIndex >= 384) { seqIndex = 2; }
            else if (globalIndex >= 192) { seqIndex = 1; }

            const seqPath = SEQUENCES[seqIndex].path;
            const localIndex = globalIndex - (seqIndex * 192);
            const frameNumber = (localIndex + 1).toString().padStart(5, '0');
            const src = `${CLOUDINARY_BASE}/${seqPath}/${frameNumber}`;

            globalLoadingSet.add(globalIndex);

            const img = new Image();
            img.src = src;
            img.onload = () => {
                globalImagesMap.set(globalIndex, img);
                globalLoadingSet.delete(globalIndex);
                resolve(img);
            };
            img.onerror = () => {
                globalLoadingSet.delete(globalIndex);
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
        const chunkSize = 15; // Slightly larger chunk for faster start
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
    const manageCache = useCallback((currentIndex) => {
        const start = Math.max(0, currentIndex - BUFFER_SIZE);
        const end = Math.min(TOTAL_FRAMES - 1, currentIndex + BUFFER_SIZE);

        // Preload visible range + buffer
        for (let i = start; i <= end; i++) {
            loadFrame(i);
        }

        // Cleanup far away frames
        for (const key of globalImagesMap.keys()) {
            if (key < start - 40 || key > end + 40) {
                const img = globalImagesMap.get(key);
                if (img) {
                    img.src = '';
                    img.onload = null;
                }
                globalImagesMap.delete(key);
            }
        }
    }, [loadFrame]);

    const getFrame = useCallback((index) => {
        return globalImagesMap.get(index);
    }, []);

    return { getFrame, manageCache, preloadInitialSequence };
};

export const getTotalFrames = () => TOTAL_FRAMES;

