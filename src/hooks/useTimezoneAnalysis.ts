import { useMemo } from "react";
import {
  isDST,
  inWorkingHours,
  getTimezoneMetadata,
  type SupportedTimezone,
} from "timezone-shift";
import { getLocalTime, getTimezoneAbbreviation } from "../utils";

/**
 * Custom hook for analyzing timezone data for a specific timezone and time
 */
export const useTimezoneAnalysis = (
  currentTime: Date,
  timezone: SupportedTimezone
) => {
  const analysis = useMemo(() => {
    const localTime = getLocalTime(currentTime, timezone);
    const isDstActive = isDST(currentTime, timezone);
    const inBusinessHours = inWorkingHours(currentTime, timezone);
    const abbreviation = getTimezoneAbbreviation(currentTime, timezone);
    const metadata = getTimezoneMetadata(timezone);

    return {
      localTime,
      isDstActive,
      inBusinessHours,
      abbreviation,
      metadata,
    };
  }, [currentTime, timezone]);

  return analysis;
};
