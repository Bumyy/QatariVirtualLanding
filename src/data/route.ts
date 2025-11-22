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
