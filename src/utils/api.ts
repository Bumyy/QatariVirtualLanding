const API_KEY = import.meta.env.CC_API_KEY;
const BASE_URL = import.meta.env.CC_API_BASE_URL;

/**
 * The core function for secure, build-time data fetching.
 * This handles the common API key query parameter pattern.
 *
 * @param endpoint The path appended to the base URL (e.g., 'staff', 'flights').
 * @returns A promise resolving to the raw JSON object from the API.
 */
export async function fetchApiData(endpoint: string): Promise<any> {
  if (!API_KEY) {
    throw new Error(
      "API_KEY_SECRET environment variable is not set. Cannot perform secure build-time fetch."
    );
  }

  // Construct the secure URL with the API key as a query parameter
  const url = `${BASE_URL}${endpoint}?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API Fetch Failed for ${endpoint}: Status ${
          response.status
        }. Body: ${errorBody.substring(0, 100)}...`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}
