import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import smartcors from "smartcors";

dotenv.config();

const app = express();

app.use(
smartcors({
    allowedOrigins:[],
    allowCredentials: true,
    debug: true
  })
);


app.use(express.json());

//  Movie routes
app.use("/api/movies", movieRoutes);

//  Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port http://localhost:${PORT}`));
