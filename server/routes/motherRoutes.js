import express from "express";
import Mother from "../models/Mother.js";

const router = express.Router();

// ✅ Register a new mother
router.post("/register", async (req, res) => {
  try {
    const { name, age, phone, location, healthStatus } = req.body;
    const mother = new Mother({ name, age, phone, location, healthStatus });
    await mother.save();
    res.status(201).json({ message: "Mother registered successfully", mother });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all registered mothers
router.get("/", async (req, res) => {
  try {
    const mothers = await Mother.find();
    res.json(mothers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
