const API_KEY = "";
const BASE_URL = "https://api.watchmode.com/v1";


export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/list-titles/?apiKey=${API_KEY}&types=movie&limit=20&sort_by=popularity_desc`
    );
    const data = await response.json();
    return data.titles || []; // Watchmode returns `titles` array
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};


export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/autocomplete-search/?apiKey=${API_KEY}&search_value=${encodeURIComponent(
        query
      )}&search_type=2`
    );
    const data = await response.json();
    return data.results || []; // Watchmode returns `results` array for searches
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
