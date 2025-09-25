import express from 'express';
import multer from 'multer';
// 👇 Import both auth and isOfficial middlewares
import auth, { isOfficial } from '../middleware/auth.js';
// 👇 Corrected the function names in the import
import {
    applyForWaterConnection,
    getUserWaterConnections,
    getAllWaterConnections,
    updateWaterConnectionStatus,
    deleteWaterConnection
} from '../controllers/waterConnectionController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// --- Citizen Routes ---
// 👇 This now correctly uses 'applyForWaterConnection'
router.post('/apply', auth, upload.single('addressProof'), applyForWaterConnection);
router.get('/my-applications', auth, getUserWaterConnections);

// --- Official Routes ---
// 👇 Added isOfficial middleware for protection
router.get('/all', auth, isOfficial, getAllWaterConnections);
router.put('/update-status/:id', auth, isOfficial, updateWaterConnectionStatus);
router.delete('/delete/:id', auth, isOfficial, deleteWaterConnection);

export default router;