import React, { useState, useEffect } from "react";
import {
  toTimezoneParts,
  fromTimezoneParts,
  isDST,
  dstTransitionDates,
  inWorkingHours,
  getTimezoneMetadata,
  type TimeParts,
  type DstTransitions,
  type SupportedTimezone,
} from "timezone-shift";
import "./TimezoneDemo.css";

// Types for our component state
interface ConversionResult {
  name: SupportedTimezone;
  city: string;
  flag: string;
  region: string;
  time: Date;
  isDst: boolean;
}

interface DstData {
  name: SupportedTimezone;
  city: string;
  flag: string;
  region: string;
  transitions: DstTransitions | null;
}

// Static timezone configuration
const TIMEZONES = [
  {
    name: "America/New_York" as SupportedTimezone,
    city: "New York",
    flag: "🇺🇸",
    region: "EST/EDT",
  },
  {
    name: "America/Los_Angeles" as SupportedTimezone,
    city: "Los Angeles",
    flag: "🇺🇸",
    region: "PST/PDT",
  },
  {
    name: "Europe/London" as SupportedTimezone,
    city: "London",
    flag: "🇬🇧",
    region: "GMT/BST",
  },
  {
    name: "Europe/Paris" as SupportedTimezone,
    city: "Paris",
    flag: "🇫🇷",
    region: "CET/CEST",
  },
  {
    name: "Europe/Berlin" as SupportedTimezone,
    city: "Berlin",
    flag: "🇩🇪",
    region: "CET/CEST",
  },
  {
    name: "Asia/Tokyo" as SupportedTimezone,
    city: "Tokyo",
    flag: "🇯🇵",
    region: "JST",
  },
  {
    name: "Australia/Sydney" as SupportedTimezone,
    city: "Sydney",
    flag: "🇦🇺",
    region: "AEST/AEDT",
  },
];

// Utility functions
const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getLocalTime = (utcTime: Date, timezone: SupportedTimezone): Date => {
  const parts = toTimezoneParts(utcTime, timezone);
  return new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
};

const getTimezoneAbbreviation = (
  date: Date,
  timezone: SupportedTimezone
): string => {
  try {
    const metadata = getTimezoneMetadata(timezone);
    const isDstActive = isDST(date, timezone);

    if (metadata.preferredAbbreviations) {
      return isDstActive
        ? metadata.preferredAbbreviations.dst ||
            metadata.preferredAbbreviations.standard
        : metadata.preferredAbbreviations.standard;
    }

    // Fallback to offset format
    const offset = isDstActive
      ? metadata.dstOffset || metadata.standardOffset
      : metadata.standardOffset;
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${hours.toString().padStart(2, "0")}${
      minutes ? ":" + minutes.toString().padStart(2, "0") : ""
    }`;
  } catch {
    return "UTC";
  }
};

// Helper function to convert time between timezones
const convertBetweenTimezones = (
  date: Date,
  fromTz: SupportedTimezone,
  toTz: SupportedTimezone
): Date => {
  // Get the local time parts in the source timezone
  const parts = toTimezoneParts(date, fromTz);
  // Create a new date as if those parts were in the target timezone
  return fromTimezoneParts(parts, toTz);
};

// World Clock Component - HAS TIMER (needs real-time updates)
const WorldClockTab: React.FC = () => {
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

// Time Converter Component - NO TIMER (static, only updates on user input)
const ConverterTab: React.FC = () => {
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

// DST Explorer Component - NO TIMER (static, only updates on year change)
const DSTExplorerTab: React.FC = () => {
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

// Business Hours Component - HAS TIMER (needs real-time updates)
const BusinessTab: React.FC = () => {
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

// API Demo Component - Interactive API showcase
const APIDemoTab: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] =
    useState<SupportedTimezone>("Europe/London");
  const [customDate, setCustomDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [customTime, setCustomTime] = useState("12:00");

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get current data for selected timezone
  const currentLocalTime = getLocalTime(currentTime, selectedTimezone);
  const currentDst = isDST(currentTime, selectedTimezone);
  const currentWorkHours = inWorkingHours(currentTime, selectedTimezone);
  const metadata = getTimezoneMetadata(selectedTimezone);

  // Get custom date/time data
  const customDateTime =
    customDate && customTime
      ? (() => {
          const [hours, minutes] = customTime.split(":").map(Number);
          const date = new Date(customDate);
          const parts: TimeParts = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: hours,
            minute: minutes,
            second: 0,
          };
          return fromTimezoneParts(parts, selectedTimezone);
        })()
      : null;

  const customDst = customDateTime
    ? isDST(customDateTime, selectedTimezone)
    : null;
  const customWorkHours = customDateTime
    ? inWorkingHours(customDateTime, selectedTimezone)
    : null;

  return (
    <div className="api-demo-container">
      <div className="api-demo-header">
        <h2>🛠️ Interactive API Demo</h2>
        <p>Explore all timezone-shift library functions with live examples</p>
      </div>

      <div className="api-demo-controls">
        <div className="control-group">
          <label>Select Timezone:</label>
          <select
            className="modern-select"
            value={selectedTimezone}
            onChange={(e) =>
              setSelectedTimezone(e.target.value as SupportedTimezone)
            }
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.name} value={tz.name}>
                {tz.flag} {tz.city} ({tz.region})
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Test Date:</label>
          <input
            type="date"
            className="modern-input"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
          />
        </div>

        <div className="control-group">
          <label>Test Time:</label>
          <input
            type="time"
            className="modern-input"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
          />
        </div>
      </div>

      <div className="api-functions-grid">
        {/* Real-time Functions */}
        <div className="api-function-card realtime">
          <h3>🕐 Real-time Functions</h3>
          <div className="api-example">
            <div className="function-name">toTimezoneParts()</div>
            <div className="code-block">
              <pre>
                {`const parts = toTimezoneParts(
  new Date(),
  "${selectedTimezone}"
);`}
              </pre>
            </div>
            <div className="result">
              Result:{" "}
              {JSON.stringify(
                toTimezoneParts(currentTime, selectedTimezone),
                null,
                2
              )}
            </div>
          </div>

          <div className="api-example">
            <div className="function-name">isDST()</div>
            <div className="code-block">
              <pre>
                {`const isDst = isDST(
  new Date(),
  "${selectedTimezone}"
);`}
              </pre>
            </div>
            <div className="result">
              Result:{" "}
              <span className={`status ${currentDst ? "active" : "inactive"}`}>
                {currentDst ? "true (DST Active)" : "false (Standard Time)"}
              </span>
            </div>
          </div>

          <div className="api-example">
            <div className="function-name">inWorkingHours()</div>
            <div className="code-block">
              <pre>
                {`const working = inWorkingHours(
  new Date(),
  "${selectedTimezone}"
);`}
              </pre>
            </div>
            <div className="result">
              Result:{" "}
              <span
                className={`status ${currentWorkHours ? "active" : "inactive"}`}
              >
                {currentWorkHours
                  ? "true (Business Hours)"
                  : "false (After Hours)"}
              </span>
            </div>
          </div>

          <div className="live-demonstration">
            <h4>🔴 Live Demo: {selectedTimezone}</h4>
            <div className="live-stats">
              <div className="stat">
                <span className="label">Current Time:</span>
                <span className="value">{formatTime(currentLocalTime)}</span>
              </div>
              <div className="stat">
                <span className="label">DST Status:</span>
                <span
                  className={`badge ${
                    currentDst ? "dst-active" : "dst-inactive"
                  }`}
                >
                  {currentDst ? "☀️ DST" : "🌙 STD"}
                </span>
              </div>
              <div className="stat">
                <span className="label">Business Hours:</span>
                <span
                  className={`badge ${
                    currentWorkHours ? "work-active" : "work-inactive"
                  }`}
                >
                  {currentWorkHours ? "🏢 Open" : "🏠 Closed"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Date/Time Functions */}
        <div className="api-function-card custom">
          <h3>📅 Custom Date/Time Functions</h3>
          <div className="api-example">
            <div className="function-name">fromTimezoneParts()</div>
            <div className="code-block">
              <pre>
                {`const date = fromTimezoneParts({
  year: ${new Date(customDate).getFullYear()},
  month: ${new Date(customDate).getMonth() + 1},
  day: ${new Date(customDate).getDate()},
  hour: ${customTime.split(":")[0]},
  minute: ${customTime.split(":")[1]},
  second: 0
}, "${selectedTimezone}");`}
              </pre>
            </div>
            <div className="result">
              Result:{" "}
              {customDateTime
                ? customDateTime.toISOString()
                : "Set date and time above"}
            </div>
          </div>

          {customDateTime && (
            <>
              <div className="api-example">
                <div className="function-name">isDST() - Custom Date</div>
                <div className="result">
                  Result:{" "}
                  <span
                    className={`status ${customDst ? "active" : "inactive"}`}
                  >
                    {customDst ? "true (DST Active)" : "false (Standard Time)"}
                  </span>
                </div>
              </div>

              <div className="api-example">
                <div className="function-name">
                  inWorkingHours() - Custom Date
                </div>
                <div className="result">
                  Result:{" "}
                  <span
                    className={`status ${
                      customWorkHours ? "active" : "inactive"
                    }`}
                  >
                    {customWorkHours
                      ? "true (Business Hours)"
                      : "false (After Hours)"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Metadata Functions */}
        <div className="api-function-card metadata">
          <h3>📊 Metadata Functions</h3>
          <div className="api-example">
            <div className="function-name">getTimezoneMetadata()</div>
            <div className="code-block">
              <pre>
                {`const metadata = getTimezoneMetadata(
  "${selectedTimezone}"
);`}
              </pre>
            </div>
            <div className="result metadata-result">
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="label">Standard Offset:</span>
                  <span className="value">
                    {metadata.standardOffset} minutes
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="label">DST Offset:</span>
                  <span className="value">
                    {metadata.dstOffset || "None"} minutes
                  </span>
                </div>
                {metadata.preferredAbbreviations && (
                  <>
                    <div className="metadata-item">
                      <span className="label">Standard Abbr:</span>
                      <span className="value">
                        {metadata.preferredAbbreviations.standard}
                      </span>
                    </div>
                    <div className="metadata-item">
                      <span className="label">DST Abbr:</span>
                      <span className="value">
                        {metadata.preferredAbbreviations.dst || "None"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="api-example">
            <div className="function-name">dstTransitionDates()</div>
            <div className="code-block">
              <pre>
                {`const transitions = dstTransitionDates(
  ${new Date().getFullYear()},
  "${selectedTimezone}"
);`}
              </pre>
            </div>
            <div className="result">
              {(() => {
                const transitions = dstTransitionDates(
                  new Date().getFullYear(),
                  selectedTimezone
                );
                return transitions ? (
                  <div className="transitions-result">
                    <div className="transition">
                      <span className="label">Spring Forward:</span>
                      <span className="value">
                        {transitions.dstStartUtc.toLocaleString()}
                      </span>
                    </div>
                    <div className="transition">
                      <span className="label">Fall Back:</span>
                      <span className="value">
                        {transitions.dstEndUtc.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="no-transitions">
                    No DST transitions for this timezone
                  </span>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Reliability Demo */}
        <div className="api-function-card reliability">
          <h3>🎯 Reliability Demonstration</h3>
          <div className="reliability-demo">
            <h4>Automatic DST Handling</h4>
            <p>
              The library automatically handles DST transitions. Here's London
              throughout the year:
            </p>

            <div className="season-examples">
              <div className="season">
                <h5>🌸 Spring (March)</h5>
                <div className="season-data">
                  {(() => {
                    const springDate = new Date(2024, 2, 15); // March 15
                    const springDst = isDST(springDate, "Europe/London");
                    const springTime = getLocalTime(
                      springDate,
                      "Europe/London"
                    );
                    const springAbbr = getTimezoneAbbreviation(
                      springDate,
                      "Europe/London"
                    );
                    return (
                      <>
                        <span>Time: {formatTime(springTime)}</span>
                        <span>DST: {springDst ? "Yes" : "No"}</span>
                        <span>Zone: {springAbbr}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="season">
                <h5>☀️ Summer (July)</h5>
                <div className="season-data">
                  {(() => {
                    const summerDate = new Date(2024, 6, 15); // July 15
                    const summerDst = isDST(summerDate, "Europe/London");
                    const summerTime = getLocalTime(
                      summerDate,
                      "Europe/London"
                    );
                    const summerAbbr = getTimezoneAbbreviation(
                      summerDate,
                      "Europe/London"
                    );
                    return (
                      <>
                        <span>Time: {formatTime(summerTime)}</span>
                        <span>DST: {summerDst ? "Yes" : "No"}</span>
                        <span>Zone: {summerAbbr}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="season">
                <h5>❄️ Winter (January)</h5>
                <div className="season-data">
                  {(() => {
                    const winterDate = new Date(2024, 0, 15); // January 15
                    const winterDst = isDST(winterDate, "Europe/London");
                    const winterTime = getLocalTime(
                      winterDate,
                      "Europe/London"
                    );
                    const winterAbbr = getTimezoneAbbreviation(
                      winterDate,
                      "Europe/London"
                    );
                    return (
                      <>
                        <span>Time: {formatTime(winterTime)}</span>
                        <span>DST: {winterDst ? "Yes" : "No"}</span>
                        <span>Zone: {winterAbbr}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div className="reliability-note">
              💡 <strong>Key Point:</strong> No matter when you call these
              functions, they always return the correct local time for London,
              automatically accounting for BST/GMT transitions!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
