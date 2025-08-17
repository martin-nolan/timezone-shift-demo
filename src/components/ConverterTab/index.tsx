import React, { useState, useEffect } from "react";
import {
  fromTimezoneParts,
  isDST,
  type TimeParts,
  type SupportedTimezone,
} from "timezone-shift";
import { TIMEZONES } from "../constants";
import { ConversionResult } from "../types";
import {
  convertBetweenTimezones,
  formatDate,
  formatTime,
  getLocalTime,
  getTimezoneAbbreviation,
} from "../utils";

// Time Converter Component - NO TIMER (static, only updates on user input)
export const ConverterTab: React.FC = () => {
  const [sourceTime, setSourceTime] = useState("");
  const [sourceDate, setSourceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [sourceTimezone, setSourceTimezone] =
    useState<SupportedTimezone>("America/New_York");
  const [conversionResults, setConversionResults] = useState<
    ConversionResult[]
  >([]);

  useEffect(() => {
    if (sourceTime && sourceDate) {
      try {
        const [hours, minutes] = sourceTime.split(":").map(Number);
        const sourceDateObj = new Date(sourceDate);
        const parts: TimeParts = {
          year: sourceDateObj.getFullYear(),
          month: sourceDateObj.getMonth() + 1,
          day: sourceDateObj.getDate(),
          hour: hours,
          minute: minutes,
          second: 0,
        };

        const sourceDateTime = fromTimezoneParts(parts, sourceTimezone);

        const results: ConversionResult[] = TIMEZONES.map((tz) => ({
          ...tz,
          time:
            tz.name === sourceTimezone
              ? sourceDateTime
              : convertBetweenTimezones(
                  sourceDateTime,
                  sourceTimezone,
                  tz.name
                ),
          isDst: isDST(sourceDateTime, tz.name),
        }));
        setConversionResults(results);
      } catch (error) {
        console.error("Error converting time:", error);
        setConversionResults([]);
      }
    }
  }, [sourceTime, sourceDate, sourceTimezone]);

  return (
    <div className="converter-container">
      <div className="converter-input-section">
        <div className="input-card">
          <h3>🔄 Time Converter</h3>
          <p>Convert any time from one timezone to all others</p>

          <div className="input-row">
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                className="modern-input"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Time</label>
              <input
                type="time"
                className="modern-input"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                step="1"
              />
            </div>

            <div className="input-group">
              <label>Source Timezone</label>
              <select
                className="modern-select"
                value={sourceTimezone}
                onChange={(e) =>
                  setSourceTimezone(e.target.value as SupportedTimezone)
                }
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.name} value={tz.name}>
                    {tz.flag} {tz.city} ({tz.region})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {conversionResults.length > 0 && (
        <>
          <div className="conversion-arrow">
            <div className="arrow-icon">⬇️</div>
          </div>

          <div className="conversion-results-grid">
            {conversionResults.map((result) => {
              const localTime = getLocalTime(result.time, result.name);
              return (
                <div
                  key={result.name}
                  className={`conversion-result-card ${
                    result.name === sourceTimezone ? "source-timezone" : ""
                  }`}
                >
                  <div className="result-header">
                    <span className="flag">{result.flag}</span>
                    <span className="city">{result.city}</span>
                    <span className="region">{result.region}</span>
                  </div>

                  <div className="result-time">{formatTime(localTime)}</div>

                  <div className="result-date">{formatDate(localTime)}</div>

                  <div
                    className={`result-status ${
                      result.isDst ? "dst-active" : ""
                    }`}
                  >
                    {result.isDst ? "☀️ DST" : "🌙 Standard"} •{" "}
                    {getTimezoneAbbreviation(result.time, result.name)}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
