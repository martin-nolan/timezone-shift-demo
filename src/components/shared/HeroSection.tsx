import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <div className="hero-header">
      <div className="floating-elements">
        <div className="floating-clock">🕐</div>
        <div className="floating-globe">🌍</div>
        <div className="floating-time">⏰</div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="gradient-text">Timezone Shift</span>
        </h1>
        <p className="hero-description">
          Explore the power of the{" "}
          <a
            className="gradient-text"
            href="https://www.npmjs.com/package/timezone-shift"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "underline",
            }}
          >
            timezone-shift
          </a>{" "}
          library with this comprehensive demo showcasing all capabilities
          across multiple timezones with a modern, interactive interface.
        </p>
      </div>
    </div>
  );
};
