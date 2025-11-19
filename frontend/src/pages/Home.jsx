import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import axios from "axios";
import toast from "react-hot-toast";


const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [aiData, setAiData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);


  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/movies/popular`);
        setMovies(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load popular movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

const handleSearch = async (e) => {
  e.preventDefault();
  setError(null);

  if (!user) {
    toast.error("Please login to search movies.");
    return;
  }

  if (!searchQuery.trim()) {
    toast.error("Enter a movie name to search.");
    return;
  }

  setIsSearchTriggered(true);
  setLoading(true);

  try {
    const res = await axios.get(`${BACKEND_URL}/api/movies/search`, {
      params: {
        query: searchQuery,
        userId: user.id,
      },
    });

    setMovies(res.data.movies || []);
    setAiData(res.data.aiData || {});
    
    if ((res.data.movies || []).length === 0) {
      toast("No movies found.");
    } else {
      toast.success("Movies loaded!");
    }

  } catch (err) {
    console.error("Search error:", err);

    // If backend sends a message we show it
    if (err.response?.data?.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error("Something went wrong. Try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pt-28">
      <form
        onSubmit={handleSearch}
        className="flex flex-row gap-3 justify-center items-center mb-10 flex-wrap"
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

      {loading ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 sm:p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 sm:p-4">
          {movies.map((movie) => {
            const info = aiData[movie.id] || {};
            return (
              <div
                key={movie.id || movie.title}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform duration-300 flex flex-col"
              >
                <Card movie={movie} />

                {isSearchTriggered && (
                  <div className="p-3 border-t border-gray-800 text-center">
                    <p className="text-gray-300 text-sm italic">
                      {info.description || "Fetching description..."}
                    </p>
                    <p className="text-yellow-400 font-semibold mt-2">
                      ⭐ Rating: {info.rating || "N/A"}/10
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
