import express from 'express';
import {
    registerUserController,
    registerOfficialController,
    loginController
} from '../controllers/authController.js';

const router = express.Router();

// Register a new Citizen (User)
router.post('/register-user', registerUserController);

// Register a new Government Official
router.post('/register-official', registerOfficialController);

// Login for both Users and Officials
router.post('/login', loginController);

export default router;
