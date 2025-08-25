import express from "express";
import {
  registerUserController,
  loginUserController,
  loginOfficialController,
} from "../controllers/authController.js";

const router = express.Router();

// ----------------- Citizen -----------------
router.post("/register-user", registerUserController);  // Citizen Registration
router.post("/login-user", loginUserController);        // Citizen Login

// ----------------- Official -----------------
router.post("/login-official", loginOfficialController); // Official Login (No registration)

export default router;
