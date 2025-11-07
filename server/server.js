import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();

const app = express();

// ✅ Connect to DB once
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (Add new domain when frontend deploys)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://safemother.vercel.app",   // ✅ use your lowercase repo name on Vercel
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ SafeMother backend is live!" });
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reminders", reminderRoutes);

// ✅ Railway compatible PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
