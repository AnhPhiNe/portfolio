import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Play, Cpu, Zap, RefreshCw, Layers, CheckCircle2, MessageSquareCode } from 'lucide-react';

const AiPlayground = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  // Tool 1 State: NLP Sentiment & Intent Analyzer
  const [nlpInput, setNlpInput] = useState(
    'I love training PyTorch models on GPUs! The inference latency dropped by 45% after quantization.'
  );
  const [nlpResult, setNlpResult] = useState({
    sentiment: 'POSITIVE (98.6%)',
    intent: 'Technical Evaluation / Achievement',
    emotion: 'Enthusiastic',
    tokens: 18,
    latency: '14ms (Simulated PyTorch Engine)'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Tool 2 State: Prompt Optimizer
  const [promptInput, setPromptInput] = useState(
    'Write a python script to fine tune llama 3 on my custom dataset'
  );
  const [optimizedPrompt, setOptimizedPrompt] = useState(
    `# SYSTEM INSTRUCTION: Senior AI & MLOps Engineer
You are an expert AI Engineer specializing in HuggingFace Transformers and Unsloth / PEFT LoRA fine-tuning.

# TASK REQUIREMENTS:
1. Write an end-to-end Python script using HuggingFace \`SFTTrainer\` and \`BitsAndBytes\` 4-bit quantization.
2. Load LLM: "meta-llama/Meta-Llama-3-8B-Instruct".
3. Apply QLoRA parameters: r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"].
4. Log metrics to MLflow and save checkpoints.`
  );

  const handleAnalyzeNlp = () => {
    if (!nlpInput.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = nlpInput.toLowerCase();
      let sentiment = 'POSITIVE (95.2%)';
      let emotion = 'Confident & Technical';
      let intent = 'Information Sharing / Technical Description';

      if (lower.includes('error') || lower.includes('fail') || lower.includes('slow') || lower.includes('bug')) {
        sentiment = 'NEGATIVE / ISSUE DETECTED (88.4%)';
        emotion = 'Frustrated / Debugging';
        intent = 'System Troubleshooting';
      } else if (lower.includes('how') || lower.includes('what') || lower.includes('why') || lower.includes('?')) {
        sentiment = 'NEUTRAL / INQUIRY (92.1%)';
        emotion = 'Curious / Analytical';
        intent = 'Question Answering Query';
      }

      setNlpResult({
        sentiment,
        intent,
        emotion,
        tokens: nlpInput.split(/\s+/).length,
        latency: `${Math.floor(Math.random() * 10 + 8)}ms`
      });
      setIsAnalyzing(false);
    }, 600);
  };

  const handleOptimizePrompt = () => {
    if (!promptInput.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setOptimizedPrompt(
        `# SYSTEM ROLE: Principal AI Systems Architect\n\n# DIRECTIVE:\nOptimize and structure the following developer request for production-grade AI execution:\n\n# TARGET GOAL:\n"${promptInput}"\n\n# CONSTRAINTS & OUTPUT FORMAT:\n- Output modular, PEP8-compliant Python 3.10+ code with type annotations.\n- Include explicit error handling and CUDA memory optimization (\`torch.cuda.empty_cache()\`).`
      );
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section id="playground" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-tag">// LIVE MODEL DEMO & SIMULATOR</span>
          <h2 className="section-title">
            Interactive <span className="gradient-text-purple">AI Sandbox</span>
          </h2>
        </div>

        {/* Outer Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card glass-card-purple"
          style={{ padding: '0', overflow: 'hidden' }}
        >
          {/* Top Sandbox Navigation Tabs */}
          <div
            style={{
              background: '#0d111d',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(157, 0, 255, 0.2)'
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setActiveTab('sentiment')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: activeTab === 'sentiment' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Cpu size={16} color="var(--accent-cyan)" /> NLP Sentiment & Intent Model
              </button>

              <button
                onClick={() => setActiveTab('prompt')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: activeTab === 'prompt' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageSquareCode size={16} color="var(--accent-pink)" /> AI Prompt Architect
              </button>
            </div>

            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot"></span> MODEL STATUS: ONLINE
            </div>
          </div>

          {/* Sandbox Content Area */}
          <div style={{ padding: '32px' }}>
            {activeTab === 'sentiment' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="sandbox-grid">
                
                {/* Input Column */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                    // ENTER RAW TEXT FOR MODEL INFERENCE:
                  </label>
                  <textarea
                    rows={6}
                    value={nlpInput}
                    onChange={(e) => setNlpInput(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '12px',
                      padding: '16px',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none',
                      marginBottom: '16px'
                    }}
                  />
                  <button
                    onClick={handleAnalyzeNlp}
                    disabled={isAnalyzing}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {isAnalyzing ? <RefreshCw className="spin" size={18} /> : <Zap size={18} />}
                    {isAnalyzing ? 'Running Model Inference...' : 'Run NLP Sentiment & Intent Model'}
                  </button>
                </div>

                {/* Model Output Inspector */}
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '24px', borderRadius: '14px', border: '1px solid rgba(0, 243, 255, 0.15)' }}>
                  <h4 style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={16} /> INFERENCE METRICS & PREDICTION
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>SENTIMENT SCORE:</span>
                      <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{nlpResult.sentiment}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>PREDICTED INTENT:</span>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{nlpResult.intent}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>TONE & EMOTION:</span>
                      <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{nlpResult.emotion}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>TOKEN COUNT:</span>
                      <span style={{ color: '#fff' }}>{nlpResult.tokens} tokens</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>INFERENCE LATENCY:</span>
                      <span style={{ color: 'var(--accent-yellow)' }}>{nlpResult.latency}</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Tool 2: Prompt Architect */
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="sandbox-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-pink)', marginBottom: '8px' }}>
                    // ENTER UNSTRUCTURED USER PROMPT:
                  </label>
                  <textarea
                    rows={6}
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '12px',
                      padding: '16px',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none',
                      marginBottom: '16px'
                    }}
                  />
                  <button
                    onClick={handleOptimizePrompt}
                    disabled={isAnalyzing}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--accent-pink)' }}
                  >
                    {isAnalyzing ? <RefreshCw className="spin" size={18} /> : <Sparkles size={18} color="var(--accent-pink)" />}
                    {isAnalyzing ? 'Optimizing Prompt...' : 'Transform into System Prompt'}
                  </button>
                </div>

                {/* Optimized Output */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', marginBottom: '8px' }}>
                    // STRUCTURED SYSTEM PROMPT FOR GPT-4 / CLAUDE / LLAMA:
                  </label>
                  <div
                    style={{
                      background: '#070a14',
                      border: '1px solid rgba(0, 255, 157, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      minHeight: '190px',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.5
                    }}
                  >
                    {optimizedPrompt}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .sandbox-grid { grid-template-columns: 1fr !important; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default AiPlayground;
