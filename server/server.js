import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://safe-mother.vercel.app",
    "https://safemother-front.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ SafeMother backend route working!" });
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reminders", reminderRoutes);

// ✅ Start Server Only After Database Connects
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));
