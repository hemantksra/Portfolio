import React from 'react';
import { personalInfo, aboutData } from '../data/portfolioData';
import { CpuIcon, CodeIcon, TerminalIcon, UsersIcon, ArrowUpRightIcon, LinkedinIcon } from './Icons';

const PILLAR_ICONS = {
  cpu: CpuIcon,
  code: CodeIcon,
  terminal: TerminalIcon,
  users: UsersIcon,
};

export default function About() {
  const { leadershipExperience } = aboutData;

  return (
    <section id="about" className="section-container about-section">
      {/* Section label */}
      <div className="about-header">
        <div className="section-label reveal">
          <span className="section-label-line" />
          Background & Leadership
        </div>
        <h2 className="section-title reveal delay-1">About Me</h2>
      </div>

      <div className="about-layout">
        {/* ── Left: Bio + Cards ── */}
        <div>
          <h3 className="about-headline reveal">{aboutData.headline}</h3>

          <div style={{ marginTop: '20px' }}>
            {aboutData.bio.map((paragraph, i) => (
              <p key={i} className={`about-paragraph reveal delay-${i + 1}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Leadership Card */}
          {leadershipExperience && (
            <div className="leadership-card reveal delay-2">
              <div className="leadership-card-top">
                <div className="lc-badges">
                  <span className="lc-badge lc-badge-role">Club Leadership</span>
                  <span className="lc-badge lc-badge-active">Active Role</span>
                </div>
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lc-verify-link"
                  title="Verify on LinkedIn"
                >
                  <LinkedinIcon size={13} />
                  Verify on LinkedIn
                  <ArrowUpRightIcon size={11} />
                </a>
              </div>

              <h4 className="leadership-role">{leadershipExperience.title}</h4>
              <p className="leadership-org">
                {leadershipExperience.organization} • {leadershipExperience.period}
              </p>

              <ul className="leadership-list">
                {leadershipExperience.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Academic Card */}
          <div className="academic-card reveal delay-3">
            <div className="academic-info">
              <p className="academic-badge">Academic Status</p>
              <h4 className="academic-degree">B.Tech in Computer Science & Engineering</h4>
              <p className="academic-school">
                {personalInfo.university}, {personalInfo.location} · Class of {personalInfo.graduationYear} (Batch {personalInfo.batch})
              </p>
            </div>
            <div className="academic-status-note">
              Resume available upon request
            </div>
          </div>
        </div>

        {/* ── Right: Pillars ── */}
        <div className="about-pillars">
          {aboutData.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[pillar.icon] || TerminalIcon;
            return (
              <div key={idx} className={`pillar-card reveal delay-${idx + 1}`}>
                <div className="pillar-top">
                  <div className="pillar-icon-wrap">
                    <Icon size={18} />
                  </div>
                  <span className="pillar-tag">{pillar.tag}</span>
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
