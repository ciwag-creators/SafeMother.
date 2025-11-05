import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // if you have DB connection
import userRoutes from "./routes/userRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();
connectDB(); // if needed

const allowedOrigins = [
  "http://localhost:5173",
  "https://safemother-front.vercel.app",
  process.env.FRONTEND_URL, // Optional, if set in .env
];

const app = express();

app.use(
  cors({
    origin: "https://safe-mother.vercel.app", // ✅ your frontend URL
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);


app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS blocked: " + origin));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Test Route (must come before routes)
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ SafeMother backend route working fine!" });
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/reminders", reminderRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));
