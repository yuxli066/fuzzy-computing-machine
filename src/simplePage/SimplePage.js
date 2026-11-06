import React from "react";
import portfolioInfo from "../content/general/leo";
import "./SimplePage.css";
import Portrait from "./Portrait";

export default function SimplePage({
  onReturn,
  returnScrollProps,
  transitioning,
}) {
  return (
    <div className="simple-page">
      <header className="simple-header">
        <a href="#simple-home">
          Leo Li<span>Software engineer</span>
        </a>
        <button
          type="button"
          className="simple-return-button"
          aria-label="Return to LeoOS desktop"
          disabled={transitioning}
          onClick={onReturn}
        >
          ↑ Back to LeoOS
        </button>
      </header>
      <main id="simple-home" className="simple-main" tabIndex={-1}>
        <div className="simple-intro">
          <div className="simple-heading">
            <p className="simple-eyebrow">A simpler view</p>
            <h1>
              Same Leo.
              <br />A fresh page.
            </h1>
          </div>
          <p>{portfolioInfo.about.content[0]}</p>
          <p>
            This portfolio is taking shape. In the meantime, take a look at my
            resume or get in touch.
          </p>
          <div className="simple-actions">
            <a
              href={portfolioInfo.contact.content.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume{" "}
              <svg
                className="simple-link-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 19 19 5M6 5h13v13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href={`mailto:${portfolioInfo.contact.content.email}`}>
              Get in touch{" "}
              <svg
                className="simple-link-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5 19 19 5M6 5h13v13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
        <Portrait />
      </main>
      <footer className="simple-footer">
        <span className="simple-footer-name">Yuxuan (Leo) Li</span>
        <span className="simple-footer-note">
          Built with a little curiosity.
        </span>
      </footer>
      <button
        type="button"
        className="peel-banner scroll-return"
        aria-label="Return to LeoOS desktop"
        {...returnScrollProps}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 20V4m-6 6 6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="peel-banner-title">Back to LeoOS</span>
        <span className="peel-banner-hint">Pull up or click to return</span>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 20V4m-6 6 6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
