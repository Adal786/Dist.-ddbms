const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token failed, not authorized' });
    }
};
