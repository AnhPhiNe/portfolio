import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Preloader from './components/Preloader';
import NeuralCanvas from './components/NeuralCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Component to lock Lenis scroll
function ScrollLocker({ loading }) {
  const lenis = useLenis();
  
  useEffect(() => {
    if (!lenis) return;
    if (loading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, loading]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  // Force scroll to top on refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Prevent default scrollbar flashing
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, duration: 1.5, wheelMultiplier: 1.1 }}>
      <ScrollLocker loading={loading} />
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* 3D Neural Canvas Background */}
        <NeuralCanvas />

        {/* Main Page Layout */}
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
