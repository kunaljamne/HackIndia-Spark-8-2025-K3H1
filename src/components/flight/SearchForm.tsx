
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Airport } from '@/services/flightData';
import { format } from "date-fns";
import { ArrowRight, CalendarIcon, MapPin } from 'lucide-react';

interface SearchFormProps {
  airports: Airport[];
  fromAirport: string;
  toAirport: string;
  date: Date | undefined;
  setFromAirport: (value: string) => void;
  setToAirport: (value: string) => void;
  setDate: (date: Date | undefined) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  airports,
  fromAirport,
  toAirport,
  date,
  setFromAirport,
  setToAirport,
  setDate
}) => {
  return (
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
    </div>
  );
};

export default SearchForm;
