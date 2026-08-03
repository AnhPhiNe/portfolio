import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { featuredProjects } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';
import ImageCarousel from './ImageCarousel';

const techMap = {
  'Python': { icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
  'FastAPI': { icon: 'https://cdn.simpleicons.org/fastapi/009688', color: '#009688' },
  'Qdrant': { icon: 'https://cdn.simpleicons.org/qdrant/CD5179', color: '#CD5179' },
  'MongoDB': { icon: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248' },
  'React/TypeScript': { icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
  'React': { icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
  'Redis': { icon: 'https://cdn.simpleicons.org/redis/FF4438', color: '#FF4438' },
  'LangFuse': { icon: '/logos/langfuse-color.png', color: '#A1A1AA' },
  'LangChain': { icon: '/logos/langchain-color.png', color: '#7FC8FF' },
  'PyTorch': { icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C', color: '#EE4C2C' },
  'OpenCV': { icon: 'https://cdn.simpleicons.org/opencv/5C3EE8', color: '#5C3EE8' },
};

const hexToRgba = (hex, alpha) => {
  if (!hex) return `rgba(255, 255, 255, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Title */}
        <div className="section-title-wrapper">
          <span className="section-tag">// FEATURED WORK</span>
          <h2 className="section-title">
            Highlighted <span className="gradient-text-cyan">AI Projects</span>
          </h2>
        </div>

        {/* Project List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Project Row */}
                <div 
                  className={isEven ? 'flex-responsive' : 'flex-responsive-reverse'}
                  style={{ gap: '40px', alignItems: 'center' }}
                >
                  {/* Left: Image Carousel (or Right if reverse) */}
                  <div 
                    className="project-image-wrapper"
                    style={{
                      flex: '0 0 55%',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                      aspectRatio: '16/9',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      background: '#0F172A'
                    }}
                  >
                    {/* Subtle inner gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 15, 25, 0.8) 0%, transparent 100%)',
                      zIndex: 1,
                      pointerEvents: 'none'
                    }} />
                    
                    <ImageCarousel images={project.images || [project.image]} />
                  </div>

                  {/* Info Side (45%) */}
                  <div 
                    className="project-info"
                    style={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '8px 0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-mono)', 
                        color: 'var(--accent-cyan)', 
                        fontSize: '0.85rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        display: 'block'
                      }}>
                        {project.category}
                      </span>
                      {/* Status Indicator */}
                      {project.status && (
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: project.status.includes('Live') ? 'var(--accent-cyan)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          background: project.status.includes('Live') ? 'rgba(0, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${project.status.includes('Live') ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
                          borderRadius: 'var(--radius-full)'
                        }}>
                          <div style={{ 
                            width: 6, height: 6, borderRadius: '50%', 
                            background: project.status.includes('Live') ? 'var(--accent-cyan)' : 'var(--text-muted)',
                            boxShadow: project.status.includes('Live') ? '0 0 8px var(--accent-cyan)' : 'none'
                          }} />
                          {project.status}
                        </span>
                      )}
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: 700, 
                      color: '#fff',
                      lineHeight: 1.2,
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      {project.title}
                    </h3>

                    <p style={{ 
                      color: 'var(--text-muted)', 
                      fontSize: '1rem', 
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}>
                      {project.description || project.tagline}
                    </p>

                    {/* Tech Stack Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {project.techStack.map((tech) => {
                        const tInfo = techMap[tech] || {};
                        return (
                          <motion.span
                            key={tech}
                            whileHover={{ 
                              y: -6, 
                              zIndex: 10,
                              transition: { type: 'spring', stiffness: 250, damping: 15 } 
                            }}
                          style={{
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: tInfo.color ? hexToRgba(tInfo.color, 0.12) : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${tInfo.color ? hexToRgba(tInfo.color, 0.3) : 'rgba(255, 255, 255, 0.1)'}`,
                            color: 'var(--text-main)',
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {tInfo.icon && (
                            <img 
                              src={tInfo.icon} 
                              alt={tech} 
                              style={{ width: 14, height: 14, objectFit: 'contain' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          )}
                          {tech}
                        </motion.span>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: 'auto' }}>

                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="sleek-link"
                      >
                        <Github size={18} /> Source Code
                      </a>
                    )}
                    
                    {project.demoLink && project.demoLink !== '#' && (
                      <a 
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="sleek-link"
                      >
                        Live Demo <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        .project-image-wrapper:hover .project-img {
          transform: scale(1.05);
        }

        .sleek-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
        }

        .sleek-link:hover {
          color: var(--accent-cyan);
          border-bottom-color: var(--accent-cyan);
        }

        @media (max-width: 992px) {
          .project-row {
            flex-direction: column !important;
            gap: 32px !important;
          }
          
          .project-image-wrapper {
            flex: 0 0 auto !important;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
