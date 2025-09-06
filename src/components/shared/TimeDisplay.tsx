import React from "react";
import { formatTime } from "../../utils";
import type { FormatOptions } from "../../types";

interface TimeDisplayProps {
  time: Date;
  size?: "small" | "medium" | "large";
  options?: FormatOptions;
  className?: string;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  time,
  size = "medium",
  options = {},
  className = "",
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "time-display-small";
      case "medium":
        return "time-display-medium";
      case "large":
        return "time-display-large";
      default:
        return "time-display-medium";
    }
  };

  return (
    <div className={`time-display ${getSizeClass()} ${className}`}>
      {formatTime(time, options)}
    </div>
  );
};
