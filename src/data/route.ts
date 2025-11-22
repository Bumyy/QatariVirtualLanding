import { fetchApiData } from "../utils/api";

// -------------------------------------------------------------
// TYPE DEFINITIONS
// -------------------------------------------------------------

/**
 * Represents an aircraft assigned to a route.
 * Based on the JSON response provided.
 */
export interface RouteAircraft {
  id: number;
  name: string; // e.g., "ERJ-190"
  icao: string; // e.g., "XXXX"
  ifaircraftid: string; // Infinite Flight Aircraft UUID
  liveryname: string; // e.g., "Airlink"
  ifliveryid: string; // Infinite Flight Livery UUID
  rankreq: number; // Rank ID required to fly
  awardreq: number; // Award ID required to fly (if any)
  codeshare: number; // 0 or 1
  notes: string;
}

/**
 * Represents a flight route.
 */
export interface Route {
  id: number;
  fltnum: string; // e.g., "4Z106"
  dep: string; // Departure ICAO, e.g., "FAOR"
  arr: string; // Arrival ICAO, e.g., "FVRG"
  duration: number; // Flight duration in seconds
  multiplier: number; // e.g., 1.3
  flown: number; // Count of times flown
  featured: number; // 0 or 1
  codeshare: number; // 0 or 1
  notes: string | null; // Can be null based on JSON
  aircraft: RouteAircraft[];
}

interface RoutesApiResponseWrapper {
  status: number;
  result: Route[];
}

// -------------------------------------------------------------
// DEDICATED FETCH FUNCTION
// -------------------------------------------------------------

/**
 * Fetches all available routes.
 *
 * The PHP endpoint has been optimized to pre-assign aircraft to their
 * respective routes, so no complex client-side mapping is required.
 */
export async function getRoutes(): Promise<Route[]> {
  // Fetch data from the endpoint
  const rawData: RoutesApiResponseWrapper = await fetchApiData("routes");

  if (rawData.status !== 0) {
    throw new Error(
      `Routes API reported a non-zero status (${rawData.status}).`
    );
  }

  // Return the result directly as it matches our interface
  return rawData.result;
}

/**
 * Filters routes to only include those with "QR" in the flight number
 */
export async function getQRRoutes(): Promise<Route[]> {
  const allRoutes = await getRoutes();
  return allRoutes.filter(route => route.fltnum.includes('QR'));
}

/**
 * Fetches routes for specific airline prefix
 */
export async function getAirlineRoutes(prefix: string): Promise<Route[]> {
  const allRoutes = await getRoutes();
  return allRoutes.filter(route => route.fltnum.includes(prefix));
}

/**
 * Optimized function: fetches airline routes first, then only parses needed airports
 */
export async function getAirlineRoutesWithAirports(prefix: string, csvData: string): Promise<{
  routes: Route[];
  airports: Record<string, { name: string; icao: string; lat: number; lng: number }>;
}> {
  const routes = await getAirlineRoutes(prefix);
  
  const neededAirports = new Set<string>();
  routes.forEach(route => {
    neededAirports.add(route.dep);
    neededAirports.add(route.arr);
  });
  
  const airports: Record<string, { name: string; icao: string; lat: number; lng: number }> = {};
  const lines = csvData.split('\n');
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length >= 5 && values[0]) {
      const icao = values[0].trim();
      
      if (neededAirports.has(icao) && values[3] && values[4]) {
        const name = values[2] ? values[2].trim().replace(/"/g, '') : '';
        const lat = parseFloat(values[3]);
        const lng = parseFloat(values[4]);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          airports[icao] = { name, icao, lat, lng };
        }
      }
    }
  }
  
  return { routes, airports };
}

/**
 * Client-side function to get airline data
 */
export async function getAirlineDataForClient(prefix: string): Promise<{
  routes: Route[];
  airports: Record<string, { name: string; icao: string; lat: number; lng: number }>;
}> {
  try {
    const routes = await getAirlineRoutes(prefix);
    
    // For client-side, we'll need to pass CSV data differently
    // This is a simplified version - in production you'd handle CSV loading properly
    return { routes, airports: {} };
  } catch {
    return { routes: [], airports: {} };
  }
}
