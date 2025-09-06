import { type SupportedTimezone } from "timezone-shift";

// Timezone configuration with enhanced metadata
export const TIMEZONES = [
  {
    name: "America/New_York" as SupportedTimezone,
    city: "New York",
    flag: "🇺🇸",
    region: "EST/EDT",
  },
  {
    name: "America/Los_Angeles" as SupportedTimezone,
    city: "Los Angeles",
    flag: "🇺🇸",
    region: "PST/PDT",
  },
  {
    name: "America/Chicago" as SupportedTimezone,
    city: "Chicago",
    flag: "🇺🇸",
    region: "CST/CDT",
  },
  {
    name: "America/Denver" as SupportedTimezone,
    city: "Denver",
    flag: "🇺🇸",
    region: "MST/MDT",
  },
  {
    name: "Europe/London" as SupportedTimezone,
    city: "London",
    flag: "🇬🇧",
    region: "GMT/BST",
  },
  {
    name: "Europe/Paris" as SupportedTimezone,
    city: "Paris",
    flag: "🇫🇷",
    region: "CET/CEST",
  },
  {
    name: "Europe/Berlin" as SupportedTimezone,
    city: "Berlin",
    flag: "🇩🇪",
    region: "CET/CEST",
  },
  {
    name: "Europe/Rome" as SupportedTimezone,
    city: "Rome",
    flag: "🇮🇹",
    region: "CET/CEST",
  },
  {
    name: "Asia/Tokyo" as SupportedTimezone,
    city: "Tokyo",
    flag: "🇯🇵",
    region: "JST",
  },
  {
    name: "Asia/Singapore" as SupportedTimezone,
    city: "Singapore",
    flag: "🇸🇬",
    region: "SGT",
  },
  {
    name: "Asia/Dubai" as SupportedTimezone,
    city: "Dubai",
    flag: "🇦🇪",
    region: "GST",
  },
  {
    name: "Australia/Sydney" as SupportedTimezone,
    city: "Sydney",
    flag: "🇦🇺",
    region: "AEST/AEDT",
  },
  {
    name: "America/Sao_Paulo" as SupportedTimezone,
    city: "São Paulo",
    flag: "🇧🇷",
    region: "BRT/BRST",
  },
  {
    name: "Africa/Cairo" as SupportedTimezone,
    city: "Cairo",
    flag: "🇪🇬",
    region: "EET/EEST",
  },
] as const;

// Update intervals for different use cases
export const UPDATE_INTERVALS = {
  REAL_TIME: 1000,
} as const;

// Formatting options
export const FORMAT_OPTIONS = {
  TIME_24H: {
    hour12: false,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    second: "2-digit" as const,
  },
  TIME_12H: {
    hour12: true,
    hour: "numeric" as const,
    minute: "2-digit" as const,
  },
  DATE_FULL: {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  },
  DATE_SHORT: {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
  },
} as const;
