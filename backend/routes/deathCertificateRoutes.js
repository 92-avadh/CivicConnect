import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    applyForDeathCertificate,
    getUserDeathCertificates,
    getAllDeathCertificates,
    updateDeathCertificateStatus
} from '../controllers/deathCertificateController.js';

const router = express.Router();

// --- Citizen Routes ---
router.post('/apply', authMiddleware, applyForDeathCertificate);
router.get('/my-applications', authMiddleware, getUserDeathCertificates);

// --- Official Routes ---
router.get('/all', authMiddleware, getAllDeathCertificates);
router.put('/update-status/:id', authMiddleware, updateDeathCertificateStatus);

export default router;