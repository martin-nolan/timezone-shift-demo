import React from "react";
import { useDSTData } from "../hooks";
import { TimeDisplay } from "./shared";

export const DSTExplorerTab: React.FC = () => {
  const { dstYear, setDstYear, dstData, incrementYear, decrementYear } =
    useDSTData();

  return (
    <div className="container">
      <div className="text-center mb-2xl animate-fadeInUp">
        <h3 className="text-3xl mb-sm">🌅 Daylight Saving Time Explorer</h3>
        <p className="text-secondary mb-xl text-lg">
          Explore DST transitions for {dstYear}
        </p>

        <div className="flex items-center justify-center gap-md mt-xl">
          <button className="btn-round btn-primary" onClick={decrementYear}>
            −
          </button>
          <input
            type="number"
            className="form-input text-center font-mono text-xl font-semibold"
            style={{ width: "120px" }}
            value={dstYear}
            onChange={(e) => setDstYear(parseInt(e.target.value))}
            min="1970"
            max="2030"
          />
          <button className="btn-round btn-primary" onClick={incrementYear}>
            +
          </button>
        </div>
      </div>

      <div className="grid grid-auto-fit gap-xl">
        {dstData.map((data) => (
          <div key={data.name} className="card accent-tertiary">
            <div className="card-header border-b border-color pb-md mb-xl">
              <span className="flag">{data.flag}</span>
              <h4 className="title">{data.city}</h4>
              <span className="subtitle">{data.region}</span>
            </div>

            <div className="relative">
              {data.transitions ? (
                <>
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-tertiary rounded"></div>
                  <div className="flex items-center gap-md mb-lg relative z-10">
                    <div className="w-10 h-10 bg-gradient-tertiary rounded-full flex items-center justify-center text-xl shadow-sm">
                      🌅
                    </div>
                    <div className="flex-1 flex flex-col gap-xs">
                      <span className="font-semibold text-base">
                        Spring Forward
                      </span>
                      <span className="text-secondary text-sm">
                        {data.transitions.dstStartUtc.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <div className="font-mono text-xs">
                        <TimeDisplay time={data.transitions.dstStartUtc} /> UTC
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-md relative z-10">
                    <div className="w-10 h-10 bg-gradient-tertiary rounded-full flex items-center justify-center text-xl shadow-sm">
                      🌇
                    </div>
                    <div className="flex-1 flex flex-col gap-xs">
                      <span className="font-semibold text-base">Fall Back</span>
                      <span className="text-secondary text-sm">
                        {data.transitions.dstEndUtc.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <div className="font-mono text-xs">
                        <TimeDisplay time={data.transitions.dstEndUtc} /> UTC
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center p-xl text-muted">
                  <div className="text-6xl mb-md opacity-50">⏰</div>
                  <div className="font-medium mb-sm text-secondary">
                    No DST Transitions
                  </div>
                  <div className="text-xs text-muted">
                    This timezone doesn't observe daylight saving time
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
