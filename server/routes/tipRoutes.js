import express from "express";
import { createTip, getTips } from "../controllers/tipController.js";

const router = express.Router();

router.post("/", createTip);
router.get("/", getTips);

export default router;
