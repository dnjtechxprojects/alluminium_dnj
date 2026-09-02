import React from "react";

type Sector = {
  label: string;
  value: number;
  color: string; // Tailwind color class like 'bg-blue-500'
};

type SectorProgressBarProps = {
  total: number;
  sectors: Sector[];
};

const SectorProgressBar: React.FC<SectorProgressBarProps> = ({
  total,
  sectors,
}) => {
  return (
    <div className="space-y-4">
      {sectors.map((sector, index) => {
        const percent = total > 0 ? (sector.value / total) * 100 : 0;
        return (
          <div key={index}>
            <div className="flex justify-between items-center mb-1 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                {/* <span className={`w-3 h-3 rounded-full ${sector.color}`} /> */}
                {sector.label}
              </span>
              <span className="flex items-center gap-2">
                {sector?.value?.toLocaleString("en-IN") ?? "0"}
                <span className="text-xs text-gray-500">
                  ({percent.toFixed(1)}%)
                </span>
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${sector.color} h-full transition-all`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectorProgressBar;
