import express from "express";
import { createMeme } from "../controllers/memeController.js";

const router = express.Router();

router.post("/generate", createMeme);

export default router;
