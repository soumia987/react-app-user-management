const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: '"404 Team" <no-reply@404.com>',
    to: email,
    subject: 'Vérifiez votre email',
    html: `<p>Cliquez <a href="${verificationLink}">ici</a> pour vérifier votre email.</p>`,
  });
};