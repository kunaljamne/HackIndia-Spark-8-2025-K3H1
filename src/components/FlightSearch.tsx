
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAirports, Airport } from '@/services/flightData';
import { OptimizationCriteria } from '@/services/routeFinder';

interface FlightSearchProps {
  onSearch: (from: string, to: string, criteria: OptimizationCriteria) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [fromAirport, setFromAirport] = useState<string>('');
  const [toAirport, setToAirport] = useState<string>('');
  const [criteria, setCriteria] = useState<OptimizationCriteria>('duration');
  const [isValidSearch, setIsValidSearch] = useState<boolean>(false);

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
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fromAirport">From</Label>
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
              <Label htmlFor="toAirport">To</Label>
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
          </div>

          <div className="space-y-2">
            <Label>Optimize for</Label>
            <RadioGroup
              value={criteria}
              onValueChange={(value) => setCriteria(value as OptimizationCriteria)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="duration" id="duration" />
                <Label htmlFor="duration">Fastest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price" id="price" />
                <Label htmlFor="price">Cheapest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stops" id="stops" />
                <Label htmlFor="stops">Fewest Stops</Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="button" 
            onClick={handleSearch} 
            className="w-full"
            disabled={!isValidSearch}
          >
            Find Optimal Routes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;
