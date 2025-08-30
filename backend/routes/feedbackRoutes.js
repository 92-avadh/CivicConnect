import express from 'express';
import { createFeedbackController, getAllFeedbackController } from '../controllers/feedbackController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// This route remains public for anyone to submit feedback
router.post('/submit', createFeedbackController);

// ADDED: New protected route for officials to get all feedback
// It is protected by the authMiddleware
router.get('/', authMiddleware, getAllFeedbackController);

export default router;
