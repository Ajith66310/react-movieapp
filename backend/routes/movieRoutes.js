import express from "express";
import { getPopularMovies, searchAiDescription } from "../controller/movieController.js";

const router = express.Router();

//  Fetch popular movies
router.get("/popular", getPopularMovies);

//  Search movies + AI data
router.get("/search", searchAiDescription);

export default router;
