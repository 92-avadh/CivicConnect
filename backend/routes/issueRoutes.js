import express from 'express';
import {
  createIssue,
  getIssues,
  updateIssueStatus
} from '../controllers/issueController.js';

import { protect, isOfficial } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post('/', protect, upload.single('image'), createIssue);
router.get('/', protect, getIssues);
router.put('/:id', protect, isOfficial, updateIssueStatus);

export default router;
