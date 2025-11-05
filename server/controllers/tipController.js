import Tip from "../models/Tip.js";

// Create Tip
export const createTip = async (req, res) => {
  try {
    const tip = await Tip.create(req.body);
    res.status(201).json(tip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tips
export const getTips = async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
