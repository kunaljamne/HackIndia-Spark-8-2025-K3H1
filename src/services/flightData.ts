// Flight data for Indian routes
export interface Airport {
  id: string;
  name: string;
  city: string;
  code: string;
  position: {
    x: number; // For visual representation
    y: number; // For visual representation
  };
}

export interface Flight {
  id: string;
  from: string; // Airport ID
  to: string; // Airport ID
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  price: number; // in INR
}

export const airports: Airport[] = [
  {
    id: "DEL",
    name: "Indira Gandhi International Airport",
    city: "Delhi",
    code: "DEL",
    position: { x: 320, y: 140 }
  },
  {
    id: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    code: "BOM",
    position: { x: 220, y: 280 }
  },
  {
    id: "MAA",
    name: "Chennai International Airport",
    city: "Chennai",
    code: "MAA",
    position: { x: 320, y: 380 }
  },
  {
    id: "BLR",
    name: "Kempegowda International Airport",
    city: "Bengaluru",
    code: "BLR",
    position: { x: 280, y: 330 }
  },
  {
    id: "CCU",
    name: "Netaji Subhas Chandra Bose International Airport",
    city: "Kolkata",
    code: "CCU",
    position: { x: 440, y: 220 }
  },
  {
    id: "HYD",
    name: "Rajiv Gandhi International Airport",
    city: "Hyderabad",
    code: "HYD",
    position: { x: 290, y: 290 }
  },
  {
    id: "GOI",
    name: "Dabolim Airport",
    city: "Goa",
    code: "GOI",
    position: { x: 220, y: 320 }
  },
  {
    id: "JAI",
    name: "Jaipur International Airport",
    city: "Jaipur",
    code: "JAI",
    position: { x: 270, y: 180 }
  },
  {
    id: "IXZ",
    name: "Veer Savarkar International Airport",
    city: "Port Blair",
    code: "IXZ",
    position: { x: 520, y: 380 }
  },
  {
    id: "AMD",
    name: "Sardar Vallabhbhai Patel International Airport",
    city: "Ahmedabad",
    code: "AMD",
    position: { x: 220, y: 210 }
  }
];

export const flights: Flight[] = [
  // Delhi routes
  { id: "AI101", from: "DEL", to: "BOM", airline: "Air India", flightNumber: "AI101", departureTime: "06:00", arrivalTime: "08:10", duration: 130, price: 5200 },
  { id: "SJ201", from: "DEL", to: "BOM", airline: "SpiceJet", flightNumber: "SJ201", departureTime: "07:30", arrivalTime: "09:40", duration: 130, price: 4800 },
  { id: "IG301", from: "DEL", to: "BOM", airline: "IndiGo", flightNumber: "IG301", departureTime: "09:15", arrivalTime: "11:25", duration: 130, price: 5100 },
  { id: "AI102", from: "DEL", to: "MAA", airline: "Air India", flightNumber: "AI102", departureTime: "08:00", arrivalTime: "11:00", duration: 180, price: 6500 },
  { id: "IG302", from: "DEL", to: "MAA", airline: "IndiGo", flightNumber: "IG302", departureTime: "10:30", arrivalTime: "13:30", duration: 180, price: 6200 },
  { id: "AI103", from: "DEL", to: "BLR", airline: "Air India", flightNumber: "AI103", departureTime: "07:15", arrivalTime: "10:00", duration: 165, price: 6100 },
  { id: "IG303", from: "DEL", to: "BLR", airline: "IndiGo", flightNumber: "IG303", departureTime: "13:00", arrivalTime: "15:45", duration: 165, price: 5900 },
  { id: "AI104", from: "DEL", to: "CCU", airline: "Air India", flightNumber: "AI104", departureTime: "06:30", arrivalTime: "08:45", duration: 135, price: 5500 },
  { id: "AI105", from: "DEL", to: "HYD", airline: "Air India", flightNumber: "AI105", departureTime: "08:45", arrivalTime: "11:15", duration: 150, price: 5800 },
  { id: "AI106", from: "DEL", to: "JAI", airline: "Air India", flightNumber: "AI106", departureTime: "07:00", arrivalTime: "07:55", duration: 55, price: 3200 },
  { id: "AI107", from: "DEL", to: "GOI", airline: "Air India", flightNumber: "AI107", departureTime: "09:30", arrivalTime: "12:15", duration: 165, price: 7500 },
  { id: "IG307", from: "DEL", to: "GOI", airline: "IndiGo", flightNumber: "IG307", departureTime: "15:00", arrivalTime: "17:45", duration: 165, price: 7200 },
  { id: "AI108", from: "DEL", to: "AMD", airline: "Air India", flightNumber: "AI108", departureTime: "10:00", arrivalTime: "11:30", duration: 90, price: 4200 },

  // Mumbai routes
  { id: "AI201", from: "BOM", to: "DEL", airline: "Air India", flightNumber: "AI201", departureTime: "09:00", arrivalTime: "11:10", duration: 130, price: 5300 },
  { id: "SJ401", from: "BOM", to: "DEL", airline: "SpiceJet", flightNumber: "SJ401", departureTime: "18:30", arrivalTime: "20:40", duration: 130, price: 4900 },
  { id: "AI202", from: "BOM", to: "MAA", airline: "Air India", flightNumber: "AI202", departureTime: "07:30", arrivalTime: "09:30", duration: 120, price: 4800 },
  { id: "IG402", from: "BOM", to: "MAA", airline: "IndiGo", flightNumber: "IG402", departureTime: "14:00", arrivalTime: "16:00", duration: 120, price: 4600 },
  { id: "AI203", from: "BOM", to: "BLR", airline: "Air India", flightNumber: "AI203", departureTime: "08:20", arrivalTime: "10:00", duration: 100, price: 4200 },
  { id: "AI204", from: "BOM", to: "CCU", airline: "Air India", flightNumber: "AI204", departureTime: "12:30", arrivalTime: "15:00", duration: 150, price: 7100 },
  { id: "AI205", from: "BOM", to: "HYD", airline: "Air India", flightNumber: "AI205", departureTime: "11:00", arrivalTime: "12:30", duration: 90, price: 4100 },
  { id: "AI206", from: "BOM", to: "GOI", airline: "Air India", flightNumber: "AI206", departureTime: "08:45", arrivalTime: "09:45", duration: 60, price: 3100 },
  { id: "AI207", from: "BOM", to: "AMD", airline: "Air India", flightNumber: "AI207", departureTime: "07:15", arrivalTime: "08:15", duration: 60, price: 3000 },

  // Chennai routes
  { id: "AI301", from: "MAA", to: "DEL", airline: "Air India", flightNumber: "AI301", departureTime: "14:00", arrivalTime: "17:00", duration: 180, price: 6600 },
  { id: "AI302", from: "MAA", to: "BOM", airline: "Air India", flightNumber: "AI302", departureTime: "10:30", arrivalTime: "12:30", duration: 120, price: 4900 },
  { id: "AI303", from: "MAA", to: "BLR", airline: "Air India", flightNumber: "AI303", departureTime: "09:00", arrivalTime: "10:00", duration: 60, price: 2800 },
  { id: "AI304", from: "MAA", to: "CCU", airline: "Air India", flightNumber: "AI304", departureTime: "11:15", arrivalTime: "13:45", duration: 150, price: 7000 },
  { id: "AI305", from: "MAA", to: "HYD", airline: "Air India", flightNumber: "AI305", departureTime: "13:30", arrivalTime: "15:00", duration: 90, price: 3900 },

  // Bengaluru routes
  { id: "AI401", from: "BLR", to: "DEL", airline: "Air India", flightNumber: "AI401", departureTime: "15:30", arrivalTime: "18:15", duration: 165, price: 6200 },
  { id: "IG501", from: "BLR", to: "DEL", airline: "IndiGo", flightNumber: "IG501", departureTime: "19:00", arrivalTime: "21:45", duration: 165, price: 5800 },
  { id: "AI402", from: "BLR", to: "BOM", airline: "Air India", flightNumber: "AI402", departureTime: "11:30", arrivalTime: "13:10", duration: 100, price: 4400 },
  { id: "AI403", from: "BLR", to: "MAA", airline: "Air India", flightNumber: "AI403", departureTime: "14:00", arrivalTime: "15:00", duration: 60, price: 2900 },
  { id: "AI404", from: "BLR", to: "CCU", airline: "Air India", flightNumber: "AI404", departureTime: "10:00", arrivalTime: "12:30", duration: 150, price: 6800 },
  { id: "AI405", from: "BLR", to: "HYD", airline: "Air India", flightNumber: "AI405", departureTime: "16:30", arrivalTime: "17:45", duration: 75, price: 3600 },

  // Other routes
  { id: "AI501", from: "CCU", to: "DEL", airline: "Air India", flightNumber: "AI501", departureTime: "10:00", arrivalTime: "12:15", duration: 135, price: 5600 },
  { id: "AI601", from: "HYD", to: "DEL", airline: "Air India", flightNumber: "AI601", departureTime: "12:00", arrivalTime: "14:30", duration: 150, price: 5900 },
  { id: "AI701", from: "GOI", to: "DEL", airline: "Air India", flightNumber: "AI701", departureTime: "13:30", arrivalTime: "16:15", duration: 165, price: 7600 },
  { id: "AI801", from: "JAI", to: "DEL", airline: "Air India", flightNumber: "AI801", departureTime: "16:30", arrivalTime: "17:25", duration: 55, price: 3300 },
  { id: "AI901", from: "AMD", to: "DEL", airline: "Air India", flightNumber: "AI901", departureTime: "12:00", arrivalTime: "13:30", duration: 90, price: 4300 },

  // Additional connections for multi-hop routes
  { id: "AI910", from: "CCU", to: "BLR", airline: "Air India", flightNumber: "AI910", departureTime: "10:30", arrivalTime: "13:00", duration: 150, price: 5800 },
  { id: "AI920", from: "HYD", to: "BOM", airline: "Air India", flightNumber: "AI920", departureTime: "14:30", arrivalTime: "16:00", duration: 90, price: 4200 },
  { id: "AI930", from: "GOI", to: "BLR", airline: "Air India", flightNumber: "AI930", departureTime: "11:00", arrivalTime: "12:15", duration: 75, price: 3500 },
  { id: "AI940", from: "CCU", to: "MAA", airline: "Air India", flightNumber: "AI940", departureTime: "08:15", arrivalTime: "10:45", duration: 150, price: 5900 },
  { id: "AI950", from: "AMD", to: "BLR", airline: "Air India", flightNumber: "AI950", departureTime: "09:30", arrivalTime: "11:45", duration: 135, price: 5100 },
  
  // Port Blair routes
  { id: "AI960", from: "IXZ", to: "MAA", airline: "Air India", flightNumber: "AI960", departureTime: "11:00", arrivalTime: "13:15", duration: 135, price: 6900 },
  { id: "AI961", from: "MAA", to: "IXZ", airline: "Air India", flightNumber: "AI961", departureTime: "07:30", arrivalTime: "09:45", duration: 135, price: 7100 },
  { id: "AI962", from: "IXZ", to: "CCU", airline: "Air India", flightNumber: "AI962", departureTime: "14:00", arrivalTime: "16:15", duration: 135, price: 6800 },
  { id: "AI963", from: "CCU", to: "IXZ", airline: "Air India", flightNumber: "AI963", departureTime: "09:00", arrivalTime: "11:15", duration: 135, price: 6950 },
];

// Function to get all available airports
export const getAirports = (): Airport[] => {
  return airports;
};

// Function to get available flights between airports
export const getDirectFlights = (from: string, to: string): Flight[] => {
  return flights.filter(flight => flight.from === from && flight.to === to);
};

// Function to get all flights departing from an airport
export const getFlightsFrom = (airportId: string): Flight[] => {
  return flights.filter(flight => flight.from === airportId);
};

// Function to get an airport by ID
export const getAirportById = (id: string): Airport | undefined => {
  return airports.find(airport => airport.id === id);
};

// Function to get airport by city name (case insensitive)
export const getAirportByCity = (cityName: string): Airport | undefined => {
  return airports.find(
    airport => airport.city.toLowerCase() === cityName.toLowerCase()
  );
};
