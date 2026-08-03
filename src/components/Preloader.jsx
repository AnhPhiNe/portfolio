import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 400); // Wait a bit at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100vh', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#05070a', // Matches var(--bg-dark)
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'var(--font-mono)'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: '4rem',
          fontWeight: 800,
          color: 'var(--accent-cyan)',
          textShadow: 'var(--glow-cyan)',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {Math.min(progress, 100)}%
      </motion.div>
      <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '3px' }}>
        SYSTEM INITIALIZING...
      </div>
      
      {/* Progress bar line */}
      <div style={{ width: '250px', height: '2px', background: 'rgba(255,255,255,0.1)', marginTop: '40px', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div 
          style={{ height: '100%', background: 'var(--accent-cyan)', boxShadow: 'var(--glow-cyan)' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
