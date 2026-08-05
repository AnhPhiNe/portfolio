import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, Check, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalData } from '../data/portfolioData';
import MagneticButton from './MagneticButton';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Custom Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    // Simulate network request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f3ff', '#9d00ff', '#ff007f']
      });

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', paddingBottom: '100px' }}>
      <div className="container">

        {/* Section Title */}
        <div className="section-title-wrapper">
          <span className="section-tag">// INITIATE CONNECTION</span>
          <h2 className="section-title">
            Let's Build <span className="gradient-text-cyan">Intelligent Systems</span>
          </h2>
        </div>

        <motion.div 
          className="contact-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '44px', alignItems: 'start' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          
          {/* Left Info Column */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
          >
            <div className="glow-badge" style={{ marginBottom: '20px' }}>
              <Sparkles size={16} /> BUILDING PRACTICAL AI SYSTEMS
            </div>

            <h3 style={{ 
              fontSize: 'clamp(2.5rem, 4vw, 3.2rem)', 
              fontWeight: 800, 
              color: '#fff', 
              marginBottom: '20px',
              lineHeight: 1.1,
              letterSpacing: '-1px'
            }}>
              Let's work together.
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '32px', lineHeight: 1.7 }}>
              I specialize in <strong>Applied AI, Software Engineering, and LLM integrations</strong>. Whether you want to discuss a technical challenge, explore potential opportunities, or build real-world solutions, feel free to reach out.
            </p>

            {/* Email Quick Copy Box */}
            <div className="contact-info-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Mail size={22} color="var(--accent-cyan)" />
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DIRECT EMAIL</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>{personalData.email}</div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="social-btn"
                style={{ padding: '8px 16px' }}
              >
                {copied ? <Check size={16} color="var(--accent-green)" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Social Nodes */}
            <div>
              <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '12px' }}>
                CONNECT ON RESEARCH & CODE NETWORKS:
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { name: 'GitHub', icon: Github, url: personalData.github, color: '#ffffff' },
                  { name: 'LinkedIn', icon: Linkedin, url: personalData.linkedin, color: '#0A66C2' },
                  { 
                    name: 'LeetCode', 
                    icon: ({ size, color }) => (
                      <svg width={size || 16} height={size || 16} viewBox="0 0 24 24" fill={color || "currentColor"}>
                        <path d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.68 2.68c-.64.64-1.676.64-2.316 0L8.855 10.61c-.64-.64-.64-1.676 0-2.316l5.228-5.228a1.37 1.37 0 0 0-.6-2.365zM22.25 15.11a1.37 1.37 0 0 0-1.951 0l-1.398 1.398c-.64.64-1.676.64-2.316 0L12.56 12.37c-.64-.64-.64-1.676 0-2.316l2.678-2.678c.64-.64 1.677-.64 2.316 0l2.559 2.559c.64.64 1.676.64 2.316 0l1.398-1.398a1.37 1.37 0 0 0-1.951-1.951l-2.559 2.559a1.37 1.37 0 0 0 0 1.951l5.227 5.228c.64.64 1.677.64 2.316 0l1.398-1.398a1.37 1.37 0 0 0 0-1.951z"/>
                      </svg>
                    ), 
                    url: personalData.leetcode,
                    color: '#FFA116'
                  },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <MagneticButton key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="social-btn"
                      >
                        <Icon size={16} color={s.color} /> {s.name}
                      </a>
                    </MagneticButton>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
            className="glass-card glass-card-purple"
            style={{ padding: '36px' }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 255, 157, 0.2)', border: '2px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <Check size={32} color="var(--accent-green)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>Transmission Received!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. I will respond to your message within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                  Send a Direct Message
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                  <div>
                    <label className="contact-label">YOUR NAME *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                      placeholder="e.g. Dr. Sarah Chen"
                      className="contact-input"
                      style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                    />
                    {errors.name && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.name}</div>}
                  </div>

                  <div>
                    <label className="contact-label">YOUR EMAIL *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                      placeholder="sarah@company.com"
                      className="contact-input"
                      style={{ borderColor: errors.email ? '#ef4444' : undefined }}
                    />
                    {errors.email && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.email}</div>}
                  </div>
                </div>

                <div>
                  <label className="contact-label">SUBJECT / OPPORTUNITY *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); setErrors({ ...errors, subject: '' }); }}
                    placeholder="e.g. AI Engineering Internship Opportunity"
                    className="contact-input"
                    style={{ borderColor: errors.subject ? '#ef4444' : undefined }}
                  />
                  {errors.subject && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.subject}</div>}
                </div>

                <div>
                  <label className="contact-label">MESSAGE *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                    placeholder="Briefly describe your project or opportunity..."
                    className="contact-input"
                    style={{ resize: 'vertical', minHeight: '100px', borderColor: errors.message ? '#ef4444' : undefined }}
                  />
                  {errors.message && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.message}</div>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  {isSubmitting ? 'Sending...' : 'Send Message Signal'} {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        
        .contact-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: var(--font-mono);
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .contact-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 14px 16px;
          color: #fff;
          outline: none;
          font-size: 0.95rem;
          transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .contact-input:focus {
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(0, 243, 255, 0.15);
        }
        
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .contact-info-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        
        .contact-info-box:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 18px;
          border-radius: 8px;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .social-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-cyan);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 243, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
