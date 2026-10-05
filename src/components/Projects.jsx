import React from "react";
import { projectsData, personalInfo } from "../data/portfolioData";
import { GithubIcon, ArrowUpRightIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="section-container projects-section">
      {/* Intro row */}
      <div className="projects-intro">
        <div>
          <div className="section-label reveal">
            <span className="section-label-line" />
            Featured Work
          </div>
          <h2 className="section-title reveal delay-1">Projects</h2>
        </div>
        <div>
          <p
            className="section-desc reveal delay-2"
            style={{ alignSelf: "end" }}
          >
            A selection of projects focused on software development, systems
            thinking, and practical problem solving. Each project reflects
            hands-on learning and real implementation experience.
          </p>
          <div className="reveal delay-3" style={{ marginTop: "16px" }}>
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon size={16} />
              View All on GitHub
              <ArrowUpRightIcon size={13} className="btn-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Project cards */}
      <div className="projects-grid">
        {projectsData.map((project, idx) => (
          <article
            key={project.id}
            className={`project-card reveal delay-${idx + 1}`}
            aria-label={`Project: ${project.title}`}
          >
            <div className="project-badge">{project.badge}</div>

            <h3 className="project-title">{project.title}</h3>

            <p className="project-desc">{project.description}</p>

            {project.highlightMetric && (
              <div className="project-metric">◆ {project.highlightMetric}</div>
            )}

            <div className="project-tags">
              {project.tags.map((tag, ti) => (
                <span key={ti} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn project-link-github"
                title="View source on GitHub"
              >
                <GithubIcon size={13} />
                Source
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
