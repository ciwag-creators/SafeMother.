import mongoose from "mongoose";

const motherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true, unique: true },
  location: { type: String },
  healthStatus: { type: String, default: "Unknown" },
  dateRegistered: { type: Date, default: Date.now },
});

const Mother = mongoose.model("Mother", motherSchema);
export default Mother;