import jwt from 'jsonwebtoken';
import OfficialModel from '../models/officialModel.js';
import UserModel from '../models/userModel.js';

// General authentication middleware to verify token
const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'a9b8c7d6e5f4g3h2j1k0l9m8n7b6v5c4x3z2q1w2e3r4t5y6u7i8o9p0');
        
        let user = await OfficialModel.findById(decoded._id);
        if (user) {
            decoded.role = 'official';
        } else {
            user = await UserModel.findById(decoded._id);
            if (user) {
                decoded.role = 'user';
            }
        }
        
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to check if the user has the 'official' role
export const isOfficial = (req, res, next) => {
    if (req.user && req.user.role === 'official') {
        next();
    } else {
        res.status(403).send({
            success: false,
            message: "Access Denied: Requires official role.",
        });
    }
};

export default auth;