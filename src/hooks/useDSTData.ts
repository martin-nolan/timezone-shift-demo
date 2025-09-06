import { useState, useMemo } from "react";
import { dstTransitionDates } from "timezone-shift";
import { TIMEZONES } from "../utils";
import type { DstData } from "../types";

/**
 * Custom hook for managing DST transition data for a given year
 */
export const useDSTData = (initialYear?: number) => {
  const [dstYear, setDstYear] = useState(
    initialYear || new Date().getFullYear()
  );

  const dstData = useMemo((): DstData[] => {
    return TIMEZONES.map((tz) => ({
      ...tz,
      transitions: dstTransitionDates(dstYear, tz.name),
    }));
  }, [dstYear]);

  const incrementYear = () => setDstYear((prev) => prev + 1);
  const decrementYear = () => setDstYear((prev) => prev - 1);

  return {
    dstYear,
    setDstYear,
    dstData,
    incrementYear,
    decrementYear,
  };
};
