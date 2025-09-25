import express from 'express';
// 👇 Import both auth and isOfficial middlewares
import auth, { isOfficial } from '../middleware/auth.js';
// 👇 Corrected the function names in the import
import {
    applyForDeathCertificate,
    getUserDeathCertificates,
    getAllDeathCertificates,
    updateDeathCertificateStatus
} from '../controllers/deathCertificateController.js';

const router = express.Router();

// --- Citizen Routes ---
// 👇 This now correctly uses 'applyForDeathCertificate'
router.post('/apply', auth, applyForDeathCertificate);
router.get('/my-applications', auth, getUserDeathCertificates);

// --- Official Routes ---
router.get('/all', auth, isOfficial, getAllDeathCertificates);
router.put('/update-status/:id', auth, isOfficial, updateDeathCertificateStatus);

export default router;