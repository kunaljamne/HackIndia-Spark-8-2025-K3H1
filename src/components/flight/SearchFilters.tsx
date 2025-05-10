
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchFiltersProps {
  cabinClass: string;
  setCabinClass: (value: string) => void;
  directFlights: boolean;
  setDirectFlights: (checked: boolean) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  cabinClass,
  setCabinClass,
  directFlights,
  setDirectFlights
}) => {
  return (
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
  );
};

export default SearchFilters;
