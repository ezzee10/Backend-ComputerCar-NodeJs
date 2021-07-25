const mailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

let transporter = mailer.createTransport(
    smtp({
        host: 'in-v3.mailjet.com',
        port: 587,
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_API_SECRET,
        },
    })
);

module.exports = transporter