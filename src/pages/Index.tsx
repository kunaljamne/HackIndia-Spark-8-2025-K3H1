
import React, { useState } from 'react';
import { Route as FlightRoute, OptimizationCriteria, findOptimalRoutes } from '@/services/routeFinder';
import FlightSearch from '@/components/FlightSearch';
import FlightResults from '@/components/FlightResults';
import RouteMap from '@/components/RouteMap';
import { Plane, Route, IndianRupee, Map, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [routes, setRoutes] = useState<FlightRoute[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = (from: string, to: string, criteria: OptimizationCriteria) => {
    setLoading(true);
    setSelectedRoute(null);
    setSearchPerformed(true);
    
    // Small timeout to show the loading state
    setTimeout(() => {
      try {
        const results = findOptimalRoutes(from, to, criteria, 10);
        setRoutes(results);
        
        if (results.length === 0) {
          toast({
            title: "No routes found",
            description: "Try different cities or optimization criteria",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Routes found",
            description: `Found ${results.length} possible routes`,
          });
        }
      } catch (error) {
        console.error('Error finding routes:', error);
        toast({
          title: "Error",
          description: "Failed to find routes. Please try again.",
          variant: "destructive",
        });
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleSelectRoute = (route: FlightRoute) => {
    setSelectedRoute(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-sky-600" />
              <h1 className="text-2xl font-bold text-sky-900">Optimal Flight Route Finder</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-sky-700">
              <div className="flex items-center">
                <Route className="h-5 w-5 mr-1" />
                <span>Indian Routes</span>
              </div>
              <div className="flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                <span>INR Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="mb-8">
          <FlightSearch onSearch={handleSearch} />
        </div>

        {searchPerformed && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FlightResults 
                routes={routes} 
                loading={loading} 
                onSelectRoute={handleSelectRoute} 
              />
            </div>
            <div className="lg:col-span-1">
              <RouteMap selectedRoute={selectedRoute} />
            </div>
          </div>
        )}

        {!searchPerformed && (
          <div className="text-center py-16">
            <Map className="h-20 w-20 mx-auto mb-6 text-sky-500 opacity-50" />
            <h2 className="text-2xl font-medium mb-2 text-gray-700">Find Your Optimal Flight Route</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter your departure and destination cities above to discover the most efficient flight routes across India.
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-center mb-4">
                  <div className="bg-sky-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">Shortest Travel Time</h3>
                <p className="text-sm text-gray-500 text-center">
                  Find the fastest route between cities by minimizing total travel duration
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-center mb-4">
                  <div className="bg-sky-100 p-3 rounded-full">
                    <IndianRupee className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">Cost Optimization</h3>
                <p className="text-sm text-gray-500 text-center">
                  Find the most affordable routes that fit your budget
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-center mb-4">
                  <div className="bg-sky-100 p-3 rounded-full">
                    <Map className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">Fewest Stops</h3>
                <p className="text-sm text-gray-500 text-center">
                  Minimize connections and layovers in your journey
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
