const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("./middlwares/auth.middleware");
const adminMiddleware = require("../middlwares/admin.middelware");
const {
  validateLogin,
  validateRegister,
  checkValidation,
} = require("../middlwares/validation.middleware");


router.post("/register", validateRegister, checkValidation, authController.register)
router.post("/login", validateLogin, checkValidation, authController.login)
router.get("/verify-email", authController.verifyEmail);

router.get("/me", authMiddleware, authController.getMe)
router.get("/admin", authMiddleware, adminMiddleware, (req, res) =>{
    res.send("this is admin route")
})

router.get("/test", (req, res) =>{
    res.send("let's test it")
})

module.exports = router