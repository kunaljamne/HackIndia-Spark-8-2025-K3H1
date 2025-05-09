
import { Flight, Airport, getFlightsFrom, getAirportById } from './flightData';

export type OptimizationCriteria = 'price' | 'duration' | 'stops';

export interface RouteSegment {
  flight: Flight;
  from: Airport;
  to: Airport;
}

export interface Route {
  segments: RouteSegment[];
  totalDuration: number;
  totalPrice: number;
  stops: number;
}

interface QueueItem {
  airportId: string;
  path: Flight[];
  totalCost: number;
}

export const findOptimalRoutes = (
  fromAirportId: string,
  toAirportId: string,
  criteria: OptimizationCriteria = 'duration',
  maxResults: number = 5
): Route[] => {
  // Initialize variables
  const visited = new Set<string>();
  const queue: QueueItem[] = [];
  const result: Route[] = [];

  // Add starting point
  queue.push({
    airportId: fromAirportId,
    path: [],
    totalCost: 0,
  });

  while (queue.length > 0 && result.length < maxResults) {
    // Sort the queue based on the optimization criteria
    queue.sort((a, b) => a.totalCost - b.totalCost);
    
    // Get the next item from the queue
    const current = queue.shift()!;
    const { airportId, path, totalCost } = current;
    
    // Skip if we've already processed this airport with a better path
    const visitKey = `${airportId}-${path.length}`;
    if (visited.has(visitKey)) continue;
    visited.add(visitKey);
    
    // If we've reached the destination, add it to the results
    if (airportId === toAirportId && path.length > 0) {
      const route = buildRoute(path);
      result.push(route);
      continue;
    }
    
    // Get all flights from the current airport
    const flights = getFlightsFrom(airportId);
    
    // Process each flight
    for (const flight of flights) {
      // Skip if this would create a loop
      if (path.some(f => f.from === flight.to)) continue;
      
      // Calculate the new cost based on the optimization criteria
      const newCost = calculateCost(path.concat(flight), criteria);
      
      // Add to the queue
      queue.push({
        airportId: flight.to,
        path: path.concat(flight),
        totalCost: newCost,
      });
    }
  }

  return result;
};

// Helper function to calculate the cost based on optimization criteria
const calculateCost = (path: Flight[], criteria: OptimizationCriteria): number => {
  switch (criteria) {
    case 'price':
      return path.reduce((sum, flight) => sum + flight.price, 0);
    case 'duration':
      return path.reduce((sum, flight) => sum + flight.duration, 0);
    case 'stops':
      return path.length; // Number of flights = number of stops + 1
    default:
      return 0;
  }
};

// Helper function to build a Route object from a list of flights
const buildRoute = (flights: Flight[]): Route => {
  const segments: RouteSegment[] = flights.map(flight => {
    const from = getAirportById(flight.from)!;
    const to = getAirportById(flight.to)!;
    return { flight, from, to };
  });
  
  const totalDuration = flights.reduce((sum, flight) => sum + flight.duration, 0);
  const totalPrice = flights.reduce((sum, flight) => sum + flight.price, 0);
  const stops = flights.length - 1;
  
  return {
    segments,
    totalDuration,
    totalPrice,
    stops,
  };
};
