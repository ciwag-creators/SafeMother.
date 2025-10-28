import express from "express";
import { createReminder, getReminders, markCompleted } from "../controllers/reminderController.js";

const router = express.Router();

router.post("/", createReminder);
router.get("/", getReminders);
router.put("/:id/complete", markCompleted);

export default router;
