import React, { useState, useEffect } from "react";
import { isDST, inWorkingHours } from "timezone-shift";
import { TIMEZONES } from "../constants";
import {
  formatDate,
  formatTime,
  getLocalTime,
  getTimezoneAbbreviation,
} from "../utils";

// World Clock Component - HAS TIMER (needs real-time updates)
export const WorldClockTab: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="world-clock-container">
      <div className="clock-grid">
        {TIMEZONES.map((tz) => {
          const localTime = getLocalTime(currentTime, tz.name);
          const isDst = isDST(currentTime, tz.name);
          const inWork = inWorkingHours(currentTime, tz.name);
          const tzAbbr = getTimezoneAbbreviation(currentTime, tz.name);

          return (
            <div
              key={tz.name}
              className={`world-clock-card ${isDst ? "dst-active" : ""}`}
            >
              <div className="clock-header">
                <span className="flag">{tz.flag}</span>
                <h3 className="location">{tz.city}</h3>
                <span className="region">{tz.region}</span>
              </div>

              <div className="time-section">
                <div className="main-time">{formatTime(localTime)}</div>
                <div className="date-info">{formatDate(localTime)}</div>
                <div className="timezone-abbr">{tzAbbr}</div>
              </div>

              <div className="status-indicators">
                <span
                  className={`status-badge ${
                    isDst ? "dst-active" : "dst-inactive"
                  }`}
                >
                  {isDst ? "☀️ DST Active" : "🌙 Standard Time"}
                </span>
                <span
                  className={`status-badge ${
                    inWork ? "work-active" : "work-inactive"
                  }`}
                >
                  {inWork ? "🏢 Business Hours" : "🏠 After Hours"}
                </span>
              </div>

              <div className="clock-details">
                <div className="detail-item">
                  <span>UTC Offset</span>
                  <span className="detail-value">{tzAbbr}</span>
                </div>
                <div className="detail-item">
                  <span>Week Day</span>
                  <span className="detail-value">{localTime.getDay()}</span>
                </div>
                <div className="detail-item">
                  <span>Day of Year</span>
                  <span className="detail-value">
                    {Math.floor(
                      (localTime.getTime() -
                        new Date(localTime.getFullYear(), 0, 0).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
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
