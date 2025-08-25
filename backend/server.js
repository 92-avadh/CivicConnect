import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ 1. Import the cors package
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';



// Initial setup
dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors()); // ✅ 2. Use cors middleware - THIS IS THE FIX
app.use(express.json());

// These lines are needed to correctly resolve paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make the 'uploads' folder public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes); //
app.use('/api/issues', issueRoutes); //

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));