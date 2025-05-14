const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

exports.register = async (req, res, next) => {
  try {
    const { email, password, phone } = req.body;
    
    // Création utilisateur
    const user = await User.create({ email, password, phone });
    
    // Envoi email de vérification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendVerificationEmail(email, token);
    
    res.status(201).json({ message: 'Inscription réussie. Vérifiez votre email.' });
  } catch (err) {
    next(err);
  }
};