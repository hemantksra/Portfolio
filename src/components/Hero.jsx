import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpRightIcon } from './Icons';
import ThinkingCanvas from './ThinkingCanvas';

export default function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid">

        {/* ── Left: Profile copy ── */}
        <div className="hero-left">
          {/* Status pill */}
          <div className="hero-status reveal delay-1">
            <div className="status-pulse">
              <span className="status-pulse-ring" />
              <span className="status-pulse-dot" />
            </div>
            2nd Year CSE @ REVA University • PR & Marketing Lead @ OS Code Club
          </div>

          {/* Name */}
          <h1 className="hero-name reveal delay-2">
            Hemant{' '}
            <span className="gradient-text">Saxena</span>
          </h1>

          {/* Title */}
          <p className="hero-title reveal delay-3">
            Computer Science & Engineering Undergraduate
          </p>

          {/* Tagline */}
          <p className="hero-tagline reveal delay-3">
            {personalInfo.tagline}
          </p>

          {/* Focus badges */}
          <div className="hero-badges reveal delay-4">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Low-Level Systems
            </span>
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Algorithms & DSA
            </span>
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Software Engineering
            </span>
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Community Leadership
            </span>
          </div>

          {/* CTAs */}
          <div className="hero-ctas reveal delay-5">
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              id="cta-github"
            >
              <GithubIcon size={17} />
              View GitHub
              <ArrowUpRightIcon size={13} className="btn-icon" />
            </a>

            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              id="cta-linkedin"
            >
              <LinkedinIcon size={17} />
              Connect on LinkedIn
              <ArrowUpRightIcon size={13} className="btn-icon" />
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="btn btn-ghost"
              id="cta-contact"
            >
              <MailIcon size={17} />
              Get in Touch
            </a>
          </div>
        </div>

        {/* ── Right: ThinkingCanvas ── */}
        <div className="hero-right reveal-right delay-3">
          <ThinkingCanvas />
        </div>

      </div>
    </section>
  );
}
