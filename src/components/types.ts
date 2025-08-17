import {
    type SupportedTimezone,
    type DstTransitions,
  } from "timezone-shift";

  // Types for our component state
  export interface ConversionResult {
    name: SupportedTimezone;
    city: string;
    flag: string;
    region: string;
    time: Date;
    isDst: boolean;
  }

  export interface DstData {
    name: SupportedTimezone;
    city: string;
    flag: string;
    region: string;
    transitions: DstTransitions | null;
  }
