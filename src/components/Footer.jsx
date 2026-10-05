import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner">

        <p className="footer-copy">
          © {year} Hemant Saxena ·{' '}
          <span>Built with Vite + React</span>
        </p>

        <div className="footer-socials">
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            title="GitHub"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>

        <button
          type="button"
          className="footer-back-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          Back to top ↑
        </button>

      </div>
    </footer>
  );
}
