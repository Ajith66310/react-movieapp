import { useState, useEffect } from "react";
import Card from "../components/Card";
import { searchMovies, getPopularMovies } from "../services/api.js";

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
        setMovies(popularMovies);
      } catch (error) {
        setError("Failed to load movies");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    // If search is empty → reload popular movies
    if (!searchQuery.trim()) {
      setLoading(true);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(results.length === 0 ? "No movies found." : null);
    } catch (error) {
      setError("Search failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10 pt-28">
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
          className="w-[70%] md:w-1/2 px-4 py-3 rounded-lg bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
        >
          Search
        </button>
      </form>

      {/* Loading & Error States */}
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Movie Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!loading &&
          movies.map((movie) => <Card movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Home;
