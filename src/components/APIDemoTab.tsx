import React, { useState } from "react";
import {
  toTimezoneParts,
  dstTransitionDates,
  // New auto-detection functions
  isDSTNow,
  getCurrentTimezoneParts,
  inWorkingHoursNow,
  formatNow,
  getDetectedTimezone,
  getTimezoneInfo,
  // Runtime registry functions
  validateAndRegisterTimezone,
  clearRuntimeTimezoneCache,
  type SupportedTimezone,
} from "timezone-shift";
import { TIMEZONES } from "../utils";
import {
  MetadataDisplay,
  SeasonExample,
  APIExample,
  TimeDisplay,
  StatusBadge,
} from "./shared";
import {
  useCurrentTime,
  useCustomDateTime,
  useTimezoneAnalysis,
} from "../hooks";

export const APIDemoTab: React.FC = () => {
  const { currentTime } = useCurrentTime(1000);
  const [selectedTimezone, setSelectedTimezone] =
    useState<SupportedTimezone>("Europe/London");

  // Use custom hooks for better organization
  const {
    customDate,
    setCustomDate,
    customTime,
    setCustomTime,
    customDateTime,
    customDst,
    customWorkHours,
  } = useCustomDateTime(selectedTimezone);

  // Get current data for selected timezone using the analysis hook
  const {
    localTime: currentLocalTime,
    isDstActive: currentDst,
    inBusinessHours: currentWorkHours,
  } = useTimezoneAnalysis(currentTime, selectedTimezone);

  return (
    <div className="container">
      <div className="mb-2xl">
        <div className="card text-center animate-fadeInUp">
          <h3 className="text-3xl mb-sm">🛠️ Interactive API Demo</h3>
          <p className="text-secondary mb-xl">
            Explore all timezone-shift library functions with live examples
          </p>
        </div>
      </div>

      <div className="mb-2xl">
        <div className="card">
          <div className="grid grid-auto-fit gap-lg">
            <div className="form-group">
              <label className="form-label">Select Timezone</label>
              <select
                className="form-select"
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

            <div className="form-group">
              <label className="form-label">Test Date</label>
              <input
                type="date"
                className="form-input"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Test Time</label>
              <input
                type="time"
                className="form-input"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Auto-Detection Features Section */}
      <div className="mb-2xl">
        <div className="card">
          <h2 className="text-2xl font-bold mb-lg text-center">
            🤖 Auto-Detection Features
          </h2>
          <p className="text-secondary mb-xl text-center">
            These new functions automatically detect your current timezone and
            provide instant results without requiring timezone parameters.
          </p>

          <div className="grid grid-auto-fit gap-lg">
            {/* Auto DST Detection */}
            <div className="card border">
              <h3 className="text-lg font-semibold mb-md text-center">
                🌞 DST Auto-Detection
              </h3>
              <APIExample
                functionName="isDSTNow()"
                code="const isDstActive = isDSTNow();"
                result={`${isDSTNow()}`}
              />
              <p className="text-sm text-secondary mt-sm text-center">
                Check if DST is currently active in your timezone
              </p>
            </div>

            {/* Current Timezone Parts */}
            <div className="card border">
              <h3 className="text-lg font-semibold mb-md text-center">
                ⏰ Current Time Parts
              </h3>
              <APIExample
                functionName="getCurrentTimezoneParts()"
                code="const parts = getCurrentTimezoneParts();"
                result={JSON.stringify(getCurrentTimezoneParts(), null, 2)}
              />
              <p className="text-sm text-secondary mt-sm text-center">
                Get current time broken down into parts for your timezone
              </p>
            </div>

            {/* Working Hours Auto-Detection */}
            <div className="card border">
              <h3 className="text-lg font-semibold mb-md text-center">
                🏢 Business Hours Auto-Check
              </h3>
              <APIExample
                functionName="inWorkingHoursNow()"
                code="const isWorkTime = inWorkingHoursNow();"
                result={`${inWorkingHoursNow()}`}
              />
              <p className="text-sm text-secondary mt-sm text-center">
                Check if it's currently business hours in your timezone
              </p>
            </div>

            {/* Formatting Current Time */}
            <div className="card border">
              <h3 className="text-lg font-semibold mb-md text-center">
                📄 Format Current Time
              </h3>
              <APIExample
                functionName="formatNow()"
                code="const timeString = formatNow();"
                result={`"${formatNow()}"`}
              />
              <p className="text-sm text-secondary mt-sm text-center">
                Get current time formatted for your timezone
              </p>
            </div>

            {/* Timezone Detection */}
            <div className="card border">
              <h3 className="text-lg font-semibold mb-md text-center">
                🌍 Timezone Detection
              </h3>
              <APIExample
                functionName="getDetectedTimezone()"
                code="const timezone = getDetectedTimezone();"
                result={`"${getDetectedTimezone()}"`}
              />
              <p className="text-sm text-secondary mt-sm text-center">
                Get your browser's detected timezone
              </p>
            </div>

            {/* Timezone Information */}
            <div className="card border">
              <h3 className="text-lg font-semibold mb-md text-center">
                📊 Timezone Information
              </h3>
              <APIExample
                functionName="getTimezoneInfo()"
                code="const info = getTimezoneInfo();"
                result={JSON.stringify(getTimezoneInfo(), null, 2)}
              />
              <p className="text-sm text-secondary mt-sm text-center">
                Get comprehensive info about your timezone
              </p>
            </div>
          </div>

          {/* Runtime Registry Functions */}
          <div className="mt-2xl">
            <h2 className="text-xl font-bold mb-lg text-center">
              🔧 Runtime Registry Functions
            </h2>
            <p className="text-secondary mb-lg text-center">
              Dynamic timezone registration and cache management for enhanced
              flexibility.
            </p>

            <div className="grid grid-auto-fit gap-lg">
              {/* Dynamic Timezone Registration */}
              <div className="card border">
                <h3 className="text-lg font-semibold mb-md text-center">
                  ⚡ Dynamic Registration
                </h3>
                <APIExample
                  functionName="validateAndRegisterTimezone()"
                  code={`const result = validateAndRegisterTimezone("Pacific/Honolulu");`}
                  result={`${validateAndRegisterTimezone("Pacific/Honolulu")}`}
                />
                <p className="text-sm text-secondary mt-sm text-center">
                  Dynamically register and validate any IANA timezone
                </p>
              </div>

              {/* Cache Management */}
              <div className="card border">
                <h3 className="text-lg font-semibold mb-md text-center">
                  🧹 Cache Management
                </h3>
                <APIExample
                  functionName="clearRuntimeTimezoneCache()"
                  code={`clearRuntimeTimezoneCache(); // Clear all caches
clearRuntimeTimezoneCache("Europe/Paris"); // Clear specific timezone`}
                  result={(() => {
                    clearRuntimeTimezoneCache();
                    return "Cache cleared successfully";
                  })()}
                />
                <p className="text-sm text-secondary mt-sm text-center">
                  Clear timezone caches for memory optimization
                </p>
              </div>
            </div>
          </div>

          <div className="mt-xl p-lg bg-primary rounded-lg">
            <h4 className="text-lg font-semibold mb-md text-center">
              🎯 Benefits of Auto-Detection
            </h4>
            <div className="grid sm:grid-2 lg:grid-4 gap-md">
              <div className="text-center">
                <div className="text-2xl mb-sm">⚙️</div>
                <div className="text-sm font-semibold mb-xs">
                  Zero Configuration
                </div>
                <div className="text-xs text-secondary">
                  No manual timezone parameters needed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-sm">🎯</div>
                <div className="text-sm font-semibold mb-xs">
                  Real-time Accuracy
                </div>
                <div className="text-xs text-secondary">
                  Always reflects current timezone and DST
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-sm">🚀</div>
                <div className="text-sm font-semibold mb-xs">
                  Simplified API
                </div>
                <div className="text-xs text-secondary">
                  One-liner functions for common operations
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-sm">🌐</div>
                <div className="text-sm font-semibold mb-xs">
                  Cross-platform
                </div>
                <div className="text-xs text-secondary">
                  Works across browsers and devices
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-2 gap-xl mb-2xl">
        {/* Real-time Functions */}
        <div className="card accent-primary">
          <h4 className="text-xl mb-lg">🕐 Real-time Functions</h4>
          <APIExample
            functionName="toTimezoneParts()"
            code={`const parts = toTimezoneParts(
  new Date(),
  "${selectedTimezone}"
);`}
            result={JSON.stringify(
              toTimezoneParts(currentTime, selectedTimezone),
              null,
              2
            )}
          />

          <APIExample
            functionName="isDST()"
            code={`const isDst = isDST(
  new Date(),
  "${selectedTimezone}"
);`}
            result={
              <div className="text-center">
                <StatusBadge type={currentDst ? "dst" : "inactive"}>
                  {currentDst ? "☀️ DST Active" : "🌙 Standard Time"}
                </StatusBadge>
              </div>
            }
          />

          <APIExample
            functionName="inWorkingHours()"
            code={`const working = inWorkingHours(
  new Date(),
  "${selectedTimezone}"
);`}
            result={
              <div className="text-center">
                <StatusBadge type={currentWorkHours ? "business" : "inactive"}>
                  {currentWorkHours ? "🏢 Business Hours" : "🏠 After Hours"}
                </StatusBadge>
              </div>
            }
          />

          <div className="mt-xl p-lg bg-tertiary rounded-lg">
            <h5 className="text-lg mb-md text-center">
              🔴 Live Demo: {selectedTimezone}
            </h5>
            <div className="grid sm:grid-3 gap-lg">
              <div className="text-center">
                <span className="text-sm text-secondary block mb-sm">
                  Current Time:
                </span>
                <TimeDisplay time={currentLocalTime} />
              </div>
              <div className="text-center">
                <span className="text-sm text-secondary block mb-sm">
                  DST Status:
                </span>
                <StatusBadge type={currentDst ? "dst" : "inactive"}>
                  {currentDst ? "☀️ DST" : "🌙 STD"}
                </StatusBadge>
              </div>
              <div className="text-center">
                <span className="text-sm text-secondary block mb-sm">
                  Business Hours:
                </span>
                <StatusBadge type={currentWorkHours ? "business" : "inactive"}>
                  {currentWorkHours ? "🏢 Open" : "🏠 Closed"}
                </StatusBadge>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Date/Time Functions */}
        <div className="card accent-secondary">
          <h4 className="text-xl mb-lg">📅 Custom Date/Time Functions</h4>
          <APIExample
            functionName="fromTimezoneParts()"
            code={`const date = fromTimezoneParts({
  year: ${new Date(customDate).getFullYear()},
  month: ${new Date(customDate).getMonth() + 1},
  day: ${new Date(customDate).getDate()},
  hour: ${customTime.split(":")[0]},
  minute: ${customTime.split(":")[1]},
  second: 0
}, "${selectedTimezone}");`}
            result={
              customDateTime
                ? customDateTime.toISOString()
                : "Set date and time above"
            }
          />

          {customDateTime && (
            <>
              <APIExample
                functionName="isDST() - Custom Date"
                code=""
                result={
                  <div className="text-center">
                    <StatusBadge type={customDst ? "dst" : "inactive"}>
                      {customDst ? "☀️ DST Active" : "🌙 Standard Time"}
                    </StatusBadge>
                  </div>
                }
              />

              <APIExample
                functionName="inWorkingHours() - Custom Date"
                code=""
                result={
                  <div className="text-center">
                    <StatusBadge
                      type={customWorkHours ? "business" : "inactive"}
                    >
                      {customWorkHours ? "🏢 Business Hours" : "🏠 After Hours"}
                    </StatusBadge>
                  </div>
                }
              />
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-2 gap-xl mb-2xl">
        {/* Metadata Functions */}
        <div className="card accent-tertiary">
          <h4 className="text-xl mb-lg">📊 Metadata Functions</h4>
          <APIExample
            functionName="getTimezoneMetadata()"
            code={`const metadata = getTimezoneMetadata(
  "${selectedTimezone}"
);`}
            result={<MetadataDisplay timezone={selectedTimezone} />}
          />

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
                  <div className="no-transitions">
                    No DST transitions - This timezone doesn't observe daylight
                    saving time
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Reliability Demo */}
        <div className="card accent-success">
          <h4 className="text-xl mb-lg">🎯 Reliability Demonstration</h4>
          <div className="mb-lg">
            <h5 className="text-lg mb-md">Automatic DST Handling</h5>
            <p className="text-secondary mb-lg">
              The library automatically handles DST transitions. Here's London
              throughout the year:
            </p>

            <div className="grid grid-auto-fit gap-md">
              <SeasonExample
                season="Spring (March)"
                icon="🌸"
                date={new Date(2024, 2, 15)}
                timezone="Europe/London"
              />

              <SeasonExample
                season="Summer (July)"
                icon="☀️"
                date={new Date(2024, 6, 15)}
                timezone="Europe/London"
              />

              <SeasonExample
                season="Winter (January)"
                icon="❄️"
                date={new Date(2024, 0, 15)}
                timezone="Europe/London"
              />
            </div>

            <div className="mt-lg p-md bg-success rounded-md">
              <p className="text-sm">
                💡 <strong>Key Point:</strong> No matter when you call these
                functions, they always return the correct local time for London,
                automatically accounting for BST/GMT transitions!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
