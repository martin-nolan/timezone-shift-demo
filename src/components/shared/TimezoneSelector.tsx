import React from "react";
import { TIMEZONES } from "../../utils";
import type { SupportedTimezone } from "timezone-shift";

interface TimezoneSelectorProps {
  value: SupportedTimezone;
  onChange: (timezone: SupportedTimezone) => void;
  label?: string;
  className?: string;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  value,
  onChange,
  label = "Timezone",
  className = "",
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SupportedTimezone)}
      >
        {TIMEZONES.map((tz) => (
          <option key={tz.name} value={tz.name}>
            {tz.flag} {tz.city} ({tz.region})
          </option>
        ))}
      </select>
    </div>
  );
};
