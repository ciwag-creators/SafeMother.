import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();

// 🛑 CRITICAL FIX: Define the allowedOrigins array here!
const allowedOrigins = [
    'http://localhost:5173',           // Your local React development port
    process.env.FRONTEND_URL,          // Your deployed SafeMother URL (add this to your .env)
];

const app = express();
app.use(cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true); 
            // Check if the origin is in our allowed list
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // IMPORTANT: Allows cookies (like a JWT token) to be sent and received
    })
  );
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
