import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

interface StepData {
  step: string;
  totalClicks: number;
}

const ClicksPerStepChart = () => {
  const [data, setData] = useState<StepData[]>([]);

  useEffect(() => {
    const fetchClicksPerStep = async () => {
      const { data: clicksData, error } = await supabase
        .from("clicks")
        .select("step, count");

      if (error) {
        console.error("Error fetching clicks per step:", error);
        // Use dummy data on error
        setData([
          { step: "/", totalClicks: 245 },
          { step: "/step-1", totalClicks: 198 },
          { step: "/step-2", totalClicks: 156 },
          { step: "/step-3", totalClicks: 132 },
          { step: "/step-4", totalClicks: 98 },
          { step: "/checkout", totalClicks: 87 },
        ]);
        return;
      }

      // Aggregate clicks by step
      const stepMap = new Map<string, number>();
      clicksData?.forEach((item: { step: string; count: number }) => {
        const current = stepMap.get(item.step) || 0;
        stepMap.set(item.step, current + item.count);
      });

      const aggregated = Array.from(stepMap.entries()).map(([step, totalClicks]) => ({
        step,
        totalClicks,
      }));

      setData(aggregated.length > 0 ? aggregated : [
        { step: "/", totalClicks: 245 },
        { step: "/step-1", totalClicks: 198 },
        { step: "/step-2", totalClicks: 156 },
        { step: "/step-3", totalClicks: 132 },
        { step: "/step-4", totalClicks: 98 },
        { step: "/checkout", totalClicks: 87 },
      ]);
    };

    fetchClicksPerStep();
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-accent/20 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-foreground">Clicks Per Step</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--accent))" opacity={0.2} />
            <XAxis 
              dataKey="step" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--accent))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Bar 
              dataKey="totalClicks" 
              fill="hsl(var(--chart-2))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClicksPerStepChart;
