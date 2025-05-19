const authMiddleware = require('../middlewares/auth.middleware');

const adminMiddleware = async (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }
    next();
  });
};

module.exports = adminMiddleware;