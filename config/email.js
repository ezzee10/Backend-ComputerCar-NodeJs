const mailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

let transporter = mailer.createTransport(
    smtp({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'cscgrupo2@gmail.com',
          pass: 'Las4bestias',
        },
    })
);

module.exports = transporter