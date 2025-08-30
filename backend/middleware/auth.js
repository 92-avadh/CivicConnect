import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // EDITED LINE: Replaced process.env.JWT_SECRET with the actual string
        const decoded = jwt.verify(token, 'a9b8c7d6e5f4g3h2j1k0l9m8n7b6v5c4x3z2q1w2e3r4t5y6u7i8o9p0');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default auth;