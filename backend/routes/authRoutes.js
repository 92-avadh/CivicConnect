import express from "express";
import {
  registerUserController,
  loginUserController,
  loginOfficialController,
  updateProfileController,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ----------------- Citizen -----------------
router.post("/register-user", registerUserController);
router.post("/login-user", loginUserController);

// ----------------- Official -----------------
router.post("/login-official", loginOfficialController);

// Update Profile Route
router.put("/update-profile", authMiddleware, updateProfileController);

export default router;