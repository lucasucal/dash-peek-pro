import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ClicksPerStepChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchStepData() {
      const { data: clicks, error } = await supabase
        .from("clicks")
        .select("step, count")
        .order("step", { ascending: true });

      if (error) {
        console.error("Error fetching step click data:", error);
        return;
      }

      // Aggregate clicks per step
      const grouped = clicks.reduce((acc, row) => {
        acc[row.step] = (acc[row.step] || 0) + (row.count || 0);
        return acc;
      }, {});

      // Convert to array format for Recharts
      const chartData = Object.entries(grouped).map(([step, clicks]) => ({
        step,
        clicks,
      }));

      setData(chartData);
    }

    fetchStepData();

    // Optional: auto-refresh every 30s
    const interval = setInterval(fetchStepData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <h2 className="text-xl font-bold text-primary mb-6">CLICKS PER STEP</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="step"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            type="category"
            allowDecimals={false}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
          <Bar dataKey="clicks" fill="hsl(var(--primary))" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ClicksPerStepChart;
