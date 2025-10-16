import DashboardHeader from "@/components/DashboardHeader";
import AIRecommendation from "@/components/AIRecommendation";
import MetricsCard from "@/components/MetricsCard";
import CPMChart from "@/components/CPMChart";
import EarlyExitChart from "@/components/EarlyExitChart";
import StepDurationHeatmap from "@/components/StepDurationHeatmap";

const Index = () => {
  const metrics = [
    { label: "Clicks/Min", value: "34" },
    { label: "Completion Ratio", value: "82%" },
    { label: "Hover/Click Ratio", value: "2.5" },
    { label: "Early Exit Step", value: "Step 2" },
    { label: "Step Duration", value: "1min 24s" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container px-6 py-8">
        <div className="grid gap-6 md:gap-8">
          {/* AI Recommendation - Full Width */}
          <div className="animate-fade-in">
            <AIRecommendation />
          </div>

          {/* Metrics and CPM Chart */}
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <MetricsCard metrics={metrics} />
            <CPMChart />
          </div>

          {/* Heatmap and Early Exit Chart */}
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <StepDurationHeatmap />
            <EarlyExitChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
