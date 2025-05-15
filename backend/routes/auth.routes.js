const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, checkValidation } = require('../middlewares/validation.middleware');
const authMiddleware=require('../middlwares/auth.middleware');

router.post('/register', validateRegister, checkValidation, authController.register);
router.post('/login', validateLogin, checkValidation, authController.login);
router.get('/me', authController.getMe);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;