import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Terminal, GraduationCap, BookOpen, Target } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import NeuralSkillGraph from './NeuralSkillGraph';

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing Effect Loop
  useEffect(() => {
    const currentRole = personalData.typingRoles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalData.typingRoles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Glow Orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(129, 140, 248, 0.08) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div className="container" style={{ height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '100px', alignItems: 'stretch' }} className="hero-grid">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text-column"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* --- Block 1: Identity (Top Aligned) --- */}
            <div style={{ width: '100%', transform: 'translateY(40px)' }}>
              {/* Top Badge */}
              <div className="glow-badge" style={{ marginBottom: '24px' }}>
                <Sparkles size={16} color="var(--accent-cyan)" />
                <span>{personalData.subtitle}</span>
              </div>

              {/* Main Title */}
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
                Hello, I'm <span className="gradient-text-cyan">{personalData.shortName}</span>
              </h1>

              {/* Animated Typing Role */}
              <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '16px', height: '36px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Terminal size={22} color="var(--accent-cyan)" strokeWidth={2.5} style={{ opacity: 0.8 }} />
                <span>{displayText}</span>
                <span style={{ animation: 'pulse-animation 1s infinite', color: '#fff' }}>|</span>
              </div>
            </div>

            {/* --- Block 2: Info & Action (Vertically Centered in available space) --- */}
            <div style={{ width: '100%', marginTop: 'auto', marginBottom: 'auto', padding: '20px 0' }}>
              {/* Bio Paragraph */}
              <p style={{ color: 'var(--text-muted)', fontSize: '1.08rem', marginBottom: '32px', maxWidth: '560px', lineHeight: 1.75 }}>
                {personalData.bioSummary}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <a href="#projects" className="btn-primary">
                  View Projects <ArrowRight size={18} />
                </a>
                <a href="#contact" className="btn-secondary">
                  Contact Me
                </a>
              </div>
            </div>

            {/* --- Block 3: Stats (Bottom Aligned) --- */}
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {personalData.quickStats.map((stat, idx) => {
                
                // Determine icon and color scheme based on label
                let Icon = Target;
                let color = '#F43F5E';
                let glowColor = 'rgba(244, 63, 94, 0.5)';
                let bg = 'rgba(244, 63, 94, 0.1)';
                
                if (stat.label.includes('GPA')) {
                  Icon = GraduationCap;
                  color = '#10B981';
                  glowColor = 'rgba(16, 185, 129, 0.5)';
                  bg = 'rgba(16, 185, 129, 0.1)';
                } else if (stat.label.includes('TOEIC')) {
                  Icon = BookOpen;
                  color = '#3B82F6';
                  glowColor = 'rgba(59, 130, 246, 0.5)';
                  bg = 'rgba(59, 130, 246, 0.1)';
                }

                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ 
                      y: -4, 
                      boxShadow: `0 12px 32px ${glowColor}`, 
                      borderColor: color 
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ 
                      background: 'linear-gradient(145deg, rgba(20, 25, 35, 0.9) 0%, rgba(10, 14, 20, 0.8) 100%)', 
                      padding: '14px 16px', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(255, 255, 255, 0.08)', 
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Background subtle gradient */}
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: bg, filter: 'blur(30px)', borderRadius: '50%' }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                        {stat.label}
                      </div>
                      <div style={{ background: bg, padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={14} color={color} />
                      </div>
                    </div>

                    <div style={{ 
                        fontSize: stat.value.length > 8 ? '1.1rem' : '1.4rem', 
                        fontWeight: 800, 
                        color: '#fff', 
                        fontFamily: 'var(--font-heading)', 
                        display: 'flex', 
                        alignItems: 'baseline', 
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2
                      }}>
                      {stat.value === '___' ? (
                        <span style={{ opacity: 0.25, letterSpacing: '1px' }}>____</span>
                      ) : (
                        stat.value
                      )}
                      {stat.unit && <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)', marginLeft: '6px', fontWeight: 600 }}>{stat.unit}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Borderless Holographic AI Core Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <NeuralSkillGraph />
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid p { margin-left: auto; margin-right: auto; }
          .hero-grid .glow-badge { margin-left: auto; margin-right: auto; }
          .hero-grid div[style*="display: flex"] { justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
