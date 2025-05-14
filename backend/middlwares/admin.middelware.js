const authMiddleware = require('./auth.middleware');

const adminMiddleware = async (req, res, next) => {
  authMiddleware(req, res, () => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès refusé. Des privilèges administratifs sont nécessaires.' });
    }
    next();
  });
};

module.exports = adminMiddleware;