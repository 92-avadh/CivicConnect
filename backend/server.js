import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js'; // Import issue routes

dotenv.config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
connectDB();

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes); // Use issue routes

// --- SERVE UPLOADED FILES ---
const __dirname = path.resolve();
// This makes the 'uploads' folder public so images can be accessed by their URL
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- DEPLOYMENT CONFIGURATION ---
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.status(200).send('<h1>CivicConnect API is running!</h1>');
    });
}

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
