const User = require("../models/User");
const { generateToken } = require("../config/jwt");
const { sendPasswordResetEmail } = require("../config/nodemailer");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

// Register
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create user
        const user = new User({ username, email, password, role });
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        // Return response
        res.status(201).json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role
            } 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.status(200).json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role
            } 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Get current user
const getMe = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: user.role
            } 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(email, resetUrl);

        res.status(200).json({ message: "Password reset link sent to email" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login, getMe, forgotPassword, resetPassword };