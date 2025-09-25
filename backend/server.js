import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// 1. Import all your route files
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import birthCertificateRoutes from './routes/birthCertificateRoutes.js';
import deathCertificateRoutes from './routes/deathCertificateRoutes.js';
import waterConnectionRoutes from './routes/waterConnectionRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// --- INITIAL SETUP ---
dotenv.config();
connectDB();
const app = express();

// --- MIDDLEWARE ---
app.use(cors({
  origin: ["http://localhost:3000", 
  "http://192.168.1.4:3000"],// Allow requests from your React app
  allowedHeaders: ["Content-Type", "x-auth-token"], // Allow the necessary headers
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- ROUTES ---
// Make the 'uploads' folder public so images can be accessed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Connect all the API routes to your application
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/birth-certificates', birthCertificateRoutes);
app.use('/api/death-certificates', deathCertificateRoutes);
app.use('/api/water-connections', waterConnectionRoutes);
app.use('/api/track', trackRoutes);
app.use('/api/feedback', feedbackRoutes);

// --- PRODUCTION BUILD & ERROR HANDLING ---
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// --- SERVER LISTENER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});