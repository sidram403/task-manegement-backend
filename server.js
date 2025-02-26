import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import taskRoutes from './routes/task.route.js'
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const PORT = process.env.PORT
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "https://task-management-woad-three.vercel.app",
    // origin: "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://task-management-woad-three.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});
app.use(express.json()); // ✅ Keep CORS before routes
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", authMiddleware ,taskRoutes);


app.listen(PORT, () => console.log(`server  is in port ${PORT}`));