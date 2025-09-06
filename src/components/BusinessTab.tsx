import React from "react";
import { TIMEZONES } from "../utils";
import {
  useCurrentTime,
  useTimezoneData,
  useBusinessHoursStats,
} from "../hooks";
import { TimezoneCard, StatCard } from "./shared";

export const BusinessTab: React.FC = () => {
  const { currentTime } = useCurrentTime(1000);
  const timezoneData = useTimezoneData(
    currentTime,
    TIMEZONES.map((tz) => tz.name)
  );

  const { businessHoursCount, dstActiveCount, hasBusinessHours, hasDstActive } =
    useBusinessHoursStats(timezoneData);

  return (
    <div className="container">
      <div className="mb-2xl">
        <div className="card text-center animate-fadeInUp">
          <h3 className="text-3xl mb-xl">🌍 Global Business Overview</h3>

          <div className="grid grid-auto-fit gap-xl">
            <StatCard
              icon="🏢"
              label="Business Hours Active"
              value={`${businessHoursCount}/${TIMEZONES.length} Locations`}
              isActive={hasBusinessHours}
              variant="success"
            />

            <StatCard
              icon="☀️"
              label="DST Active"
              value={`${dstActiveCount}/${TIMEZONES.length} Locations`}
              isActive={hasDstActive}
              variant="warning"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-auto-fit gap-lg">
        {timezoneData.map((data) => (
          <TimezoneCard
            key={data.timezone}
            data={data}
            variant="business"
            showDetails={true}
          />
        ))}
      </div>
    </div>
  );
};
