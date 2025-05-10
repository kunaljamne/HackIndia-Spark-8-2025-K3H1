
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAirports, Airport } from '@/services/flightData';
import { OptimizationCriteria } from '@/services/routeFinder';
import { Filter, Plane } from 'lucide-react';

// Import new component files
import SearchForm from './flight/SearchForm';
import TravelOptions from './flight/TravelOptions';
import SearchFilters from './flight/SearchFilters';
import FutureTabContent from './flight/FutureTabContent';

interface FlightSearchProps {
  onSearch: (from: string, to: string, criteria: OptimizationCriteria) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [fromAirport, setFromAirport] = useState<string>('');
  const [toAirport, setToAirport] = useState<string>('');
  const [criteria, setCriteria] = useState<OptimizationCriteria>('duration');
  const [isValidSearch, setIsValidSearch] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState<string>("1");
  const [cabinClass, setCabinClass] = useState<string>("economy");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [directFlights, setDirectFlights] = useState<boolean>(false);

  useEffect(() => {
    // Load airports
    const airportData = getAirports();
    setAirports(airportData);
  }, []);

  useEffect(() => {
    setIsValidSearch(fromAirport !== '' && toAirport !== '' && fromAirport !== toAirport);
  }, [fromAirport, toAirport]);

  const handleSearch = () => {
    if (isValidSearch) {
      onSearch(fromAirport, toAirport, criteria);
    }
  };

  return (
    <Card className="w-full shadow-md border-sky-100">
      <CardContent className="pt-6">
        <Tabs defaultValue="oneway" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="oneway">One Way</TabsTrigger>
            <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
            <TabsTrigger value="multicity">Multi-City</TabsTrigger>
          </TabsList>
          
          <TabsContent value="oneway">
            <div className="space-y-6 pt-4">
              {/* Search Form Component */}
              <SearchForm 
                airports={airports}
                fromAirport={fromAirport}
                toAirport={toAirport}
                date={date}
                setFromAirport={setFromAirport}
                setToAirport={setToAirport}
                setDate={setDate}
              />
              
              {/* Travel Options Component */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TravelOptions
                  passengers={passengers}
                  setPassengers={setPassengers}
                />
                <div className="lg:col-span-3"></div>
              </div>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-sky-600 text-sm font-medium"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
                
                <div className="space-x-2">
                  <Select value={criteria} onValueChange={(value) => setCriteria(value as OptimizationCriteria)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Optimize for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duration">Fastest</SelectItem>
                      <SelectItem value="price">Cheapest</SelectItem>
                      <SelectItem value="stops">Fewest Stops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Filters Component */}
              {showFilters && (
                <SearchFilters
                  cabinClass={cabinClass}
                  setCabinClass={setCabinClass}
                  directFlights={directFlights}
                  setDirectFlights={setDirectFlights}
                />
              )}

              <Button 
                type="button" 
                onClick={handleSearch} 
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={!isValidSearch}
              >
                <Plane className="mr-2 h-4 w-4" />
                Find Optimal Routes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="roundtrip">
            <FutureTabContent text="Round Trip" />
          </TabsContent>
          
          <TabsContent value="multicity">
            <FutureTabContent text="Multi-City" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;
