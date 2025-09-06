import React from "react";
import { isDST, type SupportedTimezone } from "timezone-shift";
import { formatTime, getLocalTime, getTimezoneAbbreviation } from "../../utils";

interface SeasonExampleProps {
  season: string;
  icon: string;
  date: Date;
  timezone: SupportedTimezone;
  className?: string;
}

export const SeasonExample: React.FC<SeasonExampleProps> = ({
  season,
  icon,
  date,
  timezone,
  className = "",
}) => {
  const isDstActive = isDST(date, timezone);
  const localTime = getLocalTime(date, timezone);
  const abbreviation = getTimezoneAbbreviation(date, timezone);

  return (
    <div className={`season ${className}`}>
      <h5>
        {icon} {season}
      </h5>
      <div className="season-data">
        <span>Time: {formatTime(localTime)}</span>
        <span>DST: {isDstActive ? "Yes" : "No"}</span>
        <span>Zone: {abbreviation}</span>
      </div>
    </div>
  );
};
