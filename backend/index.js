import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//  Movie routes
app.use("/api/movies", movieRoutes);

//  Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port http://localhost:${PORT}`));
