
/**
 * Utility functions for formatting data
 */

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Formats a date object to a readable string
 */
export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString(undefined, options);
};

/**
 * Formats a price in Indian Rupees
 */
export const formatPrice = (price: number) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

/**
 * Format airport code with city name
 */
export const formatAirport = (code: string, city?: string) => {
  if (city) {
    return `${city} (${code})`;
  }
  return code;
};
