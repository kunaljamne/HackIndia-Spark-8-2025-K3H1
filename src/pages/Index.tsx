import React, { useState } from 'react';
import { Route as FlightRoute, OptimizationCriteria, findOptimalRoutes } from '@/services/routeFinder';
import { fetchOptimalRoute, convertApiRouteToFlightRoute } from '@/services/apiService';
import FlightSearch from '@/components/FlightSearch';
import FlightResults from '@/components/FlightResults';
import RouteMap from '@/components/RouteMap';
import { Plane, Route, IndianRupee, Map, Clock, Filter, User, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';

const Index = () => {
  const [routes, setRoutes] = useState<FlightRoute[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [usingBackend, setUsingBackend] = useState(false);
  const [apiData, setApiData] = useState<{ algorithm: string; path: string[] } | null>(null);
  const { toast } = useToast();
  
  const handleSearch = async (from: string, to: string, criteria: OptimizationCriteria) => {
    setLoading(true);
    setSelectedRoute(null);
    setSearchPerformed(true);
    setApiData(null);
    
    // Decide whether to use backend or frontend routing
    const useBackend = true; // Set to true to use the FastAPI backend
    setUsingBackend(useBackend);
    
    // Small timeout to show the loading state
    setTimeout(async () => {
      try {
        let results: FlightRoute[] = [];
        
        if (useBackend) {
          // Use FastAPI backend
          const fromAirport = from.toUpperCase(); // Assuming airport codes are uppercase in your backend
          const toAirport = to.toUpperCase();
          
          // Map criteria to algorithm
          const algorithm = criteria === 'stops' ? 'dijkstra' : 'astar';
          
          const apiResult = await fetchOptimalRoute(fromAirport, toAirport, algorithm);
          results = convertApiRouteToFlightRoute(apiResult, from, to);
          setApiData({
            algorithm: apiResult.algorithm,
            path: apiResult.path
          });
        } else {
          // Use existing frontend implementation
          results = findOptimalRoutes(from, to, criteria, 10);
        }
        
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
            description: `Found ${results.length} possible routes${useBackend ? ' from API' : ''}`,
          });
        }
      } catch (error) {
        console.error('Error finding routes:', error);
        toast({
          title: "Error",
          description: useBackend 
            ? "Failed to connect to backend API. Please make sure the server is running."
            : "Failed to find routes. Please try again.",
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
      <MainHeader />

      <main className="container mx-auto px-4 pb-16">
        <div className="mb-8 pt-6">
          <FlightSearch onSearch={handleSearch} />
        </div>

        {searchPerformed && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FlightResults 
                routes={routes} 
                loading={loading} 
                onSelectRoute={handleSelectRoute} 
                usingBackend={usingBackend}
              />
              
              {usingBackend && apiData && (
                <div className="mt-6">
                  <Card className="bg-sky-50 border-sky-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <Server className="h-5 w-5 mr-2 text-sky-600" />
                        <h3 className="font-medium">FastAPI Backend</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        This route was calculated using the FastAPI backend with {apiData.algorithm} algorithm.
                      </p>
                      <div className="text-xs bg-white rounded-md p-2 border border-sky-200">
                        <p><strong>Path:</strong> {apiData.path.join(' → ')}</p>
                        <p><strong>Stops:</strong> {apiData.path.length - 1}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
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
              <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
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
              
              <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
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
              
              <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
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

            <div className="mt-16">
              <h2 className="text-2xl font-medium mb-6 text-gray-700">Why Choose Our Route Finder?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="bg-white rounded-lg p-5 shadow-sm border">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-100 p-2 rounded-full mr-3">
                      <Filter className="h-5 w-5 text-sky-600" />
                    </div>
                    <h3 className="font-medium">Smart Filtering</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Advanced algorithms to find the best routes based on your preferences
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-5 shadow-sm border">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-100 p-2 rounded-full mr-3">
                      <Route className="h-5 w-5 text-sky-600" />
                    </div>
                    <h3 className="font-medium">All Indian Routes</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Comprehensive coverage of domestic flights across India
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-5 shadow-sm border">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-sky-600" />
                    </div>
                    <h3 className="font-medium">User-Friendly</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Simple, intuitive interface designed for effortless planning
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-5 shadow-sm border">
                  <div className="flex items-center mb-3">
                    <div className="bg-sky-100 p-2 rounded-full mr-3">
                      <IndianRupee className="h-5 w-6 text-sky-600" />
                    </div>
                    <h3 className="font-medium">INR Pricing</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    All fares displayed in Indian Rupees for convenience
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
