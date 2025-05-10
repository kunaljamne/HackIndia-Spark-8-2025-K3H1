
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Server } from 'lucide-react';

interface EmptyFlightResultsProps {
  isBackendError?: boolean;
}

const EmptyFlightResults: React.FC<EmptyFlightResultsProps> = ({ isBackendError = false }) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 text-center min-h-[200px] flex flex-col items-center justify-center">
        {isBackendError ? (
          <>
            <Server className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg mb-2">Backend Connection Error</p>
            <p className="text-muted-foreground">
              Unable to connect to the FastAPI backend. Please ensure the server is running at http://localhost:8000
            </p>
          </>
        ) : (
          <>
            <p className="text-lg mb-2">No routes found</p>
            <p className="text-muted-foreground">Try different cities or optimization criteria</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyFlightResults;
