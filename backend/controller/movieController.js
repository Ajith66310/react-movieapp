import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";
import UserUsage from "../model/userUsageModel.js";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const BASE_URL = process.env.WATCHMODE_BASE_URL;
const API_KEY = process.env.WATCHMODE_API_KEY;

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

export const searchAiDescription = async (req, res) => {
  const { query, userId } = req.query;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (!query) return res.status(400).json({ error: "Query required" });

  let usage = await UserUsage.findOne({ userId });
  if (!usage) usage = await UserUsage.create({ userId, aiSearchCount: 0 });

  if (usage.aiSearchCount >= 2) {
    return res.status(403).json({
      error: "AI search limit reached (2 searches allowed for free users)",
    });
  }

  try {
    // SEARCH MOVIE
    const { data } = await axios.get(`${BASE_URL}/search/`, {
      params: {
        apiKey: API_KEY,
        search_field: "name",
        search_value: query,
        types: "movie",
      },
    });

    const results = data.title_results || [];

    // GET DETAILS
    const detailedResults = await Promise.all(
      results.map(async (movie) => {
        try {
          const { data: detail } = await axios.get(
            `${BASE_URL}/title/${movie.id}/details/`,
            { params: { apiKey: API_KEY } }
          );

          return {
            ...movie,
            title: movie.name,
            poster_url: detail.poster || null,
          };
        } catch {
          return movie;
        }
      })
    );

    const cleanedResults = detailedResults.filter(Boolean);

    // AI DESCRIPTION
    const aiResponses = await Promise.all(
      cleanedResults.slice(0, 15).map(async (movie) => {
        try {
          const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: `Return JSON for "${movie.title}":
{
  "description": "2–3 sentence summary",
  "rating": "0–10 rating"
}`,
              },
            ],
          });

          let output = completion.choices[0].message.content.trim();
          output = output.replace(/```json|```/g, "").trim();

          let parsed;
          try {
            parsed = JSON.parse(output);
          } catch {
            parsed = { description: output, rating: "N/A" };
          }

          return { id: movie.id, ...parsed };
        } catch {
          return { id: movie.id, description: "N/A", rating: "N/A" };
        }
      })
    );

    const aiData = {};
    aiResponses.forEach((x) => (aiData[x.id] = x));

    usage.aiSearchCount++;
    await usage.save();

    res.json({ movies: cleanedResults, aiData });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
