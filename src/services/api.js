const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const BASE_URL = "https://api.geoapify.com/v2/places";


export const fetchNearbyRestaurants = async (lat, lon, radius = 2000) => {
  try {
    // Build the API URL with parameters:
    // - categories: we search for restaurants specifically
    // - filter: circular area around user's location
    // - bias: prioritize results closer to the user
    // - limit: max 20 results for better performance
    const url = `${BASE_URL}?categories=catering.restaurant&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.features || [];
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const pickRandomRestaurant = (restaurants) => {
  if (!restaurants || restaurants.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  return restaurants[randomIndex];
};
