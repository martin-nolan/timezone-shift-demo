import { FORMAT_OPTIONS } from "./constants";

// Formatting options interface
export interface FormatOptions {
  includeSeconds?: boolean;
  use24Hour?: boolean;
  includeTimezone?: boolean;
}

/**
 * Format time with consistent options
 */
export const formatTime = (date: Date, options: FormatOptions = {}): string => {
  const { includeSeconds = true, use24Hour = true } = options;

  if (use24Hour) {
    return date.toLocaleTimeString("en-US", {
      ...FORMAT_OPTIONS.TIME_24H,
      ...(includeSeconds ? {} : { second: undefined }),
    });
  }

  return date.toLocaleTimeString("en-US", {
    ...FORMAT_OPTIONS.TIME_12H,
    ...(includeSeconds ? { second: "2-digit" as const } : {}),
  });
};

/**
 * Format date with consistent options
 */
export const formatDate = (date: Date, short = false): string => {
  return date.toLocaleDateString(
    "en-US",
    short ? FORMAT_OPTIONS.DATE_SHORT : FORMAT_OPTIONS.DATE_FULL
  );
};

/**
 * Get day of year calculation
 */
export const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
