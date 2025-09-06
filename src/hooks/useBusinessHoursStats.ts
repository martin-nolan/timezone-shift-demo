import { useMemo } from "react";
import type { TimezoneDisplayData } from "../types";

/**
 * Custom hook for calculating business hours statistics
 */
export const useBusinessHoursStats = (timezoneData: TimezoneDisplayData[]) => {
  const stats = useMemo(() => {
    const businessHoursCount = timezoneData.filter(
      (data) => data.inWorkingHours
    ).length;

    const dstActiveCount = timezoneData.filter((data) => data.isDst).length;

    const totalLocations = timezoneData.length;

    const businessHoursPercentage =
      totalLocations > 0
        ? Math.round((businessHoursCount / totalLocations) * 100)
        : 0;

    const dstActivePercentage =
      totalLocations > 0
        ? Math.round((dstActiveCount / totalLocations) * 100)
        : 0;

    return {
      businessHoursCount,
      dstActiveCount,
      totalLocations,
      businessHoursPercentage,
      dstActivePercentage,
      hasBusinessHours: businessHoursCount > 0,
      hasDstActive: dstActiveCount > 0,
    };
  }, [timezoneData]);

  return stats;
};
