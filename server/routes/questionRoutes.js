import express from "express";
import { askQuestion, getQuestions, answerQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.post("/", askQuestion);
router.get("/", getQuestions);
router.put("/:id/answer", answerQuestion);

export default router;
