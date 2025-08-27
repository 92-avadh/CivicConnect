import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';
import {
  createIssueController,
  getIssuesController,
  updateIssueStatusController,
  deleteIssueController,
  getUserIssuesController,
} from '../controllers/issueController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GET /api/issues/ (Get all issues, for officials only)
router.get('/', authMiddleware, getIssuesController);

// GET /api/issues/my-issues (Get issues for the logged-in user)
router.get('/my-issues', authMiddleware, getUserIssuesController);

// POST /api/issues/create (Create a new issue)
router.post('/create', authMiddleware, upload.array('images', 5), createIssueController);

// PUT /api/issues/update-status/:id (Update an issue's status)
router.put('/update-status/:id', authMiddleware, updateIssueStatusController);

// DELETE /api/issues/:id (Delete an issue)
router.delete('/:id', authMiddleware, deleteIssueController);

export default router;