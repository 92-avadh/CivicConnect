import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import birthCertificateRoutes from './routes/birthCertificateRoutes.js';
import deathCertificateRoutes  from './routes/deathCertificateRoutes.js';
import waterConnectionRoutes from './routes/waterConnectionRoutes.js';
import trackRoutes from './routes/trackRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/birth-certificates', birthCertificateRoutes);
app.use('/api/death-certificates', deathCertificateRoutes);
app.use('/api/water-connections', waterConnectionRoutes);
app.use('/api/track', trackRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../fronted/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../fronted/build/index.html'));
    });
}

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});