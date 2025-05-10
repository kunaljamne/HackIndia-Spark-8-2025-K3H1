
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from 'lucide-react';

interface TravelOptionsProps {
  passengers: string;
  setPassengers: (value: string) => void;
}

const TravelOptions: React.FC<TravelOptionsProps> = ({
  passengers,
  setPassengers
}) => {
  return (
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
  );
};

export default TravelOptions;
