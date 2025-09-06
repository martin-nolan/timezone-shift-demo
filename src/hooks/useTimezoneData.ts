import { useMemo } from "react";
import { processTimezoneData } from "../utils";
import type { SupportedTimezone, TimezoneDisplayData } from "../types";

/**
 * Custom hook for processing timezone data efficiently
 */
export const useTimezoneData = (
  currentTime: Date,
  timezones: readonly SupportedTimezone[]
): TimezoneDisplayData[] => {
  return useMemo(() => {
    return processTimezoneData(currentTime, timezones);
  }, [currentTime, timezones]);
};
