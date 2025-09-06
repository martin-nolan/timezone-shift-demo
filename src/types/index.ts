import { type SupportedTimezone, type DstTransitions } from "timezone-shift";

// Re-export SupportedTimezone for internal use
export type { SupportedTimezone };

// Enhanced timezone info interface
export interface TimezoneInfo {
  name: SupportedTimezone;
  city: string;
  flag: string;
  region: string;
}

// Conversion result interface
export interface ConversionResult {
  name: SupportedTimezone;
  city: string;
  flag: string;
  region: string;
  time: Date;
  isDst: boolean;
}

// DST data interface
export interface DstData {
  name: SupportedTimezone;
  city: string;
  flag: string;
  region: string;
  transitions: DstTransitions | null;
}

// Timezone display data (from timezone-operations.ts)
export interface TimezoneDisplayData {
  timezone: SupportedTimezone;
  city: string;
  flag: string;
  region: string;
  localTime: Date;
  isDst: boolean;
  inWorkingHours: boolean;
  abbreviation: string;
}

// Format options interface
export interface FormatOptions {
  includeSeconds?: boolean;
  use24Hour?: boolean;
  includeTimezone?: boolean;
}
