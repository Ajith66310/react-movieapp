import express from "express";
import { getPopularMovies, searchAiDescription } from "../controller/movieController.js";


const router = express.Router();

router.get("/popular", getPopularMovies);

router.get("/search", searchAiDescription);

export default router;
