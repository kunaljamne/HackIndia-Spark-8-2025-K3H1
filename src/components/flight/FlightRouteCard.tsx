
import React from 'react';
import { Plane, Clock, IndianRupee, Ticket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FlightSegment from './FlightSegment';
import { Route as FlightRoute } from '@/services/routeFinder';
import { formatDuration } from '@/utils/formatUtils';

interface FlightRouteCardProps {
  route: FlightRoute;
  isSelected: boolean;
  onSelect: (route: FlightRoute) => void;
  onBook: (route: FlightRoute) => void;
}

const FlightRouteCard: React.FC<FlightRouteCardProps> = ({
  route,
  isSelected,
  onSelect,
  onBook
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 mb-4 ${
        isSelected ? 'border-sky-500 bg-sky-50' : 'hover:bg-muted/30'
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
            <FlightSegment
              key={idx}
              fromCode={segment.from.code}
              fromTime={segment.flight.departureTime}
              toCode={segment.to.code}
              toTime={segment.flight.arrivalTime}
              duration={segment.flight.duration}
              flightNumber={segment.flight.flightNumber}
            />
          ))}
          
          {route.stops === 1 && (
            <div className="mx-auto text-center bg-muted/30 rounded-lg py-1 px-3 text-xs text-muted-foreground mt-2">
              Layover at {route.segments[0].to.city} ({route.segments[0].to.code})
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        <Button 
          variant="outline"
          onClick={() => onSelect(route)}
        >
          View Route
        </Button>
        <Button 
          variant="default"
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => onBook(route)}
        >
          <Ticket className="mr-1 h-4 w-4" /> Book Flight
        </Button>
      </div>
    </div>
  );
};

export default FlightRouteCard;
