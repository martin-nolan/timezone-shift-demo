import React, { useState, useMemo } from "react";
import { TIMEZONES } from "../utils";
import { useCurrentTime, useTimezoneData, useDebounce } from "../hooks";
import { TimezoneCard } from "./shared";

export const WorldClockTab: React.FC = () => {
  const { currentTime } = useCurrentTime(1000);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"city" | "time" | "region">("city");

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const timezoneData = useTimezoneData(
    currentTime,
    TIMEZONES.map((tz) => tz.name)
  );

  // Filter and sort timezone data
  const filteredAndSortedData = useMemo(() => {
    let filtered = timezoneData;

    // Apply search filter
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = timezoneData.filter(
        (data) =>
          data.city.toLowerCase().includes(searchLower) ||
          data.region.toLowerCase().includes(searchLower) ||
          data.timezone.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "city":
          return a.city.localeCompare(b.city);
        case "time":
          return a.localTime.getTime() - b.localTime.getTime();
        case "region":
          return a.region.localeCompare(b.region);
        default:
          return 0;
      }
    });

    return sorted;
  }, [timezoneData, debouncedSearchTerm, sortBy]);

  return (
    <div className="container">
      {/* Search and Filter Controls */}
      <div className="mb-2xl">
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-lg items-center">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by city, region, or timezone..."
                className="form-input w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-md">
              <label className="text-sm font-medium text-secondary">
                Sort by:
              </label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "city" | "time" | "region")
                }
              >
                <option value="city">City</option>
                <option value="time">Time</option>
                <option value="region">Region</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-md text-sm text-secondary">
            Showing {filteredAndSortedData.length} of {timezoneData.length}{" "}
            timezones
            {debouncedSearchTerm && (
              <span> matching "{debouncedSearchTerm}"</span>
            )}
          </div>
        </div>
      </div>

      {/* Timezone Grid */}
      <div className="grid grid-auto-fit gap-xl">
        {filteredAndSortedData.length > 0 ? (
          filteredAndSortedData.map((data) => (
            <TimezoneCard key={data.timezone} data={data} />
          ))
        ) : (
          <div className="col-span-full text-center py-2xl">
            <div className="text-6xl mb-lg opacity-50">🔍</div>
            <h3 className="text-xl mb-md text-secondary">No timezones found</h3>
            <p className="text-muted">
              Try adjusting your search term or clearing the filter
            </p>
            {debouncedSearchTerm && (
              <button
                className="btn btn-secondary mt-lg"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
