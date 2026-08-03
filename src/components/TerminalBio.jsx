import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Play, HelpCircle, RefreshCw, Sparkles, Check, Copy } from 'lucide-react';
import { personalData, terminalCommands } from '../data/portfolioData';

const TerminalBio = () => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'SYSTEM BOOT: Welcome to Alex Nguyen AI Workstation OS v3.4' },
    { type: 'system', text: 'Type "help" or click tabs below to inspect profile records.' },
    { type: 'command', text: 'whoami' },
    ...terminalCommands.whoami.map(text => ({ type: 'output', text }))
  ]);

  const [inputVal, setInputVal] = useState('');
  const [activeTab, setActiveTab] = useState('whoami');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const newHistory = [...history, { type: 'command', text: cmdText }];

    if (terminalCommands[cleanCmd]) {
      const outputLines = terminalCommands[cleanCmd].map(text => ({ type: 'output', text }));
      setHistory([...newHistory, ...outputLines]);
      setActiveTab(cleanCmd);
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `Command not found: "${cmdText}". Type "help" for a list of valid commands.` }
      ]);
    }

    setInputVal('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleTabClick = (cmd) => {
    setActiveTab(cmd);
    executeCommand(cmd);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrapper">
          <span className="section-tag">// INTERACTIVE TERMINAL BIO</span>
          <h2 className="section-title">
            About Me & <span className="gradient-text-cyan">Interactive CLI</span>
          </h2>
        </div>

        {/* Outer Terminal Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'var(--bg-terminal)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), var(--glow-cyan)'
          }}
        >
          {/* Top Window Bar */}
          <div
            style={{
              background: '#0d111d',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(0, 243, 255, 0.15)'
            }}
          >
            {/* Window Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                alex@ai-workstation:~ (zsh)
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleCopyEmail}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--accent-cyan)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                {copied ? 'Copied Email' : 'Copy Email'}
              </button>
            </div>
          </div>

          {/* Preset Command Tabs */}
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '8px 16px',
              display: 'flex',
              gap: '8px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              overflowX: 'auto'
            }}
          >
            {[
              { id: 'whoami', label: 'about.sh' },
              { id: 'skills', label: 'skills.json' },
              { id: 'projects', label: 'projects.py' },
              { id: 'education', label: 'education.md' },
              { id: 'contact', label: 'contact.env' },
              { id: 'help', label: 'help --all' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
                  border: activeTab === tab.id ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                $ {tab.label}
              </button>
            ))}
          </div>

          {/* Terminal Main Body */}
          <div
            style={{
              padding: '24px',
              minHeight: '320px',
              maxHeight: '450px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: 'var(--text-main)'
            }}
          >
            {history.map((item, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                {item.type === 'system' && (
                  <div style={{ color: 'var(--accent-purple)', opacity: 0.9 }}>
                    [SYS] {item.text}
                  </div>
                )}

                {item.type === 'command' && (
                  <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--accent-green)' }}>alex@ai-node:~$</span>
                    <span>{item.text}</span>
                  </div>
                )}

                {item.type === 'output' && (
                  <div style={{ color: 'var(--text-main)', paddingLeft: '16px', borderLeft: '2px solid rgba(0, 243, 255, 0.2)' }}>
                    {item.text}
                  </div>
                )}

                {item.type === 'error' && (
                  <div style={{ color: 'var(--accent-pink)', paddingLeft: '16px' }}>
                    ❌ {item.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Form Input Line */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              background: '#0a0e1a',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              alex@ai-node:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. 'whoami', 'skills', 'projects', 'help')..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--accent-cyan)',
                border: 'none',
                color: '#060813',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              RUN <Play size={14} fill="#060813" />
            </button>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default TerminalBio;
