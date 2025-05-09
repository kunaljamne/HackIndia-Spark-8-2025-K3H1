
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { getAirports, Airport } from '@/services/flightData';
import { OptimizationCriteria } from '@/services/routeFinder';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Plane, Filter, ArrowRight, MapPin } from 'lucide-react';

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromAirport" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-sky-500" />
                    From
                  </Label>
                  <Select value={fromAirport} onValueChange={setFromAirport}>
                    <SelectTrigger id="fromAirport" className="w-full">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {airports.map((airport) => (
                          <SelectItem key={airport.id} value={airport.id}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toAirport" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-sky-500" />
                    To
                  </Label>
                  <Select value={toAirport} onValueChange={setToAirport}>
                    <SelectTrigger id="toAirport" className="w-full">
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {airports.map((airport) => (
                          <SelectItem key={airport.id} value={airport.id} disabled={airport.id === fromAirport}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-sky-500" />
                    Departure Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers" className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-sky-500" />
                    Travelers
                  </Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger id="passengers">
                      <SelectValue placeholder="Passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Adult</SelectItem>
                      <SelectItem value="2">2 Adults</SelectItem>
                      <SelectItem value="3">3 Adults</SelectItem>
                      <SelectItem value="4">4 Adults</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

              {showFilters && (
                <div className="bg-sky-50 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Cabin Class</h3>
                    <RadioGroup defaultValue="economy" value={cabinClass} onValueChange={setCabinClass} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="economy" id="economy" />
                        <Label htmlFor="economy">Economy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="premium" id="premium" />
                        <Label htmlFor="premium">Premium Economy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="business" id="business" />
                        <Label htmlFor="business">Business</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="first" id="first" />
                        <Label htmlFor="first">First Class</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Flight Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="directFlights" checked={directFlights} onCheckedChange={(checked) => setDirectFlights(!!checked)} />
                        <label
                          htmlFor="directFlights"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Direct flights only
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="refundable" />
                        <label
                          htmlFor="refundable"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Refundable tickets
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Airlines</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="airline1" />
                        <label
                          htmlFor="airline1"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Air India
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="airline2" />
                        <label
                          htmlFor="airline2"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          IndiGo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="airline3" />
                        <label
                          htmlFor="airline3"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          SpiceJet
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="flex items-center justify-center h-24">
              <p className="text-gray-500">Round Trip functionality coming soon!</p>
            </div>
          </TabsContent>
          <TabsContent value="multicity">
            <div className="flex items-center justify-center h-24">
              <p className="text-gray-500">Multi-City functionality coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;
