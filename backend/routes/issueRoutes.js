import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';
import {
  createIssueController,
  getIssuesController,
  updateIssueStatusController,
  deleteIssueController,
  getStatsController, // 👈 Import the new controller
} from '../controllers/issueController.js'; // Corrected controller name casing

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


// --- ROUTES ---

// GET /api/issues/stats (Get dashboard stats)
router.get('/stats', authMiddleware, getStatsController); // 👈 Add this new route

// GET /api/issues/ (Get all issues)
router.get('/', getIssuesController);

// POST /api/issues/create (Create a new issue)
router.post('/create', authMiddleware, upload.single('image'), createIssueController);

// PUT /api/issues/update-status/:id (Update an issue's status, officials only)
router.put('/update-status/:id', authMiddleware, updateIssueStatusController);

// DELETE /api/issues/:id (Delete an issue)
router.delete('/:id', authMiddleware, deleteIssueController);

export default router;