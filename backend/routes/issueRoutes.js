import express from 'express';
import multer from 'multer';
import { createIssueController, getIssuesController } from '../controllers/issueController.js';
import auth from '../middleware/auth.js'; // ✅ FIXED: Added the missing import for the auth middleware

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    limits: { fileSize: 10000000 }, // 10MB limit
    storage: multer.memoryStorage() // Use memory storage for easy handling
});

// Route for creating a new issue
// POST /api/issues/create
router.post(
    '/create',
    auth, // This will now work correctly
    upload.array('images', 5),
    createIssueController
);

// Route for getting all issues
// GET /api/issues
router.get('/', getIssuesController);

export default router;