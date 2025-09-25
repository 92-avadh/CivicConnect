import express from "express";
import {
  registerUserController,
  loginUserController,
  registerOfficialController, // Now this will be found
  loginOfficialController,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ----------------- Citizen -----------------
router.post("/register-user", registerUserController);
router.post("/login-user", loginUserController);

// ----------------- Official -----------------
router.post("/register-official", registerOfficialController);
router.post("/login-official", loginOfficialController);

export default router;