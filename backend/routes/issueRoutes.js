import express from 'express';
import multer from 'multer';
import { createIssueController, getIssuesController } from '../controllers/issueController.js';
import auth from '../middleware/auth.js'; // Assuming you have auth middleware here

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    limits: { fileSize: 10000000 }, // 10MB limit
    storage: multer.memoryStorage() // Use memory storage for easy handling
});

// Route for creating a new issue
// POST /api/issues/create
// ✅ FIXED: Added auth middleware and multer for file handling
router.post(
    '/create',
    auth,
    upload.array('images', 5), // Expects up to 5 files in a field named 'images'
    createIssueController
);

// Route for getting all issues
// GET /api/issues
router.get('/', getIssuesController);

export default router;