import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Star, Activity, Award } from 'lucide-react';
import { academicTimeline, achievements } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';

const EducationSection = () => {
  return (
    <section id="education" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-tag" style={{ justifyContent: 'center' }}>// TIMELINE & ACCOLADES</span>
          <h2 className="section-title" style={{ justifyContent: 'center' }}>
            Education & <span className="gradient-text-cyan">Achievements</span>
          </h2>
        </div>

        <div className="edu-split-layout">
          
          {/* Left Column: Academic Timeline */}
          <SpotlightCard className="academic-column" glowColor="rgba(0, 243, 255, 0.15)" style={{
            background: 'rgba(10, 15, 30, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 800, 
              color: '#fff', 
              marginBottom: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.6rem' }}>🎓</span> 
              Academic Journey
            </h3>

            <div className="left-timeline-container">
              <div className="left-timeline-line" />
              
              {academicTimeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="left-timeline-item"
                >
                  <div className="left-timeline-node">
                    <div className="node-inner" />
                  </div>
                  
                  <div className="left-timeline-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <h4 style={{ 
                        fontSize: '1.15rem', 
                        fontWeight: 700, 
                        color: '#fff', 
                        margin: 0,
                        marginTop: '-2px',
                        letterSpacing: '0.2px'
                      }}>
                        {item.title}
                      </h4>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontFamily: 'var(--font-mono)', 
                        color: 'var(--accent-cyan)', 
                        background: 'rgba(0, 243, 255, 0.05)', 
                        border: '1px solid rgba(0, 243, 255, 0.2)',
                        padding: '2px 10px', 
                        borderRadius: 'var(--radius-full)',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.period}
                      </span>
                    </div>

                    <div style={{ 
                      fontSize: '0.95rem', 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      {item.institution}
                    </div>

                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      margin: 0, 
                      lineHeight: 1.5
                    }}>
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '10px', 
                        marginTop: '12px'
                      }}>
                        {item.highlights.map((h, hIdx) => (
                          <span key={hIdx} style={{ 
                            fontSize: '0.8rem', 
                            color: 'var(--text-main)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px', 
                            background: 'rgba(255,255,255,0.03)', 
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '4px 12px', 
                            borderRadius: '8px' 
                          }}>
                            <Star size={14} color="var(--accent-yellow)" /> {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>

          {/* Right Column: Achievements Log */}
          <SpotlightCard className="achievements-column" glowColor="rgba(157, 0, 255, 0.15)" style={{
            background: 'rgba(10, 15, 30, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 800, 
              color: '#fff', 
              marginBottom: '30px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '12px' 
            }}>
              <span style={{ fontSize: '1.6rem' }}>🏆</span> Honors & Awards
            </h3>

            <div className="achievements-container">
              <div className="achievements-grid">
                {achievements.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="achievement-list-item"
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
                    <motion.span 
                      style={{ fontSize: '1.3rem', display: 'inline-block', transformOrigin: 'center', flexShrink: 0, marginTop: '-2px' }}
                      animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      🌟
                    </motion.span>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.4, letterSpacing: '0.2px' }}>
                        {item.title}
                      </h5>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>
                          {item.issuer}
                        </span>
                        <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.5)', whiteSpace: 'nowrap' }}>
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </SpotlightCard>
        </div>
      </div>

      <style>{`
        .edu-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        @media (max-width: 992px) {
          .edu-split-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Left Timeline Styles */
        .left-timeline-container {
          position: relative;
          padding-left: 30px;
        }

        .left-timeline-line {
          position: absolute;
          left: 0;
          top: 8px;
          bottom: -40px;
          width: 2px;
          background: linear-gradient(to bottom, rgba(0, 243, 255, 0.4) 0%, rgba(0, 243, 255, 0.05) 100%);
        }

        .left-timeline-item {
          position: relative;
          margin-bottom: 50px;
        }

        .left-timeline-node {
          position: absolute;
          left: -37px; /* 30px padding + 1px line width + radius */
          top: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--bg-dark);
          border: 2px solid var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
        }

        .node-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-cyan);
        }

        /* Achievements Grid Styles */
        .achievements-container {
          position: relative;
        }

        .achievements-grid {
          display: flex;
          flex-direction: column;
          max-height: 240px;
          overflow-y: auto;
          padding-right: 12px;
        }

        /* Custom Scrollbar for Achievements */
        .achievements-grid::-webkit-scrollbar {
          width: 6px;
        }
        
        .achievements-grid::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        
        .achievements-grid::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        .achievements-grid::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .achievement-list-item {
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          transition: all 0.3s ease;
        }
        
        .achievement-list-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .achievement-list-item:hover {
          background: rgba(255, 255, 255, 0.02);
          padding-left: 12px;
          padding-right: 12px;
          border-radius: 8px;
        }

        @media (max-width: 992px) {
          .edu-split-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        @media (max-width: 600px) {
          .achievement-list-item {
            padding: 12px 0;
          }
        }
      `}</style>
    </section>
  );
};

export default EducationSection;
