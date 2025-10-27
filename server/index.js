// server/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "✅ SafeMother backend is working fine!" });
});

import motherRoutes from "./routes/motherRoutes.js";

//  Add this line
app.use("/api/mothers", motherRoutes);


// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
