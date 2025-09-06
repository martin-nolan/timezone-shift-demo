import React, { useState } from "react";
import { APIDemoTab } from "./APIDemoTab";
import { BusinessTab } from "./BusinessTab";
import { ConverterTab } from "./ConverterTab";
import { DSTExplorerTab } from "./DSTExplorerTab";
import { WorldClockTab } from "./WorldClockTab";
import { HeroSection, TimezoneErrorBoundary } from "./shared";

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
      {activeTab === "world" && <HeroSection />}

      <div className="tab-content">
        <TimezoneErrorBoundary>
          {activeTab === "world" && <WorldClockTab />}
          {activeTab === "converter" && <ConverterTab />}
          {activeTab === "dst" && <DSTExplorerTab />}
          {activeTab === "business" && <BusinessTab />}
          {activeTab === "api" && <APIDemoTab />}
        </TimezoneErrorBoundary>
      </div>
    </div>
  );
};
