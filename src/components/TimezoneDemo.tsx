import React, { useState } from "react";
import { APIDemoTab } from "./APIDemoTab";
import "./APIDemoTab/index.css";
import { BusinessTab } from "./BusinessTab";
import "./BusinessTab/index.css";
import { ConverterTab } from "./ConverterTab";
import "./ConverterTab/index.css";
import { DSTExplorerTab } from "./DSTExplorerTab";
import "./DSTExplorerTab/index.css";
import "./TimezoneDemo.css";
import { WorldClockTab } from "./WorldClockTab";
import "./WorldClockTab/index.css";

// Main Component - NO TIMER (just handles tab switching)
export const TimezoneDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "world" | "converter" | "dst" | "business" | "api"
  >("world");

  return (
    <div className="timezone-demo">
      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "world" ? "active" : ""}`}
          onClick={() => setActiveTab("world")}
        >
          🌍 World Clock
        </button>
        <button
          className={`tab-button ${activeTab === "dst" ? "active" : ""}`}
          onClick={() => setActiveTab("dst")}
        >
          ☀️ DST Explorer
        </button>
        <button
          className={`tab-button ${activeTab === "business" ? "active" : ""}`}
          onClick={() => setActiveTab("business")}
        >
          🏢 Business Hours
        </button>
        <button
          className={`tab-button ${activeTab === "converter" ? "active" : ""}`}
          onClick={() => setActiveTab("converter")}
        >
          🔄 Time Converter
        </button>
        <button
          className={`tab-button ${activeTab === "api" ? "active" : ""}`}
          onClick={() => setActiveTab("api")}
        >
          🛠️ API Demo
        </button>
      </nav>

      {/* Hero section only shows on World Clock tab */}
      {activeTab === "world" && (
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
      )}

      <div className="tab-content">
        {activeTab === "world" && <WorldClockTab />}
        {activeTab === "converter" && <ConverterTab />}
        {activeTab === "dst" && <DSTExplorerTab />}
        {activeTab === "business" && <BusinessTab />}
        {activeTab === "api" && <APIDemoTab />}
      </div>
    </div>
  );
};
