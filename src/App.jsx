import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ──────────────────────────────────────────────────────────
   BIDIRECTIONAL SCROLL REVEAL
   - Adds .is-visible when element enters viewport
   - Removes .is-visible when scrolling BACK UP past element
     (element re-enters below viewport → hide it)
   - Elements with delay-* classes fade in/out in stagger order
   - Uses GPU-only properties: opacity + transform (no layout)
   ────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const sel = '.reveal, .reveal-up, .reveal-left, .reveal-right';
    const els = [...document.querySelectorAll(sel)];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            // Entering viewport — show
            el.classList.add('is-visible');
          } else {
            const { top } = entry.boundingClientRect;
            if (top > 0) {
              // Element is below viewport — user scrolled back up past it → hide
              el.classList.remove('is-visible');
            }
            // top < 0 means element scrolled above viewport (normal downward scroll) → stay visible
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <div className="portfolio-app">
      {/* Fixed ambient glows — GPU composited, never repaint */}
      <div className="glow-layer" aria-hidden="true">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />
      </div>

      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main className="portfolio-main">
        <Hero />
        <div className="section-sep" />
        <About />
        <div className="section-sep" />
        <Skills />
        <div className="section-sep" />
        <Projects />
        <div className="section-sep" />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
