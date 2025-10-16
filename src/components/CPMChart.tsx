import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "10:01", clicks: 28 },
  { time: "10:02", clicks: 32 },
  { time: "10:03", clicks: 35 },
  { time: "10:04", clicks: 38 },
  { time: "10:05", clicks: 34 },
];

const CPMChart = () => {
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <h2 className="text-xl font-bold text-primary mb-6">CLICKS PER MINUTE</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="clicks" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fill="url(#colorClicks)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CPMChart;
