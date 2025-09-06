import React from "react";
import { getTimezoneMetadata, type SupportedTimezone } from "timezone-shift";

interface MetadataDisplayProps {
  timezone: SupportedTimezone;
  className?: string;
}

export const MetadataDisplay: React.FC<MetadataDisplayProps> = ({
  timezone,
  className = "",
}) => {
  const metadata = getTimezoneMetadata(timezone);

  return (
    <div className={`metadata-result ${className}`}>
      <div className="metadata-grid">
        <div className="metadata-item">
          <span className="label">Standard Offset:</span>
          <span className="value">{metadata.standardOffset} minutes</span>
        </div>
        <div className="metadata-item">
          <span className="label">DST Offset:</span>
          <span className="value">{metadata.dstOffset || "None"} minutes</span>
        </div>
        {metadata.preferredAbbreviations && (
          <>
            <div className="metadata-item">
              <span className="label">Standard Abbr:</span>
              <span className="value">
                {metadata.preferredAbbreviations.standard}
              </span>
            </div>
            <div className="metadata-item">
              <span className="label">DST Abbr:</span>
              <span className="value">
                {metadata.preferredAbbreviations.dst || "None"}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
