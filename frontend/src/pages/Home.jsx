import { useState, useEffect } from "react";
import Card from "../components/Card";
import { searchMovies, getPopularMovies } from "../services/api.js";
import CardSkeleton from "../components/CardSkeleton";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load popular movies initially
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!searchQuery.trim()) {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies || []);
      } else {
        const results = await searchMovies(searchQuery);
        setMovies(results || []);
        if (!results || results.length === 0) setError("No movies found.");
      }
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pt-28">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-row sm:flex-row gap-3 justify-center items-center mb-10 flex-wrap"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[50%] md:w-1/2 px-4 py-3 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
        >
          Search
        </button>
      </form>

      {/* Loading & Error States */}
      {loading ? (
        <div
          className="grid gap-6 
                     grid-cols-2 sm:grid-cols-2 
                     md:grid-cols-3 lg:grid-cols-4 
                     p-2 sm:p-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div
          className="grid gap-6 
                     grid-cols-2 sm:grid-cols-2 
                     md:grid-cols-3 lg:grid-cols-4 
                     p-2 sm:p-4"
        >
          {movies.map((movie) => (
            <Card movie={movie} key={movie.id || movie.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
