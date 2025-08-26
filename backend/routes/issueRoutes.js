import express from "express";
import {
  registerUserController,
  loginUserController,
  loginOfficialController,
} from "../controllers/authController.js";

const router = express.Router();

// ----------------- Citizen -----------------
// POST /api/auth/register-user
router.post("/register-user", registerUserController);

// POST /api/auth/login-user
router.post("/login-user", loginUserController);

// ----------------- Official -----------------
// POST /api/auth/login-official
router.post("/login-official", loginOfficialController);

export default router;