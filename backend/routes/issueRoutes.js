import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';
import {
  createIssueController,
  getIssuesController,
  updateIssueStatusController,
  deleteIssueController,
} from '../controllers/IssueController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✨ MODIFIED FOR TESTING: authMiddleware has been temporarily removed from this line.
router.get('/', getIssuesController);

// POST /api/issues/create (Create a new issue)
router.post('/create', authMiddleware, upload.array('images', 5), createIssueController);

// PUT /api/issues/update-status/:id (Update an issue's status, officials only)
router.put('/update-status/:id', authMiddleware, updateIssueStatusController);

// DELETE /api/issues/:id (Delete an issue)
router.delete('/:id', authMiddleware, deleteIssueController);

export default router;