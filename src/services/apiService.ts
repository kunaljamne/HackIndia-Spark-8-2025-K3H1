
/**
 * Service to interact with the FastAPI backend
 */
import { Route as FlightRoute } from './routeFinder';

interface ApiRouteResponse {
  algorithm: string;
  path: string[];
  stops: number;
  cost: number;
}

/**
 * Fetch optimal route from the FastAPI backend
 * @param source Source airport code
 * @param destination Destination airport code
 * @param algorithm Algorithm to use (dijkstra, astar, auto)
 * @returns Promise with the route data
 */
export const fetchOptimalRoute = async (
  source: string,
  destination: string,
  algorithm: string = "auto"
): Promise<ApiRouteResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8000/optimal-route?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&algo=${algorithm}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch optimal route');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching optimal route:', error);
    throw error;
  }
};

/**
 * Convert API route response to FlightRoute format
 * This is a placeholder function that would need to be updated
 * based on your actual flight data schema
 */
export const convertApiRouteToFlightRoute = (
  apiRoute: ApiRouteResponse,
  fromCity: string,
  toCity: string
): FlightRoute[] => {
  // This is a simplified conversion - in a real app,
  // you would need to match airports with your flight data
  
  // Create segments based on path
  const routes: FlightRoute[] = [];
  
  // For now, create a single route with basic data
  const route: FlightRoute = {
    segments: [],
    totalDuration: apiRoute.cost * 60, // Assuming cost roughly corresponds to hours
    totalPrice: Math.round(apiRoute.cost * 1500 + 3000), // Random price calculation
    stops: apiRoute.stops
  };
  
  // Add to routes array
  routes.push(route);
  
  return routes;
};

