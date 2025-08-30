import express from 'express';
import { trackApplicationController } from '../controllers/trackController.js';

const router = express.Router();

// GET /api/track/:id
router.get('/:id', trackApplicationController);

export default router;