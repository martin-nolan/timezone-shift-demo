import React, { useState, useEffect } from "react";
import { isDST, inWorkingHours } from "timezone-shift";
import { TIMEZONES } from "../constants";
import { formatTime, getLocalTime, getTimezoneAbbreviation } from "../utils";

// Business Hours Component - HAS TIMER (needs real-time updates)
export const BusinessTab: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const businessHoursCount = TIMEZONES.filter((tz) =>
    inWorkingHours(currentTime, tz.name)
  ).length;

  const dstActiveCount = TIMEZONES.filter((tz) =>
    isDST(currentTime, tz.name)
  ).length;

  return (
    <div className="business-container">
      <div className="business-overview">
        <div className="business-status-card">
          <h3>🌍 Global Business Overview</h3>

          <div className="business-indicators">
            <div
              className={`business-indicator ${
                businessHoursCount > 0 ? "active" : ""
              }`}
            >
              <div className="indicator-icon">🏢</div>
              <div className="indicator-content">
                <div className="indicator-label">Business Hours Active</div>
                <div className="indicator-value">
                  {businessHoursCount}/{TIMEZONES.length} Locations
                </div>
              </div>
            </div>

            <div
              className={`business-indicator ${
                dstActiveCount > 0 ? "active" : ""
              }`}
            >
              <div className="indicator-icon">☀️</div>
              <div className="indicator-content">
                <div className="indicator-label">DST Active</div>
                <div className="indicator-value">
                  {dstActiveCount}/{TIMEZONES.length} Locations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="business-grid">
        {TIMEZONES.map((tz) => {
          const localTime = getLocalTime(currentTime, tz.name);
          const isDst = isDST(currentTime, tz.name);
          const inWork = inWorkingHours(currentTime, tz.name);
          const tzAbbr = getTimezoneAbbreviation(currentTime, tz.name);

          return (
            <div
              key={tz.name}
              className={`business-card ${inWork ? "business-open" : ""}`}
            >
              <div className="business-header">
                <span className="flag">{tz.flag}</span>
                <h4>{tz.city}</h4>
                <div
                  className={`status-light ${inWork ? "green" : "red"}`}
                ></div>
              </div>

              <div className="business-time">
                <span className="current-time">{formatTime(localTime)}</span>
                <div
                  className={`business-status ${inWork ? "open" : "closed"}`}
                >
                  {inWork ? "🏢 Business Open" : "🏠 After Hours"}
                </div>
              </div>

              <div className="business-details">
                <div className="detail-row">
                  <span>Date</span>
                  <span>{localTime.toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <span>Timezone</span>
                  <span>{tzAbbr}</span>
                </div>
                <div className="detail-row">
                  <span>DST Status</span>
                  <span
                    className={
                      isDst ? "status-text open" : "status-text closed"
                    }
                  >
                    {isDst ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Business Hours</span>
                  <span
                    className={
                      inWork ? "status-text open" : "status-text closed"
                    }
                  >
                    {inWork ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
