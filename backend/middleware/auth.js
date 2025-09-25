import jwt from 'jsonwebtoken';
import OfficialModel from '../models/officialModel.js'; // 👈 Import the official model

// General authentication middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'a9b8c7d6e5f4g3h2j1k0l9m8n7b6v5c4x3z2q1w2e3r4t5y6u7i8o9p0');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// 👇 ADD THIS NEW MIDDLEWARE FUNCTION
// Middleware to check if the user has the 'official' role
export const isOfficial = async (req, res, next) => {
    try {
        // Find the user in the Official collection
        const official = await OfficialModel.findById(req.user._id);

        // If they are not an official, deny access
        if (!official) {
            return res.status(403).send({
                success: false,
                message: "Access Denied: Requires official role.",
            });
        }
        // If they are an official, proceed
        next();
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in official middleware",
        });
    }
};


export default auth;