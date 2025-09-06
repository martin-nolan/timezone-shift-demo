import React, { memo, useMemo } from "react";
import { formatTime, formatDate, getDayOfYear } from "../../utils";
import type { TimezoneDisplayData } from "../../types";

interface TimezoneCardProps {
  data: TimezoneDisplayData;
  variant?: "default" | "compact" | "business";
  showDetails?: boolean;
}

export const TimezoneCard: React.FC<TimezoneCardProps> = memo(
  ({ data, variant = "default", showDetails = true }) => {
    const {
      city,
      flag,
      region,
      localTime,
      isDst,
      inWorkingHours,
      abbreviation,
    } = data;

    // Memoize expensive calculations
    const formattedData = useMemo(
      () => ({
        time: formatTime(localTime),
        date: formatDate(localTime),
        dayOfYear: getDayOfYear(localTime),
      }),
      [localTime]
    );

    const cardClass = useMemo(() => {
      const classes = ["card"];
      if (isDst) classes.push("accent-secondary");
      if (variant === "business" && inWorkingHours)
        classes.push("accent-success");
      if (variant === "compact") classes.push("card-compact");
      return classes.join(" ");
    }, [isDst, variant, inWorkingHours]);

    return (
      <div className={cardClass}>
        <div className="card-header">
          <span className="flag">{flag}</span>
          <h3 className="title">{city}</h3>
          <span className="subtitle">{region}</span>
          {variant === "business" && (
            <div
              className={`status-light ${
                inWorkingHours ? "status-light-success" : "status-light-error"
              }`}
            />
          )}
        </div>

        <div className="text-center mb-lg">
          <div
            className={`time-display ${
              variant === "compact" ? "time-compact" : ""
            }`}
          >
            <div className="time-value">{formattedData.time}</div>
            {variant !== "compact" && (
              <div className="date-value">{formattedData.date}</div>
            )}
          </div>
        </div>

        <div className="status-badges">
          <span
            className={`badge ${isDst ? "badge-warning" : "badge-inactive"}`}
          >
            {isDst ? "☀️ DST" : "🌙 STD"}
          </span>
          {showDetails && (
            <span
              className={`badge ${
                inWorkingHours ? "badge-success" : "badge-inactive"
              }`}
            >
              {inWorkingHours ? "🏢 Work" : "🏠 Off"}
            </span>
          )}
        </div>

        {showDetails && variant !== "compact" && (
          <div className="card-details">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Zone</span>
                <span className="value">{abbreviation}</span>
              </div>
              <div className="detail-item">
                <span className="label">Day of Year</span>
                <span className="value">{formattedData.dayOfYear}</span>
              </div>
              <div className="detail-item">
                <span className="label">DST Status</span>
                <span
                  className={`value ${isDst ? "text-success" : "text-error"}`}
                >
                  {isDst ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Business Hours</span>
                <span
                  className={`value ${
                    inWorkingHours ? "text-success" : "text-error"
                  }`}
                >
                  {inWorkingHours ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

TimezoneCard.displayName = "TimezoneCard";
