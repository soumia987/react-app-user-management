const sendEmail = async (to, subject, text) => {
    // Ici tu pourrais utiliser nodemailer ou un autre service d'envoi d'emails
    console.log(`Email envoyé à ${to} | Sujet: ${subject} | Message: ${text}`);
  };
  
  module.exports = sendEmail;
  