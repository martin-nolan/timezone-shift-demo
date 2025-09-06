import {
  toTimezoneParts,
  fromTimezoneParts,
  isDST,
  inWorkingHours,
  getTimezoneMetadata,
  type SupportedTimezone,
} from "timezone-shift";
import { TIMEZONES } from "./constants";

/**
 * Get local time for a specific timezone
 */
export const getLocalTime = (
  utcTime: Date,
  timezone: SupportedTimezone
): Date => {
  const parts = toTimezoneParts(utcTime, timezone);
  return new Date(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
};

/**
 * Get timezone abbreviation with fallback
 */
export const getTimezoneAbbreviation = (
  date: Date,
  timezone: SupportedTimezone
): string => {
  try {
    const metadata = getTimezoneMetadata(timezone);
    const isDstActive = isDST(date, timezone);

    if (metadata.preferredAbbreviations) {
      return isDstActive
        ? metadata.preferredAbbreviations.dst ||
            metadata.preferredAbbreviations.standard
        : metadata.preferredAbbreviations.standard;
    }

    // Fallback to offset format
    const offset = isDstActive
      ? metadata.dstOffset || metadata.standardOffset
      : metadata.standardOffset;
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${hours.toString().padStart(2, "0")}${
      minutes ? ":" + minutes.toString().padStart(2, "0") : ""
    }`;
  } catch {
    return "UTC";
  }
};

/**
 * Convert time between timezones
 */
export const convertBetweenTimezones = (
  date: Date,
  fromTz: SupportedTimezone,
  toTz: SupportedTimezone
): Date => {
  const parts = toTimezoneParts(date, fromTz);
  return fromTimezoneParts(parts, toTz);
};

/**
 * Get timezone info by name
 */
export const getTimezoneInfo = (timezoneName: SupportedTimezone) => {
  return TIMEZONES.find((tz) => tz.name === timezoneName);
};

/**
 * Process timezone data for multiple timezones
 */
import type { TimezoneDisplayData } from "../types";

export const processTimezoneData = (
  currentTime: Date,
  timezones: readonly SupportedTimezone[]
): TimezoneDisplayData[] => {
  return timezones.map((timezone) => {
    const info = getTimezoneInfo(timezone);
    if (!info) {
      throw new Error(`Timezone info not found for ${timezone}`);
    }

    return {
      timezone,
      city: info.city,
      flag: info.flag,
      region: info.region,
      localTime: getLocalTime(currentTime, timezone),
      isDst: isDST(currentTime, timezone),
      inWorkingHours: inWorkingHours(currentTime, timezone),
      abbreviation: getTimezoneAbbreviation(currentTime, timezone),
    };
  });
};
