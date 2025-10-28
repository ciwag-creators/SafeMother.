import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: String,
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Reminder", reminderSchema);
