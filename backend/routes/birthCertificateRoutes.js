import express from 'express';
// 👇 Import both auth and isOfficial middlewares
import auth, { isOfficial } from '../middleware/auth.js';
// 👇 Corrected the function name in the import
import {
    applyForBirthCertificate,
    getUserBirthCertificates,
    getAllBirthCertificates,
    updateBirthCertificateStatus
} from '../controllers/birthCertificateController.js';

const router = express.Router();

// --- Citizen Routes ---
// 👇 This now correctly uses 'applyForBirthCertificate'
router.post('/apply', auth, applyForBirthCertificate);
router.get('/my-applications', auth, getUserBirthCertificates);

// --- Official Routes ---
router.get('/all', auth, isOfficial, getAllBirthCertificates);
router.put('/update-status/:id', auth, isOfficial, updateBirthCertificateStatus);

export default router;