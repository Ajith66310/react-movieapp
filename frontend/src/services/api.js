<<<<<<< HEAD
export const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
=======
const API_KEY = "";
const BASE_URL = "https://api.watchmode.com/v1";

>>>>>>> 9ac89067579954a004c5420da03ee604149d2ee9

// Fetch popular movies and include their poster URLs
export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/list-titles/?apiKey=${API_KEY}&types=movie&limit=20&sort_by=popularity_desc`
    );
    const data = await response.json();
    const titles = data.titles || [];

    // Fetch details (to get poster) for each movie
    const detailedMovies = await Promise.all(
      titles.map(async (movie) => {
        try {
          const res = await fetch(
            `${BASE_URL}/title/${movie.id}/details/?apiKey=${API_KEY}`
          );
          const details = await res.json();
          return { ...movie, poster_url: details.poster };
        } catch {
          return movie;
        }
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// Search movies (autocomplete only gives names)
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/autocomplete-search/?apiKey=${API_KEY}&search_value=${encodeURIComponent(
        query
      )}&search_type=2`
    );
    const data = await response.json();
    const results = data.results || [];

    // Optionally fetch details for search results too
    const detailedResults = await Promise.all(
      results.map(async (movie) => {
        try {
          const res = await fetch(
            `${BASE_URL}/title/${movie.id}/details/?apiKey=${API_KEY}`
          );
          const details = await res.json();
          return { ...movie, poster_url: details.poster };
        } catch {
          return movie;
        }
      })
    );

    return detailedResults;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
