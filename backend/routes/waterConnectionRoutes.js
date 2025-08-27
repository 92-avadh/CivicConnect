import express from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';
import {
    applyForWaterConnection,
    getUserWaterConnections,
    getAllWaterConnections,
    updateWaterConnectionStatus
} from '../controllers/waterConnectionController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// --- Citizen Routes ---
// Use multer to accept a single file from a field named 'addressProof'
router.post('/apply', authMiddleware, upload.single('addressProof'), applyForWaterConnection);
router.get('/my-applications', authMiddleware, getUserWaterConnections);

// --- Official Routes ---
router.get('/all', authMiddleware, getAllWaterConnections);
router.put('/update-status/:id', authMiddleware, updateWaterConnectionStatus);

export default router;