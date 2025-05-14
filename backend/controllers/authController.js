const bcrypt = require("bcrypt")
const User = require("../models/User")
const { generateToken } = require("../config/jwt")
const { sendVerificationEmail } = require("../utils/email")
const crypto = require('crypto');

const register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body
        const user = await User.findOne({email})

        if(user){
            res.status(400).json({message: "User already exists!"})
            return
        }

        const hashPass = await bcrypt.hash(password, 10)
        const emailToken = crypto.randomBytes(64).toString('hex');
        
        const newUser = new User({
            username, 
            email, 
            password: hashPass, 
            role: isAdmin ? 'admin' : 'user',
            emailToken
        })

        await newUser.save()
        
        // Envoyer l'email de vérification
        await sendVerificationEmail(email, emailToken);
        
        res.status(201).json({
            message: "User registered successfully! Please check your email to verify your account."
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Server error, Enable to register!"})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({message: "Invalid credentials! (user not found)"})
            return
        }

        if (!user.isVerified) {
            res.status(401).json({message: "Please verify your email before logging in."})
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({message: "Invalid credentials! (wrong password)"})
            return
        }

        const token = generateToken(user._id)
        res.status(201).json({token, user})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Server error, Enable to login!"})
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ emailToken: token });

        if (!user) {
            return res.status(400).json({ message: "Token invalide ou expiré." });
        }

        user.isVerified = true;
        user.emailToken = null;
        await user.save();

        res.status(200).json({ message: "Email vérifié avec succès!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erreur du serveur lors de la vérification de l'email." });
    }
};

const getMe = async (req, res) => {
    res.json(req.user)
}

module.exports = { register, login, getMe, verifyEmail }