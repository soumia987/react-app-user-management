const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Vérification de votre email',
        html: `<p>Cliquez sur ce lien pour vérifier votre email: <a href="${process.env.BASE_URL}/verify-email?token=${token}">Vérifier Email</a></p>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };