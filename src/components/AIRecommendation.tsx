import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const AIRecommendation = () => {
  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-fade-in">
      <div className="flex items-start gap-3 mb-4">
        <Sparkles className="h-6 w-6 text-primary mt-1" />
        <h2 className="text-xl font-bold text-primary">AI RECOMMENDATION</h2>
      </div>
      <p className="text-foreground mb-6 leading-relaxed">
        Try reducing user drop-off after Step 3 by simplifying form fields.
      </p>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105">
        View Suggestions
      </Button>
    </Card>
  );
};

export default AIRecommendation;
