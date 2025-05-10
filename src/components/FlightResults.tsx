import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route as FlightRoute } from '@/services/routeFinder';
import FlightResultsLoading from './flight/FlightResultsLoading';
import EmptyFlightResults from './flight/EmptyFlightResults';
import FlightRoutesTabContent from './flight/FlightRoutesTabContent';

interface FlightResultsProps {
  routes: FlightRoute[];
  loading: boolean;
  onSelectRoute: (route: FlightRoute) => void;
  usingBackend?: boolean;
}

const FlightResults: React.FC<FlightResultsProps> = ({ 
  routes, 
  loading, 
  onSelectRoute,
  usingBackend = false
}) => {
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const [isBackendError, setIsBackendError] = useState(false);

  useEffect(() => {
    // Reset selection when routes change
    setSelectedRoute(null);
    
    // Check if there's a backend connection error
    setIsBackendError(usingBackend && routes.length === 0);
  }, [routes, usingBackend]);

  const handleSelectRoute = (route: FlightRoute) => {
    setSelectedRoute(route);
    onSelectRoute(route);
  };

  const handleBookNow = (route: FlightRoute) => {
    // Construct a URL for MakeMyTrip with relevant parameters
    const fromCity = route.segments[0]?.from?.city || '';
    const toCity = route.segments[route.segments.length - 1]?.to?.city || '';
    const makeMyTripUrl = `https://www.makemytrip.com/railways/listing/?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}`;
    window.open(makeMyTripUrl, '_blank');
  };

  if (loading) {
    return <FlightResultsLoading />;
  }

  if (routes.length === 0) {
    return <EmptyFlightResults isBackendError={isBackendError} />;
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Routes ({routes.length})</TabsTrigger>
            <TabsTrigger value="direct">Direct</TabsTrigger>
            <TabsTrigger value="1stop">1 Stop</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-2">
            <FlightRoutesTabContent
              routes={routes}
              selectedRoute={selectedRoute}
              onSelectRoute={handleSelectRoute}
              onBookRoute={handleBookNow}
            />
          </TabsContent>
          
          <TabsContent value="direct">
            <FlightRoutesTabContent
              routes={routes}
              selectedRoute={selectedRoute}
              onSelectRoute={handleSelectRoute}
              onBookRoute={handleBookNow}
              filterFn={(r) => r.stops === 0}
              emptyMessage="No direct flights available"
            />
          </TabsContent>
          
          <TabsContent value="1stop">
            <FlightRoutesTabContent
              routes={routes}
              selectedRoute={selectedRoute}
              onSelectRoute={handleSelectRoute}
              onBookRoute={handleBookNow}
              filterFn={(r) => r.stops === 1}
              emptyMessage="No 1-stop flights available"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightResults;
