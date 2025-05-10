import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Route as FlightRoute } from '@/services/routeFinder';
import { Plane, Clock, ArrowRight, IndianRupee, Ticket } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlightResultsProps {
  routes: FlightRoute[];
  loading: boolean;
  onSelectRoute: (route: FlightRoute) => void;
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const FlightResults: React.FC<FlightResultsProps> = ({ 
  routes, 
  loading, 
  onSelectRoute 
}) => {
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Reset selection when routes change
    setSelectedRoute(null);
  }, [routes]);

  const handleSelectRoute = (route: FlightRoute) => {
    setSelectedRoute(route);
    onSelectRoute(route);
  };

  const handleBookNow = (route: FlightRoute) => {
    // Construct a URL for MakeMyTrip with relevant parameters
    const fromCity = route.segments[0].from.city;
    const toCity = route.segments[route.segments.length - 1].to.city;
    const makeMyTripUrl = `https://www.makemytrip.com/railways/listing/?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}`;
    window.open(makeMyTripUrl, '_blank');
  };

  if (loading) {
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
  }

  if (routes.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 text-center min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-lg mb-2">No routes found</p>
          <p className="text-muted-foreground">Try different cities or optimization criteria</p>
        </CardContent>
      </Card>
    );
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
            <ScrollArea className="h-[350px] w-full pr-4">
              {routes.map((route, index) => (
                <div 
                  key={index}
                  className={`border rounded-lg p-4 mb-4 ${
                    selectedRoute === route ? 'border-sky-500 bg-sky-50' : 'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <Plane className="h-5 w-5 text-sky-600" />
                        <span className="font-medium">
                          {route.segments[0].from.city} to {route.segments[route.segments.length - 1].to.city}
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        route.stops === 0 
                          ? 'bg-green-100 text-green-800' 
                          : route.stops === 1 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {route.stops === 0 ? 'Direct' : `${route.stops} ${route.stops === 1 ? 'Stop' : 'Stops'}`}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDuration(route.totalDuration)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span>₹{route.totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {route.segments.map(s => s.flight.airline).join(' + ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-2">
                      {route.segments.map((segment, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div className="flex-1">
                            <p className="font-medium">{segment.from.code}</p>
                            <p className="text-xs text-muted-foreground">
                              {segment.flight.departureTime}
                            </p>
                          </div>
                          <div className="flex-1 flex flex-col items-center px-2">
                            <p className="text-xs text-muted-foreground">
                              {formatDuration(segment.flight.duration)}
                            </p>
                            <div className="w-full h-[1px] bg-gray-300 my-1 relative">
                              <ArrowRight className="h-3 w-3 absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">{segment.flight.flightNumber}</p>
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-medium">{segment.to.code}</p>
                            <p className="text-xs text-muted-foreground">
                              {segment.flight.arrivalTime}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleSelectRoute(route)}
                    >
                      View Route
                    </Button>
                    <Button 
                      variant="default"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleBookNow(route)}
                    >
                      <Ticket className="mr-1 h-4 w-4" /> Book Flight
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="direct">
            <ScrollArea className="h-[350px] w-full pr-4">
              {routes.filter(r => r.stops === 0).length > 0 ? (
                routes
                  .filter(r => r.stops === 0)
                  .map((route, index) => (
                    <div 
                      key={`direct-${index}`}
                      className={`border rounded-lg p-4 mb-4 ${
                        selectedRoute === route ? 'border-sky-500 bg-sky-50' : 'hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-2">
                            <Plane className="h-5 w-5 text-sky-600" />
                            <span className="font-medium">
                              {route.segments[0].from.city} to {route.segments[route.segments.length - 1].to.city}
                            </span>
                          </div>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                            Direct
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDuration(route.totalDuration)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span>₹{route.totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {route.segments[0].flight.airline}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center text-sm">
                            <div className="flex-1">
                              <p className="font-medium">{route.segments[0].from.code}</p>
                              <p className="text-xs text-muted-foreground">
                                {route.segments[0].flight.departureTime}
                              </p>
                            </div>
                            <div className="flex-1 flex flex-col items-center px-2">
                              <p className="text-xs text-muted-foreground">
                                {formatDuration(route.segments[0].flight.duration)}
                              </p>
                              <div className="w-full h-[1px] bg-gray-300 my-1 relative">
                                <ArrowRight className="h-3 w-3 absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500" />
                              </div>
                              <p className="text-xs text-muted-foreground">{route.segments[0].flight.flightNumber}</p>
                            </div>
                            <div className="flex-1 text-right">
                              <p className="font-medium">{route.segments[0].to.code}</p>
                              <p className="text-xs text-muted-foreground">
                                {route.segments[0].flight.arrivalTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleSelectRoute(route)}
                        >
                          View Route
                        </Button>
                        <Button 
                          variant="default"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleBookNow(route)}
                        >
                          <Ticket className="mr-1 h-4 w-4" /> Book Flight
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No direct flights available</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="1stop">
            <ScrollArea className="h-[350px] w-full pr-4">
              {routes.filter(r => r.stops === 1).length > 0 ? (
                routes
                  .filter(r => r.stops === 1)
                  .map((route, index) => (
                    <div 
                      key={`1stop-${index}`}
                      className={`border rounded-lg p-4 mb-4 ${
                        selectedRoute === route ? 'border-sky-500 bg-sky-50' : 'hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-2">
                            <Plane className="h-5 w-5 text-sky-600" />
                            <span className="font-medium">
                              {route.segments[0].from.city} to {route.segments[route.segments.length - 1].to.city}
                            </span>
                          </div>
                          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                            1 Stop
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDuration(route.totalDuration)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span>₹{route.totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {route.segments.map(s => s.flight.airline).join(' + ')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mt-2">
                          {route.segments.map((segment, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <div className="flex-1">
                                <p className="font-medium">{segment.from.code}</p>
                                <p className="text-xs text-muted-foreground">
                                  {segment.flight.departureTime}
                                </p>
                              </div>
                              <div className="flex-1 flex flex-col items-center px-2">
                                <p className="text-xs text-muted-foreground">
                                  {formatDuration(segment.flight.duration)}
                                </p>
                                <div className="w-full h-[1px] bg-gray-300 my-1 relative">
                                  <ArrowRight className="h-3 w-3 absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-500" />
                                </div>
                                <p className="text-xs text-muted-foreground">{segment.flight.flightNumber}</p>
                              </div>
                              <div className="flex-1 text-right">
                                <p className="font-medium">{segment.to.code}</p>
                                <p className="text-xs text-muted-foreground">
                                  {segment.flight.arrivalTime}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="mx-auto text-center bg-muted/30 rounded-lg py-1 px-3 text-xs text-muted-foreground mt-2">
                            Layover at {route.segments[0].to.city} ({route.segments[0].to.code})
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleSelectRoute(route)}
                        >
                          View Route
                        </Button>
                        <Button 
                          variant="default"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleBookNow(route)}
                        >
                          <Ticket className="mr-1 h-4 w-4" /> Book Flight
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No 1-stop flights available</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightResults;
