import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Flame, Target, BookOpen, Flag, GraduationCap } from 'lucide-react';
import { personalData } from '../data/portfolioData';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-tag">// ABOUT ME</span>
          <h2 className="section-title">
            Philosophy <span className="gradient-text-cyan">&amp; Principles</span>
          </h2>
        </div>

        <div className="floating-grid">
          
          {/* Left Column - Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="floating-col-left"
          >
            {/* Top group: title + bio */}
            <div>
              <div className="floating-title-wrapper">
                <User size={24} color="var(--accent-cyan)" />
                <h3 className="floating-title">Background &amp; Philosophy</h3>
              </div>
              
              <p className="floating-bio">
                I believe strong engineering comes from understanding why a system works before trying to make it work better. I'd rather spend extra time reading the theory behind a technique than copy it blindly. That habit is sustained by a simple standard I hold myself to, in code and in life: consistency beats intensity. Small, deliberate progress compounds in learning, in debugging, in shipping far more reliably than short bursts of motivation.
              </p>
            </div>

            {/* Bottom: CTA button pinned to bottom */}
            <div style={{ paddingTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="terminal-cta-btn">
                <span className="prompt">{'>_'}</span> ./get_resume.pdf <span className="cursor"></span>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Skills list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="floating-col-right"
          >
            <div className="cards-wrapper">
            {[
              {
                icon: Shield,
                color: 'var(--accent-cyan)',
                title: 'Discipline',
                desc: 'Consistency over intensity.'
              },
              {
                icon: Flame,
                color: 'var(--accent-purple)',
                title: 'Perseverance',
                desc: 'Embracing challenges as opportunities.'
              },
              {
                icon: Target,
                color: 'var(--accent-green)',
                title: 'Deep Focus',
                desc: 'Mastering the art of deep work.'
              },
              {
                icon: Flag,
                color: 'var(--accent-pink)',
                title: 'Ownership',
                desc: 'End-to-end accountability.'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="floating-list-item">
                  <div className="floating-list-icon" style={{ borderColor: item.color, boxShadow: `0 0 20px ${item.color}30` }}>
                    <Icon size={22} color={item.color} />
                  </div>
                  <div>
                    <h4 className="floating-list-title">{item.title}</h4>
                    <p className="floating-list-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .floating-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: stretch;
        }

        .floating-col-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .floating-col-right {
          display: flex;
          flex-direction: column;
          align-items: center; /* Horizontally centers the cards wrapper */
        }
        
        .cards-wrapper {
          width: 100%;
          max-width: 350px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .floating-title-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .floating-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .floating-bio {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .floating-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-top: 10px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent-cyan);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 1px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
        }

        .floating-list-item {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          position: relative;
        }

        .floating-list-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .floating-list-item:hover .floating-list-icon {
          transform: scale(1.05);
        }

        .floating-list-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }

        .floating-list-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
          white-space: nowrap;
        }

        .terminal-cta-btn {
          display: inline-flex;
          align-items: center;
          background: rgba(10, 14, 20, 0.8);
          border: 1px solid rgba(129, 140, 248, 0.3);
          padding: 14px 28px;
          border-radius: 8px;
          color: #fff;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 1.05rem;
          text-decoration: none;
          box-shadow: 0 0 15px rgba(129, 140, 248, 0.1);
          transition: all 0.3s ease;
        }

        .terminal-cta-btn:hover {
          background: rgba(129, 140, 248, 0.1);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 25px rgba(129, 140, 248, 0.3);
          transform: translateY(-2px);
        }

        .terminal-cta-btn .prompt {
          color: var(--accent-cyan);
          margin-right: 12px;
          font-weight: bold;
        }

        .terminal-cta-btn .cursor {
          display: inline-block;
          width: 8px;
          height: 18px;
          background-color: var(--accent-cyan);
          margin-left: 8px;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 992px) {
          .floating-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .floating-col-right {
            align-items: flex-start;
          }
          .cards-wrapper {
            width: 100%;
          }
          .floating-bio {
            font-size: 1rem;
            padding: 20px;
          }
          .floating-list-desc {
            white-space: normal;
          }
          .floating-stats {
            gap: 16px;
          }
          .stat-value {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
