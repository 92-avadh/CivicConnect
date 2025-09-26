import express from "express";
import auth, { isOfficial } from '../middleware/auth.js';
import {
  applyForDeathCertificate,
  getUserDeathCertificates,
  getAllDeathCertificates,
  updateDeathCertificateStatus,
  deleteDeathCertificate,
  editDeathCertificate
} from "../controllers/deathCertificateController.js";

const router = express.Router();

// Routes
router.post("/apply", auth, applyForDeathCertificate);
router.get("/my-applications", auth, getUserDeathCertificates);
router.put('/edit/:id', auth, editDeathCertificate);

// --- Official Routes ---
router.get("/all", auth, isOfficial, getAllDeathCertificates);
router.put("/update-status/:id", auth, isOfficial, updateDeathCertificateStatus);
router.delete("/delete/:id", auth, isOfficial, deleteDeathCertificate);

export default router;