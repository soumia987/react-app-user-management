const sendPasswordResetEmail = async (email, resetUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Click this link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };