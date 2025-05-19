const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
    },
});

const sendPasswordResetEmail = async (email, resetUrl) => {
    const mailOptions = {
        from: `"Your App" <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { transporter, sendPasswordResetEmail };