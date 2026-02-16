import React, { useState, useEffect } from 'react';
import HeroSection from './components/Hero/HeroSection';
import ProductShowcase from './components/Products/ProductShowcase';
import TrustSection from './components/Trust/TrustSection';
import CommunitySection from './components/Community/CommunitySection';
import CTASection from './components/CTA/CTASection';
import Footer from './components/Footer/Footer';
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
    <div className="app bg-[#0a0a0a]">
      <Loader progress={loadingProgress} onComplete={() => setIsLoaded(true)} />

      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }}>
        <Navbar />
        <HeroSection />
        <ProductShowcase />
        <TrustSection />
        <CommunitySection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
