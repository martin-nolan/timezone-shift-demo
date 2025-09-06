import React, { useState } from "react";
import { type SupportedTimezone } from "timezone-shift";
import { useTimezoneConversion } from "../hooks";
import { TimezoneSelector, TimezoneCard } from "./shared";

export const ConverterTab: React.FC = () => {
  const [sourceTime, setSourceTime] = useState("");
  const [sourceDate, setSourceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [sourceTimezone, setSourceTimezone] =
    useState<SupportedTimezone>("America/New_York");

  const conversionResults = useTimezoneConversion(
    sourceTime,
    sourceDate,
    sourceTimezone
  );

  return (
    <div className="container">
      <div className="mb-2xl">
        <div className="card animate-fadeInUp">
          <h3 className="text-2xl mb-sm">🔄 Time Converter</h3>
          <p className="text-secondary mb-xl">
            Convert any time from one timezone to all others
          </p>

          <div className="grid grid-auto-fit gap-lg">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-input"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                step="1"
              />
            </div>

            <TimezoneSelector
              value={sourceTimezone}
              onChange={setSourceTimezone}
              label="Source Timezone"
            />
          </div>
        </div>
      </div>

      {conversionResults.length > 0 && (
        <>
          <div className="flex justify-center mb-xl">
            <div className="text-4xl animate-bounce">⬇️</div>
          </div>

          <div className="grid grid-auto-fill gap-lg">
            {conversionResults.map((result) => {
              // Convert the conversion result to TimezoneDisplayData format
              const timezoneData = {
                timezone: result.name,
                city: result.city,
                flag: result.flag,
                region: result.region,
                localTime: result.time,
                isDst: result.isDst,
                inWorkingHours: false, // Not relevant for conversion
                abbreviation: "", // Will be calculated by TimezoneCard
              };

              return (
                <div
                  key={result.name}
                  className={`${
                    result.name === sourceTimezone ? "accent-secondary" : ""
                  }`}
                >
                  <TimezoneCard
                    data={timezoneData}
                    variant="compact"
                    showDetails={false}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
