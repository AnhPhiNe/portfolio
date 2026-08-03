import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Heart } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';
import { personalData } from '../data/portfolioData';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const lenis = useLenis();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: 0, duration: 1.5 });
    }
    setMobileMenuOpen(false);
  };

  const LeetCodeIcon = ({ color }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color || "currentColor"}>
      <path d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.68 2.68c-.64.64-1.676.64-2.316 0L8.855 10.61c-.64-.64-.64-1.676 0-2.316l5.228-5.228a1.37 1.37 0 0 0-.6-2.365zM22.25 15.11a1.37 1.37 0 0 0-1.951 0l-1.398 1.398c-.64.64-1.676.64-2.316 0L12.56 12.37c-.64-.64-.64-1.676 0-2.316l2.678-2.678c.64-.64 1.677-.64 2.316 0l2.559 2.559c.64.64 1.676.64 2.316 0l1.398-1.398a1.37 1.37 0 0 0-1.951-1.951l-2.559 2.559a1.37 1.37 0 0 0 0 1.951l5.227 5.228c.64.64 1.677.64 2.316 0l1.398-1.398a1.37 1.37 0 0 0 0-1.951z"/>
    </svg>
  );

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isScrolled ? '12px 0' : '16px 0',
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(5, 7, 10, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent'
      }}
    >
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* LEFT: Logo — Nguyen Anh Phi with Heart */}
        <a href="#hero" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.2rem',
            color: '#fff',
            letterSpacing: '-0.5px'
          }}>
            Nguyen Anh Phi
          </span>
          <Heart size={15} fill="#f43f5e" color="#f43f5e" style={{ filter: 'drop-shadow(0 0 6px rgba(244, 63, 94, 0.6))' }} />
        </a>

        <nav className="desktop-nav" style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          whiteSpace: 'nowrap',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.4px',
                padding: '7px 13px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#fff';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-muted)';
                e.target.style.background = 'transparent';
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div className="desktop-only status-pill">
            <span className="pulse-dot"></span>
            <span>Open to work</span>
          </div>

          <div className="desktop-only" style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }} />

          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MagneticButton>
              <a href={personalData.github} target="_blank" rel="noreferrer" className="social-icon-btn">
                <Github size={16} color="#ffffff" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn">
                <Linkedin size={16} color="#0A66C2" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href={personalData.leetcode} target="_blank" rel="noreferrer" className="social-icon-btn" title="LeetCode">
                <LeetCodeIcon color="#FFA116" />
              </a>
            </MagneticButton>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'none' }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, width: '100%',
          background: 'rgba(5, 7, 10, 0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-glow)', padding: '20px 24px',
          display: 'flex', flexDirection: 'column', gap: '4px'
        }}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: 'var(--text-main)', textDecoration: 'none', fontSize: '1rem',
                fontFamily: 'var(--font-heading)', padding: '10px 12px',
                borderRadius: '8px', transition: 'background 0.2s ease'
              }}>
              {link.name}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '8px' }}>
            <MagneticButton><a href={personalData.github} target="_blank" rel="noreferrer" className="social-icon-btn"><Github size={16} color="#ffffff" /></a></MagneticButton>
            <MagneticButton><a href={personalData.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn"><Linkedin size={16} color="#0A66C2" /></a></MagneticButton>
            <MagneticButton><a href={personalData.leetcode} target="_blank" rel="noreferrer" className="social-icon-btn" title="LeetCode"><LeetCodeIcon color="#FFA116" /></a></MagneticButton>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-family: var(--font-mono);
          font-weight: 500;
          color: rgba(16, 185, 129, 0.9);
          background: rgba(16, 185, 129, 0.07);
          border: 1px solid rgba(16, 185, 129, 0.2);
          letter-spacing: 0.3px;
          white-space: nowrap;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: var(--text-muted);
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.02);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          flex-shrink: 0;
        }
        .social-icon-btn:hover {
          color: #fff;
          border-color: rgba(129, 140, 248, 0.5);
          background: rgba(129, 140, 248, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(129, 140, 248, 0.2);
        }
      `}</style>
    </header>
  );
};

export default Navbar;
