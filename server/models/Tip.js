import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ["Prenatal", "Nutrition", "Postnatal"], default: "Prenatal" },
  author: { type: String, default: "SafeMother Team" },
}, { timestamps: true });

export default mongoose.model("Tip", tipSchema);
