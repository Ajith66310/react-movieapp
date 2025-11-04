import { useState, useEffect } from "react";
import Card from "../components/Card";
import { searchMovies, getPopularMovies } from "../services/api.js";
import CardSkeleton from "../components/CardSkeleton";
import OpenAI from "openai";

//  Initialize OpenAI client
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiData, setAiData] = useState({});
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); //  Added flag

  //  Load popular movies initially
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

  //  Search and AI description generation
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setAiData({});
    setLoading(true);
    setIsSearchTriggered(true); //  Mark that a search was performed

    try {
      let results = [];

      if (!searchQuery.trim()) {
        results = await getPopularMovies();
        setIsSearchTriggered(false); //  Reset flag if search empty
      } else {
        results = await searchMovies(searchQuery);
      }

      setMovies(results || []);

      if (results.length > 0 && searchQuery.trim()) {
        // Generate AI info for up to first 12 movies
        const aiMovies = results.slice(0, 12);

        const aiResponses = await Promise.all(
          aiMovies.map(async (movie) => {
            const title = movie.title || movie.name;
            try {
              const response = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                  {
                    role: "user",
                    content: `Return only valid JSON like {"description":"...", "rating":"..."} for the movie "${title}". Do not include any extra text.`,
                  },
                ],
              });

              let content = response.choices?.[0]?.message?.content?.trim() || "";
              let parsed;

              try {
                content = content.replace(/```json|```/g, "").trim();

                if (content.startsWith("{") && content.endsWith("}")) {
                  parsed = JSON.parse(content);
                } else {
                  const descMatch = content.match(/"description"\s*:\s*"([^"]+)"/);
                  const ratingMatch = content.match(/"rating"\s*:\s*"([^"]+)"/);

                  parsed = {
                    description: descMatch ? descMatch[1] : content,
                    rating: ratingMatch ? ratingMatch[1] : "N/A",
                  };
                }
              } catch {
                parsed = {
                  description: content || "No description available.",
                  rating: "N/A",
                };
              }

              return { id: movie.id, ...parsed };
            } catch (err) {
              console.warn("AI fetch error for", title, err);
              return {
                id: movie.id,
                description: "No description available.",
                rating: "N/A",
              };
            }
          })
        );

        const dataObj = {};
        aiResponses.forEach((info) => {
          dataObj[info.id] = info;
        });
        setAiData(dataObj);
      } else if (!results.length) {
        setError("No movies found.");
      }
    } catch (err) {
      console.error("AI or search error:", err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pt-28">
      {/* 🔍 Search Bar */}
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

      {/* 🌀 Loading & Error States */}
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

                {/* 🤖 Show AI Info ONLY after user searches */}
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
