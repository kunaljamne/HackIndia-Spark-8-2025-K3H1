
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Route as FlightRoute } from '@/services/routeFinder';
import FlightRouteCard from './FlightRouteCard';

interface FlightRoutesTabContentProps {
  routes: FlightRoute[];
  selectedRoute: FlightRoute | null;
  onSelectRoute: (route: FlightRoute) => void;
  onBookRoute: (route: FlightRoute) => void;
  filterFn?: (route: FlightRoute) => boolean;
  emptyMessage?: string;
}

const FlightRoutesTabContent: React.FC<FlightRoutesTabContentProps> = ({
  routes,
  selectedRoute,
  onSelectRoute,
  onBookRoute,
  filterFn = () => true,
  emptyMessage = "No flights available"
}) => {
  const filteredRoutes = routes.filter(filterFn);
  
  return (
    <ScrollArea className="h-[350px] w-full pr-4">
      {filteredRoutes.length > 0 ? (
        filteredRoutes.map((route, index) => (
          <FlightRouteCard
            key={index}
            route={route}
            isSelected={selectedRoute === route}
            onSelect={onSelectRoute}
            onBook={onBookRoute}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </ScrollArea>
  );
};

export default FlightRoutesTabContent;
