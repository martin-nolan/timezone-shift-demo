import React, { useState, useEffect } from "react";
import {
  toTimezoneParts,
  fromTimezoneParts,
  isDST,
  dstTransitionDates,
  inWorkingHours,
  getTimezoneMetadata,
  type TimeParts,
  type SupportedTimezone,
} from "timezone-shift";
import { TIMEZONES } from "../constants";
import { formatTime, getLocalTime, getTimezoneAbbreviation } from "../utils";

export const APIDemoTab: React.FC = () => {
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
