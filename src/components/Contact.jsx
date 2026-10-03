import React, { useState } from "react";
import { personalInfo } from "../data/portfolioData";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
} from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback: select text
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    // Open mailto with pre-filled body
    const subject = encodeURIComponent(
      `Hey Hemant — message from ${formState.name}`,
    );
    const body = encodeURIComponent(
      `Sender Email: ${formState.email}\n\n${formState.message}`,
    );
    window.open(
      `mailto:${personalInfo.email}?subject=${subject}&body=${body}`,
      "_blank",
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-container contact-section">
      {/* Label */}
      <div className="section-label reveal">
        <span className="section-label-line" />
        Let's Connect
      </div>

      <div className="contact-layout">
        {/* ── Left ── */}
        <div className="contact-left">
          <h2 className="contact-headline reveal delay-1">
            Open to <span className="gradient-text">conversations.</span>
          </h2>

          <p className="contact-subtext reveal delay-2">
            Whether it's a collaboration, an open-source project, or just a chat
            about systems programming and software — feel free to reach out on
            any platform below.
          </p>

          {/* Social contact cards */}
          <div className="contact-cards reveal delay-3">
            {/* GitHub */}
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              id="contact-github"
            >
              <div className="contact-card-icon github-icon">
                <GithubIcon size={20} />
              </div>
              <div className="contact-card-content">
                <div className="contact-card-title">GitHub</div>
                <div className="contact-card-handle">@hemantksra</div>
              </div>
              <ArrowUpRightIcon size={16} className="contact-card-arrow" />
            </a>

            {/* LinkedIn */}
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              id="contact-linkedin"
            >
              <div className="contact-card-icon linkedin-icon">
                <LinkedinIcon size={20} />
              </div>
              <div className="contact-card-content">
                <div className="contact-card-title">LinkedIn</div>
                <div className="contact-card-handle">Hemant Saxena</div>
              </div>
              <ArrowUpRightIcon size={16} className="contact-card-arrow" />
            </a>

            {/* Email card */}
            <div className="contact-card" style={{ cursor: "default" }}>
              <div className="contact-card-icon email-icon">
                <MailIcon size={20} />
              </div>
              <div className="contact-card-content">
                <div className="contact-card-title">Email</div>
                <div className="contact-card-handle">{personalInfo.email}</div>
              </div>
              <button
                type="button"
                className={`btn-copy${copied ? " copied" : ""}`}
                onClick={handleCopy}
                aria-label="Copy email address"
                title="Copy email"
              >
                {copied ? (
                  <>
                    <CheckIcon size={12} />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon size={12} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Quick message form ── */}
        <div className="contact-right reveal-right delay-2">
          <h3 className="contact-form-title">Send a quick message</h3>
          <form onSubmit={handleSubmit} id="contact-form" noValidate>
            <div className="form-field">
              <label htmlFor="contact-name" className="form-label">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                placeholder="e.g. Alex Johnson"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                required
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>

              <input
                id="contact-email"
                type="email"
                className="form-input"
                placeholder="alex@example.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
                required
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-msg" className="form-label">
                Message
              </label>
              <textarea
                id="contact-msg"
                className="form-textarea"
                placeholder="Hey Hemant, I'd love to..."
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                required
                rows={5}
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={
                !formState.name || !formState.email || !formState.message
              }
            >
              {submitted ? "✓ Opening email client..." : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
