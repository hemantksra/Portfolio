import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, MenuIcon, CloseIcon, ArrowUpRightIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const active = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (active) setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About',    href: '#about'    },
    { label: 'Skills',   href: '#skills'   },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact',  href: '#contact'  },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="site-navbar">
      <div className="nav-inner">

        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          className="nav-brand"
          aria-label="Hemant Saxena — back to top"
        >
          <div className="brand-mark">HS</div>
          <span className="brand-name">hemant.dev</span>
        </a>

        {/* Desktop links */}
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {navLinks.map(({ label, href }) => {
              const sectionId = href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={href} className="nav-link-item">
                  <a
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className={`nav-link${isActive ? ' active' : ''}`}
                  >
                    {label}
                    <span className="nav-link-underline" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="nav-actions">
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>

          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
          </a>

          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="nav-cta"
          >
            Get in Touch
            <ArrowUpRightIcon size={13} />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <ul className="mobile-nav-list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="mobile-nav-link"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-socials">
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-chip"
          >
            <GithubIcon size={14} />
            GitHub
            <ArrowUpRightIcon size={11} />
          </a>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-social-chip"
          >
            <LinkedinIcon size={14} />
            LinkedIn
            <ArrowUpRightIcon size={11} />
          </a>
        </div>
      </div>
    </header>
  );
}
