import { Card } from "@/components/ui/card";

const heatmapData = [
  { step: "Step 1", durations: [63, 80, 44, 22, 10] },
  { step: "Step 2", durations: [22, 140, 110, 54, 12] },
  { step: "Step 3", durations: [13, 44, 98, 57, 42] },
  { step: "Step 4", durations: [16, 21, 63, 75, 19] },
  { step: "Step 5", durations: [20, 36, 47, 29, 48] }
];

const timeRanges = ["0-10s", "10-30s", "30-60s", "1-2min", "2min+"];

const getHeatColor = (value: number) => {
  if (value >= 100) return "bg-primary text-primary-foreground";
  if (value >= 70) return "bg-primary/80 text-primary-foreground";
  if (value >= 40) return "bg-primary/60 text-foreground";
  return "bg-secondary text-foreground";
};

const StepDurationHeatmap = () => {
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <h2 className="text-xl font-bold text-primary mb-6">STEP DURATION HEATMAP</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div></div>
            {timeRanges.map((range) => (
              <div key={range} className="text-center text-sm font-semibold text-foreground">
                {range}
              </div>
            ))}
          </div>
          {heatmapData.map((row, rowIndex) => (
            <div 
              key={row.step} 
              className="grid grid-cols-6 gap-2 mb-2 animate-fade-in"
              style={{ animationDelay: `${rowIndex * 100}ms` }}
            >
              <div className="flex items-center text-sm font-semibold text-foreground">
                {row.step}
              </div>
              {row.durations.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex items-center justify-center rounded-lg p-4 text-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer ${getHeatColor(value)}`}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StepDurationHeatmap;
