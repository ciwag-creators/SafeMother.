import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ BODY PARSER
app.use(express.json());

// ✅ FIXED CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://safe-mother.vercel.app",
      "https://safemother-front.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ CRITICAL: allow preflight requests properly
app.options("*", cors());

// ✅ Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ SafeMother backend route working!" });
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reminders", reminderRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Start Server only after DB connects
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
  )
  .catch((err) =>
    console.error("❌ MongoDB connection failed:", err.message)
  );
