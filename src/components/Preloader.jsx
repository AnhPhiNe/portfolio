import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Generate pieces for the 3x3x3 Rubik's cube
const pieces = [];
let corePiece = null;

for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      const facesData = ['front', 'back', 'right', 'left', 'top', 'bottom'].map(face => ({
        name: face,
        randX: (Math.random() - 0.5) * 1000,
        randY: (Math.random() - 0.5) * 1000,
        randZ: (Math.random() - 0.5) * 1000,
        randRotX: Math.random() * 720,
        randRotY: Math.random() * 720,
        randRotZ: Math.random() * 720,
      }));

      const dirX = x === 0 ? (Math.random() - 0.5) * 2 : x + (Math.random() - 0.5) * 1.5;
      const dirY = y === 0 ? (Math.random() - 0.5) * 2 : y + (Math.random() - 0.5) * 1.5;
      const dirZ = z === 0 ? Math.random() * 2 : z + (Math.random() - 0.5) * 1.5; // Bias slightly forward
      
      const force = 1000 + Math.random() * 1500;

      const p = { 
        x, y, z, 
        randX: (Math.random() - 0.5) * 800, // Reduced parent scatter to make room for face scatter
        randY: (Math.random() - 0.5) * 800,
        randZ: (Math.random() - 0.5) * 800,
        explodeX: dirX * force,
        explodeY: dirY * force,
        explodeZ: dirZ * force,
        randRotX: Math.random() * 720 - 360,
        randRotY: Math.random() * 720 - 360,
        randRotZ: Math.random() * 720 - 360,
        facesData
      };

      if (x === 0 && y === 0 && z === 0) {
        corePiece = p;
      } else {
        pieces.push(p);
      }
    }
  }
}

// Random shuffle for outer pieces only
const shuffledOuter = pieces.map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

// The Core piece MUST be the very first piece to assemble (the seed)
const shuffledPieces = [corePiece, ...shuffledOuter];

// Generate random floating particles
const particles = Array.from({ length: 35 }).map(() => ({
  id: Math.random(),
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 1, // Slightly larger particles
  duration: Math.random() * 10 + 8,
  delay: Math.random() * -20
}));

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress (Smoother, slightly slower updates for cinematic effect)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait 1800ms to let the last pieces assemble and the user to admire the full cube
          setTimeout(() => setIsComplete(true), 1800);
          // Wait an additional 1600ms for the explosion to finish before unmounting
          setTimeout(() => onComplete(), 3400); 
          return 100;
        }
        // Increment smoothly (1-2% every 60ms = ~4 seconds total load time)
        return prev + Math.floor(Math.random() * 2) + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'var(--font-mono)',
        overflow: 'hidden',
        pointerEvents: isComplete ? 'none' : 'auto'
      }}
    >
      {/* Background Layer (Fades out early to reveal main page during explosion) */}
      <motion.div 
        animate={{ opacity: isComplete ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(0, 243, 255, 0.05) 35%, #05070a 80%)',
          backgroundColor: '#05070a',
          zIndex: 0
        }}
      />

      {/* High-tech Grid Background Overlay */}
      <motion.div 
        animate={{ opacity: isComplete ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)',
          zIndex: 0
        }} 
      />

      {/* Floating Particles */}
      <motion.div 
        animate={{ opacity: isComplete ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
      >
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -200],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.size > 2 ? 'var(--accent-cyan)' : 'var(--accent-purple)',
              borderRadius: '50%',
              boxShadow: `0 0 10px ${p.size > 2 ? 'var(--accent-cyan)' : 'var(--accent-purple)'}`
            }}
          />
        ))}
      </motion.div>

      {/* Centered Content Group */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translateY(-5%)', zIndex: 1 }}>
        
        {/* Assembling Holographic Rubik's Cube */}
        <div style={{ perspective: '1600px', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            animate={{ 
              rotateX: [30, 390], 
              rotateY: [45, 405],
            }}
            transition={{ 
              duration: 16, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              width: '0px', height: '0px',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            {shuffledPieces.map((p, idx) => {
              const pX = p.x * 54; // Scaled up: 45px + 9px gap
              const pY = p.y * 54;
              const pZ = p.z * 54;
              
              // The piece itself locks into the core at 'threshold'
              const threshold = (idx / 27) * 100;
              const isAssembled = progress >= threshold;
              
              // The faces of the piece form a complete small cube 15% BEFORE the piece reaches the core
              const faceThreshold = Math.max(0, threshold - 15);
              const isFacesAssembled = progress >= faceThreshold;

              const isCore = p.x === 0 && p.y === 0 && p.z === 0;
              const rgbaColor = isCore ? 'rgba(168, 85, 247, 0.25)' : 'rgba(0, 243, 255, 0.15)';
              const borderRgba = isCore ? 'rgba(168, 85, 247, 0.8)' : 'rgba(0, 243, 255, 0.6)';

              return (
                <motion.div
                key={`${p.x}-${p.y}-${p.z}`}
                initial={isCore ? { scale: 0, y: -200, z: -500 } : false}
                animate={{
                  x: isComplete ? p.explodeX : (isAssembled ? pX : pX + p.randX),
                  y: isComplete ? p.explodeY : (isAssembled ? pY : pY + p.randY),
                  z: isComplete ? p.explodeZ : (isAssembled ? pZ : pZ + p.randZ),
                  rotateX: isComplete ? p.randRotX : (isAssembled ? 0 : p.randRotX),
                  rotateY: isComplete ? p.randRotY : (isAssembled ? 0 : p.randRotY),
                  rotateZ: isComplete ? p.randRotZ : (isAssembled ? 0 : p.randRotZ),
                  scale: isComplete ? 1.5 : (isAssembled ? 1 : 0.6)
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: isComplete ? 30 : 150, 
                  damping: isComplete ? 20 : 15 
                }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: '45px', height: '45px', // Scaled up size
                  marginLeft: '-22.5px', marginTop: '-22.5px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {p.facesData.map((fData) => {
                  const face = fData.name;
                  const faceConfigs = {
                    front: { rx: 0, ry: 0 },
                    back: { rx: 0, ry: 180 },
                    right: { rx: 0, ry: 90 },
                    left: { rx: 0, ry: -90 },
                    top: { rx: 90, ry: 0 },
                    bottom: { rx: -90, ry: 0 },
                  };
                  const conf = faceConfigs[face];
                  
                  let xOffset = 0, yOffset = 0, zOffset = 0;
                  let rotX = conf.rx, rotY = conf.ry, rotZ = 0;
                  let zDist = 22.5; // Base distance from center of piece

                  if (isComplete) {
                    // Double Shatter: Fragments scatter violently in all directions!
                    xOffset = fData.randX * 1.5;
                    yOffset = fData.randY * 1.5;
                    zOffset = fData.randZ * 1.5;
                    rotX = conf.rx + fData.randRotX;
                    rotY = conf.ry + fData.randRotY;
                    rotZ = fData.randRotZ;
                    zDist = 100;
                  } else if (isCore && !isComplete) {
                    // Core is always perfectly formed
                  } else if (!isFacesAssembled) {
                    // Shards scattered randomly in 3D space
                    xOffset = fData.randX;
                    yOffset = fData.randY;
                    zOffset = fData.randZ;
                    rotX = fData.randRotX;
                    rotY = fData.randRotY;
                    rotZ = fData.randRotZ;
                    zDist = 0;
                  }

                  return (
                    <motion.div
                      key={face}
                      initial={isCore ? { opacity: 0 } : false}
                      animate={{ 
                        opacity: isComplete ? 0 : (isFacesAssembled ? 1 : 0.6),
                        transform: `translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translateZ(${zDist}px)`
                      }}
                      transition={{ 
                        duration: isComplete ? 1.5 : 0.8, // Increased from 0.8 to 1.5s for explosion
                        ease: "easeOut" 
                      }}
                      style={{
                        position: 'absolute',
                        width: '100%', height: '100%',
                        background: rgbaColor,
                        border: `1.5px solid ${borderRgba}`,
                        boxShadow: `inset 0 0 12px ${rgbaColor}`,
                        backdropFilter: 'blur(3px)'
                      }}
                    />
                  );
                })}
              </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Text Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isComplete ? 0 : 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '4px',
              textShadow: '0 0 20px rgba(0, 243, 255, 0.4)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            <span>{Math.min(progress, 100)}</span>
            <span style={{ position: 'absolute', left: '100%', paddingLeft: '8px', color: 'var(--accent-cyan)', fontSize: '0.5em' }}>%</span>
          </motion.div>
          
          <motion.div 
            animate={{ opacity: isComplete ? 0 : 1 }}
            style={{ 
              marginTop: '16px', 
              fontSize: '1rem', 
              color: 'var(--text-muted)', 
              letterSpacing: '6px', 
              paddingLeft: '6px' 
            }}
          >
            SYSTEM INITIALIZING...
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default Preloader;
