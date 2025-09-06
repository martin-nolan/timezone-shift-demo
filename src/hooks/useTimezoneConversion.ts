import { useMemo } from "react";
import {
  fromTimezoneParts,
  isDST,
  type TimeParts,
  type SupportedTimezone,
} from "timezone-shift";
import { TIMEZONES, convertBetweenTimezones } from "../utils";
import type { ConversionResult } from "../types";

/**
 * Custom hook for timezone conversion logic
 */
export const useTimezoneConversion = (
  sourceTime: string,
  sourceDate: string,
  sourceTimezone: SupportedTimezone
): ConversionResult[] => {
  return useMemo(() => {
    if (!sourceTime || !sourceDate) {
      return [];
    }

    try {
      const [hours, minutes] = sourceTime.split(":").map(Number);
      const sourceDateObj = new Date(sourceDate);
      const parts: TimeParts = {
        year: sourceDateObj.getFullYear(),
        month: sourceDateObj.getMonth() + 1,
        day: sourceDateObj.getDate(),
        hour: hours,
        minute: minutes,
        second: 0,
      };

      const sourceDateTime = fromTimezoneParts(parts, sourceTimezone);

      return TIMEZONES.map((tz) => ({
        name: tz.name,
        city: tz.city,
        flag: tz.flag,
        region: tz.region,
        time:
          tz.name === sourceTimezone
            ? sourceDateTime
            : convertBetweenTimezones(sourceDateTime, sourceTimezone, tz.name),
        isDst: isDST(sourceDateTime, tz.name),
      }));
    } catch (error) {
      console.error("Error converting time:", error);
      return [];
    }
  }, [sourceTime, sourceDate, sourceTimezone]);
};
