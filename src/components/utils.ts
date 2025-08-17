import {
    toTimezoneParts,
    fromTimezoneParts,
    isDST,
    getTimezoneMetadata,
    type SupportedTimezone,
  } from "timezone-shift";

  // Utility functions
  export const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  export const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  export const getLocalTime = (utcTime: Date, timezone: SupportedTimezone): Date => {
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

  // Helper function to convert time between timezones
  export const convertBetweenTimezones = (
    date: Date,
    fromTz: SupportedTimezone,
    toTz: SupportedTimezone
  ): Date => {
    // Get the local time parts in the source timezone
    const parts = toTimezoneParts(date, fromTz);
    // Create a new date as if those parts were in the target timezone
    return fromTimezoneParts(parts, toTz);
  };
