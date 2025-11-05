import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const BASE_URL = process.env.WATCHMODE_BASE_URL;
const API_KEY = process.env.WATCHMODE_API_KEY;

//  Get popular movies
export const getPopularMovies = async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/list-titles/`, {
      params: {
        apiKey: API_KEY,
        types: "movie",
        limit: 15,
        sort_by: "popularity_desc",
      },
    });

    const titles = data.titles || [];

    const detailedMovies = await Promise.all(
      titles.map(async (movie) => {
        try {
          const { data: detail } = await axios.get(
            `${BASE_URL}/title/${movie.id}/details/`,
            { params: { apiKey: API_KEY } }
          );
          return { ...movie, poster_url: detail.poster };
        } catch {
          return movie;
        }
      })
    );

    res.json(detailedMovies);
  } catch (err) {
    console.error("Popular movie fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};

//  Search movies + AI-generated description/rating
export const searchAiDescription = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    //  Search movies by query
    const { data } = await axios.get(`${BASE_URL}/autocomplete-search/`, {
      params: {
        apiKey: API_KEY,
        search_value: query,
        search_type: 2,
      },
    });

    const results = data.results || [];

    //  Fetch detailed info for each movie
    const detailedResults = await Promise.all(
      results.map(async (movie) => {
        try {
          const { data: detail } = await axios.get(
            `${BASE_URL}/title/${movie.id}/details/`,
            { params: { apiKey: API_KEY } }
          );
          return { ...movie, poster_url: detail.poster };
        } catch {
          return movie;
        }
      })
    );

    //  Generate AI descriptions for top 10 movies
    const aiMovies = detailedResults.slice(0, 15);
    const aiResponses = await Promise.all(
      aiMovies.map(async (movie) => {
        const title = movie.title || movie.name;
        try {
          const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: `Return only valid JSON in this format for the movie "${title}":
{
  "description": "A short, engaging summary of the movie (2–3 sentences).",
  "rating": "A numeric IMDb-style rating out of 10 (e.g., 7.8)"
}
Do NOT include content ratings like PG-13 or R.`,
              },
            ],
          });

          let content = completion.choices?.[0]?.message?.content?.trim() || "";
          content = content.replace(/```json|```/g, "").trim();

          let parsed;
          try {
            parsed = JSON.parse(content);

            //  Sanitize non-numeric ratings (e.g., PG-13)
            if (parsed.rating && !/^\d+(\.\d+)?$/.test(parsed.rating)) {
              parsed.rating = "N/A";
            }
          } catch {
            parsed = { description: content, rating: "N/A" };
          }

          return { id: movie.id, ...parsed };
        } catch {
          return {
            id: movie.id,
            description: "No description available",
            rating: "N/A",
          };
        }
      })
    );

    //  Combine AI data by movie ID
    const aiData = {};
    aiResponses.forEach((info) => (aiData[info.id] = info));

    //  Send final response
    res.json({ movies: detailedResults, aiData });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};