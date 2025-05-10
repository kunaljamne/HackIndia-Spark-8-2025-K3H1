
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const EmptyFlightResults: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 text-center min-h-[200px] flex flex-col items-center justify-center">
        <p className="text-lg mb-2">No routes found</p>
        <p className="text-muted-foreground">Try different cities or optimization criteria</p>
      </CardContent>
    </Card>
  );
};

export default EmptyFlightResults;
