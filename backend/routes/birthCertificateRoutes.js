import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    applyForBirthCertificate,
    getUserBirthCertificates,
    getAllBirthCertificates,
    updateBirthCertificateStatus
} from '../controllers/birthCertificateController.js';

const router = express.Router();

// --- Citizen Routes ---
// ✅ This MUST be router.post
router.post('/apply', authMiddleware, applyForBirthCertificate);
router.get('/my-applications', authMiddleware, getUserBirthCertificates);

// --- Official Routes ---
router.get('/all', authMiddleware, getAllBirthCertificates);
router.put('/update-status/:id', authMiddleware, updateBirthCertificateStatus);

export default router;