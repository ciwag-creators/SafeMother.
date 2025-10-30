// routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // if you have it
import User from "../models/User.js";

const router = express.Router();

// ✅ Test route for users
router.get("/test", (req, res) => {
  res.json({ message: "User routes working fine!" });
});

// ✅ Update profile route
router.put("/update", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;

      await user.save();
      res.json({ message: "Profile updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
