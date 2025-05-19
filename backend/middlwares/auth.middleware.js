const { verifyToken } = require("../config/jwt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        let token = req.header("Authorization");
        
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Remove 'Bearer ' from token string
        token = token.replace('Bearer ', '');

        // Verify token
        const decoded = verifyToken(token);
        
        // Find user
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: "Token is not valid" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authMiddleware;