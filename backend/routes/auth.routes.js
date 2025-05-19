const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, checkValidation } = require('../middlwares/validation.middleware');
const authMiddleware = require('../middlwares/auth.middleware');

// Public routes
router.post('/register', validateRegister, checkValidation, authController.register);
router.post('/login', validateLogin, checkValidation, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;