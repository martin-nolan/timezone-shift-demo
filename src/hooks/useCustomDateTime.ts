import { useState, useMemo } from "react";
import {
  fromTimezoneParts,
  isDST,
  inWorkingHours,
  type TimeParts,
  type SupportedTimezone,
} from "timezone-shift";

/**
 * Custom hook for managing and parsing custom date/time inputs
 */
export const useCustomDateTime = (timezone: SupportedTimezone) => {
  const [customDate, setCustomDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [customTime, setCustomTime] = useState("12:00");

  const customDateTime = useMemo(() => {
    if (!customDate || !customTime) return null;

    try {
      const [hours, minutes] = customTime.split(":").map(Number);
      const date = new Date(customDate);
      const parts: TimeParts = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: hours,
        minute: minutes,
        second: 0,
      };
      return fromTimezoneParts(parts, timezone);
    } catch (error) {
      console.warn("Error parsing custom date/time:", error);
      return null;
    }
  }, [customDate, customTime, timezone]);

  const customDst = useMemo(() => {
    return customDateTime ? isDST(customDateTime, timezone) : null;
  }, [customDateTime, timezone]);

  const customWorkHours = useMemo(() => {
    return customDateTime ? inWorkingHours(customDateTime, timezone) : null;
  }, [customDateTime, timezone]);

  return {
    customDate,
    setCustomDate,
    customTime,
    setCustomTime,
    customDateTime,
    customDst,
    customWorkHours,
  };
};
