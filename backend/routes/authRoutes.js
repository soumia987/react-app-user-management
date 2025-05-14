const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.midddleware");
const {
  validateLogin,
  validateRegister,
  checkValidation,
} = require("../middleware/validate.middleware");


router.post("/register", validateRegister, checkValidation, authController.register)
router.post("/login", validateLogin, checkValidation, authController.login)

router.get("/me", authMiddleware, authController.getMe)
router.get("/admin", authMiddleware, adminMiddleware, (req, res) =>{
    res.send("this is admin route")
})

router.get("/test", (req, res) =>{
    res.send("hello world i'm testing my backend")
})

module.exports = router
