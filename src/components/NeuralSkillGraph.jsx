import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { BrainCircuit, Cpu, Aperture, MessageSquareCode, Bot, Workflow, Activity, Zap, ServerCog, Sparkles } from 'lucide-react';

// Expanded layout for 3D holographic feel
// Canvas is 500x500
const center = { cx: 300, cy: 300 };

const domainNodes = [
    {
      id: 'ml',
      title: 'Machine Learning',
      shortTitle: 'Machine Learning',
      icon: Workflow,
      color: '#38bdf8', // Sky Blue
      bgGlow: 'rgba(56, 189, 248, 0.25)',
      cx: 510, cy: 300, // 0 deg
      techs: ['Scikit-Learn', 'XGBoost', 'LightGBM', 'Pandas']
    },
    {
      id: 'dl',
      title: 'Deep Learning',
      shortTitle: 'Deep Learning',
      icon: BrainCircuit,
      color: '#818cf8', // Indigo
      bgGlow: 'rgba(129, 140, 248, 0.25)',
      cx: 405, cy: 482, // 60 deg
      techs: ['PyTorch', 'TensorFlow', 'Keras', 'ONNX']
    },
    {
      id: 'vision',
      title: 'Computer Vision',
      shortTitle: 'Computer Vision',
      icon: Aperture,
      color: '#c084fc', // Purple
      bgGlow: 'rgba(192, 132, 252, 0.25)',
      cx: 195, cy: 482, // 120 deg
      techs: ['OpenCV', 'YOLO', 'TorchVision', 'TensorRT']
    },
    {
      id: 'nlp',
      title: 'NLP & LLMs',
      shortTitle: 'NLP & LLMs',
      icon: MessageSquareCode,
      color: '#f43f5e', // Rose
      bgGlow: 'rgba(244, 63, 94, 0.25)',
      cx: 90, cy: 300, // 180 deg
      techs: ['HuggingFace', 'LlamaIndex', 'vLLM', 'Ollama']
    },
    {
      id: 'agent',
      title: 'AI Agents',
      shortTitle: 'AI Agents',
      icon: Bot,
      color: '#fbbf24', // Amber
      bgGlow: 'rgba(251, 191, 36, 0.25)',
      cx: 195, cy: 118, // 240 deg
      techs: ['LangChain', 'LangGraph', 'LangSmith', 'CrewAI']
    },
    {
      id: 'mlops',
      title: 'MLOps & Cloud',
      shortTitle: 'MLOps & Cloud',
      icon: ServerCog,
      color: '#34d399', // Emerald
      bgGlow: 'rgba(52, 211, 153, 0.25)',
      cx: 405, cy: 118, // 300 deg
      techs: ['FastAPI', 'Docker', 'MLflow', 'Redis']
    }
  ];

const NeuralSkillGraph = () => {
  const [activeNodeId, setActiveNodeId] = useState('ml');

  // Use Framer Motion to perfectly sync the visual SVG path with the React state
  const progress = useMotionValue(0);
  const pathDashoffset = useTransform(progress, [0, 6], [0, -600]);

  useEffect(() => {
    const controls = animate(progress, 6, {
      duration: 12,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (latest) => {
        // The laser head hits node `i` exactly at progress = `i`.
        // Change the active node instantly so the node enlarges and powers the laser to the next node.
        const index = Math.floor(latest) % 6;
        setActiveNodeId((prev) => {
           const nextId = domainNodes[index].id;
           return prev !== nextId ? nextId : prev;
        });
      }
    });
    return () => controls.stop();
  }, [progress]);

  const activeNode = domainNodes.find(n => n.id === activeNodeId) || domainNodes[0];

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      
      {/* Top Header Floating above the graph */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '-20px',
          zIndex: 20,
          transform: 'translateY(40px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(10, 14, 20, 0.6)', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
          <Activity size={16} color="var(--accent-cyan)" className="spin-slow" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#fff', letterSpacing: '1px', fontWeight: 500 }}>
            TECH STACK TOPOLOGY
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.15)', margin: '0 8px' }}>|</span>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <span className="pulse-dot"></span> 60FPS
          </div>
        </div>
      </div>

      {/* SVG Canvas for Holographic effect (No borders, pure glowing lines) */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '30px 0', aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="100%" height="100%" viewBox="0 0 600 600" style={{ overflow: 'hidden' }}>
          
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="25%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="75%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Holographic Vortex Rings (3D Effect) - SHRUNK TO FIT INSIDE THE NODE RING */}
          {/* Holographic Vortex Rings (3D Effect) - Solid Only */}
          <g style={{ transformOrigin: '300px 300px' }}>
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="20s" repeatCount="indefinite" />
            <ellipse cx={center.cx} cy={center.cy} rx="160" ry="50" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.25" transform="rotate(30 300 300)" />
            <ellipse cx={center.cx} cy={center.cy} rx="160" ry="50" fill="none" stroke="var(--accent-purple)" strokeWidth="1" opacity="0.25" transform="rotate(90 300 300)" />
            <ellipse cx={center.cx} cy={center.cy} rx="160" ry="50" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.25" transform="rotate(150 300 300)" />
          </g>

          {/* Glowing Center Wave Ripple */}
          <circle cx={center.cx} cy={center.cy} r="45" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" opacity="0.4" style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.5))' }} />

          {/* Center Energy Core (Replaced ALEX Text) - Moved outside so text doesn't rotate */}
          <g style={{ pointerEvents: 'none' }}>

            {/* Holographic Core Text (Active Node Name) */}
            <g transform={`translate(${center.cx}, ${center.cy})`}>
              <circle r="20" fill={activeNode.color} style={{ filter: 'blur(20px)', opacity: 0.6 }} />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                fontSize="18"
                fontWeight="800"
                fontFamily="var(--font-mono)"
                style={{ 
                  filter: `drop-shadow(0 0 12px ${activeNode.color})`,
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
              >
                {activeNode.shortTitle}
              </text>
            </g>
          </g>

          {/* Rotating Outer System */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="40s" repeatCount="indefinite" />

            {/* Static Containment Ring */}
          <circle
            cx="300" cy="300" r="210"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* Equator System (Nodes & Laser) */}
          <g>
            {/* Comet Tail (Fading/Wide) */}
            <motion.circle
              cx="300" cy="300" r="210"
              pathLength="600"
              fill="none"
              stroke={activeNode.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="0 480 120 0"
              style={{ opacity: 0.35, strokeDashoffset: pathDashoffset, transition: 'stroke 0.4s ease' }}
            />

            {/* Comet Core (Bright/Thick) */}
            <motion.circle
              cx="300" cy="300" r="210"
              pathLength="600"
              fill="none"
              stroke={activeNode.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="0 580 20 0"
              style={{ strokeDashoffset: pathDashoffset, filter: `drop-shadow(0 0 10px ${activeNode.color})`, transition: 'stroke 0.4s ease, filter 0.4s ease' }}
            />
            
            {/* Comet Head Spark (White hot) */}
            <motion.circle
              cx="300" cy="300" r="210"
              pathLength="600"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="0 598 2 0"
              style={{ strokeDashoffset: pathDashoffset, filter: 'blur(1px)' }}
            />

            {/* Active Synapse removed for cleaner aesthetics */}
          {/* Domain Nodes */}
          {domainNodes.map((node) => {
            const isActive = activeNodeId === node.id;

            return (
              <g
                key={node.id}
                style={{ pointerEvents: 'none' }}
              >
                <g>
                  <animateTransform attributeName="transform" type="rotate" from={`360 ${node.cx} ${node.cy}`} to={`0 ${node.cx} ${node.cy}`} dur="40s" repeatCount="indefinite" />
                  
                  {/* Node Outer Satellite (Perfect Circle) */}
                  <g transform={`translate(${node.cx}, ${node.cy})`}>
                    
                    {/* Radar Ping Effect (Active Only) */}
                    <AnimatePresence>
                      {isActive && (
                        <>
                          {[0, 0.5, 1].map((delay, idx) => (
                            <motion.circle
                              key={`ping-${idx}`}
                              cx="0"
                              cy="0"
                              fill="transparent"
                              stroke={node.color}
                              strokeWidth="1.5"
                              initial={{ r: 38, opacity: 0.6 }}
                              animate={{ r: 90, opacity: 0 }}
                              exit={{ opacity: 0, transition: { duration: 0.2 } }}
                              transition={{ 
                                duration: 1.8, 
                                repeat: Infinity, 
                                ease: "easeOut",
                                delay: delay 
                              }}
                              style={{ filter: `drop-shadow(0 0 6px ${node.color})` }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* Base Satellite Circle */}
                    <motion.circle
                      cx="0"
                      cy="0"
                      initial={false}
                      animate={{
                        r: isActive ? 38 : 26,
                        fill: isActive ? node.bgGlow : '#0a0e14',
                        strokeWidth: isActive ? 2 : 1.5
                      }}
                      stroke={node.color}
                      strokeDasharray={isActive ? "none" : "3 6"}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      style={{
                        filter: isActive ? `drop-shadow(0 0 25px ${node.color})` : 'none'
                      }}
                    />
                    
                    {/* Inner Rotating Tech Frame (Active Only) */}
                    {isActive && (
                      <circle
                        cx="0"
                        cy="0"
                        r="28"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 12"
                        opacity="0.8"
                      >
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>

                  {/* Node Icon (Rendered directly in SVG for perfect centering) */}
                  <motion.g 
                    initial={false}
                    animate={{
                      x: node.cx,
                      y: node.cy,
                      scale: isActive ? (40/28) : 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <g transform="translate(-14, -14)">
                      <node.icon size={28} color={isActive ? '#fff' : node.color} />
                    </g>
                  </motion.g>
                </g>
              </g>
            );
          })}
          </g>
          </g>
        </svg>

      </div>

      {/* Floating Active Inspector Panel - integrated cleanly */}
      <div
        style={{
          position: 'relative',
          marginTop: '-25px',
          background: 'rgba(10, 14, 20, 0.9)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${activeNode.color}`,
          borderRadius: '16px',
          padding: '14px 22px',
          boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${activeNode.color}20`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '280px',
          minHeight: '85px',
          zIndex: 30,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Zap size={15} color={activeNode.color} />
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 600, letterSpacing: '1px' }}>
                {activeNode.title.toUpperCase()} PROTOCOLS
              </span>
            </div>

            {/* Tech Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {activeNode.techs.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${activeNode.color}40`,
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .spin-slow { animation: spinSlow 12s linear infinite; }
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default NeuralSkillGraph;
