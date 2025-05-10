
import React from 'react';
import { Plane } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const FlightResultsLoading: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-pulse-slow mb-4">
          <Plane className="w-16 h-16 text-sky-500" />
        </div>
        <p className="text-lg font-medium">Finding optimal routes...</p>
      </CardContent>
    </Card>
  );
};

export default FlightResultsLoading;
