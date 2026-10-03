import React from 'react';
import { skillsData } from '../data/portfolioData';
import { CodeIcon, CpuIcon, TerminalIcon, UsersIcon, SparklesIcon, LinkedinIcon, ArrowUpRightIcon } from './Icons';

const CAT_ICONS = {
  'languages':    CodeIcon,
  'core-focus':   CpuIcon,
  'tools':        TerminalIcon,
  'leadership':   UsersIcon,
};

export default function Skills() {
  return (
    <section id="skills" className="section-container skills-section">
      {/* Intro row */}
      <div className="skills-intro">
        <div>
          <div className="section-label reveal">
            <span className="section-label-line" />
            Technical Competencies
          </div>
          <h2 className="section-title reveal delay-1">Skills & Tech Stack</h2>
        </div>
        <p className="section-desc reveal delay-2" style={{ alignSelf: 'end' }}>
          Core programming foundations, algorithmic paradigms, developer tooling, and community leadership — the complete picture of how I build and grow.
        </p>
      </div>

      {/* Skills grid */}
      <div className="skills-grid">
        {skillsData.categories.map((cat, catIdx) => {
          const Icon = CAT_ICONS[cat.id] || SparklesIcon;
          return (
            <div key={cat.id} className={`skill-category reveal delay-${catIdx + 1}`}>
              <div className="skill-cat-header">
                <div className="skill-cat-icon">
                  <Icon size={17} />
                </div>
                <div>
                  <div className="skill-cat-title">{cat.title}</div>
                  <div className="skill-cat-desc">{cat.description}</div>
                </div>
              </div>

              <div className="skill-items">
                {cat.skills.map((skill, si) => (
                  <div key={si} className={`skill-item${skill.highlight ? ' highlighted' : ''}`}>
                    <div className="skill-item-left">
                      <span className="skill-item-dot" />
                      <span className="skill-item-name">{skill.name}</span>
                    </div>
                    <span className="skill-item-level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner */}
      <div className="skills-cta-banner reveal delay-2" style={{ marginTop: '24px' }}>
        <div className="skills-banner-text">
          <h4>Continuously Learning</h4>
          <p>
            Advancing daily in low-level memory architectures, algorithm efficiency, and practical software engineering workflows.
          </p>
        </div>
        <a
          href="https://www.linkedin.com/in/hemantsaxenaksra/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ flexShrink: 0 }}
        >
          <LinkedinIcon size={16} />
          Full Profile
          <ArrowUpRightIcon size={13} className="btn-icon" />
        </a>
      </div>
    </section>
  );
}
