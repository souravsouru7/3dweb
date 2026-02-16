import React, { useState, useEffect } from 'react';
import HeroSection from './components/Hero/HeroSection';
import Navbar from './components/UI/Navbar';
import Loader from './components/UI/Loader';
import { useImagePreloader } from './hooks/useImagePreloader';
import './App.css';

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { preloadInitialSequence } = useImagePreloader();

  useEffect(() => {
    // Start preloading the first sequence (192 frames)
    // Since cache is static/global, this will fill the map for HeroSection
    preloadInitialSequence((progress) => {
      setLoadingProgress(progress);
    }).then(() => {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoaded(true);
      }, 800);
    });
  }, [preloadInitialSequence]);

  return (
    <div className="app">
      <Loader progress={loadingProgress} onComplete={() => setIsLoaded(true)} />

      {/* Show Navbar and Hero only, but maybe keep them mounted behind loader for instant reveal? */}
      {/* Opacity transition is handled by the Loader's fade out, but let's ensure visibility */}
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}>
        <Navbar />
        <HeroSection />

        <div style={{ height: '50vh', background: '#1a1a1a', color: '#c7a17a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: "'Inter Tight', sans-serif" }}>Keep scrolling for the Bakery Collection...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
