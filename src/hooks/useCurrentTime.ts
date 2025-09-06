import { useState, useEffect, useRef, useCallback } from "react";
import { UPDATE_INTERVALS } from "../utils";

/**
 * Custom hook for managing current time with configurable update intervals
 */
export const useCurrentTime = (
  interval: number = UPDATE_INTERVALS.REAL_TIME
) => {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const intervalRef = useRef<number | null>(null);

  // Manual refresh function
  const refresh = useCallback(() => {
    setCurrentTime(new Date());
  }, []);

  useEffect(() => {
    let actualInterval = interval;

    // Validate interval
    if (actualInterval <= 0) {
      console.warn("useCurrentTime: interval must be positive, using default");
      actualInterval = UPDATE_INTERVALS.REAL_TIME;
    }

    // Set initial time
    setCurrentTime(new Date());

    // Set up interval only if interval is reasonable (not too frequent)
    if (actualInterval >= 100) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(new Date());
      }, actualInterval);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [interval]);

  return { currentTime, refresh };
};
