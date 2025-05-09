
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Route as FlightRoute } from '@/services/routeFinder';
import { MapPin, Plane } from 'lucide-react';

interface RouteMapProps {
  selectedRoute: FlightRoute | null;
}

const MAP_WIDTH = 600;
const MAP_HEIGHT = 450;

const RouteMap: React.FC<RouteMapProps> = ({ selectedRoute }) => {
  const routePoints = useMemo(() => {
    if (!selectedRoute) return [];
    
    return selectedRoute.segments.map((segment) => ({
      from: segment.from,
      to: segment.to,
      flight: segment.flight
    }));
  }, [selectedRoute]);

  if (!selectedRoute) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[450px]">
          <div className="text-center text-muted-foreground">
            <MapPin className="mx-auto mb-2 h-12 w-12" />
            <p>Select a flight route to view the map</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="relative w-full h-[450px] bg-sky-50 rounded-md overflow-hidden border border-muted">
          {/* India Map Background - simplified representation */}
          <svg width="100%" height="100%" viewBox="0 0 600 450" className="absolute inset-0">
            {/* Basic outline of India */}
            <path 
              d="M200,80 Q250,50 300,60 Q350,70 400,100 Q420,150 440,200 Q460,250 420,300 Q380,350 320,380 Q280,400 240,380 Q200,350 180,300 Q160,250 180,200 Q190,150 200,80 Z" 
              fill="#f0f9ff" 
              stroke="#bae6fd" 
              strokeWidth="2"
            />
            
            {/* Flight routes */}
            {routePoints.map((point, index) => (
              <g key={`route-${index}`}>
                <line 
                  x1={point.from.position.x} 
                  y1={point.from.position.y} 
                  x2={point.to.position.x} 
                  y2={point.to.position.y} 
                  stroke="#0ea5e9" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                  className="flight-path"
                />
                
                {/* Midpoint for flight icon */}
                <g transform={`translate(
                  ${(point.from.position.x + point.to.position.x) / 2},
                  ${(point.from.position.y + point.to.position.y) / 2}
                )`}>
                  <circle r="8" fill="#0284c7" className="animate-pulse" />
                  <Plane 
                    className="text-white" 
                    size={14}
                    style={{
                      transform: `translate(-7px, -7px) rotate(${Math.atan2(
                        point.to.position.y - point.from.position.y,
                        point.to.position.x - point.from.position.x
                      ) * (180 / Math.PI)}deg)`
                    }}
                  />
                </g>
              </g>
            ))}
            
            {/* Airport markers */}
            {routePoints.map((point, index) => (
              <React.Fragment key={`airports-${index}`}>
                {/* Only draw the "from" airport once */}
                {index === 0 && (
                  <g transform={`translate(${point.from.position.x}, ${point.from.position.y})`}>
                    <circle r="6" fill="#0ea5e9" className="map-marker" />
                    <text x="10" y="4" fontSize="12" fill="#0c4a6e" fontWeight="500">
                      {point.from.city} ({point.from.code})
                    </text>
                  </g>
                )}
                
                {/* Always draw the "to" airport */}
                <g transform={`translate(${point.to.position.x}, ${point.to.position.y})`}>
                  <circle r="6" fill="#0ea5e9" className="map-marker" />
                  <text x="10" y="4" fontSize="12" fill="#0c4a6e" fontWeight="500">
                    {point.to.city} ({point.to.code})
                  </text>
                </g>
              </React.Fragment>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteMap;
