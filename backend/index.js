import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();
const app = express();


app.use(cors({
  origin: ["https://react-movieapp-alpha.vercel.app"],
  credentials: true, // allows cookies/auth headers
}));



app.use(express.json());


await connectDB();


app.use("/api/movies", movieRoutes);


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
