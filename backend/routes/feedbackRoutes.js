import express from "express";
import auth, { isOfficial } from "../middleware/auth.js"; // Import both middlewares
import {
  createFeedbackController,
  getAllFeedbackController, // Import the new controller
} from "../controllers/feedbackController.js";

const router = express.Router();

// --- ROUTES ---

// POST /api/feedback/submit (For any logged-in user to submit feedback)
router.post("/submit", auth, createFeedbackController);

// GET /api/feedback (For officials ONLY to view all feedback)
router.get("/", auth, isOfficial, getAllFeedbackController);

export default router;