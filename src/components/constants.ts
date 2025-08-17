import { type SupportedTimezone } from "timezone-shift";

// Static timezone configuration
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
    name: "Asia/Tokyo" as SupportedTimezone,
    city: "Tokyo",
    flag: "🇯🇵",
    region: "JST",
  },
  {
    name: "Australia/Sydney" as SupportedTimezone,
    city: "Sydney",
    flag: "🇦🇺",
    region: "AEST/AEDT",
  },
];
