import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

const skillGroups = [
  {
    label: 'Programming Languages',
    tags: [
      { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
      { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00599C', color: '#00599C' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: '#F7DF1E' },
      { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
      { name: 'Bash / Shell', icon: 'https://cdn.simpleicons.org/gnubash/4EAA25', color: '#4EAA25' },
    ]
  },
  {
    label: 'AI & ML Frameworks',
    tags: [
      { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C', color: '#EE4C2C' },
      { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00', color: '#FF6F00' },
      { name: 'HuggingFace', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E', color: '#FFD21E' },
      { name: 'Scikit-Learn', icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E', color: '#F7931E' },
      { name: 'Keras', icon: 'https://cdn.simpleicons.org/keras/D00000', color: '#D00000' },
      { name: 'ONNX', icon: 'https://cdn.simpleicons.org/onnx/005CED', color: '#005CED' },
    ]
  },
  {
    label: 'GenAI & LLM Stack',
    tags: [
      { name: 'LangChain', icon: '/logos/langchain-color.png', color: '#7FC8FF' },
      { name: 'LangGraph', icon: '/logos/langgraph-color.png', color: '#4ADE80' },
      { name: 'LlamaIndex', icon: '/logos/llamaindex-color.png', color: '#A1A1AA' },
      { name: 'Ollama', icon: '/logos/ollama.png', color: '#ffffff' },
      { name: 'Gemini', icon: '/logos/gemini-color.png', color: '#ffffff' },
      { name: 'Langfuse', icon: '/logos/langfuse-color.png', color: '#A1A1AA' },
    ]
  },
  {
    label: 'Data & Visualization',
    tags: [
      { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas/150458', color: '#8B5CF6' },
      { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy/4DABCF', color: '#4DABCF' },
      { name: 'Plotly', icon: 'https://cdn.simpleicons.org/plotly/3F4F75', color: '#7998EE' },
      { name: 'Matplotlib', icon: '/logos/matplotlib.svg', color: '#11557c' },
      { name: 'Seaborn', icon: '/logos/seaborn.svg', color: '#4c72b0' },
    ]
  },
  {
    label: 'Databases & Vector Stores',
    tags: [
      { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248' },
      { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/FF4438', color: '#FF4438' },
      { name: 'Qdrant', icon: 'https://cdn.simpleicons.org/qdrant/CD5179', color: '#CD5179' },
    ]
  },
  {
    label: 'Backend, DevOps & MLOps',
    tags: [
      { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688', color: '#009688' },
      { name: 'MLflow', icon: 'https://cdn.simpleicons.org/mlflow/0194E2', color: '#0194E2' },
      { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
      { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', color: '#F05032' },
    ]
  }
];

const tagVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut'
    }
  })
};

// Helper: hex color to rgba string
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-tag">// TECH STACK</span>
          <h2 className="section-title">
            Tools &amp; <span className="gradient-text-cyan">Technologies</span>
          </h2>
        </div>

        {/* Skill Groups */}
        <div className="skill-groups">
          {skillGroups.map((group, gIdx) => (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: gIdx * 0.1,
                    staggerChildren: 0.05,
                    delayChildren: gIdx * 0.1 + 0.2
                  }
                }
              }}
              className="skill-group"
            >
              {/* Left: Label */}
              <div className="skill-group-label-wrapper">
                <span className="skill-group-label">{group.label}</span>
              </div>

              {/* Right: Tags */}
              <div className="skill-tags">
                {group.tags.map((tag, tIdx) => (
                  <motion.span
                    key={tag.name}
                    className="skill-tag"
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 0.3, ease: 'easeOut' } 
                      }
                    }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.05,
                      zIndex: 10,
                      transition: { type: 'spring', stiffness: 400, damping: 14 } 
                    }}
                    style={tag.color ? {
                      position: 'relative',
                      background: hexToRgba(tag.color, 0.12),
                      borderColor: hexToRgba(tag.color, 0.3),
                    } : { position: 'relative' }}
                  >
                    {tag.icon && (
                      <img
                        src={tag.icon}
                        alt={tag.name}
                        className="skill-tag-icon"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    {tag.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .skill-groups {
          margin-top: 24px;
        }

        .skill-group {
          display: flex;
          align-items: flex-start;
          gap: 40px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .skill-group:first-child {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .skill-group-label-wrapper {
          width: 200px;
          flex-shrink: 0;
          padding-top: 6px;
        }

        .skill-group-label {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          flex: 1;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.9);
          padding: 7px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-family: var(--font-mono);
          transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
          cursor: default;
        }

        .skill-tag:hover {
          background: rgba(129, 140, 248, 0.15);
          border-color: rgba(129, 140, 248, 0.5);
          color: #fff;
          box-shadow: 0 4px 16px rgba(129, 140, 248, 0.2);
        }

        .skill-tag-icon {
          width: 16px;
          height: 16px;
          object-fit: contain;
          opacity: 0.85;
          flex-shrink: 0;
        }

        .skill-tag:hover .skill-tag-icon {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .skill-group {
            flex-direction: column;
            gap: 14px;
          }
          .skill-group-label-wrapper {
            width: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
