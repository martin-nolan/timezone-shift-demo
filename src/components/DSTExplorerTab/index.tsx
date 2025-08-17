import React, { useState, useEffect } from "react";
import { dstTransitionDates } from "timezone-shift";
import { TIMEZONES } from "../constants";
import { DstData } from "../types";
import { formatTime } from "../utils";

// DST Explorer Component - NO TIMER (static, only updates on year change)
export const DSTExplorerTab: React.FC = () => {
  const [dstYear, setDstYear] = useState(new Date().getFullYear());
  const [dstData, setDstData] = useState<DstData[]>([]);

  useEffect(() => {
    const results: DstData[] = TIMEZONES.map((tz) => ({
      ...tz,
      transitions: dstTransitionDates(dstYear, tz.name),
    }));
    setDstData(results);
  }, [dstYear]);

  return (
    <div className="dst-explorer-container">
      <div className="year-selector-modern">
        <h3>🌅 Daylight Saving Time Explorer</h3>
        <p>Explore DST transitions for {dstYear}</p>

        <div className="year-input-wrapper">
          <button className="year-btn" onClick={() => setDstYear(dstYear - 1)}>
            −
          </button>
          <input
            type="number"
            className="year-input"
            value={dstYear}
            onChange={(e) => setDstYear(parseInt(e.target.value))}
            min="1970"
            max="2030"
          />
          <button className="year-btn" onClick={() => setDstYear(dstYear + 1)}>
            +
          </button>
        </div>
      </div>

      <div className="dst-timeline-grid">
        {dstData.map((data) => (
          <div key={data.name} className="dst-timeline-card">
            <div className="timeline-header">
              <span className="flag">{data.flag}</span>
              <h4>{data.city}</h4>
              <span className="region">{data.region}</span>
            </div>

            <div className="timeline-content">
              {data.transitions ? (
                <>
                  <div className="timeline-line"></div>
                  <div className="transition-point">
                    <div className="transition-icon">🌅</div>
                    <div className="transition-info">
                      <span className="label">Spring Forward</span>
                      <span className="date">
                        {data.transitions.dstStartUtc.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="time">
                        {formatTime(data.transitions.dstStartUtc)} UTC
                      </span>
                    </div>
                  </div>
                  <div className="transition-point">
                    <div className="transition-icon">🌇</div>
                    <div className="transition-info">
                      <span className="label">Fall Back</span>
                      <span className="date">
                        {data.transitions.dstEndUtc.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="time">
                        {formatTime(data.transitions.dstEndUtc)} UTC
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-dst-info">
                  <div className="no-dst-icon">⏰</div>
                  <span>No DST Transitions</span>
                  <small>
                    This timezone doesn't observe daylight saving time
                  </small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
